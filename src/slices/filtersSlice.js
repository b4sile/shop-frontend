import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentCategory: null,
  sortBy: '["id", "ASC"]',
  search: '',
};

const { actions, reducer } = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setCurrentCategory, setSortBy, setSearch } = actions;

export default reducer;
