import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface SearchBarProps {
  pathname?: string;
  className?: string;
  value?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  pathname = '/proposal',
  className = '',
  value = '',
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      router.push({
        pathname,
        query: { keyword: searchTerm },
      });
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center space-y-4 ${className}`}
    >
      <div className="flex items-center border-primary-100 rounded-lg p-2 bg-white">
        <input
          type="text"
          placeholder="關鍵字搜尋"
          className="ml-4 flex-grow focus:outline-none text-gray-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="p-2" onClick={handleSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M16.65 16.65A7.875 7.875 0 1012 20.625 7.875 7.875 0 0016.65 16.65z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
