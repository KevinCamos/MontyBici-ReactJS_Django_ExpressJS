import * as React from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useForm } from 'react-hook-form';
import { Box, Typography, Grid } from '@mui/material';
import Button from '@mui/material/Button';

export default function PaymentForm(props) {
  // const messageError = admin  ? '¿Tus credenciales son correctas para entrar?'
  // : '¿Has escrito bien tu email y password?';
  const consolelog = data => console.log(data);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  console.log(errors)
  const valueLength = (data)=>{
    if(data){
      if(data?.ref?.value){
        if (data?.ref?.value?.length>0){
          return true
        }
      }
    }
    return false
  }
  return (
    <React.Fragment>


      <Typography variant="h6" gutterBottom>
        Datos de bancarios
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={(handleSubmit(consolelog))}
      >

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              error={valueLength(errors.cardName) }
              // helperText="Incorrect entry."
              
              required
              id="cardName"
              label="Titular de la tarjeta"
              fullWidth
              autoComplete="cc-name"
              variant="standard"
              {...register("cardName", { required: true, pattern: /^[a-z ,.'-]+$/i })}

            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              error={valueLength(errors.cardNumber)  }

              id="cardNumber"
              label="Número de tarjeta"
              fullWidth
              autoComplete="cc-number"
              variant="standard"
              {...register("cardNumber", { required: true, pattern: /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/i })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              error={valueLength(errors.expDate)  }

              id="expDate"
              label="Data de expiración"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
              {...register("expDate", { required: true, pattern: /^((0[1-9])|(1[0-2]))[\/\.\-]*((0[8-9])|(1[1-9]))$/i })} />




          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              error={valueLength(errors.cvv)  }

              id="cvv"
              label="CVV"
              helperText="Last three or four digits on signature strip"
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
              {...register("cvv", { required: true, pattern: /^[0-9]{3,4}$/})}

            />
          </Grid>
       
          <Button
            type="submit"
            fullWidth
            variant="contained"
            noValidate

            // onClick={handleNext}
            // onClick={()=>{console.log("eh")}}
            sx={{ mt: 3, ml: 1 }}
          >
            {props.activeStep === props.steps.length - 1 ? 'Place order' : 'Siguiente página'}
          </Button>
        </Grid>
      </Box>
    </React.Fragment>
  );
} 