import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../components/Search/searchSlice';

export default configureStore({
  reducer: {
    search: searchReducer,
  }
});