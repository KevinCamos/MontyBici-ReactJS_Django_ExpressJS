import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import useStation from "../../../hooks/useStation";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/Admin/Modal/Modal"

export default function AdminStation() {
    const [open, setOpen] = React.useState(false);
    const [oneStation, setOneStation] = React.useState(null);
    const handleOpen = (station) => {
        setOneStation(station)
        setOpen(true)
    };
    const handleClose = () => setOpen(false);
  
    const { stations } = useStation();
    const navigate = useNavigate();

    return (
        <>
        <Modal open={open}  handleClose={handleClose} station={oneStation}/>
            <TableContainer component={Paper} >

                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                    <caption>Estaciones MontyBicis</caption>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="center">Read</TableCell>
                            <TableCell align="center">Update</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stations.map((station) => (
                            <TableRow key={station.name}>
                                <TableCell component="th" align="left">{station.name}</TableCell>
                                <TableCell align="center"><Button variant="contained" onClick={() => { handleOpen(station) }}>Leer Estación</Button></TableCell>
                                <TableCell align="center"><Button variant="contained" onClick={() => { navigate(`/admin-panel/stations/update/${station.slug}`) }} color="action">Modificar Estación</Button></TableCell>
                                <TableCell align="center"><Button variant="contained" onClick={() => { navigate(`/admin-panel/stations/delete/${station.slug}`) }} color="error">Eliminar Estación</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" onClick={() => { navigate(`/admin-panel/stations/create/`) }}>CLICKA AQUÍ PARA CREAR UNA MONTYESTACIÓN</Button>
        </>
    );
}
