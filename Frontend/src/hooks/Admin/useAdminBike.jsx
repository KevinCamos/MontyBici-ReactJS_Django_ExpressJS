import { useCallback, useState, useEffect } from "react";
import bikeServices from "../../services/BikeServices";



import { useSnackbar } from 'notistack';


export default function useAdminBike(admin = { admin: false }) {
  const [bikes, setBikes] = useState([]);
  // const [errorBike, setErrorBike] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { enqueueSnackbar } = useSnackbar();




  useEffect(
    function () {
      bikeServices.getBikesPointsStations().then((data) => {
        console.log(data.data.results)
        setBikes(data.data.results);
        setIsLoading(false)
      });
    },
    []
  );

  const updateBike = useCallback(
    (id_bike, active, bikes) => {
      setIsLoading(true)
      let data = { "id_bike": id_bike, "active": active }
      bikeServices
        .updateBike(data)
        .then((data) => {
          updateArrayBike(id_bike, data.data.id, bikes)
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
    let index = bikes.findIndex(function (bike) {
      console.log(bike.id, id_bike)
      return bike.id === id_bike
    })
    console.log(index)
    let updatebike = [...bikes]
    updatebike[index].active = active;
    setBikes(updatebike)

  },
    []
  );



  return {  bikes, isLoading, updateBike };
}
