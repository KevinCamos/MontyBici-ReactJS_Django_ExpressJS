import  React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useForm } from 'react-hook-form';
import { Box, Typography, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import {useTranslation} from "react-i18next"

export default function PaymentForm(props) {
  // const messageError = admin  ? '¿Tus credenciales son correctas para entrar?'
  // : '¿Has escrito bien tu email y password?';
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [amount, setAmount] =useState(0);
  const [t] = useTranslation("global") 

  const valueLength = (data) => {
    if (data) {
      if (data?.ref?.value) {
        if (data?.ref?.value?.length > 0) {
          return true
        }
      }
    }
    return false
  }
  return (
    <React.Fragment>

      <Box
        component="form"
        noValidate
        onSubmit={(handleSubmit(props.emmitPayment))}
      >
     <Typography variant="h6" sx={{ my: { xs: 1, md: 1 } }}>
     {t(`payment.recharge-amount`)}
      </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
      <FormControl fullWidth sx={{ m: 1 }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount"> {t(`payment.recharge-amount`)}</InputLabel>
          <FilledInput
            error={valueLength(errors.moneyCard)}

            required
            id="moneyCard"
            label={t(`payment.total-recharge`)}
            fullWidth
            autoComplete="cc-money"
            variant="standard"
            defaultValue={"5,00"}
            onChange={(event)=>{console.log(event.target.value)}}
            startAdornment={<InputAdornment position="start">€</InputAdornment>}
            {...register("moneyCard", { required: true, pattern: /^\$?[0-9][0-9,]*[0-9]\.?[0-9]{0,2}$/i})}

          />
        </FormControl>
    
          </Grid>
        </Grid>
      <Typography variant="h6" sx={{ my: { xs: 3, md: 3 } }} >       
      {t(`payment.bank-data`)}
      </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              error={valueLength(errors.cardName)}
              // helperText="Incorrect entry."

              required
              id="cardName"
              label={t(`payment.cardholder`)}
              fullWidth
              autoComplete="cc-name"
              variant="standard"
              defaultValue="Daniel Molla Mira"
              {...register("cardName", { required: true, pattern: /^[a-z ,.'-]+$/i })}

            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              error={valueLength(errors.cardNumber)}

              id="cardNumber"
              label={t(`payment.tarjet-number`)}
              fullWidth
              autoComplete="cc-number"
              variant="standard"
              defaultValue="123456789666"
              {...register("cardNumber", { required: true, pattern: /^[0-9]{12}$/ })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              error={valueLength(errors.expDate)}

              id="expDate"
              label={t(`payment.expire-date`)}
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
              defaultValue="02/2020"

              {...register("expDate", { required: true, pattern: /([0-9]{2})([\/\w \.-]{1})([0-9]{2,4})/ })} />




          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              error={valueLength(errors.cvv)}

              id="cvv"
              label="CVV"
              helperText={t(`payment.last-tree-digits`)}
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
              defaultValue="123"
              {...register("cvv", { required: true, pattern: /^[0-9]{3,4}$/ })}

            />
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            noValidate
            sx={{ mt: 3, ml: 1 }}>
            {props.activeStep === props.steps.length - 1 ? t(`payment.buyout`)  : t(`payment.next-page`)}
          </Button>
        </Grid>
      </Box>
    </React.Fragment>
  );
} 