import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import App from './App';
import Profile from './pages/Profile';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: '/mysweets', element: <Profile /> },
    ],
  },
  { path: '/signup', element: <App /> },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
