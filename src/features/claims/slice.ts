import { createSlice } from '@reduxjs/toolkit';

const initialState = { claims: [], loading: false, error: null };

const claimsSlice = createSlice({
  name: 'claims',
  initialState,
  reducers: {},
});

export default claimsSlice.reducer;
