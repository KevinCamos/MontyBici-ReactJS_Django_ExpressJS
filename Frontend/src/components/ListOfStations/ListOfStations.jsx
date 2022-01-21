import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
//   import people from "assets/images/people_SVG.svg";
// import useStation from "../../hooks/useStation";
import CardStation from "../Cards/CardStation";
import SusCardStation from "../Templates-Suspense/SusCardStation";

export default function ListOfStations({ stations }) {
  /*   // const { stations } = useStation();
  // stations()
//  var station= stations(); */
  return (
    <>
      <Box sx={{ flexGrow: 1, m: 3 }}>
        <Grid container spacing={{ xs: 2, md: 7 }} columns={{ xs: 6, sm: 6, md: 13 }}>
          {stations.length > 0 ? (
            stations.map((station, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
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

// {station.length>0 ? <SusCardStation station={station}></SusCardStation> : <SusCardStation />}
