import React, { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuthContext();
  const [text, setText] = useState('');
  const [texts, setTexts] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'twitter'), {
      text,
      createdAt: Date.now(),
      user: {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
      },
    });
    setText('');
  };

  useEffect(() => {
    const q = query(collection(db, 'twitter'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setTexts(newArray);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='what`s on your mind?'
          value={text}
          maxLength={120}
          onChange={(e) => setText(e.target.value)}
        />
        <input type='submit' value='전송' />
      </form>
      {texts && (
        <ul>
          {texts.map(({ id, text, createdAt, user }) => (
            <li key={id}>
              {text}
              {createdAt}
              {user.uid}
              {user.name}
              {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
