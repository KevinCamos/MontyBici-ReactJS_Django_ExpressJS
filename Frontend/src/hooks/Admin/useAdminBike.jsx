import { useCallback, useState, useContext, useEffect } from "react";
import bikeServices from "../../services/BikeServices";
import UserContext from "../../context/UserContext";
import StationsContext from "../../context/StationsContext";
import { useNavigate } from "react-router-dom";


import { useSnackbar } from 'notistack';


export default function useBike(admin = { admin: false }) {
  const [bikes, setBikes] = useState([]);
  const [errorBike, setErrorBike] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  

  
  useEffect(
    function () {
      bikeServices.getBikesPointsStations().then((data) => {
        console.log(data.data.results)
        setBikes(data.data.results);
      });
    },
    []
  );
  
  // const updateBikeIsActive = useCallback(

  //   (id_bike) => {
  //     // setIsLoading(true)

  //     console.log({ id_bike: id_bike });
  //     bikeServices
  //       .updateBikeIsActive({ id_bike: id_bike })
  //       .then((data) => {
  //      console.log(data)
  //       })
  //       .catch((error) => {
  //       console.log(error)
  //       // setErrorBike(true)


  //       });
  //   },
  //   []
  // );





  return { errorBike,bikes, isLoading };
}
