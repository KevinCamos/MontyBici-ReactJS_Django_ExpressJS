import * as React from 'react';
import {
  CardActionArea,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import Home from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import useBike from '../../hooks/useBike';

function CardStation({ station }) {
  const { statusBike, statusPoint, isRegisters } = useBike();
  return (
    <Card sx={{ maxWidth: 400, minWidth: 400, minHeight: 275, boxShadow: 1 }}>
      <CardActionArea>
        <Link to={`/stations/${station.slug}`}>
          <CardMedia
            component="img"
            height="140"
            image={
              station.img
                ? station.img
                : 'https://media.istockphoto.com/photos/bicing-bicycle-rental-station-in-barcelona-street-row-of-red-and-picture-id956031534'
            }
            alt={station.name}
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

      {isRegisters ? (
        <CardActions>
          {station.points.map((point, index) => (
            <Home color={statusPoint(point)} key={index} />
          ))}
        </CardActions>
      ) : (
        <CardActions>
          {station.points.map((point, index) => (
            <PedalBikeIcon color={statusBike(point.bike)} key={index} />
          ))}
        </CardActions>
      )}
    </Card>
  );
}
export default CardStation;
