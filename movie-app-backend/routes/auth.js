// backend/routes/auth.js
const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const router = express.Router();

// JWT 생성 함수
const generateJWT = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// 카카오 OAuth 인증 엔드포인트
router.post('/kakao', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ message: '인가 코드가 필요합니다.' });
  }

  try {
    // 1. 인가 코드를 사용하여 카카오에서 액세스 토큰 요청
    const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', null, {
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_CLIENT_ID,
        redirect_uri: process.env.KAKAO_REDIRECT_URI,
        code,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token } = tokenResponse.data;

    // 2. 액세스 토큰을 사용하여 사용자 정보 요청
    const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const kakaoAccount = userResponse.data.kakao_account;
    const user = {
      id: userResponse.data.id,
      nickname: userResponse.data.properties.nickname,
      email: kakaoAccount.email,
    };

    // 3. JWT 생성
    const token = generateJWT(user);

    // 4. 클라이언트에 JWT 및 사용자 정보 전달
    res.json({ token, user });
  } catch (error) {
    console.error('카카오 인증 오류:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: '카카오 인증에 실패했습니다.' });
  }
});

module.exports = router;