import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../../features/user/services/authService';
import { userService } from '@/features/user/services/userService';
import { error } from 'console';

interface User {
  userId: string;
  username: string;
  email: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (
    userId: number,
    username: string,
    newPassword: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('token');
      try {
        console.log('auth', token);
        if (token) {
          const userData = await authService.checkLoginStatus();
          console.log('finish check login data', userData);
          setUser(userData);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUser(null);
      }
      setLoading(false);
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const login = async (email: string, password: string) => {
    const response = await authService.loginUser(email, password);
    console.log('res fin data', response);
    const token = response.token;
    localStorage.setItem('token', token);
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    setUser(payload);
    console.log('payload', payload);
    setIsLoggedIn(true);
  };

  const logout = () => {
    authService.logoutUser();
    localStorage.removeItem('token');
    setUser(null);
    setIsLoggedIn(false);
  };

  const updateUser = async (
    userId: number,
    username: string,
    newPassword: string
  ): Promise<void> => {
    try {
      const newData = await userService.updateUser(
        userId,
        username,
        newPassword
      );
      localStorage.setItem('token', newData.token);
      console.log('update fin', newData);
      setUser((prevUser) => ({
        ...prevUser,
        username: newData.userName,
        email: newData.email,
        userId: newData.userId,
      }));
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
