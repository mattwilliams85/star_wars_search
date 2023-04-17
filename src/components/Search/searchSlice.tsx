import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchType } from '../../types/search';

const initialState: SearchType = {
  query: '',
  count: 0,
  next: null,
  previous: null,
  isLoading: true,
  results: [],
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<SearchType>) => ({
      ...action.payload
    }),
    loadStatus: (state, action) => ({
      ...state,
      isLoading: action.payload
    })
  }
});


export const { update, loadStatus } = searchSlice.actions;

export default searchSlice.reducer;