import http from './index';

export const getLeads = () => {
  return http.get('/leads/', {
    headers: { Authorization: `Token ${localStorage.getItem('token')}` },
  });
};

export const createLead = (payload) => {
  return http.post('/leads/', payload);
};

export const updateLead = (id, payload) => {
  return http.put(`/leads/${id}/`, payload);
};

export const deleteLead = (id) => {
  return http.delete(`/leads/${id}`);
};
