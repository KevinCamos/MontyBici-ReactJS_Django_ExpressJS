import * as React from 'react';
import { Helmet } from "react-helmet";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, Box, Grid } from '@mui/material';
import useAdminPoint from "../../../hooks/Admin/useAdminPoint";
import useAdminBike from "../../../hooks/Admin/useAdminBike";
import Loading from "../../../components/Templates-Suspense/Loading"

export default function AdminPoint() {
    const { points, setPoints, isLoading, updatePoint} = useAdminPoint()
    const { updateBike, pointIndex,setPointIndex} = useAdminBike({ isPageAdminBike: false })

    if(pointIndex!=-1){
        setPointIndex(-1)
        console.log(pointIndex)
        console.log(points)
        let updatePoints = [...points]
        console.log(updatePoints[pointIndex].bike.active )

        updatePoints[pointIndex].bike.active = !updatePoints[pointIndex].bike.active;
        console.log(updatePoints)
        console.log(updatePoints[pointIndex].bike.active )

        setPoints(updatePoints)
    }
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
                                    <TableCell align="center">Active Point</TableCell>
                                    <TableCell align="center">ID Bike</TableCell>
                                    <TableCell align="center">Active Bike</TableCell>
                                    <TableCell align="center">Update Bike</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {points.map((point) => (
                                    <TableRow key={point.id}>
                                        <TableCell component="th" align="left">{point.id}</TableCell>
                                        <TableCell align="center">{point ? point.station.name : <b>-</b>}</TableCell>
                                        <TableCell align="center"> {point.active ?
                                            <Switch value={point.active ?? " "} defaultChecked onClick={(e) => updatePoint(point.id, !point.active, points)}
                                            />
                                            : <Switch value={!point.active ?? " "} onClick={(e) => updatePoint(point.id, !point.active, points)} />
                                        } </TableCell>
                                        <TableCell align="center">{point.bike ? point.bike.id : <b>-</b>}</TableCell>
                                        {!point.bike? <TableCell align="center"><b>-</b></TableCell>: 
                                        <TableCell align="center"> {point.bike.active ?
                                            <Switch value={point.bike.active ?? " "} defaultChecked onClick={(e) => updateBike(point.bike.id, !point.bike.active, points)}
                                            />
                                            : <Switch value={!point.bike.active ?? " "} onClick={(e) => updateBike(point.bike.id, !point.bike.active, points)} />
                                        } </TableCell> }
                                        <TableCell align="center">{point ? point.id : <b>-</b>}</TableCell>
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
