import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { useToast } from "./useToast";
import axios from 'axios';

const loginAtom = atom(false);
const userAtom = atom(null);

const isRemember = () => {
  return localStorage.getItem('isRemember') === 'true';
}

export const isAuth = () => {
  return isRemember() ? !!localStorage.getItem('user') : !!sessionStorage.getItem('user');
}

export const useAuth = () => {
  const [isLogin, setIsLogin] = useAtom(loginAtom);
  const [user, setUser] = useAtom(userAtom);
  const toast = useToast();

  useEffect(() => {
    if (isRemember()) {
      setIsLogin(true);
      setUser(localStorage.getItem('user'));
    } else {
      setIsLogin(false);
      setUser(sessionStorage.getItem('user'));
    }
  }, []);

  const register = (user, password, confirmPassword, name) => {
    if (password !== confirmPassword) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    } else if (localStorage.getItem(`user: ${user} password:`)) {
      throw new Error('이미 존재하는 사용자입니다.');
    }

    localStorage.setItem(`user: ${user} password:`, password);
    localStorage.setItem(`user: ${user} name:`, name);
  }

  const login = (user, password, isRemember) => {
    const storedPassword = localStorage.getItem(`user: ${user} password:`);
    if (!storedPassword) {
      throw new Error('사용자를 찾을 수 없습니다.');
    } else if (storedPassword !== password) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    if (isRemember) {
      localStorage.setItem('isRemember', 'true');
      localStorage.setItem('user', user);
    } else {
      localStorage.setItem('isRemember', 'false');
      sessionStorage.setItem('user', user);
    }
    setIsLogin(true);
    setUser(user);
  }

  const kakaoLogin = (kakaoUser) => {
    const { nickname, id } = kakaoUser;
    localStorage.setItem('isRemember', 'true');
    localStorage.setItem('user', nickname);
    setIsLogin(true);
    setUser(nickname);
    toast.success(`${nickname}님 환영합니다!`);
  }

  const handleKakaoLogin = async (code) => {
    try {
      const response = await axios.post('/api/auth/kakao', { code }, {
        baseURL: 'http://localhost:5000', // 백엔드 서버 주소
      });

      const { token, user } = response.data;

      if (response.status === 200) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', user.nickname);
        setIsLogin(true);
        setUser(user.nickname);
      } else {
        throw new Error('인증 실패');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('isRemember');
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    setIsLogin(false);
    setUser(null);
    window.location.reload();
  }

  return {
    isLogin,
    user,
    register,
    login,
    kakaoLogin,
    handleKakaoLogin,
    logout
  }
}