import * as React from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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

export default function BasicModal({ open, handleClose, station }) {
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
    console.log(station)
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
                            image={station.img? station.img:"https://uk.schreder.com/sites/default/files/2019-06/railwaystations-metros-porto-portugal-schreder-dexo-dexo-neos-porto-sao-bento-gare-img_0942.jpg"}
                            alt={`Station ${station.username}`}
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
