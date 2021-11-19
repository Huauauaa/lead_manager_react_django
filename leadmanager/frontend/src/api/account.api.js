import http from './index';

export const login = (payload) => {
  return http.post('/auth/login', payload);
};

export const getCurrentUser = () => {
  return http.get('/auth/user');
};

export const register = (payload) => {
  return http.post('/auth/register', payload);
};
