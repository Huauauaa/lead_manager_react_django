import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  timeout: 1000,
});

instance.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

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
