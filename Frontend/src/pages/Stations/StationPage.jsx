import React from "react";
import {Helmet} from "react-helmet";

import ListOfStations from "../../components/ListOfStations/ListOfStations";
import useStation from "../../hooks/useStation";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./themeCard";

export default function StationPage() {
  const { stations, loading } = useStation();

  return (
    <>
    <Helmet>
          <title>Estaciones MontyBicis</title>
        </Helmet>

      <ThemeProvider theme={theme}>
        <ListOfStations stations={stations} loading={loading} />
      </ThemeProvider>
    </>
  );
}
