import React from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
//   import people from "assets/images/people_SVG.svg";
// import useStation from "../../hooks/useStation";
import CardStation from "../Cards/CardStation";

export default function Station() {
/*   // const { stations } = useStation();
  // stations()
//  var station= stations(); */
  return <>
  
   <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(Array(4)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <CardStation></CardStation>
          </Grid>
        ))}
      </Grid>
    </Box>
  
  </>;
}
