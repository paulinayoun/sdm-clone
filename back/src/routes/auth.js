const express = require('express');
//특정 경로(예: /api/auth)로 시작하는 모든 요청을 하나의 파일에서 깔끔하게 관리하기 위해 Express 라우터를 사용
const router = express.Router();
const db = require('../models/db'); // DB 연결 설정을 가져옴
const jwt = require('jsonwebtoken'); // JWT 라이브러리 추가
const crypto = require('crypto'); // Node.js 내장 암호화 모듈 추가

//임시 테스트
router.post('/login', async (req, res) => {
  const { id, pw } = req.body;

  try {
    // 1. DB에서 해당 아이디를 가진 사용자 조회
    const [rows] = await db.query('SELECT * FROM tbUser WHERE userID = ?', [id]);

    // 2. 사용자가 존재하지 않거나 비밀번호가 틀린 경우 (보안상 메시지는 모호하게!)
    if (rows.length === 0) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: 'Invalid credentials 아이디 또는 비밀번호가 올바르지 않습니다.'
      });
    }

    const user = rows[0]; // DB에서 조회된 사용자 정보

    // 2. SHA-256을 이용한 비밀번호 비교
    // 입력받은 pw를 SHA-256으로 해싱하여 16진수(hex) 문자열로 변환합니다.
    const hash = crypto.createHash('sha256').update(pw).digest('hex');
    if (hash !== user.userPWD) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: 'Invalid credentials 아이디 또는 비밀번호가 올바르지 않습니다.'
      });
    }

    // 3. 인증 성공 시 JWT 토큰 생성 (유효기간 1시간)
    const token = jwt.sign(
      {
        userID: user.userID,
        role: user.userRoll
      },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '1h' }
    );

    res.json({
      success: true,
      accessToken: token,
      message: 'Login successful!',
      user: {
        id: user.userID,
        role: user.userRoll,
        name: user.userName
      }
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
  }
});

module.exports = router;
