import { useContext, useEffect, useCallback , useState} from 'react';
import paymentService from '../services/PaymentService';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

import StationsContext from '../context/StationsContext';
import {useTranslation} from "react-i18next"

const usePayment = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [t] = useTranslation("global") 
  const [dataPayment, setDataPayment] = useState({});

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


  return { postPayment, dataPayment, setDataPayment,t};
};
export default usePayment;
