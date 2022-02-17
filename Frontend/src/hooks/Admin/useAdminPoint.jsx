import { useCallback, useState, useEffect, useContext } from "react";
import pointServices from "../../services/PointServices";



import { useSnackbar } from 'notistack';

import AdminContext from '../../context/Admin/AdminContext'

export default function useAdminPoint() {
  const { bikes, setBikes, points, setPoints } = useContext(AdminContext)

  // const [points, setPoints] = useState([]);
  const [isLoadingPoint, setIsLoadingPoint] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [isBikeUpdate, setIsBikeUpdate] = useState(false);
  const [updateBikePoint, setUpdateBikePoint] = useState(null);

  useEffect(
    function () {
      setIsLoadingPoint(true)
      pointServices.getPointsStations().then((data) => {
        setPoints(data.data.results);
        setIsLoadingPoint(false)
      });
    },
    []
  );

  const updatePoint = useCallback(
    (id_point, active) => {
      setIsLoadingPoint(true)
      let data = { "id_point": id_point, "active": active }
      console.log(data)
      pointServices
        .updatePoint(data)
        .then((data) => {
          console.log(data)
          updateArrayPoint(id_point)
          enqueueSnackbar('Point modificado con éxito.', { variant: 'success' });
          setIsLoadingPoint(false)

        })
        .catch((error) => {
          console.log(error)
          enqueueSnackbar('Ha habido algún problema y no se ha hecho ninguna modifición.', { variant: 'error' });
          setIsLoadingPoint(false)

        });
    },
    [points]
  );


  const updateArrayPoint = useCallback((id_point) => {
    console.log(points)
    console.log("entra ací")
    let index = points.findIndex(function (point) {
      return point.id === id_point
    })

    let updatepoint = [...points]
    console.log()
    if (index !== -1) {
      updatepoint[index].active = !updatepoint[index].active;
      console.log(updatepoint[index])
      setPoints(updatepoint)
      console.log(updatepoint)
      console.log(points)

    }
  },
    [points]
  );


////ACÍ!!

  const updatePointsBike = useCallback(
    (id_point, bike_id, point_id) => {
      setIsLoadingPoint(true)
      let data = { "id_point": id_point, "id_bike": bike_id }
      pointServices
        .updatePointsBike(data)
        .then((data) => {
          updateArrayPointsBike(data.data, bike_id, point_id)
          enqueueSnackbar('Bicicleta cambiada de sitio.', { variant: 'success' });
          setIsLoadingPoint(false)

        })
        .catch((error) => {
          console.log(error)
          enqueueSnackbar('Ha habido algún problema y no se ha hecho ninguna modifición.', { variant: 'error' });
          setIsLoadingPoint(false)

        });
    },
    [points]
  );

  const updateArrayPointsBike = useCallback((newPoint, bike_id, point_id) => {
    let updatepoint = [...points]
    if (bike_id) {
      let indexRemove = points.findIndex(function (point) {
        if (point.bike) {
          return point.bike.id === bike_id
        }
      })
      if (indexRemove !== -1) {
        bike_id = updatepoint[indexRemove].bike
        updatepoint[indexRemove].bike = null;
      }


      //Cuando se elimina una bici de un slot, pero no tenemos la ID de la Bici que hemos eliminado
    } else {
      let indexRemove = points.findIndex(function (point) {
        return point.id === point_id

      })
      if (indexRemove !== -1) {
        bike_id = updatepoint[indexRemove].bike
        updatepoint[indexRemove].bike = null;
      }
    }
    let indexAdd = points.findIndex(function (point) {
      return point.id === newPoint.id
    })
    updatepoint[indexAdd] = newPoint;
    setPoints(updatepoint)

let prueba 
    if (newPoint.bike) prueba=({ "bike": newPoint.bike, "points": newPoint.id })
    else prueba=({ "bike": bike_id, "points": null })





    // setIsBikeUpdate(false)
    let updateBikes = bikes.map(function (bike) {
      console.log(prueba.bike.id === bike.id)
        if (prueba.bike.id === bike.id) {
            if (prueba.points) bike.points = { "id": prueba.points }
            else bike.points = null
        }
        return bike
    })
    let newArrBikes = [...updateBikes]
    setBikes(newArrBikes)



    
    // setIsBikeUpdate(true)
  },
    [points,bikes]
  );




  return { points, setPoints, isLoadingPoint, updatePoint, updatePoint, updatePointsBike, isBikeUpdate, setIsBikeUpdate, updateBikePoint };
}
