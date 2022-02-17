import { useCallback, useState, useEffect, useContext } from "react";
import bikeServices from "../../services/BikeServices";


import AdminContext from '../../context/Admin/AdminContext'

import { useSnackbar } from 'notistack';


export default function useAdminBike(page = { isPageAdminBike: true }) {
  const { bikes, setBikes, points, setPoints, isBikeLoading, setIsBikeLoading } = useContext(AdminContext)
  const { enqueueSnackbar } = useSnackbar();
  const [pointIndex, setPointIndex] = useState(-1);

  const updateBike = useCallback(
    (id_bike, active) => {
      setIsBikeLoading(true)
      let data = { "id_bike": id_bike, "active": active }
      bikeServices
        .updateBike(data)
        .then((data) => {
          console.log(data)
          updateArrayBike(id_bike)
          if (points.length>0) indexUpdateArrayPoints(id_bike, data.data.active)
          enqueueSnackbar('Bicicleta modificada con éxito.', { variant: 'success' });
          setIsBikeLoading(false)
        })
        .catch((error) => {
          console.log(error)
          enqueueSnackbar('Ha habido algún problema y no se ha hecho ninguna modifición.', { variant: 'error' });
          setIsBikeLoading(false)
        });
    },
    [bikes, points]
  );


  const updateArrayBike = useCallback((id_bike) => {
    console.log(bikes)
    let index = bikes.findIndex((bike) => {
      return bike.id === id_bike
    })
    console.log(index)
    let updatebike = [...bikes]
    updatebike[index].active = !updatebike[index].active;
    setBikes(updatebike)
  },
    [bikes]
  );


  const indexUpdateArrayPoints = useCallback((id_bike,active) => {
    console.log("EEEI", id_bike)
    console.log(points)
    let index = points.findIndex(function (point) {
      if (point.bike) {
        return point.bike.id === id_bike
      }
    })
    let updatePoints = [...points]
    updatePoints[index].bike.active = active;
    setPoints(updatePoints)

  },
    [points]
  );


  return { bikes, setBikes, isLoading: isBikeLoading, updateBike, pointIndex, setPointIndex };
}
