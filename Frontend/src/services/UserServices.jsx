
import Api from './Api'
  
const userServices ={

  login(data) {
    return Api().post('auth/users/login', data);
  },
  register(data) {
    return Api().post('auth/users', data);
  },
  loginAdmin(data) {
    return Api().post('auth/users/login-admin', data);
  },
  checkUser() {
    return Api().get('auth/user');
  },
  // checkUserAdmin() {
  //   return Api().get('auth/user');
  // },

}

export default userServices;

