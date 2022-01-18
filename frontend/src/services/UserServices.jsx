
import Api from './Api'
import secret from '../secret.js'

const userServices ={

  postLogin(data) {
    return Api(`${secret.SERVER_URL}`).post('user/', data);
  },


  /* Todas la funciones con la ruta "user/" de GO necesita un Token */
  getAll() {
    return Api(`${secret.SERVER_URL}`).get(`user/`);
  },
  getById(id) {
    return Api(`${secret.SERVER_URL}`).get(`user/${id}`);
  },
  createUser(data) {
    return Api(`${secret.SERVER_URL}`).post('user/', data);
  },
  updateUser(data, id) {
    return Api(`${secret.SERVER_URL}`).put(`user/${id}`, data);
  },
  deleteById(id) {
    return Api(`${secret.SERVER_URL}`).delete(`user/${id}`);
  },
}

export default userServices;

