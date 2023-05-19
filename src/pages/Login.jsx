import { useState } from 'react';
import { loginWithSocial, joinWithEmailAndPassword } from '../api/firebase.js';
import { useAuthContext } from '../context/AuthContext.jsx';

export default function Login() {
  const { setUser } = useAuthContext();
  const [form, setForm] = useState({ email: '', password: '' });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    joinWithEmailAndPassword(form.email, form.password).then(setUser);
  };
  const handleClick = async (e) => {
    const name = e.target.name;
    let user;
    if (name === 'google') {
      user = await loginWithSocial(name);
    } else if (name === 'github') {
      user = await loginWithSocial(name);
    }
    setUser(user);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          placeholder='Eamil'
          value={form.email}
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={form.password}
          onChange={handleChange}
        />
        <button>Create Accout</button>
      </form>
      <button name='google' onClick={handleClick}>
        Continue width Google
      </button>
      <button name='github' onClick={handleClick}>
        Continue width Github
      </button>
    </div>
  );
}
