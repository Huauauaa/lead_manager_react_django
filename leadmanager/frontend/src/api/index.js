import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
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
        break;
    }
    // return Promise.reject(error.response);
  },
);

export default instance;
