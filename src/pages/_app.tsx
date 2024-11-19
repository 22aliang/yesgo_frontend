import { ReactElement, ReactNode, useEffect } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import ErrorBoundary from '../features/shared/components/error/ErrorBoundary';
import '../styles/globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Provider } from 'react-redux';
import store from '@/api/store/store';
import { initializeAuth } from '@/features/user/slice/authSlice';
import { AppDispatch } from '@/api/store/store';
import { useDispatch } from 'react-redux';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Provider store={store}>
      <AppInitializer>
        <ErrorBoundary>{getLayout(<Component {...pageProps} />)}</ErrorBoundary>
      </AppInitializer>
    </Provider>
  );
}

const AppInitializer = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return <>{children}</>;
};

export default MyApp;
