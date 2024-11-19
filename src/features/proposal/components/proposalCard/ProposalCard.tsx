import React from 'react';
import { useRouter } from 'next/router';
import { Proposal } from '../../types/Proposal';

interface ProposalCardProps {
  proposal_id: number;
  mode?: 'myProposal' | 'proposal' | 'favoriteProposal';
  proposal: Proposal;
}

const ProposalCard: React.FC<ProposalCardProps> = ({
  proposal_id,
  mode = 'proposal',
  proposal,
}) => {
  const router = useRouter();

  if (!proposal) {
    return null;
  }

  const handleEnterProposal = () => {
    router.push(`/proposal/${proposal_id}`);
  };

  const handleEditProposal = () => {
    router.push(`/proposal/edit/${proposal_id}`);
  };

  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-md flex space-x-4 bg-white">
      <div className="w-1/4 bg-gray-200 h-35 rounded-lg flex items-center justify-center"></div>
      <div className="w-3/4">
        <div className="flex justify-between">
          <h3 className="text-lg font-bold">{proposal.title}</h3>
          <span className="text-gray-500">
            {new Date(proposal.start_date).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-yellow-500">
          <span>{'★'.repeat(Math.round(Number(proposal.avg_rating)))}</span>
          <span className="text-gray-500">
            {proposal.avg_rating} / {proposal.people_required} 人需求
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-2">{proposal.content}</p>
        <div className="flex justify-between mt-4">
          <div className="flex space-x-2">
            {proposal.tags && proposal.tags.length > 0 ? (
              proposal.tags.map((tag) => (
                <span key={tag.tag_id} className="tag">
                  {tag.tag_name}
                </span>
              ))
            ) : (
              <span className="text-gray-400">無標籤</span>
            )}
          </div>
          <div className="flex space-x-2">
            {mode === 'myProposal' ? (
              <>
                <button className="btn" onClick={handleEnterProposal}>
                  進入
                </button>
                <button className="btn" onClick={handleEditProposal}>
                  修改
                </button>
              </>
            ) : mode === 'favoriteProposal' ? (
              <>
                <button className="btn" onClick={handleEnterProposal}>
                  進入
                </button>
              </>
            ) : (
              <>
                <button className="btn" onClick={handleEnterProposal}>
                  進入
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalCard;
