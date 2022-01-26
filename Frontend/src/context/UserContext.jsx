import React, { useState } from "react";
import userServices from "../services/UserServices";

const Context = React.createContext({});

export function UserContextProvider({ children }) {
  const [isJWTLoading, setIsJWTLoading] = useState(true);

  const checkUser = () => {
    if (sessionStorage.token) {
      userServices
        .checkUser()
        .then((data) => {
          sessionStorage.setItem("token", data.data.user.token);
          setJWT(data.data.user.token);
          setUser(data.data.user);
          setIsJWTLoading(false);
        })
        .catch((error) => {
          sessionStorage.removeItem("token");
          setJWT(null);
          setIsJWTLoading(false);
          error.log(error);
        });
    } else {
      setIsJWTLoading(false);
    }
  };

  const [jwt, setJWT] = useState(() => checkUser());
  const [user, setUser] = useState(null);

  return <Context.Provider value={{ jwt, setJWT, user, setUser, isJWTLoading, setIsJWTLoading }}>{children}</Context.Provider>;
}

export default Context;
