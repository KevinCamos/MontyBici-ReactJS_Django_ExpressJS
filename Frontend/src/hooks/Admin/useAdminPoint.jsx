import { useCallback, useState, useEffect, useContext } from 'react';
import { useSnackbar } from 'notistack';
import pointServices from '../../services/PointServices';

import AdminContext from '../../context/Admin/AdminContext';

export default function useAdminPoint() {
  const { bikes, setBikes, points, setPoints } = useContext(AdminContext);
  const [isLoadingPoint, setIsLoadingPoint] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setIsLoadingPoint(true);
    pointServices.getPointsStations().then((data) => {
      setPoints(data.data.results);
      setIsLoadingPoint(false);
    });
  }, []);

  const updatePoint = useCallback(
    (idPoint, active) => {
      setIsLoadingPoint(true);
      const data = { id_point: idPoint, active };
      pointServices
        .updatePoint(data)
        .then(() => {
          updateArrayPoint(idPoint);
          enqueueSnackbar('Point modificado con éxito.', {
            variant: 'success'
          });
          setIsLoadingPoint(false);
        })
        .catch(() => {
          enqueueSnackbar(
            'Ha habido algún problema y no se ha hecho ninguna modifición.',
            { variant: 'error' }
          );
          setIsLoadingPoint(false);
        });
    },
    [points]
  );

  const updateArrayPoint = useCallback(
    (idPoint) => {
      const index = points.findIndex((point) => point.id === idPoint);

      const updatepoint = [...points];
      if (index !== -1) {
        updatepoint[index].active = !updatepoint[index].active;
        setPoints(updatepoint);
      }
    },
    [points]
  );

  const updateArrayPointsBike = useCallback(
    (newPoint, bikeId, pointId) => {
      const updatepoint = [...points];
      if (bikeId) {
        const indexRemove = points.findIndex((point) => {
          if (point.bike) {
            return point.bike.id === bikeId;
          }
        });
        if (indexRemove !== -1) {
          bikeId = updatepoint[indexRemove].bike;
          updatepoint[indexRemove].bike = null;
        }

        // Cuando se elimina una bici de un slot, pero no tenemos la ID de la Bici que hemos eliminado
      } else {
        const indexRemove = points.findIndex((point) => point.id === pointId);
        if (indexRemove !== -1) {
          bikeId = updatepoint[indexRemove].bike;
          updatepoint[indexRemove].bike = null;
        }
      }
      const indexAdd = points.findIndex((point) => point.id === newPoint.id);
      updatepoint[indexAdd] = newPoint;
      setPoints(updatepoint);

      let newDataBike;
      if (newPoint.bike)
        newDataBike = { bike: newPoint.bike, points: newPoint.id };
      else newDataBike = { bike: bikeId, points: null };

      const updateBikes = bikes.map((bike) => {
        if (newDataBike.bike.id === bike.id) {
          if (newDataBike.points) bike.points = { id: newDataBike.points };
          else bike.points = null;
        }
        return bike;
      });
      const newArrBikes = [...updateBikes];
      setBikes(newArrBikes);
    },
    [points, bikes]
  );

  const updatePointsBike = useCallback(
    (idPoint, bikeId, pointI) => {
      setIsLoadingPoint(true);
      const data = { id_point: idPoint, id_bike: bikeId };
      pointServices
        .updatePointsBike(data)
        .then((response) => {
          updateArrayPointsBike(response.data, bikeId, pointI);
          enqueueSnackbar('Bicicleta cambiada de sitio.', {
            variant: 'success'
          });
          setIsLoadingPoint(false);
        })
        .catch(() => {
          enqueueSnackbar(
            'Ha habido algún problema y no se ha hecho ninguna modifición.',
            { variant: 'error' }
          );
          setIsLoadingPoint(false);
        });
    },
    [points]
  );

  return {
    points,
    setPoints,
    isLoadingPoint,
    updatePoint,
    updatePointsBike
  };
}
