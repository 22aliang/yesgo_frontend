import Image from 'next/image';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPendingFriends,
  submitReject,
  submitAccept,
} from '@/features/friend/slice/friendSlice';
import { AppDispatch, RootState } from '@/api/store/store';

const FriendPendingPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { overviewData, awaitingList, rejectedList, loading, error } =
    useSelector((state: RootState) => state.friend);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchPendingFriends());
  }, [dispatch]);

  const handleReject = (id: number) => {
    dispatch(submitReject(id)).then(() => {
      dispatch(fetchPendingFriends());
    });
  };

  const handleAccept = (
    request_id: number,
    conversation_id: number,
    id: number
  ) => {
    dispatch(submitAccept({ request_id, conversation_id, id })).then(() => {
      dispatch(fetchPendingFriends());
    });
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* 待處理邀請 */}
      <section className="mb-12">
        <h4 className="text-xl font-semibold mb-4 border-b pb-2">
          待處理的邀請
        </h4>
        {overviewData.length > 0 ? (
          <ul className="space-y-4">
            {overviewData.map((pending) => (
              <li
                key={pending.id}
                className="p-4 bg-gray-50 border rounded-lg shadow-sm flex justify-between items-center hover:bg-gray-100 transition duration-200"
              >
                <div className="text-lg font-medium text-gray-800 flex">
                  <Image
                    src={
                      pending.avatar ||
                      'https://lh3.googleusercontent.com/d/13dbIj5o88tHeSR5UoVKZZHywKGPBQMED'
                    }
                    alt="User Avatar"
                    width={100}
                    height={100}
                    className="object-contain rounded-full"
                    priority={true}
                    style={{ width: 'auto', height: 'auto' }}
                  />
                  <p className="mx-5 mt-3">{pending.username}</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    className="btn"
                    onClick={() =>
                      handleAccept(
                        pending.friend_id,
                        pending.id,
                        pending.conversation_id
                      )
                    }
                  >
                    接受
                  </button>
                  <button
                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition duration-200"
                    onClick={() => handleReject(pending.id)}
                  >
                    拒絕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">目前沒有待處理的邀請。</p>
        )}
      </section>

      {/* 等待回應的邀請 */}
      <section className="mb-12">
        <h4 className="text-xl font-semibold mb-4 border-b pb-2">等待回應中</h4>
        {awaitingList.length > 0 ? (
          <ul className="space-y-4">
            {awaitingList.map((awaiting) => (
              <li
                key={awaiting.id}
                className="p-4 bg-gray-50 border rounded-lg shadow-sm flex justify-between items-center hover:bg-gray-100 transition duration-200"
              >
                <div className="text-lg font-medium text-gray-800">
                  <span>{awaiting.username}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">目前沒有等待回應的邀請。</p>
        )}
      </section>

      {/* 已拒絕的邀請 */}
      <section className="mb-12">
        <h4 className="text-xl font-semibold mb-4 border-b pb-2">
          已拒絕的邀請
        </h4>
        {rejectedList.length > 0 ? (
          <ul className="space-y-4">
            {rejectedList.map((rejected) => (
              <li
                key={rejected.id}
                className="p-4 bg-gray-50 border rounded-lg shadow-sm flex justify-between items-center hover:bg-gray-100 transition duration-200"
              >
                <div className="text-lg font-medium text-gray-800">
                  <span>{rejected.username}</span>
                </div>
                <div>
                  <button
                    className="btn"
                    onClick={() =>
                      handleAccept(
                        rejected.requester_id,
                        rejected.conversation_id,
                        rejected.id
                      )
                    }
                  >
                    成為好友
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">目前沒有被拒絕的邀請。</p>
        )}
      </section>
    </div>
  );
};

export default FriendPendingPage;
