import { createSlice } from '@reduxjs/toolkit';
import { cartsApi } from '../api';

const initialState = {
  items: {},
  totalCount: 0,
  cart: null,
};

const { actions, reducer } = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, { payload: { id, quantity, cartItemId } }) => {
      if (!state.items[id]) {
        state.items[id] = {
          quantity,
          id: cartItemId,
        };
        state.totalCount += 1;
      } else {
        state.items[id] += quantity;
      }
    },
    setCart: (state, { payload }) => {
      state.cart = payload;
    },
    setCartItems: (state, { payload: { cartItems, totalCount } }) => {
      state.items = cartItems;
      state.totalCount = totalCount;
    },
    plusCartItem: (state, { payload: { id, quantity } }) => {
      state.items[id].quantity = quantity;
    },
  },
});

export const { addCartItem, setCart, setCartItems, plusCartItem } = actions;

export default reducer;

export const fetchAddCartItem = (id, quantity, cartId) => (
  dispatch,
  getState
) => {
  const {
    cart: { items },
  } = getState();
  const cartData = { cartId, quantity, product_metaId: id };

  if (!items[id])
    return cartsApi
      .addCartItem(cartData)
      .then(({ data: { id: cartItemId } }) => {
        dispatch(addCartItem({ id, quantity, cartItemId }));
      })
      .catch((err) => {
        console.log(err);
      });

  const cartItemId = items[id].id;
  const currentQuantity = items[id].quantity;
  cartData.quantity += +currentQuantity;

  return cartsApi
    .updateCartItem(cartItemId, cartData)
    .then(({ data: { quantity } }) => {
      dispatch(plusCartItem({ id, quantity }));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchCartItems = (userId) => (dispatch) => {
  return cartsApi
    .getCart(userId)
    .then(({ data }) => {
      dispatch(setCart(data));
      return cartsApi.getCartItems(data.id);
    })
    .then(({ data }) => {
      const cartItems = {};
      let totalCount = 0;
      data.forEach(({ productMetumId: id, quantity, id: cartItemId }) => {
        cartItems[id] = { quantity, id: cartItemId };
        totalCount += quantity;
      });
      dispatch(setCartItems({ cartItems, totalCount }));
    })
    .catch((err) => {
      console.log(err);
    });
};
