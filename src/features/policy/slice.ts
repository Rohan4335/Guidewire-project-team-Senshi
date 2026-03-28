import { createSlice } from '@reduxjs/toolkit';

const initialState = { policies: [], loading: false, error: null };

const policySlice = createSlice({
  name: 'policy',
  initialState,
  reducers: {},
});

export default policySlice.reducer;
