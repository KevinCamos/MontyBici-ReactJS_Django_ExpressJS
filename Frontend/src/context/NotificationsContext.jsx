import React, { useState } from 'react';

const Context = React.createContext({});

export function NotificationsContextProvider({ children }) {
  const [reasons, setReasons] = useState([]);
  const [open, setOpen] = useState(false);

  return (
    <Context.Provider value={{ reasons, setReasons, open, setOpen }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
