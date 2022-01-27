import { useContext, useEffect, useState } from "react";
import stationsServices from "../services/StationsServices";

import StationsContext from "../context/StationsContext";

export default function useOnlyStation({ slug }) {
  const { stations } = useContext(StationsContext);
console.log(stations)
  const gifFromCache = stations.find((station) => station.slug === slug);
  const [oneStation, setOneStation] = useState(gifFromCache);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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
          
        }else{

          setIsLoading(false);
        }
    },
    [setOneStation, slug, oneStation, setIsLoading, setIsError]
  );

  return { oneStation, isLoading, isError };
}
