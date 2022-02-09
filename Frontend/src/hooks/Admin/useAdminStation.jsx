import react, { useContext, useEffect, useState, useCallback } from "react";
import stationsServices from "../../services/StationsServices";


const useAdminStation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  const [totalPoints, setTotalPoints] = useState(0);
  const [totalBikes, setTotalBikes] = useState(0);

  const [selectedImage, setSelectedImage] = useState();
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const stationToJSON = (data) => {
    var form_data = new FormData();

    let station = JSON.stringify({
      "name": data.name,
      "direction": data.direction,
      "location": data.location
    })

    console.log(selectedImage)
    form_data.append('img', selectedImage);
    form_data.append('station', station);
    form_data.append('points', data.points);
    form_data.append('bikes', data.bikes);
    return form_data

  }

const saveStation = useCallback(
  (data) => {
    setLoading(true)
    setError(false)
    stationsServices.saveStation(stationToJSON(data))
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      });
  },
  [selectedImage]
);

const handleChangePoints = useCallback((event) => {
  console.log("eh", event.target.value)
  setTotalPoints(event.target.value);
}, [totalPoints]);
const handleChangeBikes = (event) => {
  console.log("eh", event.target.value)
let value= event.target.value>totalPoints?totalPoints:event.target.value;
  setTotalBikes(value);
}
return { saveStation, totalPoints, totalBikes, totalBikes, setTotalBikes, selectedImage, setSelectedImage, imageUrl, handleChangePoints, handleChangeBikes };
}
export default useAdminStation