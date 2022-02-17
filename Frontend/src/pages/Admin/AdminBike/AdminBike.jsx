import * as React from 'react';
import { Helmet } from 'react-helmet';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid
} from '@mui/material';
import useAdminBike from '../../../hooks/Admin/useAdminBike';
import Loading from '../../../components/Templates-Suspense/Loading';
import SwitchBike from '../../../components/Admin/SwitchBike/SwitchBike';

export default function AdminBike() {
  const { bikes, isBikeLoading } = useAdminBike();
  return (
    <>
      {isBikeLoading && <Loading />}
      <Helmet>
        <title>Factoy MontyBikes</title>
      </Helmet>
      <Grid container maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <caption>Estaciones MontyBicis</caption>
              <TableHead>
                <TableRow>
                  <TableCell align="left">ID Bike</TableCell>
                  <TableCell align="center">Station</TableCell>
                  <TableCell align="center">Point</TableCell>
                  <TableCell align="center">Active</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bikes
                  .sort((a, b) => a.id - b.id)
                  .map((bike) => (
                    <TableRow key={bike.id}>
                      <TableCell component="th" align="left">
                        {bike.id}
                      </TableCell>
                      <TableCell align="center">
                        {bike.points ? (
                          bike.points.station ? (
                            bike.points.station.name
                          ) : (
                            <b>-</b>
                          )
                        ) : (
                          <b>-</b>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {bike.points ? bike.points.id : <b>-</b>}
                      </TableCell>
                      <TableCell align="center">
                        {' '}
                        <SwitchBike bike={bike} />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    </>
  );
}
