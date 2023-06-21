import ReactDOM from 'react-dom/client';
import React from 'react';
import './styles/index.scss';
import App from './Home';
import Routes from './Routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);
