import React, { useState } from 'react';
import '../styles/pages/profile.scss'
import { useQuery } from 'react-query';
import { readSweet, updateName } from '../api/firebase';
import { useUserContext } from '../context/UserContext';
import Sweet from '../components/Sweet';

export default function Profile() {
  const { data: sweets } = useQuery('sweets', readSweet);
  const { user, refreshUser } = useUserContext()
  const [newDisplayName, setNewDisplayName] = useState('')
  const mySweets = sweets && sweets.filter((sweet) => sweet.user.id === user.uid);
  const handleSubmit = (e) => {
    e.preventDefault()
    if (user.displayName !== newDisplayName) {
      updateName(user, newDisplayName)
        .then(() => {
          refreshUser();
        })
    }
    setNewDisplayName('')
    alert('닉네임이 변경되었습니다.')
  }

  const handleChange = (e) => setNewDisplayName(e.target.value)
  return (
  <>
    { user && (
    <div className='profile__container'>
      <h2 className='common_h2'>My Profle</h2>
      <div className='edit_profile'>
        <form onSubmit={handleSubmit}>
          <p>Nick Name : <span>{user.displayName}</span></p>
          <div>
            <input type="text" value={newDisplayName} onChange={handleChange} placeholder='새로운 닉네임' />
            <button>Change</button>
          </div>
        </form>
      </div>
      <h2 className='common_h2'>My Sweets</h2>
      {sweets &&
        <ul className='sweet__list'>
          {mySweets.map((sweet) => (
            <Sweet key={sweet.id} sweet={sweet} />
          ))}
        </ul>
      }
        </div>)}
    </>)
}
