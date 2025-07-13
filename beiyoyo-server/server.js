const express = require('express') 
const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 分钟
  max: 100, // 限制每个 IP 100 个请求
  message: "请求过多，请稍后再试"
});

const corsOptions = {
  // origin: /^(http:\/\/localhost:\d+)$/,
  origin: 'https://www.beiyoyo.cn',
  optionsSuccessStatus: 200,
  credentials: true
};

app.use(limiter);
app.use(express.json({ limit: '50mb' })); // 解析 JSON 请求体,请求体大小限制
app.use(express.urlencoded({ extended: true,  limit: '50mb' }))
app.use(cors(corsOptions))
