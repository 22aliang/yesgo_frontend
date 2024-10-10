import React from 'react';
import { useState } from 'react';
import { ReactElement } from 'react';
import Layout from '../../features/shared/components/layout/Layout';
import Image from 'next/image';

const ProposalDetailPage = () => {
  // 用於存儲用戶輸入的留言
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<string[]>([]);

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      setComments([...comments, comment]);
      setComment('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* 提案標題和評分 */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            【台中這樣玩】給大學生的三天兩夜第一次約會行程
          </h1>
          <div className="flex items-center mb-4">
            <span className="text-yellow-500">★★★★☆</span>
            <span className="ml-2 text-gray-500">4.4</span>
            <span className="ml-4 text-gray-500">87人評分</span>
          </div>
          <div className="flex space-x-2">
            <span className="bg-gray-200 px-2 py-1 rounded">地區</span>
            <span className="bg-gray-200 px-2 py-1 rounded">天數</span>
            <span className="bg-gray-200 px-2 py-1 rounded">主題</span>
          </div>
          <span className="text-gray-400 text-sm">2022年11月1日</span>
        </div>

        {/* 作者資訊卡片 */}
        <div className="bg-white shadow-lg p-4 rounded-lg w-64">
          <div className="flex items-center space-x-4">
            <Image
              src="https://via.placeholder.com/50"
              alt="author"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold">作者名稱</h3>
              <p className="text-gray-500">自我介紹...</p>
            </div>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded w-full">
            私信
          </button>
          <button className="bg-gray-800 text-white px-4 py-2 mt-2 rounded w-full">
            收藏提案
          </button>
          <button className="bg-gray-400 text-white px-4 py-2 mt-2 rounded w-full">
            發表評論
          </button>
        </div>
      </div>

      {/* 行程詳情 */}
      <div className="mt-6">
        <h2 className="text-xl font-bold">第一天</h2>
        <div className="border-l-4 border-gray-300 pl-4 mt-4 space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <Image
              src="https://via.placeholder.com/300"
              alt="image1"
              className="w-full h-48 object-cover mb-4"
            />
            <p>
              行程描述...這裡是關於行程的詳細介紹。內容較多，可分為多段進行顯示。
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <Image
              src="https://via.placeholder.com/300"
              alt="image2"
              className="w-full h-48 object-cover mb-4"
            />
            <p>
              行程描述...這裡是關於行程的詳細介紹。內容較多，可分為多段進行顯示。
            </p>
          </div>
        </div>
      </div>

      {/* 相似的提案推薦 */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">類似的推薦提案</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((proposal) => (
            <div key={proposal} className="bg-white shadow-md p-4 rounded-lg">
              <Image
                src="https://via.placeholder.com/150"
                alt="proposal"
                className="w-full h-32 object-cover mb-2"
              />
              <div className="flex space-x-2 mb-2">
                <span className="bg-gray-200 px-2 py-1 rounded">地區</span>
                <span className="bg-gray-200 px-2 py-1 rounded">天數</span>
                <span className="bg-gray-200 px-2 py-1 rounded">主題</span>
              </div>
              <button className="bg-gray-800 text-white px-4 py-2 rounded w-full">
                查看詳情
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 留言區 */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">留言區</h3>
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-100 p-4 mb-4 rounded-lg">
            <p>{comment}</p>
          </div>
        ))}
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="輸入您的留言..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow"
          >
            發表留言
          </button>
        </div>
      </div>
    </div>
  );
};

ProposalDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ProposalDetailPage;
