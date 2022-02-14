import { useCallback, useState, useEffect } from "react";
import bikeServices from "../../services/BikeServices";



import { useSnackbar } from 'notistack';


export default function useAdminBike(page = { isPageAdminBike: true }) {

  const [bikes, setBikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  const [pointIndex, setPointIndex] = useState(-1);






  useEffect(
    function () {
      let isPage = page.isPageAdminBike
      console.log(isPage)
      console.log(page)
      console.log(page.isPageAdminBike)
      if (bikes.length===0) {
        setIsLoading(true)
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
    (id_bike, active, arrayBikes, arrayPoints = []) => {
      setIsLoading(true)
      alert(active)
      let data = { "id_bike": id_bike, "active": active }
      // console.log(data)
      // AudioWorklet(active)
      bikeServices
        .updateBike(data)
        .then((data) => {
          console.log(data)
           updateArrayBike(id_bike, arrayBikes)
           if (!page.isPageAdminBike) indexUpdateArrayPoints(id_bike, arrayPoints)
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


  const updateArrayBike = useCallback((id_bike, bikes) => {
    console.log(bikes)
    let index = bikes.findIndex((bike) => {
      return bike.id === id_bike
    })
    console.log(index)
    let updatebike = [...bikes]
    updatebike[index].active = !updatebike[index].active;
    setBikes(updatebike)
  },
    []
  );


  const indexUpdateArrayPoints = useCallback((id_bike, points) => {
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


  return { bikes,setBikes, isLoading, updateBike, pointIndex,setPointIndex};
}
