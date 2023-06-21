import ReactDOM from 'react-dom/client';
import React from 'react';
import './styles/index.scss';
import Routes from './Routes';
import UserContextProvider from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  </React.StrictMode>
);
