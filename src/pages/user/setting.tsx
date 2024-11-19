import React, { useState } from 'react';
import { ReactElement } from 'react';
import Layout from '../../features/shared/components/layout/Layout';
import MyProposals from '../../features/settings/components/MyProposals';
import MySavedProposals from '../../features/settings/components/MySavedProposals';
import SettingsPage from '../../features/settings/components/SettingsPage';
import Image from 'next/image';
import MyDraftProposals from '@/features/settings/components/MyDraftProposals';
import FriendPendingPage from '@/features/settings/components/FriendPendingPage';
import SearchUserPage from '@/features/settings/components/SearchUserPage';
import withAuth from '@/features/shared/components/auth/withAuth';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/api/store/store';

const SettingPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedSection, setSelectedSection] = useState<string>('dashboard');

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case '我發表的提案':
        return <MyProposals />;
      case '我收藏的提案':
        return <MySavedProposals />;
      case '我的提案草稿':
        return <MyDraftProposals />;
      case '修改會員資料':
        return <SettingsPage />;
      case '我的好友邀請':
        return <FriendPendingPage />;
      case '搜尋新增好友':
        return <SearchUserPage />;
      default:
        return;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 flex">
      <div className="w-1/5 p-4 bg-white shadow-lg rounded-lg h-1/3">
        <div className="my-5 space-y-4 flex flex-col items-center">
          <Image
            src={
              user?.avatar ||
              'https://lh3.googleusercontent.com/d/13dbIj5o88tHeSR5UoVKZZHywKGPBQMED'
            }
            alt="User Avatar"
            width={100}
            height={100}
            className="object-contain rounded-full"
            priority={true}
            style={{ width: 'auto', height: 'auto' }}
          />
          {/* Display username */}
          <button
            className={`text-xl font-bold my-5 text-gradient-animated ${
              selectedSection === 'dashboard' ? 'text-pointColor-100' : ''
            }`}
            onClick={() => handleSectionChange('dashboard')}
          >
            {user?.username}
          </button>
          <button
            className={`selectSection ${
              selectedSection === '我發表的提案' ? 'text-pointColor-100' : ''
            }`}
            onClick={() => handleSectionChange('我發表的提案')}
          >
            我發表的提案
          </button>
          <button
            className={`selectSection ${
              selectedSection === '我收藏的提案' ? 'text-pointColor-100' : ''
            }`}
            onClick={() => handleSectionChange('我收藏的提案')}
          >
            我收藏的提案
          </button>
          <button
            className={`selectSection ${
              selectedSection === '我的提案草稿' ? 'text-pointColor-100' : ''
            }`}
            onClick={() => handleSectionChange('我的提案草稿')}
          >
            我的提案草稿
          </button>
          <button
            className={`selectSection ${
              selectedSection === '我的好友邀請' ? 'text-pointColor-100' : ''
            }`}
            onClick={() => handleSectionChange('我的好友邀請')}
          >
            我的好友邀請
          </button>
          <button
            className={`selectSection ${
              selectedSection === '搜尋新增好友' ? 'text-pointColor-100' : ''
            }`}
            onClick={() => handleSectionChange('搜尋新增好友')}
          >
            搜尋新增好友
          </button>
          <button
            className={`selectSection ${
              selectedSection === '修改會員資料' ? 'text-pointColor-100' : ''
            }`}
            onClick={() => handleSectionChange('修改會員資料')}
          >
            修改會員資料
          </button>
        </div>
      </div>

      <div className="w-4/5 p-4 ml-4 bg-white shadow-lg rounded-lg">
        {renderContent()}
      </div>
    </div>
  );
};

SettingPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default withAuth(SettingPage);
