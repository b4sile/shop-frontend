import axios from 'axios';

export const productsApi = {
  getProducts: (categoryId, sort) => {
    let query = `sort=${sort}`;
    if (categoryId) {
      query += `&filter={"categoryId": ${categoryId}}`;
    }
    return axios.get(`/api/products?${query}`);
  },

  getProduct: (id) => axios.get(`/api/products/${id}`),
};
