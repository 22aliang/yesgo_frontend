import { RootState } from '@/api/store/store';
import { useRouter } from 'next/router';
import React, { useEffect, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../layout/Layout';

type AuthComponentType = React.FC & {
  getLayout?: (page: ReactElement) => ReactElement;
};

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthComponent: AuthComponentType = (props) => {
    const { isLoggedIn } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
      if (!isLoggedIn) {
        router.replace('/user/login'); 
      }
    }, [isLoggedIn, router]);

    if (!isLoggedIn) return null;

    return <WrappedComponent {...props} />;
  };

  AuthComponent.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
  };

  return AuthComponent;
};

export default withAuth;
