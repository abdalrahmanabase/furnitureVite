import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // تحميل المستخدم عند فتح التطبيق
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // مسح بيانات المستخدم عند تسجيل الخروج
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
