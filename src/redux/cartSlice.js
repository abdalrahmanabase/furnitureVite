import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/carts";

// ✅ Fetch cart items from the database
export const fetchCartItemsAsync = createAsyncThunk(
    "cart/fetchCartItems",
    async () => {
      const response = await fetch(`${API_URL}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      const data = await response.json();
      return data.cart?.cart_items || []; // Extract cart_items properly
    }
  );
  

export const addToCartAsync = createAsyncThunk(
    "cart/addToCart",
    async ({ id, quantity }, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return rejectWithValue({ message: "User not authenticated" });
  
        const response = await axios.post(
          `${API_URL}/add/${id}`,
          { quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        // Fetch product details to include in the response
        const productResponse = await axios.get(`http://127.0.0.1:8000/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const product = productResponse.data.product;
  
        return {
          cartItem: {
            id: response.data.cartItem.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: response.data.cartItem.quantity,
          },
        };
      } catch (error) {
        if (error.response?.status === 409) {
          return rejectWithValue({ message: "This product is already in your cart." });
        }
        return rejectWithValue(error.response?.data || { message: "Failed to add to cart" });
      }
    }
  );

// ✅ Remove item from cart in database
export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCart",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue({ message: "User not authenticated" });

      await axios.delete(`/api/cartitems/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return id; // Return the deleted item ID
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to remove item" });
    }
  }
);

// ✅ Update item quantity in database
export const updateQuantityAsync = createAsyncThunk(
  "cart/updateQuantity",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue({ message: "User not authenticated" });

      const response = await axios.put(
        `/api/cartitems/${id}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return { id: response.data.cartItem.id, quantity: response.data.cartItem.quantity };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to update quantity" });
    }
  }
);

export const clearCartAsync = createAsyncThunk(
    "cart/clearCart",
    async (_, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return rejectWithValue({ message: "User not authenticated" });
  
        await axios.delete(`${API_URL}/clear`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        return []; // Return an empty array
      } catch (error) {
        return rejectWithValue(error.response?.data || { message: "Failed to clear cart" });
      }
    }
  );
  

const initialState = {
  cartItems: [],
  totalPrice: 0,
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetching cart items
      .addCase(fetchCartItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.totalPrice = state.cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
        state.status = "succeeded";
    })
      .addCase(fetchCartItemsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to fetch cart items";
      })

      // Handle adding an item to the cart
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        if (!action.payload || !action.payload.cartItem) return;
        const { id, title, price, image, quantity } = action.payload.cartItem;
        const existingItem = state.cartItems.find((item) => item.id === id);
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          state.cartItems.push({ id, title, price, image, quantity });
        }
        state.totalPrice = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      })

      // Handle removing an item from the cart
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
        state.totalPrice = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      })

      .addCase(updateQuantityAsync.fulfilled, (state, action) => {
        const { id, quantity } = action.payload;
        const item = state.cartItems.find((item) => item.id === id);
        if (item) {
            item.quantity = quantity;
        }
    
        // Recalculate total price correctly
        state.totalPrice = state.cartItems.reduce((sum, item) => 
            sum + (item.product?.price || 0) * item.quantity, 0
        );
    })
    

      // Handle clearing the entire cart
      .addCase(clearCartAsync.fulfilled, (state) => {
        state.cartItems = [];
        state.totalPrice = 0;
      });
  },
});

export default cartSlice.reducer;