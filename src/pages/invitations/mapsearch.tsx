import React from 'react';
import { ReactElement } from 'react';
import Layout from '../../features/shared/components/layout/Layout';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 24.147736, // 台中市的緯度
  lng: 120.673649, // 台中市的經度
};

const ProposalMapPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 返回按鈕 */}
      <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded mb-4">
        返回
      </button>

      {/* Google 地圖部分 */}
      <div className="w-full h-96 mb-4">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
          >
            {/* 在這裡添加定位點 */}
            <Marker position={{ lat: 24.147736, lng: 120.673649 }} />
          </GoogleMap>
        </LoadScript>
      </div>

      {/* 提案詳細內容 */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            【台中這樣玩】給大學生的三天兩夜第一次約會行程
          </h2>
          <span className="text-gray-500 text-sm">87 人評分</span>
        </div>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">★ ★ ★ ★ ★</span>
          <span className="ml-2 text-gray-500">4.4</span>
        </div>
        <p className="mt-4 text-gray-700">
          台中怎麼玩呢？這是很多人最常問我的問題，甚至想規劃三日遊卻沒有頭緒...
        </p>
        <div className="flex space-x-2 mt-4">
          <span className="bg-gray-200 px-2 py-1 rounded">地區</span>
          <span className="bg-gray-200 px-2 py-1 rounded">天數</span>
          <span className="bg-gray-200 px-2 py-1 rounded">主題</span>
        </div>
        <div className="flex justify-between mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            收藏提案
          </button>
          <button className="bg-gray-800 text-white px-4 py-2 rounded">
            查看詳情
          </button>
        </div>
      </div>
    </div>
  );
};

ProposalMapPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ProposalMapPage;
