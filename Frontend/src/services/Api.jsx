import axios from 'axios';
import SERVER_URL from '../secrets';

const Api = (OTHER_URL) => {
  const axiosInstance = axios.create({
    baseURL: OTHER_URL||SERVER_URL
  });

  const token = sessionStorage.getItem('token');
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Token ${token}`;
  }

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');

        // USER_REMOVE
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
export default Api;
