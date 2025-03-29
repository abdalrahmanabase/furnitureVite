import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api"; // adjust the path if needed

// Helper function to calculate total price
const calculateTotalPrice = (cartItems) => 
    cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

// ✅ Fetch cart items
export const fetchCartItemsAsync = createAsyncThunk(
    "cart/fetchCartItems",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/carts");
            return response.data.cart?.cart_items || [];
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to fetch cart items" });
        }
    }
);

// ✅ Add to Cart
export const addToCartAsync = createAsyncThunk(
    "cart/addToCart",
    async ({ productId, quantity }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/carts/add/${productId}`, { quantity });
            return response.data.cartItem; // Includes product info
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to add item to cart" });
        }
    }
);

// ✅ Remove from Cart
export const removeFromCartAsync = createAsyncThunk(
    "cart/removeFromCart",
    async (cartItemId, { rejectWithValue }) => {
        try {
            await api.delete(`/cartitems/${cartItemId}`);
            return cartItemId;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to remove item" });
        }
    }
);

// ✅ Update Quantity
export const updateQuantityAsync = createAsyncThunk(
    "cart/updateQuantity",
    async ({ cartItemId, quantity }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/cartitems/${cartItemId}`, { quantity });
            return response.data.cartItem;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to update quantity" });
        }
    }
);

// ✅ Clear Cart
export const clearCartAsync = createAsyncThunk(
    "cart/clearCart",
    async (_, { rejectWithValue }) => {
        try {
            await api.delete("/carts/clear");
            return [];
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to clear cart" });
        }
    }
);

// ✅ Initial State
const initialState = {
    cartItems: [],
    totalPrice: 0,
    status: "idle",
    error: null,
};

// ✅ Slice
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItemsAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
                state.cartItems = action.payload;
                state.totalPrice = calculateTotalPrice(state.cartItems);
                state.status = "succeeded";
            })
            .addCase(fetchCartItemsAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload?.message;
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                if (!action.payload) return;
                state.cartItems.push(action.payload);
                state.totalPrice = calculateTotalPrice(state.cartItems);
            })
            .addCase(removeFromCartAsync.fulfilled, (state, action) => {
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
                state.totalPrice = calculateTotalPrice(state.cartItems);
            })
            .addCase(updateQuantityAsync.fulfilled, (state, action) => {
                const updatedItem = action.payload;
                const item = state.cartItems.find(item => item.id === updatedItem.id);
                if (item) item.quantity = updatedItem.quantity;
                state.totalPrice = calculateTotalPrice(state.cartItems);
            })
            .addCase(clearCartAsync.fulfilled, (state) => {
                state.cartItems = [];
                state.totalPrice = 0;
            });
    },
});

export default cartSlice.reducer;
