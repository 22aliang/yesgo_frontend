import ProposalCard from '@/features/proposal/components/proposalCard/ProposalCard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOwnerProposals } from '@/features/proposal/slice/proposalSlice';
import { AppDispatch, RootState } from '@/api/store/store';

const MyProposals = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { owner, loading, error } = useSelector((state: RootState) => state.proposal);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchOwnerProposals());
      console.log(owner);
    }
  }, [user, dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Proposal Cards */}
      <div className="mt-6 space-y-4">
        {Array.isArray(owner) && owner.length > 0 ? (
          owner.map((data) => (
            <ProposalCard
              key={data.proposal_id}
              proposal_id={data.proposal_id}
              proposal={data}
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

export default MyProposals;