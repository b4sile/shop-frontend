export {
  default as categoriesReducer,
  fetchCategories,
} from './categoriesSlice';

export {
  default as filtersReducer,
  setCurrentCategory,
  setSortBy,
} from './filtersSlice';

export { default as productsReducer, fetchProducts } from './productsSlice';

export { default as usersReducer, fetchUserLogin } from './usersSlice';
