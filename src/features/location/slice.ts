import { createSlice } from '@reduxjs/toolkit';

const initialState = { location: null, loading: false, error: null };

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
});

export default locationSlice.reducer;
