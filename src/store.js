import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/authSlice'; // Ensure the correct path
import cartReducer from './redux/cartSlice';  

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer
  },
  devTools: import.meta.env.MODE !== 'production', 
});

export default store;
