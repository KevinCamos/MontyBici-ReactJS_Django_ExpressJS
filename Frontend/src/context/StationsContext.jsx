import React, { useState } from 'react';

const Context = React.createContext({});

export function StationsContextProvider({ children }) {
  // #https://exerror.com/cant-perform-a-react-state-update-on-an-unmounted-component-in-react-hooks/
  const [stations, setStations] = useState([]);

  return (
    <Context.Provider value={{ stations, setStations }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
