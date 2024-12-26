// src/components/pages/oauth/OAuthRedirectHandler.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { toast } from 'react-toastify';

const OAuthRedirectHandler = () => {
  const navigate = useNavigate();
  const { handleKakaoLogin } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      handleKakaoLogin(code)
        .then(() => {
          toast.success('로그인에 성공했습니다!');
          navigate('/');
        })
        .catch((error) => {
          console.error('OAuth 에러:', error);
          toast.error('로그인에 실패했습니다.');
          navigate('/signin');
        });
    } else {
      toast.error('인증 코드가 없습니다.');
      navigate('/signin');
    }
  }, [handleKakaoLogin, navigate]);

  return (
    <div>
      <p>로그인 중입니다...</p>
    </div>
  );
};

export default OAuthRedirectHandler;