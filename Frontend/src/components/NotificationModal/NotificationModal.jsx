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
import { TextField } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import useNotifications from "../../hooks/useNotifications";
import { useForm } from "react-hook-form";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function NotificationModal({  handleClose, id }) {
    const { reasons, open,  isLoading, valueReason, setValueReason, sendNotification, enqueueSnackbar} = useNotifications(id);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);
    // if (errors.message) {
    //     enqueueSnackbar('Ha habido algún error enviando el mensaje.', { variant: 'error' })
    //     errors.message = null
    // }
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
                <Box component="form" sx={style} onSubmit={handleSubmit(sendNotification)} >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Selecciona la incidencia
                    </Typography>
                    <FormControl required fullWidth>
                        <InputLabel >Reason Missage</InputLabel>
                        <Select
                            value={valueReason}
                            defaultValue={valueReason}
                            {...register("id_reason", { required: true })}
                            onChange={handleChange}>
                            {reasons.map((reason) => (
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
                            {...register("message", { required: true, minLength: 10, maxLength: 200 })}
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Enviar Incidencia
                        </Button>
                        {errors.message && <small className='error'>La incidencia debe contener entre 10 y 200 carácteres</small>}
                    </FormControl>
                </Box>
            </Modal>
        </div>
    );
}
