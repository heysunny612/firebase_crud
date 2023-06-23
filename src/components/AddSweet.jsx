import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUserContext } from '../context/UserContext';
import { createSweet } from '../api/firebase';
import { useMutation, useQueryClient } from 'react-query';
import { FaFileUpload } from 'react-icons/fa';
import {AiFillDelete} from 'react-icons/ai'
import './AddSweet.scss';

export default function AddSweet() {
  const queryClient = useQueryClient();
  const { user } = useUserContext();
  const { register, handleSubmit, reset } = useForm();
  const [imgURL, setImgURL] = useState(null)
  const [isAdding,setIsAdding]=useState(false)
  const addSweet = useMutation((data) => createSweet(data), {
    onMutate: ()=> { setIsAdding(true) },
    onSuccess: () => {
      setIsAdding(false)
      queryClient.invalidateQueries(['sweets'])
    } 
  })
  const handleFile = (event) => {
    const { files } = event.target
    const reader = new FileReader();
    reader.readAsDataURL(files[0]) 
    reader.onloadend = (finishedEvent) => { setImgURL(finishedEvent.target.result) }    
  }
  const handleClearFile = ()=> setImgURL(null)
  const handleCreateSweet =async (data) => {
    const dataObj = {
      user: {
        id: user.uid,
        name: user.displayName,
        url: user.photoURL,
        email: user.email,
      },
      text: data.text,
      imgURL,
      createdAt: Date.now(),
    };  
    addSweet.mutate(dataObj) 
    reset();
    setImgURL(null)
  };
  return (
    <>
    {user && 
        <div className='add__sweet'>
          <div className='user_icon'>   {user?.photoURL ? <img src={user?.photoURL} alt={user?.name || user?.email} width='100%' /> : <span className='no_icon'>{user?.name?.charAt(0) && user?.email?.charAt(0)}</span>}</div>
          <form onSubmit={handleSubmit(handleCreateSweet)}>
            <textarea
              type='text'
              placeholder='What is happening?!'
              {...register('text', { required: true })}
            />
            {imgURL && <div className='add__image'><img src={imgURL} alt="이미지미리보기"   /></div>}
            <div className='add__buttons'>
              <div className='image_btns'>
                <input type="file" accept='image/*' onChange={handleFile} id='file-upload' />
                <label htmlFor="file-upload">
                  <FaFileUpload /> <span>Image 업로드</span>
                </label>
                {imgURL && <button className="delete_image" onClick={handleClearFile}><AiFillDelete/> <span>Image 삭제</span></button>}
              </div>
              <div className="add__btn"><button>Sweet</button></div>             
            </div>          
          </form>
                  
      </div>
      }
      {isAdding ? <p className='isLoading'>Sweet 업로드중...</p> : null} 
    </>
  );
}
