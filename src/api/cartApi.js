import axios from 'axios';
import { setAuthHeader } from '../utils';

export const cartsApi = {
  getCart: (id) => {
    return axios.get(`/api/carts/${id}`);
  },
  addCartItem: (cartData) => {
    return axios.post(`/api/cart-items`, cartData);
  },
  updateCartItem: (id, cartData) => {
    return axios.put(`/api/cart-items/${id}`, cartData);
  },
  getCartItems: (cartId) => {
    return axios.get(`/api/cart-items?filter={"cartId": ${cartId}}`);
  },
  getCartValues: (ids) => {
    return axios.get(`/api/productsMeta?filter={"id" : [${ids}]}`);
  },
};
