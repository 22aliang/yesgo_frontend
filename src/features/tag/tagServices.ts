import api from '@/features/shared/api/services/apiService';
import { handleResponse } from '../shared/utils/responseHandler';
import { Tag } from './types/Tag';

export const tagService = {
  async fetchOverview(): Promise<Tag[]> {
    const response = await api.get('/tag');
    return handleResponse(response);
  },

  async submitTag(name: string) {
    const response = await api.post('/tag', { name: name });
    return handleResponse(response);
  },
};
