import { useCallback, useState, useEffect } from "react";
import bikeServices from "../../services/BikeServices";



import { useSnackbar } from 'notistack';


export default function useAdminBike(isPageAdminBike = { isPageAdminBike: true }) {

  const [bikes, setBikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  const [pointIndex, setPointIndex] = useState(-1);



  useEffect(
    function () {
      let isPage = isPageAdminBike.isPageAdminBike
      console.log(isPage)
      console.log(isPageAdminBike)
      console.log(isPageAdminBike.isPageAdminBike)
      if (isPage) {
        bikeServices.getBikesPointsStations().then((data) => {
          console.log(data.data.results)
          setBikes(data.data.results);
          setIsLoading(false)
        });
      }
    },
    []
  );

  const updateBike = useCallback(
    (id_bike, active, array) => {
      setIsLoading(true)
      let data = { "id_bike": id_bike, "active": active }
      bikeServices
        .updateBike(data)
        .then((data) => {
          if (isPageAdminBike.isPageAdminBike) updateArrayBike(id_bike, data.data.id, array)
          else indexUpdateArrayPoints(id_bike, data.data.id, array)
          enqueueSnackbar('Bicicleta modificada con éxito.', { variant: 'success' });
          setIsLoading(false)
        })
        .catch((error) => {
          console.log(error)
          enqueueSnackbar('Ha habido algún problema y no se ha hecho ninguna modifición.', { variant: 'error' });
          setIsLoading(false)
        });
    },
    []
  );


  const updateArrayBike = useCallback((id_bike, active, bikes) => {
    let index = bikes.findIndex((bike) => {
      return bike.id === id_bike
    })
    console.log(index)
    let updatebike = [...bikes]
    updatebike[index].active = active;
    setBikes(updatebike)
  },
    []
  );


  const indexUpdateArrayPoints = useCallback((id_bike, active, points) => {
    console.log("EEEI", id_bike)
    console.log(points)
    // let index = bikes.findIndex(function (bike) {
    //   console.log(bike.id, id_bike)
    //   return bike.id === id_bike
    // })
    let index = points.findIndex(function (point) {
      if (point.bike) {
        return point.bike.id === id_bike
      }
    })
    setPointIndex(index)

  },
    []
  );


  return { bikes, isLoading, updateBike, pointIndex,setPointIndex};
}
