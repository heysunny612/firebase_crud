import React, { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import { authService } from './api/firebase';

export default function App() {
  const [isLogin, setLogin] = useState(authService.currentUser);
  return <>{isLogin ? <Home /> : <Login />}</>;
}
