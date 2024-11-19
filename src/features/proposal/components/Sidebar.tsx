import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import Router from 'next/router';
import MessageModal from '@/features/message/components/message.modal';
import { useDispatch } from 'react-redux';
import {
  submitSaved,
  fetchProposalDetail,
} from '@/features/proposal/slice/proposalSlice';
import { AppDispatch } from '@/api/store/store';

Modal.setAppElement('#__next');

const Sidebar = ({
  proposalId,
  proposal,
  participants,
  remainingSlots,
  handleParticipation,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showMessageModal, setShowMessageModal] = useState(false);

  const handleSaved = async () => {
    console.log('Proposal saved:', proposal.proposal_id);
    await dispatch(submitSaved(proposal.proposal_id)).unwrap();
    dispatch(fetchProposalDetail(proposal.proposal_id));
    toast.success('Proposal saved successfully!');
  };

  const handleEditProposal = (proposal_id: number) => {
    Router.push(`/proposal/edit/${proposal_id}`);
  };

  if (!proposal) {
    return <p>提案未找到。</p>;
  }

  return (
    <section className="col-span-12 md:col-span-3 bg-gray-100 rounded-lg p-6 md:sticky md:top-0 md:self-start">
      <div className="mt-5">
        {/* Proposal Dates */}
        <div className="text-gray-500 text-sm mb-4">
          <p>開始日期: {proposal.start_date}</p>
          <p>結束日期: {proposal.end_date}</p>
        </div>

        {/* Proposal Participation */}
        <div className="flex space-x-4 text-sm mb-4">
          <p className="text-gray-600">
            {proposal.people_required} 人需求 / {participants.length} 人參與
          </p>
        </div>

        <div className="mb-6">
          {participants.map((participant, index) => (
            <div key={participant.user_id} className="flex items-center mt-1">
              <p className="text-gradient-animated">
                {index + 1}.{' '}
                <span className="font-bold">{participant.username}</span>
              </p>
            </div>
          ))}
          {remainingSlots > 0 ? (
            proposal.participationStatus === 'joined' ? (
              <button className="btn-w100-disable mt-5" disabled>
                已參與
              </button>
            ) : proposal.participationStatus === 'pending' ? (
              <button className="btn-w100-disable mt-5" disabled>
                申請中
              </button>
            ) : (
              <button
                className="btn-w100 mt-5"
                onClick={handleParticipation}
                disabled={remainingSlots === 0}
              >
                參與
              </button>
            )
          ) : (
            <button className="btn-w100-disable" disabled>
              已滿
            </button>
          )}
        </div>
      </div>

      <hr className="border-1 my-10 border-gray-500" />
      <div className="mt-3 space-y-3">
        {proposal.can_edit ? (
          <button
            className="btn-w100"
            onClick={() => handleEditProposal(proposalId)}
          >
            修改提案
          </button>
        ) : (
          <button
            className="btn-w100"
            onClick={() => setShowMessageModal(true)}
          >
            私信
          </button>
        )}

        {proposal.isSaved ? (
          <button className="btn-w100-disable" disabled>
            已收藏
          </button>
        ) : (
          <button className="btn-w100" onClick={() => handleSaved()}>
            收藏
          </button>
        )}
      </div>
      <MessageModal
        isOpen={showMessageModal}
        receiver_id={proposal.user_id}
        onRequestClose={() => setShowMessageModal(false)}
      />
    </section>
  );
};

export default Sidebar;
