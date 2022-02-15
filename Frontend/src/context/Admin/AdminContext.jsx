import React, { useState } from "react";
// import { useStateIfMounted } from "use-state-if-mounted";

const Context = React.createContext({});

export function AdminContextProvider({ children }) {
  // #https://exerror.com/cant-perform-a-react-state-update-on-an-unmounted-component-in-react-hooks/
  // const [stations, setStations] = useStateIfMounted([]);
  const [bikes, setBikes] = useState([]);
  const [points, setPoints] = useState([]);

  return <Context.Provider value={{ bikes, setBikes, points, setPoints }}>
    {children}
  </Context.Provider>;
}

export default Context;
