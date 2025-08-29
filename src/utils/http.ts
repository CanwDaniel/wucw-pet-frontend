import axios from 'axios';
import type { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { getToken, isTokenExpired, clearAuth } from './auth';
import router from '@/router';

const instance = axios.create({
  baseURL: '/api',
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig): any => {
    const headers = config.headers || {};

    // 检查 token 是否存在且未过期
    const token = getToken();

    if (token && !isTokenExpired()) {
      headers['Authorization'] = `Bearer ${token}`;
    } else if (token && isTokenExpired()) {
      // token 过期，清除认证信息
      clearAuth();
      // 如果不是登录页面，则跳转到登录页
      if (router.currentRoute.value.path !== '/login') {
        router.push('/login');
      }
    }

    config.headers = headers;
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // 处理 401 未授权错误
    if (error.response?.status === 401) {
      clearAuth();
      // 如果不是登录页面，则跳转到登录页
      if (router.currentRoute.value.path !== '/login') {
        router.push('/login');
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
