import React from 'react';

const Participants = ({
  participants,
  remainingSlots,
  handleParticipation,
}) => {
  return (
    <div>
      <div className="text-gray-500 text-sm">
        <span>開始日期: {participants.start_date}</span>
        <span className="ml-5">結束日期: {participants.end_date}</span>
      </div>
      <div className="flex space-x-4 text-sm mt-2">
        <p className="text-gray-600">
          {participants.length} 人參與 / {remainingSlots} 個剩餘名額
        </p>
      </div>

      <div>
        {participants.map((participant, index) => (
          <div key={participant.user_id} className="flex items-center mt-1">
            <p className="text-gradient-animated">
              {index + 1}.{' '}
              <span className="font-bold">{participant.username}</span>
            </p>
          </div>
        ))}
        {remainingSlots > 0 ? (
          <button
            className="btn-w100 mt-5"
            onClick={handleParticipation}
            disabled={remainingSlots === 0}
          >
            參與
          </button>
        ) : (
          <p>已滿</p>
        )}
      </div>
    </div>
  );
};

export default Participants;
