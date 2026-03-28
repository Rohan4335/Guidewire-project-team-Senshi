import { createSlice } from '@reduxjs/toolkit';

const initialState = { isAuthenticated: false, user: null, loading: false, error: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    }
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
