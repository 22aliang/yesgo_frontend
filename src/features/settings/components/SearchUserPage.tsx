import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  searchUser,
  addFriend,
  resetSearch,
} from '@/features/friend/slice/friendSlice';
import Image from 'next/image';
import { toast } from 'react-toastify';
import MessageModal from '@/features/message/components/message.modal';
import { AppDispatch, RootState } from '@/api/store/store';

const SearchUserPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, loading, error, hasSearched } = useSelector(
    (state: RootState) => state.friend
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchInput, setSearchInput] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(resetSearch());
      setSearchInput('');
    };
  }, [dispatch]);

  const handleSearch = () => {
    if (!searchInput) return;
    dispatch(searchUser(searchInput)).then((result) => {
      console.log('Search result:', result);
    });
  };

  const handleAddFriend = async (friendId: number) => {
    try {
      await dispatch(addFriend(friendId)).unwrap();
      toast.success('好友邀請已發送');
    } catch (error) {
      toast.error(`${error}`);
      console.error('Error adding friend:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-2xl font-bold mb-8 text-center">搜尋用戶</h3>
      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* 搜尋用戶 */}
      <div className="flex items-center mb-6">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-200"
          placeholder="輸入用戶名稱..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="btn" onClick={handleSearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      {/* 搜尋結果 */}
      {searchResults ? (
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-4 text-center">搜尋結果</h4>
          <ul className="space-y-4">
            <li
              key={searchResults.id}
              className="p-4 bg-gray-50 border rounded-lg shadow-sm flex justify-between items-center hover:bg-gray-100 transition duration-200"
            >
              <div className="text-lg font-medium text-gray-800 flex text-center justify-center">
                <Image
                  src={
                    searchResults.avatar ||
                    'https://lh3.googleusercontent.com/d/13dbIj5o88tHeSR5UoVKZZHywKGPBQMED'
                  }
                  alt="User Avatar"
                  width={50}
                  height={50}
                  className="object-contain rounded-full"
                  priority={true}
                  style={{ width: 'auto', height: 'auto' }}
                />
                <h3 className="mx-5 mt-3">{searchResults.username}</h3>
              </div>
              <div>
                {searchResults.status === 'REJECTED' ? (
                  <>
                    <button
                      className="btn"
                      onClick={() => handleAddFriend(Number(searchResults.id))}
                    >
                      同意成為好友
                    </button>
                    <button
                      className="btn ml-4"
                      onClick={() => setShowMessageModal(true)}
                    >
                      私信
                    </button>
                  </>
                ) : searchResults.status === 'PENDING' ? (
                  <button className="btn-disable" disabled>
                    已邀請
                  </button>
                ) : searchResults.status === 'ACCEPTED' ? (
                  <button className="btn-disable" disabled>
                    已是好友
                  </button>
                ) : searchResults.username === user?.username ? (
                  <></>
                ) : (
                  <>
                    <button
                      className="btn"
                      onClick={() => handleAddFriend(Number(searchResults.id))}
                    >
                      新增好友
                    </button>
                    <button
                      className="btn ml-4"
                      onClick={() => setShowMessageModal(true)}
                    >
                      私信
                    </button>
                  </>
                )}
              </div>
            </li>
          </ul>
        </div>
      ) : (
        hasSearched && (
          <p className="text-center text-red-500 mt-4">找不到用戶</p>
        )
      )}

      <MessageModal
        isOpen={showMessageModal}
        receiver_id={Number(searchResults?.id)}
        onRequestClose={() => setShowMessageModal(false)}
      />
    </div>
  );
};

export default SearchUserPage;
