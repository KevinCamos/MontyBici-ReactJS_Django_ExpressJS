import * as React from 'react';
import { Helmet } from "react-helmet";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, Box, Grid } from '@mui/material';
import useAdminPoint from "../../../hooks/Admin/useAdminPoint";
import Loading from "../../../components/Templates-Suspense/Loading"

export default function AdminPoint() {
    const { points, isLoading, updatePoint } = useAdminPoint({ admin: true })
    return (
        <>
            {isLoading && <Loading />}
            <Helmet>
                <title>Factoy MontyPoints</title>
            </Helmet>
            <Grid container maxWidth="md">

                <Box sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}>

                    <TableContainer component={Paper} >

                        <Table sx={{ minWidth: 650 }} aria-label="caption table">
                            <caption>Estaciones MontyBicis</caption>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">ID Point</TableCell>
                                    <TableCell align="center">Station</TableCell>
                                    <TableCell align="center">Point</TableCell>
                                    <TableCell align="center">Active</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {points.map((point) => (
                                    <TableRow key={point.id}>
                                        <TableCell component="th" align="left">{point.id}</TableCell>
                                        <TableCell align="center">{point ? point.station.name : <b>-</b>}</TableCell>
                                        <TableCell align="center">{point ? point.id : <b>-</b>}</TableCell>
                                        <TableCell align="center"> {point.active ?
                                            <Switch value={point.active ?? " "} defaultChecked onClick={(e) => updatePoint(point.id, !point.active, points)}
                                            />
                                            : <Switch value={!point.active ?? " "} onClick={(e) => updatePoint(point.id, !point.active, points)} />
                                        } </TableCell>
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
