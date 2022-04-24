import { useContext, useEffect, useCallback } from 'react';
import paymentService from '../services/PaymentService';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

import StationsContext from '../context/StationsContext';

const usePayment = () => {
  const { enqueueSnackbar } = useSnackbar();

  const postPayment = useCallback(
    (data) => {
      paymentService.postPayment(data).then((response) => {
        enqueueSnackbar(
          'Gracias por tu incidencia, intentaremos resolverla con la mayor brevedad posible.',
          { variant: 'success' }
        );
      }).catch((error) => {
        enqueueSnackbar('Ha habido algún error enviando el mensaje.', {
          variant: 'error'
        });
      });
    },
    []
  );


  return { postPayment };
};
export default usePayment;
