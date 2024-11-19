import ProposalCard from '@/features/proposal/components/proposalCard/ProposalCard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOwnerProposals } from '@/features/proposal/slice/proposalSlice';
import { AppDispatch, RootState } from '@/api/store/store';

const ProposalPendingPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { proposals, loading, error } = useSelector(
    (state: RootState) => state.proposal
  );
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchOwnerProposals());
    }
  }, [user, dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="mt-6 space-y-4">
        {Array.isArray(proposals) && proposals.length > 0 ? (
          proposals.map((proposal) => (
            <ProposalCard
              key={proposal.proposal_id}
              proposal_id={proposal.proposal_id}
              porposal={proposals}
              mode="myProposal"
            />
          ))
        ) : (
          <p>沒有找到相關的提案。</p>
        )}
      </div>
    </div>
  );
};

export default ProposalPendingPage;
