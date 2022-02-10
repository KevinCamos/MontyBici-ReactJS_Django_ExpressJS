import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch } from '@mui/material';
// import { useNavigate } from "react-router-dom";
import useAdminBike from "../../../hooks/Admin/useAdminBike";

export default function AdminBike() {
    const [open, setOpen] = React.useState(false);
    const { bikes, isLoading, errorBike } = useAdminBike({ admin: true })


    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const handleToggle = (name) => {
        this.setState({ active: !this.state.active });
    };
    return (
        <>
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
                                    <Switch onClick={(e) => console.log(bike.id)}
                                    />
                                    : <Switch onClick={(e) => console.log(bike.id)} />
                                } </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
