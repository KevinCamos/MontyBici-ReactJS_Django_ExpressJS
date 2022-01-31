
import Api from './Api'
  
const bikeServices ={

  obtainBike(data) {
    console.log(data)
    return Api().post('bikes/register/', data);
  },
  

}

export default bikeServices;

