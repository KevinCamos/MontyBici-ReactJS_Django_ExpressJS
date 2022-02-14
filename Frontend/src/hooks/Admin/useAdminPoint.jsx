import { useCallback, useState, useEffect } from "react";
import pointServices from "../../services/PointServices";



import { useSnackbar } from 'notistack';


export default function useAdminPoint() {
  const [points, setPoints] = useState([]);
  const [isLoadingPoint, setIsLoadingPoint] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [isBikeUpdate, setIsBikeUpdate] = useState(false);
  const [updateBikePoint, setUpdateBikePoint] = useState(null);

  useEffect(
    function () {
      setIsLoadingPoint(true)
      pointServices.getPointsStations().then((data) => {
        console.log(data.data.results)
        setPoints(data.data.results);
        setIsLoadingPoint(false)
      });
    },
    []
  );

  const updatePoint = useCallback(
    (id_point, active, points) => {
      setIsLoadingPoint(true)
      let data = { "id_point": id_point, "active": active }
      pointServices
        .updatePoint(data)
        .then((data) => {
          updateArrayPoint(id_point, data.data.id, points)
          enqueueSnackbar('Bicicleta modificada con éxito.', { variant: 'success' });
          setIsLoadingPoint(false)

        })
        .catch((error) => {
          console.log(error)
          enqueueSnackbar('Ha habido algún problema y no se ha hecho ninguna modifición.', { variant: 'error' });
          setIsLoadingPoint(false)

        });
    },
    []
  );


  const updateArrayPoint = useCallback((id_point, active, points) => {
    let index = points.findIndex(function (point) {
      console.log(point.id, id_point)
      return point.id === id_point
    })
    console.log(index)
    let updatepoint = [...points]
    updatepoint[index].active = active;
    setPoints(updatepoint)

  },
    []
  );




  const updatePointsBike = useCallback(
    (id_point, bike_id, points) => {
      console.log(points)
      setIsLoadingPoint(true)
      let data = { "id_point": id_point, "id_bike": bike_id }
      console.log(data)
      pointServices
        .updatePointsBike(data)
        .then((data) => {
          // console.log(data.data)
          updateArrayPointsBike(data.data, bike_id, points)
          enqueueSnackbar('Bicicleta cambiada de sitio.', { variant: 'success' });
          setIsLoadingPoint(false)

        })
        .catch((error) => {
          console.log(error)
          enqueueSnackbar('Ha habido algún problema y no se ha hecho ninguna modifición.', { variant: 'error' });
          setIsLoadingPoint(false)

        });
    },
    []
  );

  const updateArrayPointsBike = useCallback((newPoint, bike_id, points) => {
    alert(bike_id)
    console.log(newPoint)
    let updatepoint = [...points]
    if (bike_id) {
      alert("entra")
      console.log(bike_id)
      let indexRemove = points.findIndex(function (point) {
        if (point.bike) {
          return point.bike.id === bike_id
        }
      })
      console.log(indexRemove)
console.log("-----------")
      console.log(updatepoint[indexRemove])
      console.log("-----------")

      bike_id = updatepoint[indexRemove].bike
      console.log(bike_id)
      updatepoint[indexRemove].bike = null;
      console.log("-----------")
      console.log("-----------")
      console.log(updatepoint[indexRemove])

    }
    let indexAdd = points.findIndex(function (point) {
      return point.id === newPoint.id
    })
    updatepoint[indexAdd] = newPoint;
    setPoints(updatepoint)


    if (newPoint.bike) {
      setUpdateBikePoint({ "id": bike_id, "points": newPoint.id })

    } else {

      setUpdateBikePoint({ "id": bike_id, "points": null })

    }
    setIsBikeUpdate(true)
  },
    []
  );




  return { points, setPoints, isLoadingPoint, updatePoint, updatePoint, updatePointsBike, isBikeUpdate, setIsBikeUpdate, updateBikePoint };
}
