import Api from './Api';

const paymentService = {
  postPayment(data) {
    return Api("http://localhost:4000/api/").post('simulatorBank/', data);
  },
  getPayments(data) {
    return Api().get('credits/credit/', data);
  },
};

export default paymentService;
