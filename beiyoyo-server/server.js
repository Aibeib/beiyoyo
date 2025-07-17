const express = require('express') 
const app = express();
const multer = require('multer');
const cors = require("cors");
const path = require('path');
const db = require('./db.js')
const os = require('os')
const session = require("express-session");
const cookieParser = require("cookie-parser");
const Snowflake = require('snowflake-id').default;
const {
  sendEmail,
  generateSecretKey,
  checkCode,
  checkUserExists
} = require('./utils.js')

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 分钟
  max: 100, // 限制每个 IP 100 个请求
  message: "请求过多，请稍后再试"
});
const port = process.env.PORT || 8181;
const corsOptions = {
  // origin: /^(http:\/\/localhost:\d+)$/,
  origin: 'https://beiyoyo.cn',
  optionsSuccessStatus: 200,
  credentials: true
};

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
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, filename);
  }
});
const upload = multer({ storage });

// 2. 设置静态文件访问
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(limiter);
app.use(express.json({ limit: '50mb' })); // 解析 JSON 请求体,请求体大小限制
app.use(express.urlencoded({ extended: true,  limit: '50mb' }))
app.use(cors(corsOptions))

app.use(cookieParser());

// 配置 Session
app.use(
  session({
    secret: generateSecretKey(), // 用于签名 Session ID 的密钥（建议使用环境变量）
    resave: false, // 是否每次请求都重新保存 Session（推荐 false）
    saveUninitialized: false, // 是否保存未初始化的 Session（推荐 false）
    cookie: {
      httpOnly: true, // 防止 XSS 攻击（JS 无法读取 Cookie）
      secure: false, // 是否仅 HTTPS 传输（生产环境建议 true）
      maxAge: 1000 * 60 * 30, // Session 有效期（30 分钟）
    },
  })
);



// 4. 上传接口并写入数据库
app.post('/upload-avatar', upload.single('avatar'), (req, res) => {
  const username = req.body.username || 'default_user';
  if (!req.file) {
    return res.status(400).json({ error: '没有上传文件' });
  }

  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

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
  console.log(resp, 'resp')
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(resp))
})

app.post('/api/register',async (req,res) => {
  const {email, password, verificationCode} = req.body
  const resp = await checkCode(verificationCode)
  if(resp.code !== 0) {
    res.end(JSON.stringify(resp))
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
      await db.query('INSERT INTO users (userID,userName, password, expiresIn) VALUES (?, ?,?,?)', [userID,email, password, expiresIn]);
      req.session.user = { email,userID, role: "admin" };
      res.writeHead(200, { "Content-Type": "application/json" });
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



app.listen(port, '0.0.0.0', () => {  
  console.log(`Proxy server is listening on url http://${getLocalIP()}:${port}`);  
})
