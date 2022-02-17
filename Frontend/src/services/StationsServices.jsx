import Api from './Api';

const stationsServices = {
  getStations() {
    return Api().get('stations/station');
  },
  getOneStation(slug) {
    return Api().get(`stations/station/${slug}`);
  },
  createStation(data) {
    return Api().post(`stations/station-admin`, data);
  },
  updateStation(data, slug) {
    return Api().put(`stations/station-admin/${slug}`, data);
  },
  deleteStation(slug) {
    return Api().delete(`stations/station-admin/${slug}`);
  }
};

export default stationsServices;
