import Api from './Api'

const notificationService = {

  getReasons() {
    return Api().get('notifications/reasons/');
  },
  getNotifications() {
    return Api().get('notifications/notification/');
  },
  sendNotification(data) {
    return Api().post('notifications/notification/', data);
  },
  checkNotification(data) {
    return Api().put('notifications/notification/', data);
  },
}

export default notificationService;