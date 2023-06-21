import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';

export default function SignUp() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
  } = useForm();
  const { state } = useLocation();
  const navigate = useNavigate();
  const isLogin = state === 'login';
  const onVaild = (data) => {
    if (data.pw1 !== data.pw2) {
      setError(
        'pw2',
        { message: '입력한 패스워드가 일치하지 않습니다.' },
        { shouldFocus: true }
      );
    }
  };
  const { email, pw1, pw2 } = watch();
  return (
    <section className='signup__container'>
      <article className='signup__content'>
        <h1>{isLogin ? '이메일로 로그인 하세요' : '계정을 생성하세요'} </h1>
        <form className='form' onSubmit={handleSubmit(onVaild)}>
          <div className={`form-item ${errors.email ? 'error' : ''}`}>
            <input
              type='text'
              id='email'
              autoComplete='off'
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
              autoComplete='off'
              {...register('pw1', { required: '패스워드를 입력해주세요' })}
              className={pw1 && pw1.length !== 0 ? 'focus' : ''}
            />
            <label htmlFor='password'>패스워드</label>
          </div>
          <span className='form-error'>{errors?.pw1?.message}</span>

          {!isLogin && (
            <>
              <div className={`form-item ${errors.pw2 ? 'error' : ''}`}>
                <input
                  type='password'
                  id='password'
                  autoComplete='off'
                  {...register('pw2', { required: '패스워드를 확인해주세요' })}
                  className={pw2 && pw2.length !== 0 ? 'focus' : ''}
                />
                <label htmlFor='password'>패스워드 확인</label>
              </div>
              <span className='form-error'>{errors?.pw2?.message}</span>
            </>
          )}

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
