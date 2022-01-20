
import Api from './Api'
  
const stationsServices ={

  getStations() {
    return Api().get('stations/station');
  },


}

export default stationsServices;

