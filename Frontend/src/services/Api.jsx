import axios from "axios";
import SERVER_URL from '../secrets'

export default function Api() {
  const axiosInstance = axios.create({
    baseURL: SERVER_URL,
  });

  const token = sessionStorage.getItem("token");
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Token ${token}`;
  }

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error);
      alert("error en API")
      if (error.response.status === 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");

        // store.dispatch("user/" + Constant.USER_REMOVE, {
        //   succes: true,
        // });
      }

      console.log("Hi ha problemes a la petició")

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
