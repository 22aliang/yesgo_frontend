import axios, { AxiosError } from 'axios';
import { authService } from '@/features/user/services/authService';
import {
  ErrorResponseData,
  ExtendedAxiosRequestConfig,
} from '../types/error/ErrorResponse';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9090',
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ErrorResponseData>) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    originalRequest._retryCount = originalRequest._retryCount || 0;
    const retryLimit = 2;

    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest._retryCount < retryLimit &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      originalRequest._retryCount += 1;

      try {
        await authService.refreshToken();
        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    switch (error.response?.status) {
      case 400:
        return handleBadRequest(error);
      case 401:
      case 403:
        return Promise.reject(
          new Error('Forbidden: You do not have permission.')
        );
      case 404:
        return Promise.reject(
          new Error('Not Found: The resource could not be found.')
        );
      case 500:
        return Promise.reject(
          new Error('Internal Server Error. Please try again later.')
        );
      default:
        return Promise.reject(new Error('An unexpected error occurred.'));
    }
  }
);

function handleBadRequest(error: AxiosError<ErrorResponseData>) {
  const errorData = error.response?.data;
  if (errorData?.errors) {
    const newErrors = errorData.errors
      .map((err) => Object.values(err.constraints).join(', '))
      .join('\n');
    return Promise.reject(new Error(JSON.stringify(newErrors)));
  }

  return Promise.reject(
    new Error(errorData?.message || 'Bad Request. Please check your input.')
  );
}

export default api;
