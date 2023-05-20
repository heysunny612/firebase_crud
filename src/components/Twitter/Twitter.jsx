import React, { useState } from 'react';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../../api/firebase';

export default function Twitter({ twiiterInfo, isOwner }) {
  const {
    id,
    text,
    createdAt,
    attachmentURL,
    user: { uid, email, name, photoURL },
  } = twiiterInfo;
  const [isAttachmentURL, setIsAttachmentURL] = useState(attachmentURL);
  const [editing, setEditing] = useState(false);
  const [updateText, setUpdateText] = useState(text);

  //삭제
  const handleDelete = async (id) => {
    const ok = window.confirm('Are you sure delete this?');
    if (ok) {
      await deleteDoc(doc(db, 'twitter', id));
    }
    return;
  };

  //수정
  const handleUpdate = async (id) => {
    const updateTwitter = doc(db, 'twitter', id);
    await updateDoc(updateTwitter, {
      text: updateText,
    });
    toggleEditing();
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const handleDeleteAttachment = async () => {
    const isOkayDelete = window.confirm('이미지를 삭제하시겠습니까?');
    // Delete the file
    if (!isOkayDelete) return;
    await deleteObject(ref(storage, attachmentURL)).then(
      setIsAttachmentURL(false)
    );
  };
  return (
    <li>
      {!editing && <label>{text}</label>}
      {isAttachmentURL && (
        <>
          <button onClick={handleDeleteAttachment}>X</button>
          <img src={attachmentURL} width='100' alt='' />
        </>
      )}
      {/* {createdAt}
      {uid}
      {name}
      {email} */}
      {isOwner && (
        <>
          {!editing && <button onClick={toggleEditing}>수정</button>}
          {editing && (
            <>
              <input
                type='text'
                value={updateText}
                onChange={(e) => setUpdateText(e.target.value)}
                autoFocus
              />
              <button onClick={() => handleUpdate(id)}>수정하기</button>
              <button onClick={toggleEditing}>수정취소</button>
            </>
          )}
          <button onClick={() => handleDelete(id)}>삭제</button>
        </>
      )}
    </li>
  );
}
