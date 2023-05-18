import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Email'
          required
          value={email}
          onChange={handleChange}
          name='email'
        />
        <input
          type='password'
          placeholder='Password'
          required
          value={password}
          onChange={handleChange}
          name='password'
        />
        <input type='submit' value='LOGIN' />
      </form>
      <div>
        <button>Continue width Google</button>
        <button>Continue width Github</button>
      </div>
    </div>
  );
}
