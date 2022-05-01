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
  const formatPrice = (price) => {

    return (price || "-").split("").reverse().join("").replace(".", ",").split("").reverse().join("")+"€"

  }
  const createTable = (registers) => {
    const makingRows = [];
    registers.reverse().map((register) => {
      return makingRows.push(createData(
        register?.created_at,
        formatPrice(register?.movement),
        formatPrice(register?.amount)));
    });
    setRows(makingRows);
  };


  const createData = (created_at = "", movement = "", amount = "") => {
    if (created_at === "") {
      return
    }
    let created_at_date = new Date(created_at)
    if (created_at_date.toLocaleString() !== "Invalid Date") {
      if (new Date(created_at).getTime() > Date.now()) {
        created_at_date = Date.now()
      }
      created_at = created_at_date.toLocaleString()
    }
    return { created_at, movement, amount };
  }
  return { isLoading, isError, rows };
};
export default useRegisterCredit;
