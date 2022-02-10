import { useContext, useEffect, useState } from "react";
import stationsServices from "../services/StationsServices";
import UserContext from "../context/UserContext";

import StationsContext from "../context/StationsContext";

const useOnlyStation = ({ slug }) => {
  const { isRegisters } = useContext(UserContext);

  const { stations, setStations } = useContext(StationsContext);

  var stationFromCache = stations.find((station) => station.slug === slug);
  const [oneStation, setOneStation] = useState(stationFromCache);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);


  useEffect(
    function () {
      // Al "if" se le ha añadido el slug, para así poder 
      // ir al servidor si no hay estación y en caso de haber
      // un slug, así podemos reutilizar el hook y evitar 
      // una petición fallida al servidor para el "create"
      // de una estación
      if (!oneStation && slug) {
        setIsLoading(true);
        stationsServices.getOneStation(slug)
          .then((stations) => {
            if (stations.data.count === 1) {
              setOneStation(stations.data.results[0]);
              setStations([stations.data.results[0]])
              setIsError(false);
            } else {
              setIsError(true);
            }
            setIsLoading(false);
          })
          .catch(() => {
            setIsLoading(false);
            setIsError(true);
          });
      } else {
        setIsLoading(false);
      }
    },

    [slug, oneStation, isLoading, isError]
  );

  return { oneStation, isLoading, isError, isRegisters };
}
export default useOnlyStation