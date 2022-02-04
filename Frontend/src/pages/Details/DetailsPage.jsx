import React from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import TabBike from "../../components/TabBike/TabBike";
import TabPoint from "../../components/TabPoint/TabPoint";
import { CardActionArea,  Card, CardContent, CardMedia, Typography, Box, } from "@mui/material";
import useOnlyStation from "../../hooks/useOnlyStation";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Themes/themeCard";
const DetailsPage = () => {

  const { slug } = useParams();
  const { oneStation, isLoading, isError, isRegisters } = useOnlyStation({ slug: slug });


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
                <Typography gutterBottom variant="h2" component="div">
                  {oneStation.name}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  {`${oneStation.direction} `}
                </Typography>
              </CardContent>
              {isRegisters
                ? <TabPoint points={oneStation.points} />
                : <TabBike points={oneStation.points} />}
            </Card>
          </Box>
        </ThemeProvider>
      </>
    );
  }
}
export default DetailsPage