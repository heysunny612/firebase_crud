import React from 'react';
import { useUserContext } from '../context/UserContext';
import Auth from './Auth';
import Nav from './Nav';
import { BsTwitter } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function SideBar() {
  const { user, isGettingUser } = useUserContext();
  return (
    <>
      <h1>
        <Link to='/'>
          <BsTwitter />
        </Link>
      </h1>
      {!isGettingUser ? <p>로딩중</p> : !user ? <Auth /> : <Nav />}
    </>
  );
}
