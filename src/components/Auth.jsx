import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import { MdOutlineMail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { loginWithSocial } from '../api/firebase';
import './Auth.scss';

export default function Auth() {
  return (
    <div className='auth__box'>
      <h2>수위터에 처음이세요?</h2>
      <p>지금 가입해서 나에게 맞춤 설정된 타임라인을 만들어 보세요!</p>
      <ul className='auth__list'>
        <li>
          <button onClick={() => loginWithSocial('google')}>
            <FcGoogle />
            Google 계정으로 로그인하기
          </button>
        </li>
        <li>
          <button onClick={() => loginWithSocial('github')}>
            <BsGithub />
            Github 계정으로 로그인하기
          </button>
        </li>
        <li>
          <Link to='/signup' state={'login'}>
            <MdOutlineMail />
            가입한 이메일로 로그인하기
          </Link>
        </li>
        <li>
          <Link to='/signup'>
            <b>이메일로 계정 만들기</b>
          </Link>
        </li>
      </ul>
    </div>
  );
}
