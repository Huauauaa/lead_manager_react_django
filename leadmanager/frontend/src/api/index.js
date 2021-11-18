import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: '/api',
  timeout: 1000,
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error(error, error.response);
    const { statusText, data, status } = error.response;
    switch (status) {
      case 404:
        return Promise.reject(statusText);
      case 400:
        return Promise.reject(data);
      default:
        return Promise.reject(error.response);
    }
  },
);

export default instance;
