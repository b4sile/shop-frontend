import { configureStore } from '@reduxjs/toolkit';
import {
  categoriesReducer,
  filtersReducer,
  productsReducer,
  usersReducer,
} from '../slices';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    filters: filtersReducer,
    products: productsReducer,
    user: usersReducer,
  },
});
