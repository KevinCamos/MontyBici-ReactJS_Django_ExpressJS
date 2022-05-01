import { useContext, useEffect, useCallback , useState} from 'react';
import paymentService from '../services/PaymentService';
import { useSnackbar } from 'notistack';

import UserContext from '../context/UserContext';

import {useTranslation} from "react-i18next"

const usePayment = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [t] = useTranslation("global") 
  const [dataPayment, setDataPayment] = useState({});
  const {  user, setUser } =
    useContext(UserContext);

  const postPayment = useCallback(
    (data) => {
      paymentService.postPayment(data).then((response) => {
        let amountUser={...user}
        console.log(amountUser)
        console.log(amountUser.profile.credit.amount)
        console.log(response.data.amount)
        amountUser.profile.credit.amount=response.data.amount
        setUser(amountUser)
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
