import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import App from './App';
import Profile from './pages/Profile';
import Tweet from './pages/Tweet';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: '/profile', element: <Profile /> },
      { path: '/sweet', element: <Tweet /> },
    ],
  },
  { path: '/signup', element: <App /> },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
