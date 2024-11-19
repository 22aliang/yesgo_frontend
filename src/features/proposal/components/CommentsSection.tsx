import React, { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { proposalService } from '@/features/proposal/services/proposalsService';
import Router from 'next/router';

const CommentsSection = ({
  comments,
  setComments,
  proposalId,
  isLoggedIn,
  user,
}) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComment = async (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await proposalService.submitComment(proposalId, newComment);
      toast.success('Comment submitted successfully!');
      setComments();
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error('Failed to submit comment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-semibold mb-6 text-gray-400">留言</h3>
      <div className="space-y-4">
        {comments.map((comment, idx) => (
          <div key={idx} className="flex space-x-4 items-start my-10">
            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="font-semibold text-gradient-animated">
                  {comment.username}
                </h4>
              </div>
              <p className="text-gray-600">{comment.comment_text}</p>
            </div>
          </div>
        ))}
      </div>
      {isLoggedIn ? (
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2 ml-2">{user?.username}</h4>
          <form onSubmit={handleComment}>
            <textarea
              className="w-full border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="輸入您的留言..."
              rows={1}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="btn mt-5 ml-2"
              disabled={isSubmitting}
            >
              發表留言
            </button>
          </form>
        </div>
      ) : (
        <div className="relative mt-6">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex flex-col justify-center items-center text-center">
            <p className="font-bold text-xl">請先登入後再留言</p>
            <button
              className="btn mt-2"
              onClick={() => Router.push('/user/login')}
            >
              登入
            </button>
          </div>
          <textarea
            className="w-full border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 opacity-50"
            placeholder="輸入您的留言..."
            rows={1}
            disabled
          ></textarea>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
