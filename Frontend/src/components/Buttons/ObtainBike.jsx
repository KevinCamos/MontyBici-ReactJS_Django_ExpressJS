import * as React from "react";
import { Button } from "@mui/material";
import useBike from "../../hooks/useBike";
import './errors.css'
export default function ObtainBike({ id_point }) {
  console.log(id_point);
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
