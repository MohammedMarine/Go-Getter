import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default axiosInstance;
