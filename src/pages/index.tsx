import { ReactElement } from 'react';
import { SearchBar } from '@/features/shared/components/searchbar/SearchBar';
import Layout from '../features/shared/components/layout/Layout';
import Image from 'next/image';

const HomePage = () => {
  return (
    <div>
      <section className="py-10">
        <div className="container mx-auto flex justify-center items-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-2 text-gradient-animated">
              行程YES就GO！
            </h1>
            <p>輕鬆找到行程提案，說走就走吧</p>
          </div>
          <div className="ml-10">
            <SearchBar pathname="/proposal" className="mb-8" />
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">
            YES GO 是一個{' '}
            <span className="text-gradient-animated">行程提案</span> 的交流平台
          </h2>
          <p className="text-lg mb-10">在這裡你可以...</p>
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-gray-100 p-6 shadow-md allCenter">
              <p>發佈你的提案</p>
              <Image
                src="/proposal.png"
                alt=""
                width={500}
                height={300}
                className="w-auto"
              />
              <a className="mt-4 p-2 btn" href="./proposal">
                發佈
              </a>
            </div>
            <div className="bg-gray-100 p-6 shadow-md allCenter">
              <p>發起邀請</p>
              <Image
                src="/invitation.png"
                alt=""
                width={500}
                height={300}
                className="w-auto"
              />
              <a className="mt-4 p-2 btn" href="./invitation">
                邀請
              </a>
            </div>
            <div className="bg-gray-100 p-6 shadow-md allCenter">
              <p>用地圖找到附近的提案</p>
              <Image
                src="/map.png"
                alt=""
                width={500}
                height={300}
                className="w-auto"
              />
              <a className="mt-4 p-2 btn" href="./mapsearch">
                地圖
              </a>
            </div>
            <div className="bg-gray-100 p-6 shadow-md allCenter">
              <p>使用會員專區</p>
              <Image
                src="/qa.png"
                alt=""
                width={500}
                height={300}
                className="w-auto"
              />
              <a className="mt-4 p-2 btn" href="./fqa">
                問答
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-gradient-animated">
            熱門提案
          </h2>
          <div className="grid grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-gray-100 p-6 shadow-md">
                <p>[台中約會] 放鬆的咖啡廳</p>
                <p className="text-sm text-gray-500">作者: 張三</p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-gray-700">4.4 ★</p>
                  <button className="p-2 btn">查看</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-gradient-animated">
            熱門地區
          </h2>
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-gray-100 p-6 shadow-md text-center">台北</div>
            <div className="bg-gray-100 p-6 shadow-md text-center">澎湖</div>
            <div className="bg-gray-100 p-6 shadow-md text-center">台中</div>
            <div className="bg-gray-100 p-6 shadow-md text-center">高雄</div>
          </div>
        </div>
      </section>
    </div>
  );
};

// 定義頁面的 getLayout 函數
HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HomePage;
