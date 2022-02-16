import React, { useState, useEffect } from "react";
import notificationsService from "../../services/NotificationService";

const Context = React.createContext({});

export function AdminContextProvider({ children }) {
  const [bikes, setBikes] = useState([]);
  const [points, setPoints] = useState([]);
  const [notifications, setNotifications] = useState([])
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    async function () {
      setIsLoading(true);
      notificationsService.getNotifications()
        .then((data) => {
          console.log(data)
          setTotalNotifications(data.data.length)
          setNotifications(data.data)
          console.log(data)

          setIsLoading(false);
        }).catch((error) => {
          setIsLoading(false);

        });

    },
    []
  )
  return <Context.Provider value={{ bikes, setBikes, points, setPoints, totalNotifications, setTotalNotifications, notifications, setNotifications, isLoading, setIsLoading }}>
    {children}
  </Context.Provider>;
}

export default Context;
