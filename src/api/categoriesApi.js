import axios from 'axios';

export const categoriesApi = {
  getCategories: () => axios.get('/api/categories'),
};
