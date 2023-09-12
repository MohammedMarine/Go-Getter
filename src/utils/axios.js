import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://corentingoncalves-server.eddi.cloud:8080/',
});

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default axiosInstance;
