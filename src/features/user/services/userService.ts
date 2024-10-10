import api from '../../shared/services/apiService';
export const userService = {
  async updateUser(userId: number, username: string, newPassword: string) {
    try {
      const response = await api.put('/user/update', {
        userId: userId,
        userName: username,
        newPassword: newPassword,
      });
      const token = response.data.data.token;
      localStorage.setItem('token', token);
      return response.data.data;
    } catch (error) {
      return new Error(String(error));
    }
  },
};
