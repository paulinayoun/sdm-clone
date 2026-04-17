import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // .env에서 가져온 주소
  heaaders: {
    'Content-Type': 'application/json'
  }
});

// 2. 요청 인터셉터 (나중에 토큰 자동 주입을 위해 비워둠)
API.interceptors.request.use((config) => {
  return config;
});

export default API;
