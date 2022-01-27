import * as React from "react";
import { CardActionArea, CardActions, Card, CardContent, CardMedia, Typography } from "@mui/material";
import PedalBikeIcon from "@mui/icons-material/PedalBike";

import { Link } from "react-router-dom";

export default function CardStation({ station }) {
  return (
    <Card sx={{ maxWidth: 345 ,    boxShadow: 1}}>
      <CardActionArea>
        <Link to={"/stations/" + station.slug}>
          <CardMedia
            component="img"
            height="140"
            image="https://media.istockphoto.com/photos/bicing-bicycle-rental-station-in-barcelona-street-row-of-red-and-picture-id956031534"
            alt="green iguana"
          />
        </Link>
      </CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {station.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${station.direction} `}
          </Typography>
        </CardContent>
      <CardActions>
        {station.points.map((point, index) => (
          <PedalBikeIcon color={point.bike ? (point.bike.active ? "primary" : "secondary") : "disabled"} key={index} />
        ))}
      </CardActions>
    </Card>
  );
}
