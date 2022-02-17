import * as React from "react";
import { Button } from "@mui/material";
import useBike from "../../hooks/useBike";


const ObtainBike = ({ id_point }) => {

  const { obtainBike, errorBike } = useBike();

  return (
    <>
      <Button variant="contained" color="success" alt="" onClick={() => obtainBike(id_point)}>
        Pulsa aquí para obtener la bicicleta
      </Button>

      {errorBike && <p className="error">{errorBike}</p>}
    </>
  );
}
export default ObtainBike