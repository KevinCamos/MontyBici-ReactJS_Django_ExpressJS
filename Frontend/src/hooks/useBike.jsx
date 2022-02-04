import { useCallback, useState, useContext } from "react";
import bikeServices from "../services/BikeServices";
import UserContext from "../context/UserContext";
import StationsContext from "../context/StationsContext";

import { useSnackbar } from 'notistack';


export default function useBike() {
  const { enqueueSnackbar } = useSnackbar();
  const { stations, setStations } = useContext(StationsContext)
  const { user, setUser, isRegisters, setIsRegisters } = useContext(UserContext);
  const [errorBike, setErrorBike] = useState(null);
  const response = {
    secondary: "Esta bicicleta se encuentra inhabilitada temporalmente",
    disabled: "En este punto no hay ninguna bicicleta aparcada",
  };
  const [value, setValue] = useState(0);

  
  const obtainBike = useCallback(

    (id_point) => {

      console.log({ id_point: id_point });
      bikeServices
        .obtainBike({ id_point: id_point })
        .then((data) => {
          enqueueSnackbar('Disfruta de la bicicleta.', { variant: 'success' });
          removeBike(id_point)
          let refreshUser = { ...user }
          refreshUser.profile = data.data.user;
          setUser(refreshUser)
          setIsRegisters(true)

          setErrorBike(null);

        })
        .catch((error) => {
          // console.error(error.response.data.errors[0]);
          let detailerror = error.response.data.errors
          let errors = detailerror.detail ? detailerror.detail : detailerror[0];
          setErrorBike(errors);
          enqueueSnackbar('Ha habido un error en la bicicleta.', { variant: 'error' });

        });
    },
    [setErrorBike, user, setUser]
  );

  const returnBike = useCallback(
    (id_point) => {
      console.log({ id_point: id_point });
      bikeServices
        .returnBike({ id_point: id_point })
        .then((data) => {
          addBike(id_point, data.data)
          let refreshUser = { ...user }
          refreshUser.profile = data.data.user;
          setUser(refreshUser)
          setIsRegisters(false)
          setErrorBike(null);
          enqueueSnackbar('Bicicleta devuelta con éxito, muchas gracias.', { variant: 'success' });

        })
        .catch((error) => {
          // console.error(error.response.data.errors[0]);
          let detailerror = error.response.data.errors
          let errors = detailerror.detail ? detailerror.detail : detailerror[0];
          setErrorBike(errors);
          enqueueSnackbar('Ha habido un error devolviendo la bicicleta, si este error persiste, llama a servicio técnico al telefono 920 XXX XXX.', { variant: 'error' });

        });
    },
    [setErrorBike, user, setUser]
  );


  const removeBike = (id_point) => {
    let refreshStations = [...stations]
    refreshStations.map((station) => station.points.map((point) => {
      if (point.id === id_point) point.bike = null
      return point
    }))
    setStations(refreshStations)
  }

  const addBike = (id_point, data) => {
    let refreshStations = [...stations]
    console.log(data)
    refreshStations.map((station) => station.points.map((point) => {

      if (point.id === id_point) point.bike = data.bike
      return point
    }))
    console.log(refreshStations)
    setStations(refreshStations)
  }


  const statusBike = useCallback((bike) => {
    let result;
    if (!bike) result = "disabled";
    else if (!bike.active) result = "secondary";
    else result = "primary";

    return result;
    // return bike ? (bike.active ? "primary" : "secondary") : "disabled"
  }, []);
  const statusPoint = useCallback((point) => {
    let result;
    if (point.bike) result = "disabled";
    else if (!point.active) result = "secondary";
    else result = "primary";
    return result;
  }, []);




 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return { statusBike, statusPoint, handleChange, value, response, obtainBike, returnBike, errorBike, isRegisters };
}
