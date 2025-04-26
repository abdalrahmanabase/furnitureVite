import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";
// Register User Async Function
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post("/register", userData); 
      if (!res.data.token) {
        return rejectWithValue("Registration failed");
      }

      localStorage.setItem("token", res.data.token);
      return res.data.token; // Return token
    } catch (error) {
      return rejectWithValue("Something went wrong!");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    loading: false,
    errors: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
