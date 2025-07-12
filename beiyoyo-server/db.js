// db.js
const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: '1.15.13.223',      // 或远程 IP
  user: 'admin',           // 数据库用户名
  password: '970301.aibei',
  database: 'Aibei',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise(); // 使用 promise 支持 async/await
