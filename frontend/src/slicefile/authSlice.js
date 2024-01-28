import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  auth: {
    isAuthenticated: false,
    data: null,
    accessToken: null,
    refreshToken: null,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.auth.isAuthenticated = true;
      state.auth.data = null;
      state.auth.accessToken = action.payload;
      state.auth.refreshToken = action.payload;
    },
    logoutSuccess: (state, action) => {
      state.auth.isAuthenticated = false;
      state.auth.data = null;
      state.auth.accessToken = null;
      state.auth.refreshToken = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
