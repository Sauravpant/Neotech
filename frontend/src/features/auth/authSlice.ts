import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, UserResponse } from "@/types/user/auth.types";

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  checkingAuth: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserResponse>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.checkingAuth = false;
    },
    setCheckingAuthFalse(state) {
      state.checkingAuth = false;
    },
    removeUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.checkingAuth = false;
    },
    setProfilePicture(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.imageUrl = action.payload;
      }
    },
    removeProfilePicture(state) {
      if (state.user) {
        state.user.imageUrl = "";
      }
    },
    setVerify(state) {
      if (state.user) {
        state.user.isVerified = true;
      }
    },
  },
});

export const { setUser, setCheckingAuthFalse, removeUser, setProfilePicture, removeProfilePicture, setVerify } = authSlice.actions;
export default authSlice.reducer;
