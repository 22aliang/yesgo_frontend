import React from 'react';
import { ReactElement } from 'react';
import Layout from '../../features/shared/components/layout/Layout';
import QuestionCard from '../../features/fqa/components/questionCard/questionCard';

const QuestionPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <nav className="flex justify-between items-center p-4 shadow-md">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="border border-gray-300 px-4 py-2 rounded"
            placeholder="關鍵字搜尋"
          />
          <button className="px-4 py-2 btn">搜尋</button>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 btn">發文</button>
        </div>
      </nav>

      <div className="mt-6">
        <ul className="flex justify-between border-b border-gray-300 text-sm">
          <li className="px-4 py-2">熱門</li>
          <li className="px-4 py-2">最新</li>
          <li className="px-4 py-2">未解決</li>
          <li className="px-4 py-2">已解決</li>
        </ul>
      </div>

      <div className="mt-6 space-y-4">
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
      </div>
    </div>
  );
};

QuestionPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default QuestionPage;
