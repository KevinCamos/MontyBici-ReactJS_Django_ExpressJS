import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material';

import TablePagination from '@mui/material/TablePagination';
import NotificationModal from '../NotificationModal/NotificationModal';
import useNotifications from '../../hooks/useNotifications';

// https://mui.com/components/tabs/
function TableRegisters({
  rows,
  handleChangePage,
  handleChangeRowsPerPage,
  page,
  rowsPerPage
}) {
  const { open, setOpen } = useNotifications();

  const [idRegister, setIdRegister] = React.useState(false);

  const handleOpen = (id) => {
    setIdRegister(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const columns = [
    { id: 'station_get', label: 'Estación de recogida' },
    { id: 'data_get', label: 'Data de recogida' },
    { id: 'station_return', label: 'Estación de devolución' },
    { id: 'data_return', label: 'Data de devolución' },
    { id: 'time', label: 'Tiempo transcurrido' },
    { id: 'notification', label: 'Notificar Incidencia' }
  ];
  return (
    <>
      <NotificationModal
        open={open}
        handleClose={handleClose}
        id={idRegister}
      />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
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
                .map((row, index) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={`TableRow${index}`}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id}>
                          {typeof value === 'number' ? (
                            <Button
                              variant="contained"
                              onClick={() => {
                                handleOpen(value);
                              }}
                            >
                              Notificar Incidencia
                            </Button>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
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
export default TableRegisters;
