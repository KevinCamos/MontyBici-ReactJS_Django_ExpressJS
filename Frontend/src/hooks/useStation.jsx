import { useContext, useEffect } from 'react';
import stationsServices from '../services/StationsServices';

import StationsContext from '../context/StationsContext';

const useStation = () => {
  const { stations, setStations } = useContext(StationsContext);
  useEffect(() => {
    stationsServices.getStations().then((response) => {
      setStations(response.data.results);
    });
  }, [setStations]);

  return { stations };
};
export default useStation;
