import api from '@/features/shared/api/services/apiService';
import { handleResponse } from '@/features/shared/utils/responseHandler';

export const popularService = {
  async getPopularData(limit: number = 10) {
    const response = await api.get(`/proposal/popular?limit=${limit}`);
    return handleResponse(response);
  },
};
