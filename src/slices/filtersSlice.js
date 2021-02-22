import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentCategory: null,
  sortBy: '["id", "ASC"]',
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
  },
});

export const { setCurrentCategory, setSortBy } = actions;

export default reducer;
