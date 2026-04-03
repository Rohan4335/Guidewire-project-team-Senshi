import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/api-enhanced.service';
import { loggerService } from '../../services/logger.service';
import { cacheService } from '../../services/cache.service';
import type { ClaimsState } from '../../types';

const CLAIMS_CACHE_KEY = 'claims_data';

const initialState: ClaimsState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchClaims = createAsyncThunk(
  'claims/fetch',
  async (_, { rejectWithValue }) => {
    try {
      // Check cache first
      const cachedData = cacheService.get(CLAIMS_CACHE_KEY);
      if (cachedData) {
        loggerService.debug('Returning cached claims data');
        return cachedData;
      }

      loggerService.debug('Fetching claims data from API');
      const response = await apiService.request({
        method: 'GET',
        url: '/claims',
      });
      
      const data = response.data;
      
      // Cache the data
      cacheService.set(CLAIMS_CACHE_KEY, data, 300000); // 5 minutes
      
      loggerService.info('Claims data fetched successfully');
      return data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load live triggers';
      loggerService.error('Claims fetch error:', { error: errorMessage });
      return rejectWithValue(errorMessage);
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

