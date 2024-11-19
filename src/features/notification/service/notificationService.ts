import { handleResponse } from '@/features/shared/utils/responseHandler';
import api from '../../shared/api/services/apiService';

export const notificationService = {
  async fetchNotification() {
    const response = await api.get(`/notification/owner`);
    return handleResponse(response);
  },

  async handlerSetAllRead() {
    const response = await api.post(`/notification/allRead`);
    return handleResponse(response);
  },
};
