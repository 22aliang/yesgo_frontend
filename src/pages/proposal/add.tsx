import ProposalForm from '@/features/proposal/components/ProposalForm';
import withAuth from '@/features/shared/components/auth/withAuth';

const CreateProposalPage = () => {
  return <ProposalForm mode="create" />;
};

export default withAuth(CreateProposalPage);
