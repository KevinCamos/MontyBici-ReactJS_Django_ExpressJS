import { useContext, useEffect, } from "react";
import stationsServices from "../services/StationsServices";

import StationsContext from '../context/StationsContext'

const useStation = () => {
  const { stations, setStations } = useContext(StationsContext)
  useEffect(
    function () {
      stationsServices.getStations().then((stations) => {
        console.log(stations.data.results)
        setStations(stations.data.results);
      });
    },
    [setStations]
  );

  return { stations };

}
export default useStation