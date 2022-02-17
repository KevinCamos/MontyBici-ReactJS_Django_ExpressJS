import React, { useState, useEffect } from "react";
import notificationsService from "../../services/NotificationService";
import bikeServices from "../../services/BikeServices";
const Context = React.createContext({});

export function AdminContextProvider({ children }) {
  const [bikes, setBikes] = useState([]);
  const [points, setPoints] = useState([]);
  const [notifications, setNotifications] = useState([])
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isBikeLoading, setIsBikeLoading] = useState(false);

  useEffect(
    function () {
      if (isLogged === true) {
        setIsLoading(true);
        notificationsService.getNotifications()
          .then((data) => {
            setTotalNotifications(data.data.length)
            setNotifications(data.data)
            setIsLoading(false);
          }).catch((error) => {
            console.log(error)
            setIsLoading(false);
          });
      }
    },
    [isLogged]
  )


  useEffect(
    function () {
      if (bikes.length === 0) {
        setIsBikeLoading(true)
        bikeServices.getBikesPointsStations().then((data) => {
          setBikes(data.data.results);
          setIsBikeLoading(false)
        }).catch(error => {
          console.log(error)
        });
      }
    },
    [bikes]
  );


  return <Context.Provider value={{
    bikes, setBikes, points, setPoints,
    totalNotifications, setTotalNotifications, notifications, setNotifications,
    isLoading, setIsLoading, isLogged, setIsLogged, isBikeLoading, setIsBikeLoading
  }}>
    {children}
  </Context.Provider>;
}

export default Context;
