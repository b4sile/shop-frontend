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
        state.items[id].quantity++;
      }
      if (!state.cart) {
        localStorage.setItem(
          'cart',
          JSON.stringify({ items: state.items, totalCount: state.totalCount })
        );
      }
    },
    setCart: (state, { payload }) => {
      state.cart = payload;
    },
    clearCart: (state) => {
      state.cart = null;
    },
    clearCartItems: (state) => {
      state.items = {};
      state.totalCount = 0;
    },
    setCartItems: (state, { payload: { cartItems, totalCount } }) => {
      state.items = cartItems;
      state.totalCount = totalCount;
    },
    plusCartItem: (state, { payload: { id, quantity } }) => {
      state.items[id].quantity = quantity;
      if (!state.cart) {
        localStorage.setItem(
          'cart',
          JSON.stringify({ items: state.items, totalCount: state.totalCount })
        );
      }
    },
    minusCartItem: (state, { payload }) => {
      if (state.items[payload].quantity > 1) {
        state.items[payload].quantity--;
      }
    },
    removeCartItem: (state, { payload }) => {
      delete state.items[payload];
      state.totalCount--;
      if (!state.cart) {
        localStorage.setItem(
          'cart',
          JSON.stringify({ items: state.items, totalCount: state.totalCount })
        );
      }
    },
  },
});

export const {
  addCartItem,
  setCart,
  setCartItems,
  plusCartItem,
  minusCartItem,
  removeCartItem,
  clearCartItems,
  clearCart,
} = actions;

export default reducer;

export const fetchUpdateCartItem = (id, quantity, cartId) => (
  dispatch,
  getState
) => {
  const {
    cart: { items },
  } = getState();
  const cartData = { cartId, quantity, product_metaId: id };

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

export const fetchClearCartItems = (ids) => (dispatch) => {
  return cartsApi
    .clearCart(ids)
    .then(() => {
      dispatch(clearCartItems());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchDeleteCartItem = (itemId, id) => (dispatch) => {
  return cartsApi
    .deleteCartItem(itemId)
    .then(() => {
      dispatch(removeCartItem(id));
    })
    .catch((err) => {
      console.log(err);
    });
};

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

  return dispatch(fetchUpdateCartItem(id, quantity, cartId));
};

export const fetchCartItems = (userId) => (dispatch) => {
  return cartsApi
    .getCart(userId)
    .then(({ data }) => {
      dispatch(setCart(data[0]));
      return cartsApi.getCartItems(data[0].id);
    })
    .then(({ data }) => {
      const cartItems = {};
      let totalCount = 0;
      data.forEach(({ productMetumId: id, quantity, id: cartItemId }) => {
        cartItems[id] = { quantity, id: cartItemId };
        totalCount++;
      });
      dispatch(setCartItems({ cartItems, totalCount }));
    })
    .catch((err) => {
      console.log(err);
    });
};
