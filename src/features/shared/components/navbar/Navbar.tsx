import React, { useState, useEffect, useRef } from 'react';
import WhiteLogo from '../../../../assets/logo/whitelogo.svg';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchNotifications,
  markAllAsRead,
  markAsRead,
  addNotification,
} from '@/features/notification/slice/notificationSlice';
import { AppDispatch, RootState } from '@/api/store/store';
import { logout } from '@/features/user/slice/authSlice';

const Navbar: React.FC = () => {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const { notifications, unreadCount } = useSelector(
    (state: RootState) => state.notification
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] =
    useState(false);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (isLoggedIn && user) {
      ws.current = new WebSocket(`ws://localhost:8080/ws/${user.id}`);
      ws.current.onopen = () => {
        console.log('Connected to WebSocket server');
      };
      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'new_notification') {
          dispatch(addNotification(data.data));
        }
      };
      ws.current.onclose = () => {
        console.log('Disconnected from WebSocket server');
      };
      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      return () => {
        if (ws.current) {
          ws.current.close();
        }
      };
    }
  }, [isLoggedIn, user, dispatch]);

  const handleNotificationDropdownToggle = () => {
    dispatch(fetchNotifications());
    setNotificationDropdownOpen(!notificationDropdownOpen);
    setDropdownOpen(false);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
    setNotificationDropdownOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationDropdownRef.current &&
      !notificationDropdownRef.current.contains(event.target as Node)
    ) {
      setNotificationDropdownOpen(false);
    }
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (notificationDropdownOpen || dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notificationDropdownOpen, dropdownOpen]);

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead()).then(() => {
      dispatch(fetchNotifications());
    });
  };

  const handleNotificationClick = (notificationId: number) => {
    dispatch(markAsRead(notificationId));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="flex justify-between items-center navbar-blur p-5 fixed w-full top-0 z-50 shadow-md">
      <div className="flex items-center space-x-5">
        <Link href="/" passHref>
          <button className="logo">
            <WhiteLogo className="h-7" />
          </button>
        </Link>
      </div>
      <div className="flex items-center space-x-5 text-black">
        {/* Notification Bell */}
        {isLoggedIn && (
          <div>
            <div className="relative" ref={notificationDropdownRef}>
              <button
                onClick={handleNotificationDropdownToggle}
                className={`relative text-xl focus:outline-none ${
                  unreadCount > 0 ? 'text-red-500 animate-shake' : 'text-white'
                }`}
              >
                <i className="fa-solid fa-bell mt-1 mr-2"></i>
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-1">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50 max-h-64 overflow-y-auto">
                  <div className="p-4 border-b flex justify-between items-center">
                    <p className="font-bold">通知</p>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllAsRead}
                        className="text-blue-500 text-sm"
                      >
                        全部已讀
                      </button>
                    )}
                  </div>
                  <ul>
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <li
                          key={notification.id}
                          className={`p-3 border-b ${
                            notification.is_read ? 'bg-gray-100' : 'bg-white'
                          }`}
                        >
                          <button
                            onClick={() =>
                              handleNotificationClick(notification.id)
                            }
                            className="w-full text-left"
                          >
                            {notification.message}
                          </button>
                          <div className="text-xs text-gray-500">
                            {new Date(notification.createdAt).toLocaleString()}
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="p-3 text-center">沒有通知</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* User Dropdown */}
        {isLoggedIn ? (
          <div className="relative" ref={dropdownRef}>
            <button
              className="text-white text-xl focus:outline-none"
              onClick={handleDropdownToggle}
            >
              &#9660;
            </button>
            {dropdownOpen && (
              <ul className="dropdown-ul">
                <li className="dropdown-ul-item">
                  <i className="fa-solid fa-user mr-3"></i>
                  <Link href="/user/setting">
                    <button>設定</button>
                  </Link>
                </li>
                <li className="dropdown-ul-item">
                  <i className="fa-solid fa-paperclip mr-3"></i>
                  <Link href="/proposal">
                    <button>提案</button>
                  </Link>
                </li>
                <li className="dropdown-ul-item">
                  <i className="fa-solid fa-user-group mr-2"></i>
                  <Link href="/friend">
                    <button>好友</button>
                  </Link>
                </li>
                <li className="dropdown-ul-item">
                  <i className="fa-solid fa-arrow-right mr-3"></i>
                  <Link href="/">
                    <button
                      className="text-black hover:text-pointColor-100"
                      onClick={handleLogout}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleLogout();
                        }
                      }}
                    >
                      登出
                    </button>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link href="/user/login">
            <button className="text-white flex items-center space-x-2">
              <i className="fa-solid fa-user text-white"></i>
              <span>登入</span>
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
