import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api"; 

// ✅ Fetch Wishlist
export const fetchWishlistAsync = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/wishlist");
      // Fixed key here
      return response.data.wishlist?.wishlistItems || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch wishlist.");
    }
  }
);

// ✅ Toggle Wishlist Item
export const toggleWishlistAsync = createAsyncThunk(
  "wishlist/toggleWishlist",
  async (product, { getState, rejectWithValue }) => {
    const wishlist = getState().wishlist.wishlist;
    const isInWishlist = wishlist.some((item) => item.productId === product.id);
    const url = `/wishlist/${isInWishlist ? "remove" : "add"}/${product.id}`;

    try {
      const response = await api.post(url);
      return { product, isInWishlist: !isInWishlist };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update wishlist.");
    }
  }
);

// ✅ Wishlist Slice
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlistAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(fetchWishlistAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleWishlistAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleWishlistAsync.fulfilled, (state, action) => {
        state.loading = false;
        const { product, isInWishlist } = action.payload;
        if (isInWishlist) {
          state.wishlist.push({
            productId: product.id,
            product: product
          });
        } else {
          state.wishlist = state.wishlist.filter(
            (item) => item.productId !== product.id
          );
        }
      })
      .addCase(toggleWishlistAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
