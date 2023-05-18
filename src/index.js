import ReactDOM from 'react-dom/client';
import React from 'react';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{ index: true, element: <Home /> }],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
