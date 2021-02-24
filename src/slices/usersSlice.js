import { createSlice } from '@reduxjs/toolkit';
import { usersApi } from '../api';

const initialState = {
  isAuth: false,
};

const { actions, reducer } = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setAuth } = actions;

export default reducer;

export const fetchUserLogin = (userData) => (dispatch) => {
  return usersApi
    .login(userData)
    .then(({ data }) => {
      localStorage.setItem('token', data.token);
      dispatch(setAuth(true));
    })
    .catch((err) => {
      console.log(err);
    });
};
