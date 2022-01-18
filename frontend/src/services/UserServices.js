
import Api from '@/services/Api'
import secret from '../secret.js'

export default {



  /* Todas la funciones con la ruta "user/" de GO necesita un Token */
  getAll() {
    return Api(`${secret.SERVER_URL}`).get(`user/`)
  },
  getById(id) {
    return Api(`${secret.SERVER_URL}`).get(`user/${id}`)
  },
  createUser(data) {
    return Api(`${secret.SERVER_URL}`).post('user/', data)
  },
  updateUser(data, id) {
    return Api(`${secret.SERVER_URL}`).put(`user/${id}`, data)
  },
  deleteById(id) {
    return Api(`${secret.SERVER_URL}`).delete(`user/${id}`)
  }
}