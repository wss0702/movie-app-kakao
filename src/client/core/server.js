// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();

// 미들웨어 설정
app.use(cors({
  origin: 'http://localhost:5173', // 프론트엔드 주소
  credentials: true,
}));
app.use(express.json());

// 라우트 설정
app.use('/api/auth', authRoutes);

// 기본 라우트
app.get('/', (req, res) => {
  res.send('백엔드 서버가 정상적으로 작동 중입니다.');
});

// 서버 시작
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});