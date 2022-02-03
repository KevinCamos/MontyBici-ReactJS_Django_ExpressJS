import * as React from "react";
import { Button } from "@mui/material";
import useBike from "../../hooks/useBike";
import './errors.css'
export default function ReturnBike({ id_point }) {
  console.log(id_point);
  const { returnBike, errorBike } = useBike();

  return (
    <>
      <Button variant="contained" color="success" alt="" onClick={() => returnBike(id_point)}>
      Haz click aquí para devolver la bicicleta
      </Button>
      {errorBike && <p className="error">{errorBike}</p>}
    </>
  );
}
