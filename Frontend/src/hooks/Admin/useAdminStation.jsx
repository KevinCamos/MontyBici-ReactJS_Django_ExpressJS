import react, { useContext, useEffect, useState, useCallback } from "react";
import stationsServices from "../../services/StationsServices";
import StationsContext from "../../context/StationsContext";

import { useNavigate } from "react-router-dom";

const useAdminStation = () => {
  const navigate = useNavigate();

  const { stations, setStations } = useContext(StationsContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  const [totalPoints] = useState(0);
  const [totalBikes, setTotalBikes] = useState(0);

  const [selectedImage, setSelectedImage] = useState();
  const [imageUrl, setImageUrl] = useState(null);


  const saveStation = useCallback(
    (data) => {
      setLoading(true)
      stationsServices.createStation(stationToJSON(data))
        .then((data) => {
          console.log(data)
          navigate("/admin-panel/stations")
        })
        .catch((error) => {
          try {
            setError(error.response.data.errors.name[0])
          } catch (exception_var) {
            setError("Hay algún error en el servidor")
          }
          setLoading(false)
        });
    },
    [selectedImage]
  );
  const updateStation = useCallback(
    (data, request) => {
      console.log(data)
      let slug = request.target.id
      setLoading(true)
      stationsServices.updateStation(stationToJSON(data, true), slug)
        .then((data) => {
          console.log(data)
          navigate("/admin-panel/stations")
        })
        .catch((error) => {
          try {
            setError(error.response.data.errors.name[0])
          } catch (exception_var) {
            setError("Hay algún error en el servidor")
          }
          setLoading(false)
        });
    },
    [selectedImage]
  );

  const deleteStation = useCallback(
    (slug) => {
      console.log(slug)
      setLoading(true)
      stationsServices.deleteStation(slug)
        .then((data) => {
          dropFilterStation(slug)
          console.log(data)
        })
        .catch((error) => {
          try {
            setError(error.response.data.errors.name[0])
          } catch (exception_var) {
            setError("Hay algún error en el servidor")
          }
          setLoading(false)
        });
    },
    [selectedImage]
  );

  const dropFilterStation = (slug) => {
    console.log(slug)
    let index = stations.findIndex((station) => station.slug === slug);
    console.log(index)

    let updateStation = [...stations]

    updateStation.splice(index, 1);
    console.log(updateStation)

    setStations(updateStation)
  }



  useEffect(() => {
    console.log("ehhhhh")
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const stationToJSON = (data, update = false) => {
    var form_data = new FormData();

    let station = JSON.stringify({
      "name": data.name,
      "direction": data.direction,
      "location": data.location
    })

    form_data.append('img', selectedImage);
    form_data.append('station', station);
    if (!update) {
      form_data.append('points', data.points);
      form_data.append('bikes', data.bikes);
    }
    return form_data
  }
  return { saveStation, updateStation, deleteStation, totalPoints, totalBikes, setTotalBikes, selectedImage, setSelectedImage, imageUrl, setImageUrl, loading, error };
}
export default useAdminStation