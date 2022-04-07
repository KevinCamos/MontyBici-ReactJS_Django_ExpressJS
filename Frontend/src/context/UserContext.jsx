import React, { useState } from 'react';
import userServices from '../services/UserServices';

const Context = React.createContext({});

export function UserContextProvider({ children }) {
  const [isJWTLoading, setIsJWTLoading] = useState(true);

  const checkUser = () => {
    if (sessionStorage.token) {
      userServices
        .checkUser()
        .then((data) => {
          const dataUser = data.data.user;
          sessionStorage.setItem('token', dataUser.token);
          setJWT(dataUser.token);

          setUser(dataUser);
          setIsJWTLoading(false);
          if (dataUser.profile.registers) {
            setIsRegisters(true);
          } else {
            setIsRegisters(false);
          }
        })
        .catch((error) => {
          sessionStorage.removeItem('token');
          setJWT(null);
          setIsJWTLoading(false);
          setIsRegisters(false);
          setUser(null);
          error.log(error);
        });
    } else {
      setIsJWTLoading(false);
    }
  };

  const [isRegisters, setIsRegisters] = useState(false);
  const [jwt, setJWT] = useState(() => checkUser());
  const [user, setUser] = useState(null);
  return (
    <Context.Provider
      value={{
        jwt,
        setJWT,
        user,
        setUser,
        isJWTLoading,
        setIsJWTLoading,
        isRegisters,
        setIsRegisters
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
