import api from '@/features/shared/api/services/apiService';
import { handleResponse } from '@/features/shared/utils/responseHandler';
import { UserData } from '../types/UserData';
import { UserAndToken } from '../types/LoginUser';
import { userService } from './userService';

export const authService = {
  async registerUser(username: string, email: string, password: string) {
    const response = await api.post('/auth/register', {
      username,
      email,
      password,
    });
    localStorage.setItem('token', response.data.data.token);
    return handleResponse(response);
  },

  async loginUser(email: string, password: string): Promise<UserAndToken> {
    const response = await api.post('/auth/login', { email, password });
    return handleResponse(response);
  },

  async logoutUser() {
    await api.post('/auth/logout');
  },

  async checkLoginStatus() {
    let token = localStorage.getItem('token');
    if (!token) {
      const response = await api.post('/auth/refresh-token');
      token = response.data.token;
      localStorage.setItem('token', token);
    }

    const userInfo = await userService.fetchUserInfos();
    return userInfo;
  },

  async refreshToken() {
    const response = await api.post('/auth/refresh-token');
    const newToken = response.data.data.token;
    localStorage.setItem('token', newToken);
    return newToken;
  },
};
