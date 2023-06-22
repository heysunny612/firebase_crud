import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { getAuthState } from '../api/firebase';

const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isGettingUser, setIsGettingUser] = useState(false);
  

  useEffect(() => {
    getAuthState(setUser, setIsGettingUser);
  }, [user]);
  return (
    <UserContext.Provider value={{ user, isGettingUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
