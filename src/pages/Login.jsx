import React, { useState } from 'react';
import { LoginWithGoogle, LoginWithGithub } from '../api/firebase';

export default function Login({ setLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const handleSubmit = async (e) => {};

  const handleSocialClick = async (event) => {
    const { name } = event.target;
    let user;
    if (name === 'google') {
      user = await LoginWithGoogle();
    } else if (name === 'github') {
      user = await LoginWithGithub();
    }
    setLogin(user);
  };
  return (
    <div>
      <button name='google' onClick={handleSocialClick}>
        Continue width Google
      </button>
      <button name='github' onClick={handleSocialClick}>
        Continue width Github
      </button>
    </div>
  );
}
