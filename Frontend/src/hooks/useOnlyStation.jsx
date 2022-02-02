import { useContext, useEffect, useState } from "react";
import stationsServices from "../services/StationsServices";

import StationsContext from "../context/StationsContext";

export default function useOnlyStation({ slug }) {
  const { stations, setStations } = useContext(StationsContext);
  var stationFromCache = stations.find((station) => station.slug === slug);
  console.log(stationFromCache)
  const [oneStation, setOneStation] = useState(newcache);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);


console.log("eh1")
  useEffect(
    function () {
      
      if (!oneStation) {
        setIsLoading(true);
        stationsServices
          .getOneStation(slug)
          .then((stations) => {

            console.log(stations.data.count);
            if (stations.data.count === 1) {
              setOneStation(stations.data.results[0]);
              setStations([stations.data.results[0]])
              setIsError(false);
            } else {
              setIsError(true);
            }
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            setIsError(true);
          });
      } else {
        setIsLoading(false);
      }
    },

    [  slug, oneStation, isLoading, isError ]
  );
  // useEffect(
  //   function () {
  //   stationFromCache = stations.find((station) => station.slug === slug)
  //   setOneStation(stationFromCache)
  //   console.log("eh2")
  //   },

  //   []
  // );

  return { oneStation, isLoading, isError };
}
