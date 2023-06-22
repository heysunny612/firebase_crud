import React from 'react';
import { AiOutlineLogout, AiOutlineHome } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import { logout } from '../api/firebase';
import './Nav.scss';
import { useNavigate } from 'react-router-dom';

export default function Nav() {
  const navigate = useNavigate();
  return (
    <nav className='side_nav'>
      <ul>
        <li onClick={() => navigate('/')} role='button'>
          <span>
            <AiOutlineHome /> HOME
          </span>
        </li>
        <li onClick={() => navigate('/profile')} role='button'>
          <span>
            <BsPersonCircle /> MY PROFILE
          </span>
        </li>
        <li onClick={() => navigate('/sweet')} role='button'>
          <span>
            <BsPersonCircle /> SWEET
          </span>
        </li>
        <li onClick={logout} role='button'>
          <span>
            <AiOutlineLogout /> LOGOUT
          </span>
        </li>
      </ul>
    </nav>
  );
}
