import React, { useState, useEffect } from "react";
import notificationsService from "../../services/NotificationService";

const Context = React.createContext({});

export function AdminContextProvider({ children }) {
  const [bikes, setBikes] = useState([]);
  const [points, setPoints] = useState([]);
  const [notifications, setNotifications] = useState([])
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(
     function () {
       if(isLogged===true){
      setIsLoading(true);
      notificationsService.getNotifications()
        .then((data) => {
          console.log("EHHHHHHH3")
          setTotalNotifications(data.data.length)
          setNotifications(data.data)
          console.log(data)

          setIsLoading(false);
        }).catch((error) => {
          console.log("EHHHHRROR")
          console.log(error)

          setIsLoading(false);

        });
}
    },
    [isLogged]
  )
  return <Context.Provider value={{ bikes, setBikes, points, setPoints,
   totalNotifications, setTotalNotifications, notifications, setNotifications, 
   isLoading, setIsLoading,isLogged,setIsLogged }}>
    {children}
  </Context.Provider>;
}

export default Context;
