import React, {  useState } from 'react';
import { deleteSweet,  updateSweet } from '../api/firebase';
import { useUserContext } from '../context/UserContext'
import { useMutation, useQueryClient } from 'react-query'


export default function Sweet({ sweet, sweet: { id, text,imgURL, createdAt, user: creater } }) {
  const queryClient = useQueryClient();
  const { user } = useUserContext()
  const [editText, setEditText] = useState(text);
  const [editMode, setEditMode] = useState(false); 
  const updateSweets = useMutation(() => updateSweet(sweet, editText), {
    onSuccess: () => queryClient.invalidateQueries(['sweets'])
  })
  const deleteSweets = useMutation(() => deleteSweet(id), {
    onSuccess: () => queryClient.invalidateQueries(['sweets']),
  })
  const handleDelete =  () => {  
      deleteSweets.mutate();
  }
  const toggleEdit = () => setEditMode((prev) => !prev)  
  const handleUpdate = async (e) => {
    e.preventDefault();
    updateSweets.mutate()
    toggleEdit();
  };
return (
    <li>
      <div className='sweet_img'>
        <img src={creater?.url} alt='' width='100%' />
      </div>
      <div className='sweet_content'>
        <div className='sweet_info'>
          {creater?.name}
          <span>
            {creater?.email} {createdAt}
          </span>
      </div>
      {user && user.uid === creater.id && (
        <div className='sweet_menu'>
          <button onClick={toggleEdit}>{editMode ? '취소' : '수정'}</button>
          <button onClick={handleDelete}>삭제</button>
        </div>
      )}
      <div className='sweet_text'>
        {!editMode ?
          <p>{text}</p> : (
          <form onSubmit={handleUpdate}>
            <textarea type='text' value={editText} onChange={(e) => setEditText(e.target.value)} />
            <button>Edit</button>
          </form>
          )}        
        {imgURL && <img src={imgURL} alt={text} />}            
        </div>       
      </div>
    </li>
  );
}

