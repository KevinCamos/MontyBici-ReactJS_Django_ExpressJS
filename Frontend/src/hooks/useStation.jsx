import { /* useContext, */ useEffect, useState } from "react";
import stationsServices from "../services/StationsServices";
export default function useStations() {
  const [stations, setStations] = useState([]);

  useEffect(
    function () {
      // setLoading(true)

      stationsServices.getStations().then((stations) => {
        console.log(stations.data)
        setStations(stations.data);
        // setLoading(false)
        // guardamos la keyword en el localStorage
        // localStorage.setItem('lastKeyword', keyword)
      });
    },
    [setStations]
  );

  return { stations, setStations };
}
