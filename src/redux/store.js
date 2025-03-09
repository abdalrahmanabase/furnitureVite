import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Ensure the correct path
import cartReducer from './cartSlice';  
import  useReducer  from './userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user:useReducer,
    cart: cartReducer
  },
  devTools: import.meta.env.MODE !== 'production', 
});

export default store;
