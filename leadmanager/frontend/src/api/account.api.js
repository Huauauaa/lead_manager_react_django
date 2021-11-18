import http from './index';

export const login = (payload) => {
  return http.post('/auth/login', payload);
};

export const getCurrentUser = () => {
  return http.get('/auth/user', {
    headers: { Authorization: `Token ${localStorage.getItem('token')}` },
  });
};
