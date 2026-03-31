import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import type { ClaimsState } from '../../types';

const initialState: ClaimsState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchClaims = createAsyncThunk(
  'claims/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/claims');
      return response.data.data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string } } };
      return rejectWithValue(error.response?.data?.error || 'Failed to load live triggers');
    }
  }
);

const claimsSlice = createSlice({
  name: 'claims',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClaims.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClaims.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchClaims.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default claimsSlice.reducer;
