import Api from "./Api";

const stationsServices = {
  getStations() {
    return Api().get("stations/station");
  },
  getOneStation(slug) {
    return Api().get(`stations/station/${slug}`);
  },
};

export default stationsServices;
