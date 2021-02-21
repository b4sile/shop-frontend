import { createSlice } from '@reduxjs/toolkit';
import { categoriesApi } from '../api';

const initialState = {
  items: [],
  isLoading: false,
};

const { actions, reducer } = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.items = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCategories, setIsLoading } = actions;

export default reducer;

export const fetchCategories = () => (dispatch) => {
  dispatch(setIsLoading(true));
  categoriesApi
    .getCategories()
    .then(({ data }) => {
      dispatch(setCategories(data));
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
      dispatch(setIsLoading(false));
    });
};
