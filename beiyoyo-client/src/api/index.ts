import { message } from 'antd';
import axios from 'axios'

 const service = axios.create({
  baseURL: '/proxy-api',
  timeout: 120000
 })

// 请求拦截器
 service.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // 设置 token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 可以统一处理响应结构
    if (response.data.code !== 0) {
      // 错误提示
      return Promise.reject(response.data);
    }
    return response.data;
  },
  (error) => {
    // 错误处理
    const status = error.response?.status;
    console.log(error, 'error')
    if (status === 401) {
      // 未登录/登录失效
      window.location.href = '/login';
      console.warn('登录已过期，请重新登录');
      message.warning('登录已过期，请重新登录')
      // 清除本地 token，跳转登录页等
    } else if (status >= 500) {
      console.error('服务器错误');
    }
    return Promise.reject(error);
  }
);

export default service;