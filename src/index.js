import ReactDOM from 'react-dom/client';
import React from 'react';
import './styles/index.scss';
import Routes from './Routes';
import UserContextProvider from './context/UserContext';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
);
