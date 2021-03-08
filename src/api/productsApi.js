import axios from 'axios';

export const productsApi = {
  getProducts: (categoryId, sort, search) => {
    let query = `sort=${sort}`;
    if (categoryId) {
      query += `&filter={"categoryId": ${categoryId}}`;
    }
    if (search !== '') {
      query += `&title=${search}`;
    }
    return axios.get(`/api/products?${query}`);
  },

  getProduct: (id) => axios.get(`/api/products/${id}`),
};
