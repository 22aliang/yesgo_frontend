import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { AuthProvider } from '../app/context/AuthContext';
import ErrorBoundary from '../features/shared/components/error/ErrorBoundary';
import '../styles/globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AuthProvider>
      <ErrorBoundary>{getLayout(<Component {...pageProps} />)}</ErrorBoundary>
    </AuthProvider>
  );
}

export default MyApp;
