import React from 'react';
import styles from './Nav.module.css';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { logout } from '../../api/firebase';

export default function Nav({ setLogin }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    logout().then(setLogin);
    navigate('/');
  };
  return (
    <nav>
      <Link to='/'>홈</Link>
      <Link to='/profile'>프로필</Link>
      <Link to='/editProfile'>수정</Link>
      <button onClick={handleLogout}>로그아웃</button>
    </nav>
  );
}
