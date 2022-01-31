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
      if (error.response.status === 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");

        // USER_REMOVE
      }


      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
