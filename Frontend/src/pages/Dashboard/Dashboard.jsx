import React from "react";
import { Helmet } from "react-helmet";


import useDashboard from "../../hooks/useDashboard";

import TableRegisters from "../../components/TableRegisters/TableRegisters";

// https://codesandbox.io/s/x5crv?file=/demo.js:987-1903
const Dashboard = () => {

  const { isLoading, isError, countRegister, rows, handleChangePage, handleChangeRowsPerPage, page, rowsPerPage } = useDashboard();
  console.log(rowsPerPage)
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
          <title>¡Tus MontyDatos!</title>
        </Helmet>
        <TableRegisters rows={rows} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangePage} page={page} rowsPerPage={rowsPerPage} />

      </>
    );
  }

}
export default Dashboard