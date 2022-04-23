import { useCallback, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import bikeServices from '../services/BikeServices';
import UserContext from '../context/UserContext';
import StationsContext from '../context/StationsContext';

export default function useBike() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const { stations, setStations } = useContext(StationsContext);
  const { user, setUser, isRegisters, setIsRegisters } =
    useContext(UserContext);
  const [errorBike, setErrorBike] = useState(null);
  const response = {
    secondary: 'Esta bicicleta se encuentra inhabilitada temporalmente',
    disabled: 'En este punto no hay ninguna bicicleta aparcada'
  };
  const [value, setValue] = useState(0);

  const removeBike = (idPoint) => {
    const refreshStations = [...stations];
    refreshStations.map((station) =>
      station.points.map((point) => {
        if (point.id === idPoint) point.bike = null;
        return point;
      })
    );
    setStations(refreshStations);
  };
  const obtainBike = useCallback(
    (idPoint) => {
      
      if(user?.profile?.credit?.amount &&parseInt(user?.profile?.credit?.amount) >0 ){


      bikeServices
        .obtainBike({ id_point: idPoint })
        .then((data) => {
          enqueueSnackbar('Disfruta de la bicicleta.', { variant: 'success' });
          removeBike(idPoint);
          const refreshUser = { ...user };
          refreshUser.profile = data.data.user;
          setUser(refreshUser);
          setIsRegisters(true);

          // setErrorBike(null);
          navigate('/stations');
        })
        .catch((error) => {
          // console.error(error.response.data.errors[0]);
          const detailerror = error.response.data.errors;
          const errors = detailerror.detail
            ? detailerror.detail
            : detailerror[0];
          setErrorBike(errors);
          enqueueSnackbar('Ha habido un error en la bicicleta.', {
            variant: 'error'
          });
        });
      }else{
        enqueueSnackbar('No tienes suficiente dinero en el monedero, recarga antes de coger la bici.', {
          variant: 'error'
        });
      }
      },
   
    [setErrorBike, user, setUser]
  );

  const addBike = (idPoint, data) => {
    const refreshStations = [...stations];
    refreshStations.map((station) =>
      station.points.map((point) => {
        if (point.id === idPoint) point.bike = data.bike;
        return point;
      })
    );
    setStations(refreshStations);
  };
  const returnBike = useCallback(
    (idPoint) => {
      bikeServices
        .returnBike({ id_point: idPoint })
        .then((data) => {
          addBike(idPoint, data.data);
          const refreshUser = { ...user };
          refreshUser.profile = data.data.user;
          setUser(refreshUser);
          setIsRegisters(false);
          // setErrorBike(null);
          navigate('/stations');

          enqueueSnackbar('Bicicleta devuelta con éxito, muchas gracias.', {
            variant: 'success'
          });
        })
        .catch((error) => {
          const detailerror = error.response.data.errors;
          const errors = detailerror.detail
            ? detailerror.detail
            : detailerror[0];
          setErrorBike(errors);
          enqueueSnackbar(
            'Ha habido un error devolviendo la bicicleta, si este error persiste, llama a servicio técnico al telefono 920 XXX XXX.',
            { variant: 'error' }
          );
        });
    },
    [setErrorBike, user, setUser]
  );

  const statusBike = useCallback((bike) => {
    let result;
    if (!bike) result = 'disabled';
    else if (!bike.active) result = 'secondary';
    else result = 'primary';

    return result;
  }, []);
  const statusPoint = useCallback((point) => {
    let result;
    if (point.bike) result = 'disabled';
    else if (!point.active) result = 'secondary';
    else result = 'primary';
    return result;
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return {
    statusBike,
    statusPoint,
    handleChange,
    value,
    response,
    obtainBike,
    returnBike,
    errorBike,
    isRegisters
  };
}
