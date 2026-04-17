import { writable } from 'svelte/store';

// 1. 초기값 설정 (로컬스토리지에서 가져오거나 기본값)
const savedToken = localStorage.getItem('accessToken') || '';
const savedUser = JSON.parse(localStorage.getItem('user')) || null;

// 2. 스토어 생성
export const accessToken = writable(savedToken);
export const user = writable(savedUser);
export const isLogin = writable(!!savedToken);

// 3. 상태 업데이트 및 로컬스토리지 동기화 함수
export const setLoginInfo = (token, userData) => {
  accessToken.set(token);
  user.set(userData);
  isLogin.set(true);

  localStorage.setItem('accessToken', token);
  localStorage.setItem('user', JSON.stringify(userData));
};
