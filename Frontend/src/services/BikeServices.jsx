
import Api from './Api'
  
const bikeServices ={

  obtainBike(data) {
    console.log(data)
    return Api().post('bikes/register/', data);
  },
  
  returnBike(data) {
    console.log(data)
    return Api().put('bikes/register/', data);
  },
  returnMyRegisters(data) {
    console.log(data)
    return Api().get('bikes/myregisters/', data);
  },

}

export default bikeServices;

