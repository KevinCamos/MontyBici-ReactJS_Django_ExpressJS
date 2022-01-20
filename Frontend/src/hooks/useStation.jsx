// import UserContext from "context/UserContext";
import stationsServices from "../services/StationsServices";
export default function useStations() {
  const stations = () => {
    stationsServices
      .getStations()
      .then((data) => {
        console.log("data");
        console.log(data);

        return data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };

  return { stations };
}
