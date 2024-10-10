import api from '../../shared/services/apiService';

export const authService = {
  async registerUser(username: string, email: string, password: string) {
    try {
      const response = await api.post('/auth/register', {
        username,
        email,
        password,
      });
      localStorage.setItem('token', response.data.data.token);
      return response.data.data;
    } catch (error) {
      console.log('auth service', error);
      throw error;
    }
  },

  async loginUser(email: string, password: string) {
    try {
      console.log('service str');
      const response = await api.post('/auth/login', { email, password });
      console.log('service fin', response);
      localStorage.setItem('token', response.data.data.token);
      return response.data.data;
    } catch (error) {
      console.log('auth service', error);
      throw error;
    }
  },

  async logoutUser() {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('token');
    } catch (error) {
      return new Error(String(error));
    }
  },

  async checkLoginStatus() {
    try {
      const response = await api.get('/auth/check-login');
      return response.data.data;
    } catch (error) {
      return new Error(String(error));
    }
  },

  async refreshToken() {
    try {
      const response = await api.post('/auth/refresh-token');
      const newToken = response.data.data.token;
      localStorage.setItem('token', newToken);
      return newToken;
    } catch (error) {
      return new Error(String(error));
    }
  },
};
