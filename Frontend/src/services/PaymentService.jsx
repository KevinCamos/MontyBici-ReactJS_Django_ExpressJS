import Api from './Api';

const paymentService = {
 
  postPayment(data) {
    return Api().post('notifications/notification/', data);
  },
  
};

export default paymentService;
