import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const toggleWishlistAsync = createAsyncThunk(
  "wishlist/toggleWishlist",
  async (product, { getState, rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return rejectWithValue("You must be logged in to manage the wishlist.");
    }

    try {
      const { wishlist } = getState().wishlist;
      const isInWishlist = wishlist.some((item) => item.id === product.id);
      const url = `http://127.0.0.1:8000/api/wishlist/${isInWishlist ? "remove" : "add"}/${product.id}`;

      await axios.post(url, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return { product, isInWishlist: !isInWishlist };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update wishlist.");
    }
  }
);

export const fetchWishlistAsync = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.wishlist.wishlist_items.map((item) => item.product);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch wishlist.");
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    loading: false,
    error: null,
  },
  reducers: {
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleWishlistAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleWishlistAsync.fulfilled, (state, action) => {
        state.loading = false;
        const { product, isInWishlist } = action.payload;
        if (isInWishlist) {
          state.wishlist.push(product);
        } else {
          state.wishlist = state.wishlist.filter((item) => item.id !== product.id);
        }
      })
      .addCase(fetchWishlistAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      });
  },
});

export const { setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
