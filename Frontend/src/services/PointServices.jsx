import Api from './Api';

const pointServices = {
  getPointsStations() {
    return Api().get('stations/getpoints/');
  },
  updatePoint(data) {
    return Api().put('stations/updatepoint/', data);
  },
  updatePointsBike(data) {
    return Api().put('stations/updatepointsbike/', data);
  }
};

export default pointServices;
