import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Ensure the correct path
import cartReducer from './cartSlice';  
import  useReducer  from './userSlice';
import wishlistReducer from "./wishlistSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    user:useReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  devTools: import.meta.env.MODE !== 'production', 
});

export default store;
