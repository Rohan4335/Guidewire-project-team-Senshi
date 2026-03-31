import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import type { PremiumState } from '../../types';

const initialState: PremiumState = {
  data: null,
  selectedPlanId: null,
  loading: false,
  error: null,
};

export const fetchPremium = createAsyncThunk(
  'premium/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/premium');
      return response.data.data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string } } };
      return rejectWithValue(error.response?.data?.error || 'Failed to load premium plans');
    }
  }
);

const premiumSlice = createSlice({
  name: 'premium',
  initialState,
  reducers: {
    selectPlan: (state, action) => {
      state.selectedPlanId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPremium.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPremium.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        const selected = action.payload.plans.find((p: { isSelected: boolean }) => p.isSelected);
        state.selectedPlanId = selected?.id || null;
      })
      .addCase(fetchPremium.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { selectPlan } = premiumSlice.actions;
export default premiumSlice.reducer;
