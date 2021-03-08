import axios from 'axios';
import { setAuthHeader } from '../utils';

export const cartsApi = {
  getCart: (id) => {
    return axios.get(`/api/carts?filter={"userId": ${id}}`, {
      headers: setAuthHeader(),
    });
  },
  addCartItem: (cartData) => {
    return axios.post(`/api/cart-items`, cartData, {
      headers: setAuthHeader(),
    });
  },
  updateCartItem: (id, cartData) => {
    return axios.put(`/api/cart-items/${id}`, cartData, {
      headers: setAuthHeader(),
    });
  },
  getCartItems: (cartId) => {
    return axios.get(`/api/cart-items?filter={"cartId": ${cartId}}`, {
      headers: setAuthHeader(),
    });
  },
  getCartValues: (ids) => {
    return axios.get(`/api/productsMeta?filter={"id" : [${ids}]}`, {
      headers: setAuthHeader(),
    });
  },
  clearCart: (ids) => {
    return axios.delete(`/api/cart-items?ids=[${ids}]`, {
      headers: setAuthHeader(),
    });
  },
  deleteCartItem: (id) => {
    return axios.delete(`/api/cart-items/${id}`, { headers: setAuthHeader() });
  },
};
