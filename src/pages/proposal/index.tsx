import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../features/shared/components/layout/Layout';
import ProposalCard from '../../features/proposal/components/proposalCard/ProposalCard';
import { SearchBar } from '@/features/shared/components/searchbar/SearchBar';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProposals,
  fetchTags,
  setCurrentPage,
} from '@/features/proposal/slice/proposalSlice';
import { AppDispatch, RootState } from '@/api/store/store';

const ProposalPage = () => {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { keyword } = router.query;
  const dispatch = useDispatch<AppDispatch>();
  const { proposals, availableTags, currentPage, loading, error } = useSelector(
    (state: RootState) => state.proposal
  );
  const [searchTerm, setSearchTerm] = useState<string>(
    (keyword as string) || ''
  );
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  useEffect(() => {
    if (keyword) {
      setSearchTerm(keyword as string);
    } else {
      setSearchTerm('');
    }
  }, [keyword]);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  useEffect(() => {
    const queryParams: any = {
      page: String(currentPage),
    };

    if (selectedTags.length > 0) {
      queryParams.tags = selectedTags.map((tag) => tag.value).join(',');
    }

    if (searchTerm) {
      queryParams.keyword = searchTerm;
    }

    dispatch(fetchProposals(queryParams));
  }, [dispatch, searchTerm, currentPage, selectedTags, selectedRating]);

  const handleTagChange = (newSelectedTags: any) => {
    setSelectedTags(newSelectedTags);
  };

  const handleRatingChange = (selectedRating: any) => {
    setSelectedRating(selectedRating.value);
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };

  const clearParams = () => {
    setSearchTerm('');
    setSelectedTags([]);
    setSelectedRating(null);
    dispatch(setCurrentPage(1));

    router.replace({
      pathname: router.pathname,
      query: {},
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <nav className="flex flex-wrap justify-between items-center p-4 shadow-lg">
        <div className="flex flex-wrap space-x-4 w-full sm:w-auto">
          <SearchBar pathname="" className="" value={keyword as string} />
          {/* Tag Dropdown Filter */}
          <div className="mt-2 w-full md:w-auto">
            <Select
              isMulti
              value={selectedTags}
              onChange={handleTagChange}
              options={availableTags}
              placeholder="選擇標籤..."
              className="w-full"
            />
          </div>
          {/* Rating Dropdown Filter */}
          <div className="mt-2 w-full md:w-auto">
            <Select
              value={
                selectedRating
                  ? { value: selectedRating, label: `${selectedRating} 星` }
                  : null
              }
              onChange={handleRatingChange}
              options={[
                { value: 1, label: '1 星' },
                { value: 2, label: '2 星' },
                { value: 3, label: '3 星' },
                { value: 4, label: '4 星' },
                { value: 5, label: '5 星' },
              ]}
              placeholder="選擇評價..."
              className="w-full"
            />
          </div>
          <button className="text-sm" onClick={clearParams}>
            清空篩選條件
          </button>
        </div>

        {/* Add "Create Proposal" Button */}
        <div className="w-full sm:w-auto md:ml-auto mt-4 sm:mt-0 flex justify-start md:justify-end">
          <button
            className="btn"
            onClick={() => {
              if (isLoggedIn) {
                router.push({
                  pathname: '/proposal/add',
                });
              } else {
                router.push({
                  pathname: '/user/login',
                });
              }
            }}
          >
            發表提案
          </button>
        </div>
      </nav>

      {/* Proposal Cards */}
      <div className="mt-6 space-y-4">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : Array.isArray(proposals) && proposals.length > 0 ? (
          proposals.map((proposal) => (
            <ProposalCard
              key={proposal.proposal_id}
              proposal_id={proposal.proposal_id}
              proposal={proposal}
              mode="proposal"
            />
          ))
        ) : (
          <p>沒有找到相關的提案。</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button
          className=""
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          上一頁
        </button>
        <span className="mx-4">{currentPage}</span>
        <button className="" onClick={() => handlePageChange(currentPage + 1)}>
          下一頁
        </button>
      </div>
    </div>
  );
};

ProposalPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ProposalPage;
