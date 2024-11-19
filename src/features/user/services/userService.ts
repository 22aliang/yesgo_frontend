import api from '@/features/shared/api/services/apiService';
import { handleResponse } from '@/features/shared/utils/responseHandler';
import { UserAndToken } from '../types/LoginUser';

export const userService = {
  async updateUser(formData: FormData): Promise<UserAndToken> {
    const response = await api.put('/user', formData);
    return handleResponse(response);
  },

  async fetchUserInfos() {
    const response = await api.get('/user');
    return handleResponse(response);
  },

  async findByUserName(username: string) {
    const response = await api.post('/friend/findUser', { username });
    return handleResponse(response);
  },
};
