import React, { useState } from 'react';
import Layout from '../../features/shared/components/layout/Layout';
import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../app/context/AuthContext';
import ForgotPasswordForm from '../../features/user/components/ForgotPasswordForm';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const { login } = useAuth();
  const router = useRouter();

  const handleForgotPasswordClick = () => {
    setIsForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setIsForgotPassword(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      setError('');
      router.push('/user/setting');
    } catch (error: unknown) {
      console.log('page', error);
      setError(String(error));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 rounded-lg shadow-lg max-w-md w-full bg-white">
        {isForgotPassword ? (
          <ForgotPasswordForm onBackToLogin={handleBackToLogin} />
        ) : (
          <form onSubmit={handleLogin}>
            <div className="mb-4 text-sm font-medium">
              <label className="block" htmlFor="email">
                信箱：
              </label>
              <input
                type="email"
                placeholder="輸入信箱"
                className="form-input"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="mb-4 relative">
              <label className="block" htmlFor="password">
                密碼：
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="輸入密碼"
                className="form-input"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
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
              登入
            </button>

            <div className="flex justify-between mt-8 text-sm font-medium">
              <button
                type="button"
                className="cursor-pointer"
                onClick={handleForgotPasswordClick}
              >
                忘記密碼？
              </button>
              <a className="cursor-pointer" href="/user/register">
                註冊
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default LoginPage;
