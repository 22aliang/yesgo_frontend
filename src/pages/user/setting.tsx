import React, { useState } from 'react';
import { ReactElement } from 'react';
import Layout from '../../features/shared/components/layout/Layout';
import { useAuth } from '../../app/context/AuthContext';
import MyProposals from '../../features/settings/components/MyProposals';
import MySavedProposals from '../../features/settings/components/MySavedProposals';
import MyAppointments from '../../features/settings/components/MyAppointments';
import MyFriends from '../../features/settings/components/MyFriends';
import BlockedFriends from '../../features/settings/components/BlockedFriends';
import SettingsPage from '../../features/settings/components/SettingsPage';
import Dashboard from '../../features/settings/components/Dashboard';

const SettingPage = () => {
  const { user } = useAuth();

  const [selectedSection, setSelectedSection] = useState<string>('dashboard');

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case '我的提案':
        return <MyProposals />;
      case '我收藏的提案':
        return <MySavedProposals />;
      case '我的約會':
        return <MyAppointments />;
      case '我的GO友':
        return <MyFriends />;
      case '封鎖的GO友':
        return <BlockedFriends />;
      case '設定':
        return <SettingsPage />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <p>請選擇一個選項。</p>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 flex">
      <div className="w-1/5 p-4 bg-white shadow-lg rounded-lg h-1/3">
        <div className="my-5 space-y-4 flex flex-col">
          <button
            className="text-xl font-bold my-5 text-gradient-animated"
            onClick={() => handleSectionChange('dashboard')}
          >
            {user?.username}
          </button>
          <button
            className="selectSection"
            onClick={() => handleSectionChange('我的提案')}
          >
            我發表的提案
          </button>
          <button
            className="selectSection"
            onClick={() => handleSectionChange('我收藏的提案')}
          >
            我收藏的提案
          </button>
          <button
            className="selectSection"
            onClick={() => handleSectionChange('我的約會')}
          >
            我的約會
          </button>
          <button
            className="selectSection"
            onClick={() => handleSectionChange('我的GO友')}
          >
            我的GO友
          </button>
          <button
            className="selectSection"
            onClick={() => handleSectionChange('封鎖的GO友')}
          >
            封鎖的GO友
          </button>
          <button
            className="selectSection"
            onClick={() => handleSectionChange('設定')}
          >
            會員資料
          </button>
        </div>
      </div>

      <div className="w-4/5 p-4 ml-4 bg-white shadow-lg rounded-lg">
        <h2 className=" font-medium text-center my-5 text-pointColor-100">
          {selectedSection === 'dashboard' ? '儀表板' : selectedSection}
        </h2>
        {renderContent()}
      </div>
    </div>
  );
};

SettingPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SettingPage;
