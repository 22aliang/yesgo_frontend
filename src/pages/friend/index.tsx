import { useState, useEffect, useRef } from 'react';
import { ReactElement } from 'react';
import Layout from '../../features/shared/components/layout/Layout';
import Image from 'next/image';
import withAuth from '@/features/shared/components/auth/withAuth';
import { AppDispatch, RootState } from '@/api/store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOverview,
  submitBlock,
  submitUnblock,
} from '@/features/friend/slice/friendSlice';
import {
  fetchMessages,
  resetChatHistory,
  sendMessage,
  addMessage,
} from '@/features/message/slice/messageSlice';

interface Friend {
  id: number;
  friend_id: number;
  username: string;
  avatar: string;
  isBlocked: boolean;
  conversation_id: number | null;
}

const FriendPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    friends,
    blockedFriends,
    stagers,
    loading: friendsLoading,
  } = useSelector((state: RootState) => state.friend);
  const {
    chatHistory,
    loading: messagesLoading,
    hasMore,
  } = useSelector((state: RootState) => state.message);
  const [activeTab, setActiveTab] = useState<'friends' | 'blocked' | 'stager'>(
    'friends'
  );

  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [message, setMessage] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [chatHasMore, setChatHasMore] = useState<boolean>();
  const [sending, setSending] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    dispatch(fetchOverview());
  }, [dispatch]);

  useEffect(() => {
    if (selectedFriend) {
      dispatch(resetChatHistory());
      dispatch(
        fetchMessages({
          friendId: selectedFriend.friend_id,
          conversationId: selectedFriend.conversation_id,
          page: 1,
        })
      )
        .unwrap()
        .then((data) => {
          setChatHasMore(data.hasMore);
          setPage(1);
          setTimeout(scrollToBottomImmediate, 100);
        });
    }
  }, [selectedFriend, dispatch]);

  useEffect(() => {
    if (page > 1 && selectedFriend) {
      dispatch(
        fetchMessages({
          friendId: selectedFriend.friend_id,
          conversationId: selectedFriend.conversation_id,
          page,
        })
      )
        .unwrap()
        .then((data) => {
          setChatHasMore(data.hasMore);
        });
    }
  }, [page, selectedFriend, dispatch]);

  useEffect(() => {
    setChatHasMore(hasMore);
  }, [hasMore]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(null);
      }
    };
    if (dropdownOpen !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasMore]);

  useEffect(() => {
    if (selectedFriend) {
      if (ws.current) {
        ws.current.close();
      }
      connectWebSocket(selectedFriend.conversation_id);
    }

    return () => {
      if (ws.current) {
        ws.current.close();
        ws.current = null;
      }
    };
  }, [selectedFriend]);

  const connectWebSocket = (conversationId: number | null) => {
    if (ws.current) {
      ws.current.close();
    }

    ws.current = new WebSocket('ws://localhost:8080');
    ws.current.onopen = () => {
      console.log('Connected to WebSocket server');
      if (ws.current && conversationId) {
        console.log(JSON.stringify({ type: 'join', conversationId }));
        ws.current.send(JSON.stringify({ type: 'join', conversationId }));
      }
    };
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received message:', data);
      if (
        data.conversationId === selectedFriend?.conversation_id &&
        data.message
      ) {
        dispatch(
          addMessage({
            id: data.id,
            message_text: data.message,
            type:
              data.friendId === selectedFriend?.friend_id
                ? 'sender'
                : 'receiver',
            createdAt: new Date().toLocaleString(),
          })
        );
      }
      scrollToBottomImmediate();
    };
    ws.current.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };
    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  };

  const switchTab = (tab: 'friends' | 'blocked' | 'stager') => {
    setActiveTab(tab);
    setDropdownOpen(null);
  };

  const toggleDropdown = (friendId: number) => {
    setDropdownOpen(dropdownOpen === friendId ? null : friendId);
  };

  const scrollToBottomImmediate = () => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight + 20;
      }
    }, 100);
  };

  const handleSelectFriend = (friend: Friend) => {
    console.log('friend', friend);
    setSelectedFriend(friend);
    dispatch(
      fetchMessages({
        friendId: friend.friend_id,
        conversationId: friend.conversation_id,
        page: 1,
      })
    );
    setPage(1);
  };

  const handleSendMessage = async () => {
    if (selectedFriend && message.trim() && !sending) {
      setSending(true);
      const newMessage = {
        friendId: selectedFriend.friend_id,
        message: message.trim(),
        conversationId: selectedFriend.conversation_id,
      };
      await dispatch(sendMessage(newMessage)).unwrap();
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify(newMessage));
      } else {
        console.error('WebSocket is not open');
      }
      setMessage('');
      scrollToBottomImmediate();
      setSending(false);
    }
  };

  const handleBlockFriend = async (friendId: number) => {
    await dispatch(submitBlock(friendId)).unwrap();
    if (selectedFriend?.friend_id === friendId) {
      setSelectedFriend(null);
    }
    dispatch(fetchOverview());
  };

  const handleUnblockFriend = async (friend: Friend) => {
    await dispatch(submitUnblock(friend.id)).unwrap();
    dispatch(fetchOverview());
  };

  return (
    <div className="container mx-auto px-4 py-6 flex h-screen">
      {/* Left Sidebar with Tabs for Friends and Blocked List */}
      <div className="w-1/5 p-4 bg-white shadow-lg rounded-lg h-full overflow-y-auto">
        {/* Tab Headers */}
        <div className="mb-5 flex justify-around border-b">
          <button
            className={`p-2 font-semibold ${
              activeTab === 'friends'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => switchTab('friends')}
          >
            好友
          </button>
          <button
            className={`p-2 font-semibold ${
              activeTab === 'blocked'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => switchTab('blocked')}
          >
            封鎖
          </button>
          <button
            className={`p-2 font-semibold ${
              activeTab === 'stager'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => switchTab('stager')}
          >
            陌生
          </button>
        </div>

        {/* Friends or Blocked Friends List based on the active tab */}
        <div className="my-5 space-y-4">
          {activeTab === 'friends' && friends.length > 0 ? (
            <ul className="space-y-4">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center justify-between relative"
                >
                  <button
                    className={`flex items-center w-full text-left cursor-pointer p-2 rounded-lg ${
                      selectedFriend?.id === friend.id
                        ? 'bg-pointColor-100 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleSelectFriend(friend)}
                  >
                    <Image
                      src={
                        friend.avatar ||
                        'https://lh3.googleusercontent.com/d/13dbIj5o88tHeSR5UoVKZZHywKGPBQMED'
                      }
                      alt={friend.username}
                      width={50}
                      height={50}
                      className="rounded-full mr-4"
                    />
                    <span>{friend.username}</span>
                  </button>
                  <button
                    onClick={() => toggleDropdown(friend.id)}
                    className="text-gray-500 ml-2 hover:text-black"
                  >
                    &#x22EE;
                  </button>

                  {/* Dropdown menu */}
                  {dropdownOpen === friend.id && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 top-8 bg-white border rounded shadow-lg z-10"
                    >
                      <ul>
                        <li>
                          <button
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleBlockFriend(friend.friend_id)}
                          >
                            封鎖
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </ul>
          ) : activeTab === 'blocked' && blockedFriends.length > 0 ? (
            <ul className="space-y-4">
              {blockedFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center justify-between"
                >
                  <span className="text-gray-700">{friend.username}</span>
                  <button
                    onClick={() => handleUnblockFriend(friend)}
                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    解封
                  </button>
                </div>
              ))}
            </ul>
          ) : activeTab === 'stager' && stagers.length > 0 ? (
            <ul className="space-y-4">
              {stagers.map((stager) => (
                <div
                  key={stager.id}
                  className="flex items-center justify-between relative"
                >
                  <button
                    className={`flex items-center w-full text-left cursor-pointer p-2 rounded-lg ${
                      selectedFriend?.friend_id === stager.friend_id
                        ? 'bg-pointColor-100 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleSelectFriend(stager)}
                  >
                    <Image
                      src={
                        stager.avatar ||
                        'https://lh3.googleusercontent.com/d/13dbIj5o88tHeSR5UoVKZZHywKGPBQMED'
                      }
                      alt={stager.username}
                      width={50}
                      height={50}
                      className="rounded-full mr-4"
                    />
                    <span>{stager.username}</span>
                  </button>
                </div>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">
              {activeTab === 'friends' ? '目前沒有好友' : '無封鎖名單'}
            </p>
          )}
        </div>
      </div>

      {/* Right Content: Chat History */}
      <div className="w-4/5 p-4 ml-4 bg-white shadow-lg rounded-lg flex flex-col h-full overflow-auto">
        {selectedFriend && !selectedFriend.isBlocked ? (
          <>
            <div
              className="flex-1 overflow-auto border-b-2 border-gray-200 mb-4 p-4 chat-container"
              ref={chatContainerRef}
            >
              {chatHasMore && (
                <div ref={loadMoreRef} className="text-center mb-4 w-full">
                  <button
                    onClick={() => setPage((prevPage) => prevPage + 1)}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded w-full"
                  >
                    Load More
                  </button>
                </div>
              )}

              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    chat.type === 'sender' ? 'text-right' : 'text-left'
                  }`}
                >
                  <span
                    className={`inline-block px-4 py-2 rounded-lg ${
                      chat.type === 'sender'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    {chat.message_text}
                  </span>
                  <div className="text-xs text-gray-500 mt-1">
                    {chat.createdAt}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="flex">
              <input
                type="text"
                className="flex-1 border border-gray-300 p-2 rounded-l-lg"
                placeholder="輸入訊息..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
                onClick={handleSendMessage}
              >
                發送
              </button>
            </div>
          </>
        ) : selectedFriend?.isBlocked ? (
          <h2 className="text-center mt-5">你已封鎖此好友</h2>
        ) : (
          <h2 className="text-center mt-5">請選擇一個好友進行聊天</h2>
        )}
      </div>
    </div>
  );
};

FriendPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default withAuth(FriendPage);
