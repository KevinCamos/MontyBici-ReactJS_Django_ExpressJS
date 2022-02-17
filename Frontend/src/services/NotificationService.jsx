import Api from './Api';

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
  checkNotification(data, id) {
    return Api().put(`notifications/notification/${id}`, data);
  }
};

export default notificationService;
