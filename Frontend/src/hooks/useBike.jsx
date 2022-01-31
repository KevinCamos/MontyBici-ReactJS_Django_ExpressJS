import { useCallback, useState,useEffect } from "react";
import bikeServices from "../services/BikeServices";

export default function useStations() {
  // const {stations, setStations} = useContext(StationsContext)
  const [errorBike, setErrorBike] = useState(null);
  const obtainBike = useCallback(
    (data) => {
      console.log({ id_point: data });
      bikeServices
        .obtainBike({ id_point: data })
        .then((data) => {
          let user = data.data.user;
          console.log(user);
          setErrorBike(null);
        })
        .catch((error) => {
        
          console.error(error.response.data.errors[0]);
          let detailerror= error.response.data.errors
          let errors= detailerror.detail? detailerror.detail : detailerror[0];
          setErrorBike(errors);
        });
    },
    [setErrorBike]
  );



  const statusBike = useCallback((bike) => {
    let result;
    if (!bike) result = "disabled";
    else if (!bike.active) result = "secondary";
    else result = "primary";

    return result;
    // return bike ? (bike.active ? "primary" : "secondary") : "disabled"
  }, []);



  const response = {
    secondary: "Esta bicicleta se encuentra inhabilitada temporalmente",
    disabled: "En este punto no hay ninguna bicicleta aparcada",
  };
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return { statusBike, handleChange, value, response, obtainBike,errorBike };
}
