import React, { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../features/shared/components/layout/Layout';
import {
  fetchProposalDetail,
  fetchProposalComments,
  fetchProposalRatings,
  fetchParticipants,
  participateInProposal,
} from '@/features/proposal/slice/proposalSlice';
import 'react-toastify/dist/ReactToastify.css';
import ProposalContent from '@/features/proposal/components/ProposalContent';
import RatingComponent from '@/features/proposal/components/RatingComponent';
import CommentsSection from '@/features/proposal/components/CommentsSection';
import Sidebar from '@/features/proposal/components/Sidebar';
import { AppDispatch, RootState } from '@/api/store/store';

const ProposalDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
  const proposal = useSelector((state: any) => state.proposal.currentProposal);
  const participants = useSelector((state: any) => state.proposal.participants);
  const comments = useSelector((state: any) => state.proposal.comments);
  const ratings = useSelector((state: any) => state.proposal.ratings);
  const loading = useSelector((state: any) => state.proposal.loading);
  const error = useSelector((state: any) => state.proposal.error);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const refreshData = async () => {
    if (id) {
      await dispatch(fetchProposalDetail(Number(id)));
      await dispatch(fetchProposalComments(Number(id)));
      await dispatch(fetchProposalRatings(Number(id)));
      await dispatch(fetchParticipants(Number(id)));
    }
  };

  useEffect(() => {
    if (id) {
      refreshData();
    }
  }, [id, dispatch]);

  const handleParticipation = async () => {
    if (!proposal) return;
    try {
      await dispatch(participateInProposal(proposal.proposal_id)).unwrap();
      refreshData();
    } catch (error) {
      console.error('Error participating:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="container mx-auto p-10">
      <div className="grid grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="col-span-12 md:col-span-9 bg-white rounded-lg shadow-lg py-10 px-10">
          {/* Proposal Content */}
          <ProposalContent proposalId={Number(id)} proposal={proposal} />

          {/* Rating Component */}
          <RatingComponent
            proposalId={Number(id)}
            ratings={ratings}
            isLoggedIn={isLoggedIn}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            setProposal={refreshData}
          />

          {/* Comments Section */}
          <CommentsSection
            comments={comments}
            setComments={refreshData}
            proposalId={Number(id)}
            isLoggedIn={isLoggedIn}
            user={user}
          />
        </div>

        {/* Sidebar */}
        <Sidebar
          proposalId={Number(id)}
          proposal={proposal}
          participants={participants}
          remainingSlots={
            proposal ? proposal.people_required - participants.length : 0
          }
          handleParticipation={handleParticipation}
        />
      </div>
    </section>
  );
};

ProposalDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ProposalDetailPage;
