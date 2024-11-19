import { handleResponse } from '@/features/shared/utils/responseHandler';
import api from '../../shared/api/services/apiService';

export const friendService = {
  async fetchOverview() {
    const response = await api.get(`/friend/owner`);
    return handleResponse(response);
  },

  async fetchFriendOverview() {
    const response = await api.get(`/friend/friend`);
    return handleResponse(response);
  },

  async fetchBlockOverview() {
    const response = await api.get(`/friend/block`);
    return handleResponse(response);
  },

  async fetchStagerOverview() {
    const response = await api.get(`/friend/stager`);
    return handleResponse(response);
  },

  async fetchPendingFriends() {
    const response = await api.get(`/friend/status`);
    return handleResponse(response);
  },
  async submitBlock(friend_id: number) {
    const response = await api.post(`/friend/block`, { friend_id });
    return handleResponse(response);
  },

  async submitUnblock(id: number) {
    const response = await api.post(`/friend/unblock`, { id });
    return handleResponse(response);
  },

  async submitAccept(
    request_id: number,
    conversation_id: number | null,
    id: number
  ) {
    const response = await api.post(`/friend/accept`, {
      request_id,
      conversation_id,
      id,
    });
    return handleResponse(response);
  },

  async submitReject(id: number) {
    const response = await api.post(`/friend/reject`, { id });
    return handleResponse(response);
  },

  async submitApply(friend_id: number) {
    const response = await api.post(`/friend/apply`, { friend_id });
    return handleResponse(response);
  },

  async fetchFindUser(username: string) {
    const response = await api.post(`/friend/findUser`, { username });
    return handleResponse(response);
  },
};
