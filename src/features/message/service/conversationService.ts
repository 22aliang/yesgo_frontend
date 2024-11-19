import { handleResponse } from '@/features/shared/utils/responseHandler';
import api from '../../shared/api/services/apiService';

export const ConversationService = {
  async fetchId(user_1_id: number, user_2_id: number) {
    const response = await api.post(`/conversation/id`, {
      user_1_id,
      user_2_id,
    });
    console.log(response.data.data);
    return handleResponse(response);
  },
};
