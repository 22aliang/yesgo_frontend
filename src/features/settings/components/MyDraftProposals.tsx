import ProposalCard from '@/features/proposal/components/proposalCard/ProposalCard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDraftProposals } from '@/features/proposal/slice/proposalSlice';
import { AppDispatch, RootState } from '@/api/store/store';

const MyDraftProposals = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { draft, loading, error } = useSelector(
    (state: RootState) => state.proposal
  );
  const { user } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (user) {
      dispatch(fetchDraftProposals());
    }
  }, [user, dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Proposal Cards */}
      <div className="mt-6 space-y-4">
        {Array.isArray(draft) && draft.length > 0 ? (
          draft.map((data) => (
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

export default MyDraftProposals;
