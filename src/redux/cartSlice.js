import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api/carts";

// Fetch user's cart
export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(API_URL);
        return response.data.cart || { cartItems: [] };
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Add product to cart
export const addToCart = createAsyncThunk("cart/addToCart", async (productId, { rejectWithValue }) => {
    try {
        const response = await axios.post(`api/cart/add/${productId}`);
        return response.data.cartItem;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Update cart item quantity
export const updateCartItem = createAsyncThunk("cart/updateCartItem", async ({ id, quantity }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/api/cartitems/${id}`, { quantity });
        return response.data.cartItem;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Remove item from cart
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`/api/cartitems/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload.cartItems;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cartItems.push(action.payload);
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                const index = state.cartItems.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.cartItems[index].quantity = action.payload.quantity;
                }
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
            });
    }
});

export default cartSlice.reducer;
