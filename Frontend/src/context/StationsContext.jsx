import React, { useState } from "react";

const Context = React.createContext({});

export function StationsContextProvider({ children }) {
  const [stations, setStations] = useState([]);
  
  return <Context.Provider value={{ stations, setStations }}>
      {children}
  </Context.Provider>;
}

export default Context;
