import { configureStore } from '@reduxjs/toolkit';
import companyReducer from './apiSlice'; // adjust path if needed

const store = configureStore({
  reducer: {
    company: companyReducer,
  },
});

export default store;