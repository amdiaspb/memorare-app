import { createContext, useState } from 'react';

export const UserContext = createContext();
const user = JSON.parse(localStorage.getItem("userData"));

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(user);

  function setData(value) {
    localStorage.setItem("userData", JSON.stringify(value));
    setUserData(value);
  }
  
  return (
    <UserContext.Provider value={{ userData, setData }}>
      {children}
    </UserContext.Provider>
  );
}
