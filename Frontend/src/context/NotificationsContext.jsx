import React, { useState } from "react";

const Context = React.createContext({});

export function NotificationsContextProvider({ children }) {
  const [reasons, setReasons] = useState([]);

  return <Context.Provider value={{ reasons, setReasons }}>
    {children}
  </Context.Provider>;
}

export default Context;
