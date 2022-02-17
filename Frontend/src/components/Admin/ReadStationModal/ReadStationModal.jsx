import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CardMedia from '@mui/material/CardMedia';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ReadStationModal({ open, handleClose, station }) {
    const totalPointsUnactive = (points) => {
        let count = 0;
        points.map(function (point) {
            if (!point.active) count++
        })
        return count
    };
    const totalPointsBike = (points) => {
        let count = 0;
        points.map(function (point) {
            if (point.bike) count++
        })
        return count
    };
    
    const totalPointsBikeUnactive = (points) => {
        let count = 0;
        points.map(function (point) {
            if (point.bike && point.bike?.active ==false) count++
        })
        return count
    };
    if (station) {
        return (
            <div>
                {/* <Button onClick={handleOpen}>Open modal</Button> */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>

                        <CardMedia
                            component="img"
                            height="200"
                            image={station.img? station.img:"https://imagenesparaperfildewasap.com/wp-content/uploads/no-hay-foto-3.png"}
                            alt={`Station ${station.name}`}
                        />

                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {station.name}
                        </Typography>
                        <Typography sx={{ mt: 2 }}>Slug: {station.slug}</Typography>
                        <Typography sx={{ mt: 2 }}>Direction: {station.direction}</Typography>
                        <Typography sx={{ mt: 2 }}>Location: {station.location}</Typography>
                        <Typography sx={{ mt: 2 }}>Total Points: {station.points.length}</Typography>
                        <Typography sx={{ mt: 2 }}>Total Points Unactive: {totalPointsUnactive(station.points)}</Typography>
                        <Typography sx={{ mt: 2 }}>Total Bikes: {totalPointsBike(station.points)}</Typography>
                        <Typography sx={{ mt: 2 }}>Total Bikes Unactive: {totalPointsBikeUnactive(station.points)}</Typography>
                    </Box>
                </Modal>
            </div>
        );

    } else {
        return <></>
    }


}
