
import Api from './Api'

const bikeServices = {

  obtainBike(data) {
    return Api().post('bikes/register/', data);
  },
  returnBike(data) {
    return Api().put('bikes/register/', data);
  },
  returnMyRegisters(data) {
    return Api().get('bikes/myregisters/', data);
  },
  getBikesPointsStations() {
    return Api().get('bikes/getbikes/');
  },
  updateBike(data) {
    return Api().put('bikes/updatebike/', data);
  },
}

export default bikeServices;

