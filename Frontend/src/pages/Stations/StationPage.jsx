import React from 'react';
import { Helmet } from 'react-helmet';

import { ThemeProvider } from '@mui/material/styles';
import ListOfStations from '../../components/ListOfStations/ListOfStations';
import useStation from '../../hooks/useStation';

import theme from '../Themes/themeCard';

function StationPage() {
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
export default StationPage;
