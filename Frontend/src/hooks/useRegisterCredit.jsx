import { array } from 'prop-types';
import { useEffect, useState } from 'react';
import paymentServices from '../services/PaymentService';

const useRegisterCredit = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(async () => {
    setIsLoading(true);
    if (rows.length === 0) {

      paymentServices
        .getPayments()
        .then((response) => {
          setIsLoading(false);

          console.log(response.data)
          const registerResponse = response.data;
          createTable(registerResponse);

        })
        .catch(() => {
          setIsError(true)
          setIsLoading(false);
        });
    }
  }, []);

  const createTable = (registers) => {
    const makingRows = [];
    registers.map((register, index, allRegisters) => {
      makingRows.push(createData(
        allRegisters[allRegisters.length - index]?.created_at,
         allRegisters[allRegisters.length - index]?.movement,
          allRegisters[allRegisters.length - index]?.amount));
    });
    setRows(makingRows);
  };


  function createData(created_at, movement, amount) {

    return { created_at, movement, amount };
  }





  return { isLoading, isError, rows };
};
export default useRegisterCredit;
