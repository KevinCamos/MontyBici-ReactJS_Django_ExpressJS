import * as React from "react";
import {CardActionArea,CardActions, Card, CardContent,CardMedia, Typography}   from "@mui/material"

import PedalBikeIcon from "@mui/icons-material/PedalBike";

export default function CardStation({station}) {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://media.istockphoto.com/photos/bicing-bicycle-rental-station-in-barcelona-street-row-of-red-and-picture-id956031534"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {station.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
                {`${station.direction} `}

          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      {station.points.map((point, index) => (
          <PedalBikeIcon color={point.bike_id?"success":""} key={index}/>
        ))}
      </CardActions>
    </Card>


  );
}
