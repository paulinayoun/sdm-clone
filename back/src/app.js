require('dotenv').config();
const authRoutes = require('./routes/auth');
const express = require('express');

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 라우터 등록 (모든 auth 관련 API는 /api/auth로 시작함)
// 순서가 중요 라우터 내부에서 req.body를 읽을 수 있도록 express.json() 미들웨어보다 뒤에 위치해야 함
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('SDM-Clone Backend Server is Running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
