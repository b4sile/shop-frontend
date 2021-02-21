import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentCategory: null,
};

const { actions, reducer } = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
});

export const { setCurrentCategory } = actions;

export default reducer;
