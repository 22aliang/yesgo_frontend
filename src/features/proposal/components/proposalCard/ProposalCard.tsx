import React from 'react';

const ProposalCard: React.FC = () => {
  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-md flex space-x-4 bg-white">
      <div className="w-1/4 bg-gray-200 h-35 rounded-lg flex items-center justify-center">
        {/* Image Placeholder */}
        <span>圖片</span>
      </div>
      <div className="w-3/4">
        <div className="flex justify-between">
          <h3 className="text-lg font-bold">
            【台中這樣玩】給大學生的三天兩夜第一次約會行程
          </h3>
          <span className="text-gray-500">發布時間</span>
        </div>
        <div className="flex items-center space-x-2 text-yellow-500">
          {/* 星星評價 */}
          <span>★ ★ ★ ★ ★</span>
          <span className="text-gray-500">4.4 / 87 評分</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          台中怎麼玩呢？這是很多人最常問我的問題，甚至想規劃三日遊卻沒有頭緒...
        </p>
        <div className="flex justify-between mt-4">
          <div className="flex space-x-2">
            <span className="border-2 border-pointColor-100 px-2 py-1 rounded-xl mt-2 text-pointColor-100">
              地區
            </span>
            <span className="border-2 border-pointColor-100 px-2 py-1 rounded-xl mt-2 text-pointColor-100">
              天數
            </span>
            <span className="border-2 border-pointColor-100 px-2 py-1 rounded-xl mt-2 text-pointColor-100">
              主題
            </span>
          </div>
          <div className="flex space-x-2">
            <button className="btn">進入</button>
            <button className="btn">收藏</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalCard;
