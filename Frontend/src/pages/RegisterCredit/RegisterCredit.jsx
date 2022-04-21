// import React from 'react';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import Loading from '../../components/Templates-Suspense/Loading';
import useRegisterCredit from '../../hooks/useRegisterCredit';

// https://codesandbox.io/s/x5crv?file=/demo.js:987-1903
const columns = [
  { id: 'created_at', label: 'Fecha de movimiento', minWidth: 170 },
  { id: 'movement', label: 'Movimiento', minWidth: 100 },
  { id: 'amount', label: 'Total de saldo', minWidth: 100 },

];




function RegisterCredit() {
  // Es mejor poner los handle en el componente o página
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { isLoading, isError,rows    } = useRegisterCredit();
  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Cargando...</title>
        </Helmet>
        <Loading />
      </>
    );
  }
  if (isError) {
    return (
      <Helmet>
        <title>Error..</title>
      </Helmet>
    );
  }
  if ("countRegister" === 0) {
    return (
      <>
        <Helmet>
          <title>Sin MontyDatos</title>
        </Helmet>
     
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>¡Tus MontyDatos!</title>
      </Helmet>
     
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  );
}
export default RegisterCredit;
