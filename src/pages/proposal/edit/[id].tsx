import ProposalForm from '@/features/proposal/components/ProposalForm';
import { useRouter } from 'next/router';
import withAuth from '@/features/shared/components/auth/withAuth';

const EditProposalPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      {id ? <ProposalForm mode="update" proposalId={Number(id)}/> : <div>Loading...</div>}
    </>
  );
};

export default withAuth(EditProposalPage);
