import React, { useState } from 'react';
import { useAuth } from '../../../app/context/AuthContext';
import AlertModal from '@/features/shared/components/alert/AlertModal';
import { useAlert } from '@/features/shared/hooks/useAlert';

const SettingsPage = () => {
  const { user, updateUser } = useAuth();
  const { alertData, showAlert } = useAlert();
  const [username, setUsername] = useState<string>(user?.username || '');
  const [email] = useState<string>(user?.email || '');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  console.log(user);
  const handleUsernameChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedUsername = e.target.value;
    setUsername(updatedUsername);
  };

  const handleUpdateUserInfo = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userId = user?.userId;
      if (userId) {
        setError('user missing');
      }
      await updateUser(Number(userId), username, newPassword);
      setError('');
      showAlert('會員資料已成功更新', 200);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : String(error));
      showAlert(error instanceof Error ? error.message : '更新失敗', 400);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpdateUserInfo} className="mx-10 mb-10">
        <div className="mb-4 text-sm font-medium">
          <label className="block text-black" htmlFor="username">
            用戶名：
          </label>
          <input
            type="text"
            placeholder="輸入用戶名"
            className="form-input"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>

        <div className="mb-4 text-sm font-medium">
          <label className="block text-black" htmlFor="email">
            信箱：
          </label>
          <input
            type="email"
            className="form-input bg-gray-100 cursor-not-allowed"
            id="email"
            value={email}
            disabled
          />
        </div>

        <div className="mb-4 relative">
          <label className="block text-black" htmlFor="oldPassword">
            舊密碼：
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="輸入舊密碼"
            className="form-input"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-0 top-9 pr-3"
            onClick={() => setShowOldPassword(!showOldPassword)}
          >
            {showOldPassword ? (
              <i className="fa-solid fa-eye text-black mt-1.5"></i>
            ) : (
              <i className="fa-solid fa-eye-slash text-black mt-1.5"></i>
            )}
          </button>
        </div>

        {/* New Password Field */}
        <div className="mb-4 relative">
          <label className="block text-black" htmlFor="newPassword">
            新密碼：
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="輸入新密碼"
            className="form-input"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-0 top-9 pr-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <i className="fa-solid fa-eye text-black mt-1.5"></i>
            ) : (
              <i className="fa-solid fa-eye-slash text-black mt-1.5"></i>
            )}
          </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button className="w-full btn mt-2" type="submit">
          更新會員資料
        </button>
      </form>
      {alertData && (
        <AlertModal
          message={alertData.message}
          state={alertData.state}
          showModal={alertData.showModal}
        />
      )}
    </div>
  );
};

export default SettingsPage;
