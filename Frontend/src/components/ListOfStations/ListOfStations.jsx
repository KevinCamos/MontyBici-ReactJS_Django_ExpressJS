import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import CardStation from "../Cards/CardStation";
import SusCardStation from "../Templates-Suspense/SusCardStation";

export default function ListOfStations({ stations}) {

  return (
    <>
      <Box sx={{ flexGrow: 1, m: 3 }}>
        <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 3, sm: 8, md: 13 }}>
          {stations.length > 0 ? (
            stations.map((station, index) => (
              <Grid item md={4} key={index}>
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
