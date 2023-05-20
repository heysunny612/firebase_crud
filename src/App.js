import Login from './pages/Login';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import { useAuthContext } from './context/AuthContext';
import { useEffect, useState } from 'react';
import { stateAuth } from './api/firebase';
import Footer from './components/Footer/Footer';

export default function App() {
  const [init, setInit] = useState();
  const { user, setUser } = useAuthContext();
  useEffect(() => stateAuth(setUser, setInit), [setUser]);
  return (
    <>
      {user && (
        <div>
          <Nav />
          <Outlet />
          <Footer />
        </div>
      )}
      {!init ? <p>로딩중</p> : !user && <Login />}
    </>
  );
}
