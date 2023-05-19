import Login from './pages/Login';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import { useAuthContext } from './context/AuthContext';
import { useEffect } from 'react';
import { stateAuth } from './api/firebase';
import Footer from './components/Footer/Footer';

export default function App() {
  const { user, setUser } = useAuthContext();
  useEffect(() => stateAuth(setUser), [setUser]);
  return (
    <>
      {user && (
        <div>
          <Nav />
          <Outlet />
          <Footer />
        </div>
      )}
      {!user && <Login />}
    </>
  );
}
