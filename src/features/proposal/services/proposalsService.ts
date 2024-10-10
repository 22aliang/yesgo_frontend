// import api from './api';
// import { Proposal } from '../types/proposal';

// export const fetchProposals = async (): Promise<Proposal[]> => {
//   const response = await api.get('/proposals');
//   return response.data;
// };

export const fetchProposals = async () => {
  const response = await fetch('/mock/proposals.json');
  const data = await response.json();
  return data;
};
