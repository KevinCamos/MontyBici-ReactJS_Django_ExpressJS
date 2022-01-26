import React from "react";
import ListOfStations from "../../components/ListOfStations/ListOfStations";
import useStation from "../../hooks/useStation";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./themeCard";

export default function StationPage() {
  const { stations, loading} = useStation();


  return (
    <>
          <ThemeProvider theme={theme}>

      <ListOfStations stations={stations} loading={loading}/>
      </ThemeProvider>

    </>
  );
}
