import React from 'react';
import { useForm } from 'react-hook-form';
import { useUserContext } from '../context/UserContext';
import { createSweet } from '../api/firebase';

export default function Tweet() {
  const { user } = useUserContext();
  const { register, handleSubmit, reset } = useForm();

  const handleCreateSweet = (data) => {
    const dataObj = {
      user: {
        id: user.uid,
        name: user.displayName,
        url: user.photoURL,
        email: user.email,
      },
      text: data.text,
      createdAt: Date.now(),
    };
    createSweet(dataObj);
    reset();
  };

  console.log(user);
  return (
    <div>
      <form onSubmit={handleSubmit(handleCreateSweet)}>
        <input
          type='text'
          placeholder='What is happening?!'
          maxLength={120}
          {...register('text', { required: true })}
        />
        <button>Sweet</button>
      </form>
    </div>
  );
}
