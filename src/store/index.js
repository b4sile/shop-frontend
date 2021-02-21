import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer, filtersReducer } from '../slices';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    filters: filtersReducer,
  },
});
