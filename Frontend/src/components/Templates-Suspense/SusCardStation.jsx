import * as React from "react";
import {  CardActionArea,CardActions, Card, CardContent,Typography, Grid } from "@mui/material";

import PedalBikeIcon from "@mui/icons-material/PedalBike";
const SuspendeStationCard = () => {

  return (
    <>
      {Array.from(Array(4)).map((_, index) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
           <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {` Loading... `}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {` Loading... `}

          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      {Array.from(Array(4)).map((_, index) => (
                  <PedalBikeIcon key={"PedalBikeIcon"+index}/>
                ))}
      </CardActions>
    </Card>
     
        </Grid>
      ))}
    </>
  );
}
export default SuspendeStationCard