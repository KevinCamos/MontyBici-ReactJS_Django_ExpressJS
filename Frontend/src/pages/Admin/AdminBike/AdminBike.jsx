import * as React from 'react';
import { Helmet } from "react-helmet";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, Box, Grid } from '@mui/material';
// import { useNavigate } from "react-router-dom";
import useAdminBike from "../../../hooks/Admin/useAdminBike";
import Loading from "../../../components/Templates-Suspense/Loading"

export default function AdminBike() {
    const [open, setOpen] = React.useState(false);
    const { bikes, isLoading, errorBike, updateBike } = useAdminBike({ admin: true })


    // const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const handleToggle = (name) => {
        this.setState({ active: !this.state.active });
    };

    // if (isLoading) {
    //     return (<>
    //         <Helmet>
    //             <title>Cargando...</title>
    //         </Helmet>
    //         <Loading />
    //     </>)
    // }
    return (
        <>
        {isLoading&& <Loading /> }
           <Helmet>
                <title>Factoy MontyBikes</title>
            </Helmet>
            <Grid container maxWidth="md">

                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <TableContainer component={Paper} >

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
                                {bikes.map((bike) => (
                                    <TableRow key={bike.id}>
                                        <TableCell component="th" align="left">{bike.id}</TableCell>
                                        <TableCell align="center">{bike.points ? bike.points.station.name : <b>-</b>}</TableCell>
                                        <TableCell align="center">{bike.points ? bike.points.id : <b>-</b>}</TableCell>
                                        <TableCell align="center"> {bike.active ?
                                            <Switch value={bike.active ?? " "}defaultChecked  onClick={(e) => updateBike(bike.id, !bike.active,bikes) }
                                            />
                                            : <Switch  value={!bike.active ?? " "} onClick={(e) => updateBike(bike.id, !bike.active, bikes)} />
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
