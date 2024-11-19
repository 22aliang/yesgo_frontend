import api from '@/features/shared/api/services/apiService';
import { handleResponse } from '../shared/utils/responseHandler';

export const locationService = {
  async fetchOverview() {
    const response = await api.get('/location');
    console.log('location', response.data.data);
    return handleResponse(response);
  },

  async submitLocation(name: string) {
    const response = await api.post('/location', { name: name });
    console.log('location', response.data.data);
    return handleResponse(response);
  },
};
