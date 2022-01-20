
import Api from './Api'
  
const userServices ={

  postLogin(data) {
    return Api().post('user/', data);
  },


/*   getAll() {
    return Api(`${secret.SERVER_URL}`).get(`user/`);
  },
  getById(id) {
    return Api(`${secret.SERVER_URL}`).get(`user/${id}`);
  },

  updateUser(data, id) {
    return Api(`${secret.SERVER_URL}`).put(`user/${id}`, data);
  },
  deleteById(id) {
    return Api(`${secret.SERVER_URL}`).delete(`user/${id}`);
  }, */
}

export default userServices;

