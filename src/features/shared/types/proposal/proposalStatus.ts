export enum ProposalStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

export const ProposalStatusMap: Record<number, ProposalStatus> = {
  0: ProposalStatus.DRAFT,
  1: ProposalStatus.PUBLISHED,
};
