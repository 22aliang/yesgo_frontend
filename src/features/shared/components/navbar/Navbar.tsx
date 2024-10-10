import React, { useState, useEffect, useRef } from 'react';
import WhiteLogo from '../../../../assets/logo/whitelogo.svg';
import { useAuth } from '../../../../app/context/AuthContext';
import Link from 'next/link';
import { setupInterceptors } from '../../services/apiService';

const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    setupInterceptors(logout);
  }, [logout]);

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    logout();
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
        <Link href={isLoggedIn ? '/user/setting' : '/user/login'}>
          <button className="text-white flex items-center space-x-2">
            <i className="fa-solid fa-user text-white"></i>
            <span>{isLoggedIn ? '會員管理' : '登入'}</span>
          </button>
        </Link>

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
                <i className="fa-solid fa-paperclip mr-3"></i>
                <Link href="/proposal">
                  <button>提案</button>
                </Link>
              </li>
              <li className="dropdown-ul-item">
                <i className="fa-regular fa-paper-plane mr-3"></i>
                <Link href="/mapsearch">
                  <button>地圖</button>
                </Link>
              </li>
              <li className="dropdown-ul-item">
                <i className="fa-solid fa-question mr-4"></i>
                <Link href="/fqa">
                  <button>問答</button>
                </Link>
              </li>
              {isLoggedIn && (
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
              )}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
