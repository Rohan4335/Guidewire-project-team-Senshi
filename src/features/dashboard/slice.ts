import { createSlice } from '@reduxjs/toolkit';

const initialState = { stats: null, loading: false, error: null };

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
});

export default dashboardSlice.reducer;
