import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import CardStation from "../Cards/CardStation";
import SusCardStation from "../Templates-Suspense/SusCardStation";
const ListOfStations = ({ stations }) => {


  return (
    <>
      <Box sx={{  m: 3 }}>
        <Grid container spacing={ 3 } columns={{ xs: 3, sm: 8, md: 18 }} >
          {stations.length > 0 ? (
            stations.map((station, index) => (
              <Grid item key={index}>
                <CardStation station={station}key={station.id}/>
              </Grid>
            ))
          ) : (
            <SusCardStation />
          )}
        </Grid>
      </Box>
    </>
  );
}
export default ListOfStations