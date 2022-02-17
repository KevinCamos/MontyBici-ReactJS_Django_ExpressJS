import { useCallback, useState, useContext } from 'react';
import { useSnackbar } from 'notistack';
import bikeServices from '../../services/BikeServices';

import AdminContext from '../../context/Admin/AdminContext';

export default function useAdminBike() {
  const {
    bikes,
    setBikes,
    points,
    setPoints,
    isBikeLoading,
    setIsBikeLoading
  } = useContext(AdminContext);
  const { enqueueSnackbar } = useSnackbar();
  const [pointIndex, setPointIndex] = useState(-1);
  const indexUpdateArrayPoints = useCallback(
    (idBike, active) => {
      const index = points.findIndex((point) => {
        if (point.bike) {
          return point.bike.id === idBike;
        }
      });
      const updatePoints = [...points];
      updatePoints[index].bike.active = active;
      setPoints(updatePoints);
    },
    [points]
  );

  const updateArrayBike = useCallback(
    (idBike) => {
      const index = bikes.findIndex((bike) => bike.id === idBike);
      const updatebike = [...bikes];
      updatebike[index].active = !updatebike[index].active;
      setBikes(updatebike);
    },
    [bikes]
  );

  const updateBike = useCallback(
    (idBike, active) => {
      setIsBikeLoading(true);
      const data = { id_bike: idBike, active };
      bikeServices
        .updateBike(data)
        .then((response) => {
          updateArrayBike(idBike);
          if (points.length > 0)
            indexUpdateArrayPoints(idBike, response.data.active);
          enqueueSnackbar('Bicicleta modificada con éxito.', {
            variant: 'success'
          });
          setIsBikeLoading(false);
        })
        .catch((error) => {
          enqueueSnackbar(
            'Ha habido algún problema y no se ha hecho ninguna modifición.',
            { variant: 'error' }
          );
          setIsBikeLoading(false);
        });
    },
    [bikes, points]
  );

  return {
    bikes,
    setBikes,
    isLoading: isBikeLoading,
    updateBike,
    pointIndex,
    setPointIndex
  };
}
