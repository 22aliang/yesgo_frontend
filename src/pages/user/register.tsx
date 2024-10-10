import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../features/shared/components/layout/Layout';
import { ReactElement } from 'react';
import { useAuth } from '../../app/context/AuthContext';
import { authService } from '../../features/user/services/authService'; // 使用你的 registerUser

const RegisterPage = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (password.length < 6) {
      return setError('密碼長度必須至少為 6 個字元。');
    }

    if (password !== confirmPassword) {
      return setError('密碼不一致，請重新確認。');
    }

    if (!emailRegex.test(email)) {
      return setError('無效的 Email 格式，請輸入正確的 Email。');
    }

    try {
      await authService.registerUser(username, email, password);
      setError('');
      console.log(error);
      login(email, password);
      router.push('/user/setting');
    } catch (error: unknown) {
      console.log(error);
      setError(error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 rounded-lg shadow-lg max-w-md w-full text-sm font-medium bg-white">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block">
              使用者名稱：
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-input"
              placeholder="輸入使用者名稱"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block">
              電子郵件：
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
              placeholder="輸入電子郵件"
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block">
              密碼：
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              placeholder="輸入密碼"
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
          <div className="mb-4 relative">
            <label htmlFor="confirm-password" className="block">
              確認密碼：
            </label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="form-input"
              placeholder="輸入密碼"
            />
            <button
              type="button"
              className="absolute right-0 top-9 pr-3"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <i className="fa-solid fa-eye text-black mt-1.5"></i>
              ) : (
                <i className="fa-solid fa-eye-slash text-black mt-1.5"></i>
              )}
            </button>
          </div>

          {error && <p className="bg-red-500 mb-4">{error}</p>}
          <button type="submit" className="w-full btn mt-2">
            註冊
          </button>
        </form>
        <div>
          <a className="mt-8 block" href="/user/login">
            返回登入
          </a>
        </div>
      </div>
    </div>
  );
};

RegisterPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default RegisterPage;
