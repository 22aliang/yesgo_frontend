import {
  handlePaginatedResponse,
  handleResponse,
} from '@/features/shared/utils/responseHandler';
import api from '../../shared/api/services/apiService';

export const messageService = {
  async fetchMessage(
    receiver_id: number,
    conversation_id: number | null,
    page = 1,
    limit = 10
  ) {
    const response = await api.post(
      `/message/chat?page=${page}&limit=${limit}`,
      { receiver_id, conversation_id }
    );
    console.log(response.data.data);
    return handlePaginatedResponse(response);
  },

  async sendMessage(
    receiver_id: number,
    message_text: string,
    conversation_id: number | null
  ) {
    const response = await api.post(`/message/send`, {
      receiver_id,
      message_text,
      conversation_id,
    });
    return handleResponse(response);
  },

  async directSendMessage(receiver_id: number, message_text: string) {
    const response = await api.post(`/message/direct/send`, {
      receiver_id,
      message_text,
    });
    return handleResponse(response);
  },
};
