import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import type { PolicyState } from '../../types';

const initialState: PolicyState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchPolicies = createAsyncThunk(
  'policy/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/policies');
      return response.data.data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string } } };
      return rejectWithValue(error.response?.data?.error || 'Failed to load policies');
    }
  }
);

const policySlice = createSlice({
  name: 'policy',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPolicies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPolicies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPolicies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default policySlice.reducer;
