import {  useContext,  useEffect , /* useState */} from "react";
import stationsServices from "../services/StationsServices";

import StationsContext from '../context/StationsContext'

export default function useStations() {
  // const [stations, setStations] = useContext([]);
  const {stations, setStations} = useContext(StationsContext)
  // const {loading, setLoading} = useState(false)
  // setStations([])
  useEffect(
    function () {
      // setLoading(true)

      stationsServices.getStations().then((stations) => {
        console.log(stations.data.results)
        setStations(stations.data.results);
        // setLoading(false)
        // guardamos la keyword en el localStorage
        // localStorage.setItem('lastKeyword', keyword)
      });
    },
    [setStations/* ,setLoading */]
  );

  return { stations,  /* loading */ };

}
