import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];

export default function Review(props) {
  const payments = [
    { name: 'Titular', detail: props.dataPayment.cardName },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-'+props.dataPayment.cardNumber.substr(props.dataPayment.cardNumber.length - 4) },
    { name: 'Expiry date', detail: props.dataPayment.expDate },
  ];
  const currently= "€"
console.log(props.dataPayment)
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary={"Precio recarga"} secondary={"Recarga en MontyBici S.Coop"} />
            <Typography variant="body2">{props?.dataPayment?.moneyCard+currently}</Typography>
          </ListItem>
        

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {props?.dataPayment?.moneyCard+currently}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={1}>

        <Grid item container direction="column" xs={12} sm={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
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

            onClick={()=>{props.emmitPayment(props.dataPayment)}}
            sx={{ mt: 3, ml: 1 }}
          >
            REALIZAR PAGO
          </Button>
      </Grid>

    </React.Fragment>
  );
}