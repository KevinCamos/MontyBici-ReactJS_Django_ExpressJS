import * as React from "react";
import {Box, Card, CardContent,CardMedia, Typography}   from "@mui/material"

import PedalBikeIcon from "@mui/icons-material/PedalBike";

export default function CardStation({station}) {
  console.log(station)

  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {station.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
           {`${station.direction} `}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
  
          {station.points.map((point, index) => (
            <PedalBikeIcon color={point.id_bike_id?"success":""} key={index}/>
          ))}
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://media.istockphoto.com/photos/bicing-bicycle-rental-station-in-barcelona-street-row-of-red-and-picture-id956031534"
        alt="Live from space album cover"
        title="Stations"
      />
    </Card>
  );
}
