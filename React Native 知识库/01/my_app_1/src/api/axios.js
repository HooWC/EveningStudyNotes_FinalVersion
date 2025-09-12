import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "http://10.246.186.226:5567/api",
});

// 自动附加 token
api.interceptors.request.use((config) => {
  const token = global.authToken; // 临时存储在内存中
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;