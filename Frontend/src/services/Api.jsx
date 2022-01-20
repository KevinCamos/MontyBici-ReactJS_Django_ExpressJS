import axios from "axios";
// import { useNavigate } from "react-router-dom";
import SERVER_URL from '../secrets'

export default function Api() {
// console.log( SERVER_URL.SERVER_URL)
  const axiosInstance = axios.create({
    baseURL: SERVER_URL,
  });

  const token = localStorage.getItem("token");
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error);
      alert("error en API")
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // store.dispatch("user/" + Constant.USER_REMOVE, {
        //   succes: true,
        // });
      }
      console.log( SERVER_URL)

      console.log("Hi ha problemes a la petició")
      // let navigate = useNavigate();

      // navigate(`/login`);

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
