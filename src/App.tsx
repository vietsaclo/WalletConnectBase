import React from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import loadable from '@loadable/component';
import LoadingTopPageFallBack from './components/common/LoadingTopPageFallback';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider } from '@tanstack/react-query'
import { myQueryClient, myWagmiConfig } from './utils/WalletConnectConfigs';

const PageNotFoundView = loadable(() => import('./other-pages/PageNotFoundView'), {
  fallback: <LoadingTopPageFallBack />,
});
const LoginPage = loadable(() => import('./login-page/LoginPage'), {
  fallback: <LoadingTopPageFallBack />,
});
const HomePage = loadable(() => import('./home-page/HomePage'), {
  fallback: <LoadingTopPageFallBack />,
});

interface PageRoute {
  path: string,
  element: JSX.Element,
  children: any[],
}

const App: React.FC = () => {
  const listRoute: PageRoute[] = [
    {
      path: '/',
      element: <HomePage />,
      children: [],
    },
    {
      path: '/home',
      element: <HomePage />,
      children: [],
    },
    {
      path: '/404',
      element: <PageNotFoundView />,
      children: [],
    },
    {
      path: '/login',
      element: <LoginPage />,
      children: [],
    },
  ];

  const routing = useRoutes(listRoute);

  return (
    <div>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark' />
      <WagmiProvider config={myWagmiConfig}>
        <QueryClientProvider client={myQueryClient}>
          {routing}
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}

export default App;
