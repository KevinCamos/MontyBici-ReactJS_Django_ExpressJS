import { useContext, useEffect } from 'react';
import paymentService from '../services/PaymentService';
import { useForm } from 'react-hook-form';

import StationsContext from '../context/StationsContext';

const usePayment = () => {

  const postPayment = useCallback(
    (data) => {
      paymentService.postPayment(data).then((response) => {
        // setStations(response.data.results);
      });
    },
    []
  );

 
  return {postPayment };
};
export default usePayment;
