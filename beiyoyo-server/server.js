const express = require('express') 
const app = express();
const multer = require('multer');
const cors = require("cors");
const path = require('path');
const db = require('./db.js')
const os = require('os')
const session = require("express-session");
const cookieParser = require("cookie-parser");
const fs = require('fs');
const Snowflake = require('snowflake-id').default;
const { v4: uuidv4 } = require('uuid');

const {
  sendEmail,
  generateSecretKey,
  checkCode,
  checkUserExists,
  hashPassword,
  checkLoginUser,
  getUserInfo,
  cos
} = require('./utils.js')

const rateLimit = require('express-rate-limit');

const Bucket = 'aibei-1258806962'; // 存储桶名称
const Region = 'ap-shanghai'; 

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 分钟
  max: 100, // 限制每个 IP 100 个请求
  message: "请求过多，请稍后再试"
});
const port = process.env.PORT || 8181;
const corsOptions = {
  origin: /^(http:\/\/localhost:\d+)$/,
  // origin: 'https://beiyoyo.cn',
  optionsSuccessStatus: 200,
  credentials: true
};

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);


function getLocalIP() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const interfaces = os.networkInterfaces() ;
  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      // 只考虑 IPv4 且非 127.0.0.1 地址
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1'; // fallback
}


// 1. 设置 multer 存储位置
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, filename);
  }
});
const upload = multer({ storage });



// 2. 设置静态文件访问
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(limiter);
app.use(express.json({ limit: '50mb' })); // 解析 JSON 请求体,请求体大小限制
app.use(express.urlencoded({ extended: true,  limit: '50mb' }))
app.use(cors(corsOptions))

app.use(cookieParser());

// 配置 Session
app.use(
  session({
    secret: '8630788440c165c445255fba3ea8530d850b6d432fec5d713d2e746c598df943', // 用于签名 Session ID 的密钥（建议使用环境变量）
    resave: false, // 是否每次请求都重新保存 Session（推荐 false）
    saveUninitialized: false, // 是否保存未初始化的 Session（推荐 false）
    cookie: {
      httpOnly: true, // 防止 XSS 攻击（JS 无法读取 Cookie）
      secure: false, // 是否仅 HTTPS 传输（生产环境建议 true）
      maxAge: 1000 * 60 * 60 * 24 * 7, // Session 有效期（30 分钟）
    },
  })
);



// 4. 上传接口并写入数据库
app.put('/update/userInfo', upload.single('avatar'), (req, res) => {
  const username = req.body.username || 'default_user';
  if (!req.file) {
    return res.status(400).json({ error: '没有上传文件' });
  }

  const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

  const sql = 'INSERT INTO users (username, avatar_url) VALUES (?, ?)';

  db.query(sql, [username, imageUrl], (err, result) => {
    if (err) return res.status(500).json({ error: '数据库写入失败' });
    res.end({
      message: '上传成功',
      userId: result.insertId,
      avatar: imageUrl
    });
  });
});

app.post('/api/verification_code',async (req,res) => {
  const {email} = req.body
  const resp = await sendEmail(email)
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(resp))
})

app.post('/api/register',async (req,res) => {
  const {email, password, verificationCode} = req.body
  const resp = await checkCode(email,verificationCode)
  if(resp.code !== 0) {
    res.json(resp)
    return 
  }
  const snowflake = new Snowflake({ workerId: 1 });
  const userID = snowflake.generate().toString()

  const userIsExist = await checkUserExists(email)

  if(userIsExist) {
    res.json({
      code: 10001,
      message: '该用户已经存在可直接登录',
      data:{}
    }
    )
  } else {
    const now = Date.now(); // 当前时间戳（毫秒）
    const expiresIn = (now + 7 * 24 * 60 * 60 * 1000)/1000; // 加上 7 天的毫秒数
    try{
      const encryptionPassword = await hashPassword(password)
      const defaultAvatar = `https://${Bucket}.cos.${Region}.myqcloud.com/avatar/avatar.jpeg`
      await db.query('INSERT INTO users (userID, userName, avatar, password, createAt, role, nickName) VALUES (?,?,?,?,?,?,?)', [userID, email, defaultAvatar,encryptionPassword, now, 'admin', 'test-001']);
      req.session.user = { email,userID, role: "admin" };
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({code: 0,msg: '注册成功！',data: {userID}}))

    }catch(e){
        res.json({
        code:10002,
        message: `注册失败:${e}`,
        data:{}
      })
    }
  }
 
})

app.post('/api/login',async (req,res)=> {
  const {email, password} = req.body
  const user = await checkLoginUser(email, password)
  
  if(!user){
    res.json({
      code: 10003,
      message: '账号密码错误，请检查后重新输入！',
      data:{}
    })
  } else {
     req.session.user = { email: user.userName ,userID: user.userID, role: "admin" };
     res.json({
      code: 0,
      message: '',
      data:{
        userID: user.userID
      }
    })
  }
})

app.get('/api/get/user',async(req,res)=> {
   const { user: userInfo } = req.session
   if(!userInfo){
    return res.status(401).json({ message: '登录过期' });
   }
   const user = await getUserInfo(userInfo.userID)
    res.json({
      code: 0,
      message: '',
      data:{
        user: user
      }
    })
})

app.post('/api/upload/photo', upload.single('photo'), async (req, res) => {
  const { user: userInfo } = req.session;
  const { subject, description } = req.body;

  if (!req.file) return res.status(400).json({ error: '没有上传文件' });

  const file = req.file;
  const ext = path.extname(file.originalname);
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;

  try {
    console.log(file, ext, filename)
    // 上传到 COS
    await new Promise((resolve, reject) => {
      cos.putObject(
        {
          Bucket,
          Region,
          Key: `photos/${filename}`,
          Body: fs.createReadStream(file.path),
          ContentLength: file.size,
        },
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });

    // 删除本地临时文件
    fs.unlink(file.path, () => {});

    // 拼接 COS 公网访问地址
    const imageUrl = `https://${Bucket}.cos.${Region}.myqcloud.com/photos/${filename}`;

    const now = Date.now();
    const sql =
      'INSERT INTO photo (userID, picUrl, subject, description, createAt) VALUES (?,?,?,?,?)';

    // 插入数据库
    await db.query(
      sql,
      [userInfo.userID, imageUrl, subject, description, now])

    res.json({
          code: 0,
          message: '上传成功',
          data: {
            picUrl: imageUrl,
          },
        });
  } catch (err) {
    console.error('上传失败:', err);
    res.status(500).json({ error: '上传失败' });
  }
});

app.get('/api/getPhotoList',async (req,res)=> {
  const {userID} = req.session.user
  const [photoList] = await db.query('SELECT * FROM photo WHERE userID = ?', [userID])
  res.json({
    code: 0,
    message: '',
    data: {
      photoList: photoList
    }
  })
})

app.put('/api/update/info', upload.fields(
  [{ name: 'avatar', maxCount: 1 },
  { name: 'backgroundImage', maxCount: 1 }]
),async (req,res)=> {
  const avatarFile = req.files['avatar']?.[0];
  const backFile = req.files['backgroundImage']?.[0];
  const { nickName } = req.body
   const { user: userInfo } = req.session;
  const avatarExt = path.extname(avatarFile.originalname);
  const backExt = path.extname(backFile.originalname);

  const avatarName = `${Date.now()}-${Math.random().toString(36).slice(2)}${avatarExt}`;
  const backName = `${Date.now()}-${Math.random().toString(36).slice(2)}${backExt}`;


  try {
    // 拼接 COS 公网访问地址
    const avatarImageUrl = `https://${Bucket}.cos.${Region}.myqcloud.com/avatar/${avatarName}`;
    const backImageUrl = `https://${Bucket}.cos.${Region}.myqcloud.com/background/${backName}`;

    const now = Date.now();
    const sql = `
        UPDATE users 
        SET nickName = ?, avatar = ?, backgroundImage = ?, updateAt = ?
        WHERE userID = ?
      `;
    const user = await getUserInfo(userInfo.userID)
    await new Promise((resolve, reject)=> {
      const {backgroundImage, avatar} = user
      if(!avatar.includes('default')){
        cos.deleteObject(
          {
            Bucket,  // 例如：example-1250000000
            Region,            // 你的地域
            Key: `avatar/${avatar.split('/').at(-1)}`,           // 例如：images/avatar.jpg
          },
          function (err, data) {
            if (err) return reject(err);
            resolve(data);
          }
        )
      }
      if(!backgroundImage.includes('default')) {
         cos.deleteObject(
          {
            Bucket,  // 例如：example-1250000000
            Region,            // 你的地域
            Key: `background/${backgroundImage.split('/').at(-1)}`,           // 例如：images/avatar.jpg
          },
          function (err, data) {
            if (err) return reject(err);
            resolve(data);
          }
        )
      }
      
    })
    
    // 插入数据库
    await db.query(
      sql,
      [ nickName, avatarImageUrl, backImageUrl, now, userInfo.userID])

    // 上传到 COS
    await new Promise((resolve, reject) => {
      cos.putObject(
        {
          Bucket,
          Region,
          Key: `avatar/${avatarName}`,
          Body: fs.createReadStream(avatarFile.path),
          ContentLength: avatarFile.size,
        },
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
      cos.putObject(
        {
          Bucket,
          Region,
          Key: `background/${backName}`,
          Body: fs.createReadStream(backFile.path),
          ContentLength: backFile.size,
        },
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });

    // 删除本地临时文件
    fs.unlink(avatarFile.path, () => {});
    fs.unlink(backFile.path, () => {});


    res.json({
          code: 0,
          message: '更新成功！',
          data: {
          },
        });
  } catch (err) {
    console.error('更新失败:', err);
    res.status(500).json({ error: '更新失败' });
  }
})

app.listen(port, '0.0.0.0', () => {  
  console.log(`Proxy server is listening on url http://${getLocalIP()}:${port}`);  
})
