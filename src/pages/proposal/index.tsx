import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../features/shared/components/layout/Layout';
import ProposalCard from '../../features/proposal/components/proposalCard/ProposalCard';
import { SearchBar } from '@/features/shared/components/searchbar/SearchBar';

const ProposalPage = () => {
  const router = useRouter();
  const { keyword } = router.query;
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('熱門');
  const [proposals, setProposals] = useState<any[]>([]);

  useEffect(() => {
    if (keyword) {
      setSearchTerm(keyword as string);
    }
  }, [keyword]);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await fetch('/api/proposals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            keyword: searchTerm,
            sort: sortOption,
          }),
        });
        const data = await response.json();
        setProposals(data.proposals);
      } catch (error) {
        console.error('Error fetching proposals:', error);
      }
    };

    fetchProposals();
  }, [sortOption, searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <nav className="flex flex-wrap justify-between items-center p-4 shadow-lg">
        <div className="flex flex-wrap space-x-4 w-full sm:w-auto">
          <SearchBar pathname="" className="" />
          <div className="w-full sm:w-auto md:ml-auto mt-4 sm:mt-0">
            <ul className="flex text-sm space-x-2 text-white mt-2">
              <li
                className={`pr-4 py-2 cursor-pointer ${
                  sortOption === '熱門' ? 'text-pointColor-100 font-bold' : ''
                }`}
                onClick={() => setSortOption('熱門')}
              >
                熱門
              </li>
              <li
                className={`px-4 py-2 cursor-pointer ${
                  sortOption === '最新' ? 'text-pointColor-100 font-bold' : ''
                }`}
                onClick={() => setSortOption('最新')}
              >
                最新
              </li>
              <li
                className={`px-4 py-2 cursor-pointer ${
                  sortOption === '評價' ? 'text-pointColor-100 font-bold' : ''
                }`}
                onClick={() => setSortOption('評價')}
              >
                評價
              </li>
            </ul>
          </div>
        </div>

        {/* Tabs */}

        {/* Add "Create Proposal" Button */}
        <div className="w-full sm:w-auto md:ml-auto mt-4 sm:mt-0 flex justify-start md:justify-end">
          <button className="btn">發表提案 {/* Create Proposal */}</button>
        </div>
      </nav>

      {/* Proposal Cards */}
      <div className="mt-6 space-y-4">
        {proposals.length > 0 ? (
          proposals.map((proposal, index) => (
            <ProposalCard key={index} {...proposal} />
          ))
        ) : (
          <p>沒有找到相關的提案。</p>
        )}
      </div>
    </div>
  );
};

ProposalPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ProposalPage;
