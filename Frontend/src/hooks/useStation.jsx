import {  useContext,  useEffect } from "react";
import stationsServices from "../services/StationsServices";
import StationsContext from '../context/StationsContext'

export default function useStations() {
  // const [stations, setStations] = useContext([]);
  const {stations, setStations} = useContext(StationsContext)
  // const {loadin, setLoading} = useContext(false)
  // setStations([])
  useEffect(
    function () {
      stationsServices.getStations().then((stations) => {
        console.log(stations.data)
        setStations(stations.data);
        // guardamos la keyword en el localStorage
        // localStorage.setItem('lastKeyword', keyword)
      });
    },
    [setStations]
  );
console.log(stations)
  return { stations };
}
