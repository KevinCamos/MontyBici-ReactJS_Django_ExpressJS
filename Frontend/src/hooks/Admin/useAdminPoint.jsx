import { useCallback, useState, useEffect } from "react";
import pointServices from "../../services/PointServices";



import { useSnackbar } from 'notistack';


export default function useAdminPoint() {
  const [points, setPoints] = useState([]);
  const [isLoadingPoint, setIsLoadingPoint] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

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



  return {  points,setPoints,  isLoadingPoint, updatePoint };
}
