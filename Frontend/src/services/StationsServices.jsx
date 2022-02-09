import Api from "./Api";

const stationsServices = {
  getStations() {
    return Api().get("stations/station");
  },
  getOneStation(slug) {
    return Api().get(`stations/station/${slug}`);
  },
  saveStation(data) {
    return Api().post(`stations/station-admin`,data);
  },
};

export default stationsServices;
