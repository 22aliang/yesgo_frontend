import React from 'react';

const QuestionCard: React.FC = () => {
  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-md">
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <div className="text-center">
            <span className="block text-2xl font-bold">10</span>
            <span className="text-gray-500">回答</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl font-bold">5</span>
            <span className="text-gray-500">Like</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl font-bold">6</span>
            <span className="text-gray-500">收藏</span>
          </div>
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-bold">母胎單不敢約女生出門 怎麼辦？</h3>
          <span className="text-gray-400 text-sm">標籤：求救</span>
        </div>
        <div className="text-gray-500 text-sm">
          <span>發布時間</span>
          <span className="ml-2">由</span>
          <span className="ml-1">作者</span>
          <span className="ml-1">發問</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
