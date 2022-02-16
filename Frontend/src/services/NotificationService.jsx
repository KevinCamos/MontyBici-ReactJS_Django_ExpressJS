
import Api from './Api'

const notificationService = {

  getReasons(data) {
    console.log(data)
    return Api().get('notifications/reasons/');
  },
  sendNotification(data) {
    console.log(data)
    return Api().post('notifications/notification/', data);
  },
 
}

export default notificationService;

