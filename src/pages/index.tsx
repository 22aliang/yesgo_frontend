import { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchBar } from '@/features/shared/components/searchbar/SearchBar';
import Layout from '../features/shared/components/layout/Layout';
import Image from 'next/image';
import { AppDispatch, RootState } from '@/api/store/store';
import { fetchPopularProposals } from '@/features/proposal/slice/popularSlice';

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { proposals, loading, error } = useSelector(
    (state: RootState) => state.popular
  );

  useEffect(() => {
    dispatch(fetchPopularProposals());
  }, [dispatch]);

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
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-gray-100 p-6 shadow-md allCenter shadow-lg rounded-lg">
              <p className=" mb-5">發佈你的提案</p>
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
            <div className="bg-gray-100 p-6 shadow-md allCenter shadow-lg rounded-lg">
              <p className=" mb-5">參與提案</p>
              <Image
                src="/invitation.png"
                alt=""
                width={500}
                height={300}
                className="w-auto"
              />
              <a className="mt-4 p-2 btn" href="./proposal">
                參與
              </a>
            </div>
            <div className="bg-gray-100 p-6 shadow-md allCenter shadow-lg rounded-lg">
              <p>使用會員專區</p>
              <Image
                src="/map.png"
                alt=""
                width={500}
                height={300}
                className="w-auto"
              />
              <a className="mt-4 p-2 btn" href="./fqa">
                進入
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
          <div className="grid grid-cols-3 gap-6">
            {loading && <p>加載中...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {proposals.map((proposal) => (
              <div
                key={proposal.id}
                className="bg-gray-100 p-6 shadow-md allCenter shadow-lg rounded-lg"
              >
                <p>標題: {proposal.title}</p>
                {proposal.img_url && (
                  <Image
                    src={proposal.img_url}
                    alt={proposal.title}
                    width={500}
                    height={300}
                    className="w-auto"
                  />
                )}
                <p>作者: {proposal.author}</p>
                <p>平均評分: {proposal.avg_rating}</p>
                <a className="mt-4 p-2 btn" href={`./proposal/${proposal.id}`}>
                  查看詳情
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HomePage;
