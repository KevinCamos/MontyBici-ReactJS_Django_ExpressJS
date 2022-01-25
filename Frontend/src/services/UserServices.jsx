
import Api from './Api'
  
const userServices ={

  login(data) {
    return Api().post('auth/users/login', data);
  },
  register(data) {
    return Api().post('auth/users', data);
  },
  checkUser() {
    return Api().get('auth/user');
  },

}

export default userServices;

