import React from "react";
import {Helmet} from "react-helmet";
import { useParams } from "react-router-dom";

import { CardActionArea, CardActions, Card, CardContent, CardMedia, Typography,Box } from "@mui/material";
import PedalBikeIcon from "@mui/icons-material/PedalBike";

import useOnlyStation from "../../hooks/useOnlyStation";
import { ThemeProvider } from "@mui/material/styles";

import theme from "../Stations/themeCard";

export default function DetailsPage() {
  const { slug } = useParams();
  const { oneStation, isLoading, isError } = useOnlyStation({ slug: slug });
  console.log(oneStation);
  console.log(slug);
  console.log(isLoading,isError);

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Cargando...</title>
        </Helmet>
      </>
    );
  } else if (isError) {
    return (
      <>
        <Helmet>
          <title>Error, estación no encontrada..</title>
        </Helmet>
      </>
    );
  } else {
    return (
      <>
      <Helmet>
          <title> Estación {oneStation.name}</title>
        </Helmet>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              margin: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Card sx={{ maxWidth: 700 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="100%"
                  image="https://media.istockphoto.com/photos/bicing-bicycle-rental-station-in-barcelona-street-row-of-red-and-picture-id956031534"
                  alt="green iguana"
                />
              </CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {oneStation.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`${oneStation.direction} `}
                </Typography>
              </CardContent>
              <CardActions>
                {oneStation.points.map((point, index) => (
                  <PedalBikeIcon fontSize="large" color={point.bike ? (point.bike.active ? "primary" : "secondary") : "disabled"} key={index} />
                ))}
              </CardActions>
            </Card>
          </Box>
        </ThemeProvider>

        {/* </Container> */}
      </>
    );
  }
}
