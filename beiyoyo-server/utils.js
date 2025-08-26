require('dotenv').config()
const nodemailer = require("nodemailer")
const Redis = require("ioredis");
const crypto = require("crypto");
const db = require('./db.js')
const bcrypt = require('bcrypt');
const COS =require('cos-nodejs-sdk-v5');

// 使用 process.env
const SecretID = process.env.SECRET_ID;
const SecretKey = process.env.SECRET_KEY;

// 必须性检查
if (!process.env.SECRET_KEY) {
  throw new Error('缺少必要的环境变量: SECRET_KEY');
}

const cos = new COS({
  SecretId: SecretID,
  SecretKey: SecretKey,
});

const redis = new Redis({
  host: '1.15.13.223', // Redis 服务器地址
  port: 6379,        // 默认端口
  password: '970301.aibei', // 如果需要密码
  db: 0,             // 数据库索引（0-15）
}); // 默认连接本地

const sendEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "QQ", // 或 '163', 'Gmail'，也可以用 host + port 配置
    auth: {
      user: "603322483@qq.com",       // 你的发件人邮箱
      pass: "wqcttilyjvkmbbdd",         // 注意：不是密码，是邮箱授权码
    },
  });
  const verification_code = generateNumericCode()
   const mailOptions = {
    from: "603322483@qq.com",        // 发件人
    to: email, // 收件人
    subject: "验证码",
    text: `您的验证码是 ${verification_code},有效期 3 分钟`,
  };
  const resp = {
    code: 0,
    msg: '发送成功'
  }
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      resp.code=10001
      resp.msg='发送失败，请检查邮箱是否正确'
      return console.log("发送失败", err);
    }
    console.log("发送成功", info.response);
  });
  await saveCode(email, verification_code)
  return resp
}

async function saveCode(email, code) {
  await redis.setex(`verify:${email}`, 300, code); // 5 分钟过期
}

async function checkCode(email, inputCode) {
  const realCode = await redis.get(`verify:${email}`);
  if (realCode === null) {
    return { code: 10003, msg: '验证已过期请重新获取' }; // 过期或不存在
  }

  if (realCode !== inputCode) {
    return { code: 10004, msg: '验证输入错误请检查后重新输入' }; // 不匹配
  }

  return { code: 0, msg: '注册成功'  };
}

function generateNumericCode(length = 6) {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
}

function generateSecretKey() {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey
}

async function checkUserExists(userName) {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE username = ?',
    [userName]
  );
  return rows.length > 0;
}

async function hashPassword(plainPassword) {
  const saltRounds = 10; // 加密强度（一般用10就够了）
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
}

async function checkLoginUser(username, inputPassword) {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );

  if (rows.length === 0) return null; // 用户不存在

  const user = rows[0];
  const match = await bcrypt.compare(inputPassword, user.password);

  return match ? user : null; // 密码正确返回用户，否则返回 null
}

async function getUserInfo(userID) {
  const [rows] = await db.query(
    'SELECT userID,userName,createAt,avatar,nickName,updateAt,backgroundImage  FROM users WHERE userID = ?',
    [userID]
  );

  if (rows.length === 0) return null; // 用户不存在

  const user = rows[0];

  return user 
}



module.exports = {
  sendEmail,
  checkCode,
  generateSecretKey,
  checkUserExists,
  hashPassword,
  checkLoginUser,
  getUserInfo,
  cos
}

