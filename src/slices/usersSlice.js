import { createSlice } from '@reduxjs/toolkit';
import { usersApi } from '../api';

const initialState = {
  isAuth: false,
  user: {},
};

const { actions, reducer } = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      localStorage.removeItem('token');
      state.user = {};
      state.isAuth = false;
    },
  },
});

export const { setAuth, setUser, clearUser } = actions;

export default reducer;

export const fetchUserLogin = (userData) => (dispatch, getState) => {
  const {
    cart: { items },
  } = getState();
  userData.cartItems = items;
  return usersApi.login(userData).then(({ data: { token, user } }) => {
    localStorage.setItem('token', token);
    dispatch(setUser(user));
    dispatch(setAuth(true));
    localStorage.removeItem('cart');
  });
};

export const fetchUserData = () => (dispatch) => {
  return usersApi
    .getMe()
    .then(({ data }) => {
      dispatch(setUser(data));
      dispatch(setAuth(true));
    })
    .catch((err) => {
      setAuth(false);
      setUser({});
    });
};
