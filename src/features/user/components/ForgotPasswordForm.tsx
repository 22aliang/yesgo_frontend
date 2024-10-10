// src/components/ForgotPasswordForm.tsx
import React, { useState } from 'react';

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onBackToLogin,
}) => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 假設這是調用的發送重設密碼的API
      // await authService.sendResetPasswordEmail(email);
      alert('重設密碼郵件已發送，請檢查您的信箱。');
      setError('');
      onBackToLogin();
    } catch (error) {
      setError('發送失敗，請稍後再試。');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-sm font-medium">
        <label htmlFor="email" className="block">
          請輸入您的電子郵件：
        </label>
        <input
          type="email"
          id="email"
          placeholder="輸入您的電子郵件"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button className="w-full btn mt-5" type="submit">
          發送重設密碼郵件
        </button>
        <button className="block cursor-pointer mt-8" onClick={onBackToLogin}>
          返回登入
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
