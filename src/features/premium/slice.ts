import { createSlice } from '@reduxjs/toolkit';

const initialState = { premiums: [], loading: false, error: null };

const premiumSlice = createSlice({
  name: 'premium',
  initialState,
  reducers: {},
});

export default premiumSlice.reducer;
