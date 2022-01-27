import Api from "./Api";

const stationsServices = {
  getStations() {
    return Api().get("stations/station");
  },
  getOneStation(slug) {
    console.log(`stations/station/${slug}`)
    return Api().get(`stations/station/${slug}`);
  },
};

export default stationsServices;
