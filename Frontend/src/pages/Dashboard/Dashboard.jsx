import React from "react";
import { Helmet } from "react-helmet";

import CardDasboard from "../../components/Cards/CardDasboard";
import Loading from "../../components/Templates-Suspense/Loading";

import useDashboard from "../../hooks/useDashboard";

import TableRegisters from "../../components/TableRegisters/TableRegisters";
import { PedalBike, CalendarToday, WatchLater, House } from "@mui/icons-material/";

// https://codesandbox.io/s/x5crv?file=/demo.js:987-1903
const Dashboard = () => {     
                                                                                                               //Es mejor poner los handle en el componente o página
  const { isLoading, isError, countRegister, longerJourney, lastJourney, favStationGetter, favStationReturn, rows, handleChangePage, page, rowsPerPage } = useDashboard();
  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Cargando...</title>
        </Helmet>
        <Loading />
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
  }else if (countRegister===0) {
    return (
      <>
        <Helmet>
          <title>Sin MontyDatos</title>
        </Helmet>
        <CardDasboard icon={<PedalBike />} title={"Estadísticas"} data={"Sin datos"} message={"Más pronto empiezes a montypedalear, te ofreceremos datos."} />

      </>
    );
  } else {

    return (
      <>
        <Helmet>
          <title>¡Tus MontyDatos!</title>
        </Helmet>
        <CardDasboard icon={<CalendarToday />} title={"Último Viaje"} data={lastJourney} message={"Fue la última vez que montybiceaste"} />
        <CardDasboard icon={<PedalBike />} title={"Total Viajes"} data={countRegister} message={"Número total de viajes desde que te registraste"} />
        <CardDasboard icon={<WatchLater />} title={"Viaje más largo"} data={longerJourney} message={"El viaje más largo que has recorrido"} />

        {/* favStationGetter, favStationReturn */}
        <CardDasboard icon={<><House/><PedalBike /></>} title={"Punto de partida favorito"} data={favStationGetter.key} message={`En esta estación has cogido una montibici un total de ${favStationGetter.value} veces`} />
        <CardDasboard icon={<><PedalBike /><WatchLater /></>} title={"Punto de llegada favorito"} data={favStationReturn.key} message={`En esta estación has dejado una montibici un total de ${favStationReturn.value} veces`} />

        <TableRegisters rows={rows} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangePage} page={page} rowsPerPage={rowsPerPage} />

      </>
    );
  }

}
export default Dashboard