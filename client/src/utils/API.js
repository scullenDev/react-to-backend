import axios from 'axios';
const baseURL = 'http://localhost:8080';

export default {
  getContacts: (type) => {
    const query = type ? 'type=' + type : '';
    return axios.get(`${baseURL}/api/contacts?${query}`);
  },
  deleteContact: (id) => {
    return axios.delete(`${baseURL}/api/contacts/${id}`);
  },
  addContact: (contact) => {
    return axios.post(`${baseURL}/api/contacts`, contact);
  },
};
