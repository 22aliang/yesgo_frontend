import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '@/api/store/store';
import { updateUser } from '@/features/user/slice/authSlice';

const SettingsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const [username, setUsername] = useState<string>(user?.username || '');
  const [email] = useState<string>(user?.email || '');
  const [avatar, setAvatar] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUsernameChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedUsername = e.target.value;
    setUsername(updatedUsername);
  };

  useEffect(() => {
    if (user?.username) {
      setUsername(user.username);
    }
  }, [user]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpdateUserInfo = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      if (username) {
        formData.append('userName', username);
      }

      if (avatar) {
        formData.append('avatar', avatar);
      }

      await dispatch(updateUser(formData)).unwrap();

      toast.success('User info updated successfully!');
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <div>
      <form onSubmit={handleUpdateUserInfo} className="mx-10 mb-10 mt-10">
        {/* Username */}
        <div className="mb-4 text-sm font-medium">
          <label className="block text-black" htmlFor="username">
            用戶名：
          </label>
          <input
            type="text"
            placeholder={'輸入用戶名'}
            className="form-input"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>

        {/* Email */}
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

        {/* Avatar upload */}
        <div className="mb-4 text-sm font-medium">
          <label className="block text-black" htmlFor="avatar">
            上傳頭像：
          </label>
          <div className="flex items-center">
            <input
              type="file"
              className="form-input"
              id="avatar"
              accept="image/*"
              onChange={handleAvatarChange}
              ref={fileInputRef}
            />
            {avatar && (
              <button
                type="button"
                onClick={handleRemoveAvatar}
                className="text-red-500 ml-2"
              >
                <i className="fa-solid fa-times mt-3"></i>
              </button>
            )}
          </div>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Loading spinner */}
        {loading && (
          <div className="text-center mb-4">
            <i className="fa fa-spinner fa-spin text-2xl"></i> {/* Spinner */}
          </div>
        )}

        {/* Update Button */}
        <button className="w-full btn mt-2" type="submit" disabled={loading}>
          {loading ? '正在更新...' : '更新會員資料'}
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
