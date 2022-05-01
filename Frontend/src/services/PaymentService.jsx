import Api from './Api';

const paymentService = {
  postPayment(data) {
    return Api("https://monty-bici-express-bank.vercel.app/api/").post('simulatorBank/', data);
  },
  getPayments(data) {
    return Api().get('credits/credit/', data);
  },
};

export default paymentService;
