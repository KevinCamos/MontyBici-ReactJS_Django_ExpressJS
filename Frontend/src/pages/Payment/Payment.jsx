import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PaymentForm from './container-steps/PaymentForm';
import Review from './container-steps/Review';

import useUser from '../../hooks/useUser';
import usePayments from '../../hooks/usePayments';

export default function Payment() {

  const steps = ['step1', 'step2'];
  const [activeStep, setActiveStep] = useState(0);
  const { postPayment,t } = usePayments();
  const [dataPayment, setDataPayment] = useState({});


  const handleNext = () => {

    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const saveDataNextPage = (e) => {
    setDataPayment(e)
    handleNext()
  }
  function getStepContent(step) {
    switch (step) {
      case 0: return <PaymentForm activeStep={activeStep} steps={steps} emmitPayment={e => { saveDataNextPage(e) }} />;
      case 1: return <Review dataPayment={dataPayment} emmitPayment={e => { postPayment(e) }} />;
      default: throw new Error('Unknown step');
    }
  }

  return (
    <>
      <CssBaseline />
     
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            {t("payment.up-money")}
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5, pl: 8, pr: 8 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{t(`payment.${label}`)}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length
              ? (<React.Fragment>
                <Typography variant="h5" gutterBottom>
                {t("payment.thanks")}
                </Typography>
                <Typography variant="subtitle1">
                {t("payment.your-pay")}

                </Typography>
              </React.Fragment>
              )
              : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                {t("payment.back")}
                      </Button>
                    )}

                    {/* <Button
                      variant="submit"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1 ? 'Place order' : 'Siguiente página'}
                    </Button> */}
                  </Box>
                </React.Fragment>
              )}
          </React.Fragment>
        </Paper>
      </Container>
    </>
  );
}