
import Api from './Api'

const notificationService = {

  getReasons(data) {
    console.log(data)
    return Api().get('notifications/reasons/');
  },
  returnBike(data) {
    console.log(data)
    return Api().put('bikes/register/', data);
  },
 
}

export default notificationService;

