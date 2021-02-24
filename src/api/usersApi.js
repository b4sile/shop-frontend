import axios from 'axios';

export const usersApi = {
  login: (userData) => {
    return axios.post(`/api/users/signin`, userData);
  },
};
