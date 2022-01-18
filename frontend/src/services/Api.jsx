import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = (URL) => {
  let navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: URL,
  });

  const token = localStorage.getItem("token");
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error);
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // store.dispatch("user/" + Constant.USER_REMOVE, {
        //   succes: true,
        // });
      }
      console.log("Hi ha problemes a la petició")

      navigate(`/login`);

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
export default API;
