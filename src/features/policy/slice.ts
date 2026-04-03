import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/api-enhanced.service';
import { loggerService } from '../../services/logger.service';
import { cacheService } from '../../services/cache.service';
import type { PolicyState } from '../../types';

const POLICIES_CACHE_KEY = 'policies_data';

const initialState: PolicyState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchPolicies = createAsyncThunk(
  'policy/fetch',
  async (_, { rejectWithValue }) => {
    try {
      // Check cache first
      const cachedData = cacheService.get(POLICIES_CACHE_KEY);
      if (cachedData) {
        loggerService.debug('Returning cached policies data');
        return cachedData;
      }

      loggerService.debug('Fetching policies data from API');
      const response = await apiService.request({
        method: 'GET',
        url: '/policies',
      });
      
      const data = response.data;
      
      // Cache the data
      cacheService.set(POLICIES_CACHE_KEY, data, 300000); // 5 minutes
      
      loggerService.info('Policies data fetched successfully');
      return data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load policies';
      loggerService.error('Policies fetch error:', { error: errorMessage });
      return rejectWithValue(errorMessage);
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

