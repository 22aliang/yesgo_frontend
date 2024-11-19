import { ParticipationStatus } from '@/features/shared/types/proposal/participationStatus';
import api from '../../shared/api/services/apiService';
import { handleResponse } from '@/features/shared/utils/responseHandler';

export const proposalService = {
  async fetchProposals(params: {
    page: string;
    tags: string;
    keyword: string;
  }) {
    const queryParams = new URLSearchParams(params).toString();
    const response = await api.get(`/proposal?${queryParams}`);
    return handleResponse(response);
  },

  async fetchOwnerProposals(params: {
    page: string;
    tags: string;
    rating: string;
    keyword: string;
    type: string;
  }) {
    const queryParams = new URLSearchParams(params).toString();
    const response = await api.get(`/proposal/owner?${queryParams}`);
    return handleResponse(response);
  },

  async fetchSavedProposals(params: {
    page: string;
    sort: string;
    tags: string;
    time: string;
    rating: string;
    keyword: string;
    type: string;
  }) {
    const queryParams = new URLSearchParams(params).toString();
    const response = await api.get(`/proposal/saved/owner?${queryParams}`);
    return handleResponse(response);
  },

  async fetchProposalDetail(proposal_id: number) {
    try {
      const response = await api.get(`/proposal/detail/${proposal_id}`);
      return handleResponse(response);
    } catch (error) {
      throw new Error('Failed to fetch proposal details');
    }
  },

  async fetchProposalComments(proposal_id: number) {
    const response = await api.get(`/proposal/comment/${proposal_id}`);
    return handleResponse(response);
  },

  async fetchProposalRatings(proposal_id: number) {
    const response = await api.get(`/proposal/rating/${proposal_id}`);
    return handleResponse(response);
  },

  async participateInProposal(proposal_id: number) {
    const response = await api.post('/participation/apply', {
      proposal_id,
    });
    return handleResponse(response);
  },

  async fetchParticipants(proposal_id: number) {
    const response = await api.post('/participation/getList', {
      proposal_id,
      status: ParticipationStatus.JOINED.toString(),
    });
    return handleResponse(response);
  },

  async updateAvailableSlots(proposal_id: number, remaining_slots: number) {
    const response = await api.put('/proposal/update', {
      proposal_id,
      people_required: remaining_slots,
    });
    return handleResponse(response);
  },

  async submitComment(proposal_id: number, comment_text: string) {
    const response = await api.post('/proposal/comment', {
      proposal_id,
      comment_text,
    });
    return handleResponse(response);
  },

  async submitRating(proposal_id: number, rating: number) {
    const response = await api.post('/proposal/rating', {
      proposal_id,
      rating,
    });
    return handleResponse(response);
  },

  async submitSaved(proposal_id: number) {
    const response = await api.post('/proposal/saved', {
      proposal_id,
    });
    return handleResponse(response);
  },

  async submitProposal(formData: FormData) {
    const response = await api.post('/proposal', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return handleResponse(response);
  },

  async updateProposal(proposal_id: number, formData: FormData) {
    formData.append('proposal_id', proposal_id.toString());
    const response = await api.put('/proposal', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return handleResponse(response);
  },
};
