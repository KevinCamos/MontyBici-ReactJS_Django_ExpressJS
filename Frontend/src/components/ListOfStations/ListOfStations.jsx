import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
//   import people from "assets/images/people_SVG.svg";
// import useStation from "../../hooks/useStation";
import CardStation from "../Cards/CardStation";
import SusCardStation from "../Templates-Suspense/SusCardStation";

export default function ListOfStations({ stations , loading}) {
  /*   // const { stations } = useStation();
  // stations()
//  var station= stations(); */
  return (
    <>
    {loading}
    {loading}
    {loading}
    {loading}
    {loading}
    {loading}
      <Box sx={{ flexGrow: 1, m: 3 }}>
        <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 3, sm: 8, md: 13 }}>
          {stations.length > 0 ? (
            stations.map((station, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <CardStation station={station} />
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

// {station.length>0 ? <SusCardStation station={station}></SusCardStation> : <SusCardStation />}
