import React, { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import { auth } from './api/firebase';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav/Nav';

export default function App() {
  const [isLogin, setLogin] = useState(auth.currentUser);
  console.log(isLogin);
  return (
    <>
      {isLogin && (
        <div>
          <Nav setLogin={setLogin}  />
          <Outlet />
        </div>
      )}
      {!isLogin && <Login setLogin={setLogin} />}
    </>
  );
}
