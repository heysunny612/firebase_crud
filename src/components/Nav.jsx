import React from 'react';
import { AiOutlineLogout, AiOutlineHome } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import { logout } from '../api/firebase';
import './Nav.scss';
import { useNavigate ,useLocation} from 'react-router-dom';


export default function Nav() {
  const navigate = useNavigate();
  const { pathname } = useLocation()
  console.log(pathname);
  const handleLogout = () => {
    logout()
    navigate('/')
  }
  return (
    <nav className='side_nav'>
      <ul>
        <li onClick={() => navigate('/')} role='button'>
          <span className={`${pathname==='/' ? 'active' : ''}`}>
            <AiOutlineHome /> HOME
          </span>
        </li>
        <li onClick={() => navigate('/mysweets')} role='button'>
          <span className={`${pathname==='/mysweets' ? 'active' : ''}`}>
            <BsPersonCircle /> MY SWEETS
          </span>
        </li>
        <li onClick={handleLogout} role='button'>
          <span>
            <AiOutlineLogout /> LOGOUT
          </span>
        </li>
      </ul>
    </nav>
  );
}
