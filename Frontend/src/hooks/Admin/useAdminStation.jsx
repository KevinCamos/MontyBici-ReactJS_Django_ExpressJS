import react, { useContext, useEffect, useState, useCallback } from "react";
import stationsServices from "../../services/StationsServices";
import StationsContext from "../../context/StationsContext";

import { useNavigate } from "react-router-dom";


import { useSnackbar } from 'notistack';

const useAdminStation = () => {
  const navigate = useNavigate();
  // const [stations, setStations] = useState([]);

  const { stations, setStations } = useContext(StationsContext);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  const [totalPoints] = useState(0);
  const [totalBikes, setTotalBikes] = useState(0);

  const [selectedImage, setSelectedImage] = useState();
  const [imageUrl, setImageUrl] = useState(null);


  const [open, setOpen] = useState(false);
  const [oneStation, setOneStation] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const saveStation = useCallback(
    (data) => {
      setLoading(true)
      stationsServices.createStation(stationToJSON(data))
        .then((data) => {
          console.log(data)
          enqueueSnackbar("Estación creada correctamente", { variant: 'success' });

          navigate("/admin-panel/stations")
        })
        .catch((error) => {
          showError(error)
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
          enqueueSnackbar("Estación modificada correctamente", { variant: 'success' });
          navigate("/admin-panel/stations")
        })
        .catch((error) => {
          showError(error)
        });
    },
    [selectedImage]
  );

  const deleteStation = useCallback(
    (slug, stations) => {
      setLoading(true)
      stationsServices.deleteStation(slug)
        .then((data) => {
          enqueueSnackbar("Estación eliminada correctamente", { variant: 'success' });

          console.log(data)
          dropFilterStation(slug, stations)
          setLoading(false)

        })
        .catch((error) => {
          showError(error, ", ya que hay registros que dependen de esta estación")
        });
    },
    [selectedImage]
  );



  /**
   * Avisa del error al usuario con un snackbar, y modofica la variable reactiva Errror
   * @param {Error que proviene del servidor} error 
   */
  const showError = (error, addMissage="") => {
    try {
      setError(error.response.data.errors.name[0])
      enqueueSnackbar(error.response.data.errors.name[0], { variant: 'error' });
    } catch (exception_var) {
      setError("Hay algún error en el servidor")
      enqueueSnackbar(`Hay algún error en el servidor${addMissage}`, { variant: 'error' });
    }
    setLoading(false)

  }


  const dropFilterStation = (slug, stations) => {
    let index = stations.findIndex((station) => station.slug === slug);
    console.log(index)
    let updateStation = [...stations]
    updateStation.splice(index, 1);
    setStations(updateStation)
  }

  useEffect(() => {
    console.log("ehhhhh")
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  /**
   * Función para montar datos y poder subir una imagen (fileupload)
   * @param {Datos que vamos a enviar al servidor} data 
   * @param {Si update es true, no se enviaran la cantidad de slots y bicis, ya que solo lo hacemos al crear} update 
   * @returns 
   */
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
  return { saveStation, updateStation, deleteStation, totalPoints, totalBikes, setTotalBikes, selectedImage, setSelectedImage, imageUrl, setImageUrl, isLoading, error,open, setOpen, oneStation, setOneStation};
}
export default useAdminStation