import { useContext, useEffect, useCallback } from 'react';
import paymentService from '../services/PaymentService';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

import StationsContext from '../context/StationsContext';
import {useTranslation} from "react-i18next"

const usePayment = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [t] = useTranslation("global") 

  const postPayment = useCallback(
    (data) => {
      paymentService.postPayment(data).then((response) => {
        enqueueSnackbar(t("payment.success"),
          { variant: 'success' }
        );
      }).catch((error) => {
        enqueueSnackbar(t("payment.error"), {
          variant: 'error'
        });
      });
    },
    []
  );


  return { postPayment, t};
};
export default usePayment;
