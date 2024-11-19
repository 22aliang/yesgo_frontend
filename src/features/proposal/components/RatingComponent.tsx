import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { submitRating } from '@/features/proposal/slice/ratingSlice';
import { AppDispatch } from '@/api/store/store';
import Router from 'next/router';

const RatingComponent = ({
  proposalId,
  ratings,
  isLoggedIn,
  selectedRating,
  setSelectedRating,
  setProposal,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitRating = async () => {
    if (!selectedRating || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const resultAction = await dispatch(
        submitRating({ proposalId, rating: selectedRating })
      ).unwrap();
      setProposal((prevProposal) => ({
        ...prevProposal,
        avg_rating: resultAction.avg_rating,
      }));
      toast.success('Rating submitted successfully!');
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast.error('Failed to submit rating.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="space-y-2">
        {ratings.map((rating, idx) => (
          <div key={idx} className="flex space-x-4 items-start my-2">
            <div className="flex-1">
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <span className="font-semibold text-gradient-animated">
                    {rating.username}
                  </span>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-2xl ${rating.rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{rating.comment}</p>
            </div>
          </div>
        ))}
      </div>
      {isLoggedIn ? (
        <div className="mt-6">
          <hr />
          <div className="flex items-center space-x-2 mt-5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`text-4xl ${selectedRating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                onClick={() => setSelectedRating(star)}
              >
                ★
              </button>
            ))}
            <button
              className="btn ml-4"
              onClick={handleSubmitRating}
              disabled={isSubmitting || !selectedRating}
            >
              提交評分
            </button>
          </div>
        </div>
      ) : (
        <div className="relative mt-6">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex flex-col justify-center items-center text-center">
            <p className="font-bold text-xl">請先登入以提交評分</p>
            <button
              className="btn mt-2"
              onClick={() => Router.push('/user/login')}
            >
              登入
            </button>
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="cursor-not-allowed text-4xl">
                ★
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingComponent;
