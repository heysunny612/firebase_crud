import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';
import { createUser, login } from '../api/firebase';

export default function SignUp() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const isLogin = state === 'login';
  const onVaild = (data) => {
    const params = {
      email: data.email,
      password: data.password,
      navigate,
      setLoginError,
    };
    isLogin ? login(params) : createUser(params);
  };
  const { email, password } = watch();

  return (
    <section className='signup__container'>
      <article className='signup__content'>
        <h1>{isLogin ? '이메일로 로그인 하세요' : '계정을 생성하세요'} </h1>
        <form className='form' onSubmit={handleSubmit(onVaild)}>
          <div className={`form-item ${errors.email ? 'error' : ''}`}>
            <input
              type='email'
              id='email'
              {...register('email', { required: '이메일을 입력해주세요' })}
              className={email && email.length !== 0 ? 'focus' : ''}
            />
            <label htmlFor='email'>이메일</label>
          </div>
          <span className='form-error'>{errors?.email?.message}</span>
          <div className={`form-item ${errors.pw1 ? 'error' : ''}`}>
            <input
              type='password'
              id='password'
              {...register('password', { required: '패스워드를 입력해주세요' })}
              className={password && password.length !== 0 ? 'focus' : ''}
            />
            <label htmlFor='password'>패스워드</label>
          </div>
          <span className='form-error'>{errors?.pw1?.message}</span>
          <span>{loginError}</span>
          <button type='submit' className='form-btn'>
            {isLogin ? '로그인' : '가입하기'}
          </button>
        </form>
        <button className='signup__close' onClick={() => navigate(-1)}>
          <GrClose />
        </button>
      </article>
    </section>
  );
}
