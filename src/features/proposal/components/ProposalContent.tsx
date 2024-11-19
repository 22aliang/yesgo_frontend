import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/api/store/store';
import { fetchProposalDetail } from '../slice/proposalSlice';

const ProposalContent = ({ proposalId, proposal }) => {
  const dispatch = useDispatch<AppDispatch>();

  if (!proposal) {
    return <p>提案未找到。</p>;
  }

  return (
    <>
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4 text-gray-500">
        {proposal.title}
      </h1>

      {/* Author and Rating Overview */}
      <div className="flex items-center justify-between mt-4">
        <h3 className="text-gray-400">
          <i className="fa-solid fa-pen mr-3"></i>
          Author:
          <span className="ml-2 text-gradient-animated font-semibold">
            {proposal.user_name}
          </span>
        </h3>
        <div className="text-sm text-gray-400">
          <span>Average Rating:</span>
          <span className="text-yellow-500 ml-2">
            {'★'.repeat(Math.round(Number(proposal.avg_rating)))}
          </span>
          <span className="text-sm ml-2">{proposal.avg_rating}</span>
        </div>
      </div>

      <hr className="border-1 my-10 border-gray-500" />

      {/* Content */}
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: proposal.content }}
      ></div>

      <hr className="border-1 my-10 border-gray-500" />

      {/* Tags */}
      <div className="flex flex-col space-y-4">
        <div className="flex flex-wrap gap-2 mb-2">
          {proposal.tags.map((tag) => (
            <span key={tag.tag_id} className="tag max-w-full">
              {tag.tag_name}
            </span>
          ))}
        </div>
      </div>
      <hr className="my-5" />
    </>
  );
};

export default ProposalContent;
