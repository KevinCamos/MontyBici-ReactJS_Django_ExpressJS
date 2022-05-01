import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useTranslation } from "react-i18next"


export default function Review(props) {
  const [t] = useTranslation("global")

  const payments = [
    { name: t(`payment.cardholder`), detail: props.dataPayment.cardName },
    { name: t(`payment.tarjet-number`), detail: 'xxxx-xxxx-xxxx-' + props.dataPayment.cardNumber.substr(props.dataPayment.cardNumber.length - 4) },
    { name: t(`payment.expire-date`), detail: props.dataPayment.expDate },
  ];
  const currently = "€"
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {t(`payment.total-recharge`)}
      </Typography>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary={t(`payment.price-recharge`)} secondary={t(`payment.price-recharge`)} />
          <Typography variant="body2">{props?.dataPayment?.moneyCard + currently}</Typography>
        </ListItem>


        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {props?.dataPayment?.moneyCard + currently}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={1}>

        <Grid item container direction="column" xs={12} sm={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            {t(`payment.payments-details`)}
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"

          onClick={() => { props.emmitPayment(props.dataPayment) }}
          sx={{ mt: 3, ml: 1 }}
        >
          {t(`payment.make-payments`)}
        </Button>
      </Grid>

    </React.Fragment>
  );
}