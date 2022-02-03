import React, { useState } from "react";
// import { useStateIfMounted } from "use-state-if-mounted";

const Context = React.createContext({});

export function StationsContextProvider({ children }) {
  // #https://exerror.com/cant-perform-a-react-state-update-on-an-unmounted-component-in-react-hooks/
  // const [stations, setStations] = useStateIfMounted([]);
  const [stations, setStations] = useState([]);

  return <Context.Provider value={{ stations, setStations }}>
    {children}
  </Context.Provider>;
}

export default Context;
