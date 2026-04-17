import API from './apiSvr';

class AuthService {
  // 로그인 요청
  async login(userId, userPw) {
    try {
      const response = await API.post('/api/auth/login', {
        id: userId,
        pw: userPw
      });
      return response.data; // { success, accessToken, user }
    } catch (err) {
      throw err.response?.data || { message: '로그인 중 오류가 발생했습니다.' };
    }
  }
}

export default new AuthService();
