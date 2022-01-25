import React, { useState } from "react";
import userServices from "../services/UserServices";

const Context = React.createContext({});

export function UserContextProvider({ children }) {
  const checkUser = () => {
    if (sessionStorage.token) {
      userServices
        .checkUser()
        .then((data) => {
          sessionStorage.setItem("token", data.data.user.token);
          setJWT(data.data.user.token);
          setUser(data.data.user);
        })
        .catch((error) => {
          sessionStorage.removeItem("token");
          setJWT(null);

          error.log(error);
          // window.location.reload();

        });
    }
  };


  const [jwt, setJWT] =  useState(() => checkUser());
  const [user, setUser] = useState(null);


  return <Context.Provider value={{ jwt, setJWT, user, setUser }}>{children}</Context.Provider>;
}

export default Context;


