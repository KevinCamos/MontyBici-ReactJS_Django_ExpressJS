import React from "react";
import { Helmet } from "react-helmet";

import ListOfStations from "../../components/ListOfStations/ListOfStations";
import useStation from "../../hooks/useStation";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../Themes/themeCard";
const StationPage = () => {

  const { stations } = useStation();
  return (
    <>
      <Helmet>
        <title>Estaciones MontyBicis</title>
      </Helmet>

      <ThemeProvider theme={theme}>
        <ListOfStations stations={stations} />
      </ThemeProvider>
    </>
  );
}
export default StationPage