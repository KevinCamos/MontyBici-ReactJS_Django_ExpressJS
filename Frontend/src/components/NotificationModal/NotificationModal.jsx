import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import useNotifications from "../../hooks/useNotifications";
import { useForm } from "react-hook-form";

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

export default function NotificationModal({ open, handleClose, id }) {
    const { reasons, isLoading } = useNotifications();
    console.log(reasons)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);
    const [valueReason, setValueReason] = React.useState(0)

    //   const [open, setOpen] = React.useState(false);
    const handleChange = (event) => {
        console.log(event.target.value)

        setValueReason(event.target.value);
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style} onSubmit={handleSubmit(onSubmit)} >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Selecciona la incidencia
                    </Typography>
                    <FormControl required fullWidth>
                        <InputLabel id="demo-simple-select-required-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            label="Age *"
                            value={valueReason}
                            {...register("reasons", { required: true })}
                            onChange={handleChange}>
                            {reasons.map((reason, index) => (
                                <MenuItem value={parseInt(reason.id)} key={reason.id}>
                                    {reason.reason}
                                </MenuItem>
                            ))}

                        </Select>


                        <FormHelperText>Required</FormHelperText>
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={3}
                            placeholder="Minimum 3 rows"
                            {...register("message", { required: true, maxLength: 200 })}
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Enviar Incidencia
                        </Button>
                    </FormControl>
                </Box>
            </Modal>
        </div>
    );
}
