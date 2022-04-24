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
      return makingRows.push(createData(
        allRegisters[allRegisters.length - index - 1]?.created_at,
        allRegisters[allRegisters.length - index - 1]?.movement,
        allRegisters[allRegisters.length - index - 1]?.amount));
    });
    setRows(makingRows);
  };


  function createData(created_at, movement, amount) {

    let created_at_date = new Date(created_at)
    created_at = created_at_date.toLocaleString()
    let eh = "eh"
    return { created_at, movement, amount };
  }





  return { isLoading, isError, rows };
};
export default useRegisterCredit;
