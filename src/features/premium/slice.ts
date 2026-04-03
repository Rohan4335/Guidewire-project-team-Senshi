import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/api-enhanced.service';
import { loggerService } from '../../services/logger.service';
import { cacheService } from '../../services/cache.service';
import type { PremiumState } from '../../types';

const PREMIUM_CACHE_KEY_PREFIX = 'premium_data_';

const initialState: PremiumState = {
  data: null,
  selectedPlanId: null,
  loading: false,
  error: null,
};

export const fetchPremium = createAsyncThunk(
  'premium/fetch',
  async (zoneId: string | null = null, { rejectWithValue }) => {
    try {
      const cacheKey = `${PREMIUM_CACHE_KEY_PREFIX}${zoneId || 'default'}`;
      
      // Check cache first
      const cachedData = cacheService.get(cacheKey);
      if (cachedData) {
        loggerService.debug('Returning cached premium data for zone:', zoneId);
        return cachedData;
      }

      loggerService.debug('Fetching premium data from API for zone:', zoneId);
      const url = zoneId ? `/premium?zoneId=${encodeURIComponent(zoneId)}` : '/premium';
      
      const response = await apiService.request({
        method: 'GET',
        url,
      });
      
      const data = response.data;
      
      // Cache the data
      cacheService.set(cacheKey, data, 600000); // 10 minutes for premium data
      
      loggerService.info('Premium data fetched successfully', { zoneId });
      return data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load premium plans';
      loggerService.error('Premium fetch error:', { error: errorMessage, zoneId });
      return rejectWithValue(errorMessage);
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

