import { createSlice } from '@reduxjs/toolkit';
import { productsApi } from '../api';

const initialState = {
  items: [],
  isLoading: false,
};

const { actions, reducer } = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setProducts, setIsLoading } = actions;

export default reducer;

export const fetchProducts = (categoryId, sort, search) => (dispatch) => {
  dispatch(setIsLoading(true));
  productsApi
    .getProducts(categoryId, sort, search)
    .then(({ data }) => {
      dispatch(setProducts(data));
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
      dispatch(setIsLoading(false));
    });
};
