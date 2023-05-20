import React, { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
} from 'firebase/firestore';
import { db, storage } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import Twitter from '../components/Twitter/Twitter';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const { user } = useAuthContext();
  const [text, setText] = useState('');
  const [texts, setTexts] = useState([]);
  const [attachment, setAttachment] = useState('');

  //sumbit시 데이터 추가
  const handleSubmit = async (e) => {
    e.preventDefault();
    let attachmentURL = '';
    if (attachment !== '') {
      const attachmentRef = ref(storage, `${user.uid}/${uuidv4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        'data_url'
      );
      attachmentURL = await getDownloadURL(response.ref);
    }
    const contentObj = {
      text,
      createdAt: Date.now(),
      attachmentURL,
      user: {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
      },
    };
    await addDoc(collection(db, 'twitter'), contentObj);
    if (text.trim() === '') return;

    setText('');
    setAttachment('');
  };
  //실시간으로 database 가져오기
  useEffect(() => {
    const q = query(collection(db, 'twitter'), orderBy('createdAt', 'desc'));
    onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setTexts(newArray);
    });
  }, []);

  const handleFile = (event) => {
    const { files } = event.target;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { result } = finishedEvent.currentTarget;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const handleClearAttachment = () => setAttachment('');
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
        <input type='file' accept='image/*' onChange={handleFile} />
        <input type='submit' value='전송' />
        {attachment && (
          <div>
            <img src={attachment} width='50px' alt='' />
            <button onClick={handleClearAttachment}>이미지삭제</button>
          </div>
        )}
      </form>
      {texts && (
        <ul>
          {texts.map((text) => (
            <Twitter
              key={text.id}
              twiiterInfo={text}
              isOwner={text.user.uid === user.uid}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
