import { useCallback, useState } from "react";

export default function useStations() {
  // const {stations, setStations} = useContext(StationsContext)

  const statusBike = useCallback((bike) => {
    let result;
    if (!bike) result = "disabled";
    else if (!bike.active) result = "secondary";
    else result = "primary";

    return result;
    // return bike ? (bike.active ? "primary" : "secondary") : "disabled"
  }, []);

  const response = {

    "secondary": "Esta bicicleta se encuentra inhabilitada temporalmente",
    "disabled" : "En este punto no hay ninguna bicicleta aparcada"
  }
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return { statusBike ,handleChange, value,response };
}
