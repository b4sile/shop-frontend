import axios from 'axios';
import { setAuthHeader } from '../utils';

export const usersApi = {
  login: (userData) => {
    return axios.post(`/api/users/signin`, userData);
  },
  getMe: () => axios.get('/api/users/me', { headers: setAuthHeader() }),
  registration: (userData) => axios.post('/api/users', userData),
};
