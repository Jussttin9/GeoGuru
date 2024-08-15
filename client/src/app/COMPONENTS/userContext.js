'use client'
import { createContext, useState, useContext } from 'react';

const UserContext = createContext('');

export const UserProvider = ({ children }) => {
  const [uid, setUid] = useState('not updated');

  return (
    <UserContext.Provider value={{ uid, setUid }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
