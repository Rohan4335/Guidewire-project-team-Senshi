import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/api-enhanced.service';
import { loggerService } from '../../services/logger.service';
import { cacheService } from '../../services/cache.service';
import type { DashboardState } from '../../types';

const DASHBOARD_CACHE_KEY = 'dashboard_data';

const initialState: DashboardState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchDashboard = createAsyncThunk(
  'dashboard/fetch',
  async (_, { rejectWithValue }) => {
    try {
      // Check cache first
      const cachedData = cacheService.get(DASHBOARD_CACHE_KEY);
      if (cachedData) {
        loggerService.debug('Returning cached dashboard data');
        return cachedData;
      }

      loggerService.debug('Fetching dashboard data from API');
      const response = await apiService.request({
        method: 'GET',
        url: '/dashboard',
      });
      
      const data = response.data;
      
      // Cache the data
      cacheService.set(DASHBOARD_CACHE_KEY, data, 300000); // 5 minutes
      
      loggerService.info('Dashboard data fetched successfully');
      return data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load dashboard';
      loggerService.error('Dashboard fetch error:', { error: errorMessage });
      return rejectWithValue(errorMessage);
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;

