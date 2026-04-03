import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '../../services/api-enhanced.service';
import { authService } from '../../services/auth.service';
import { loggerService } from '../../services/logger.service';
import { cacheService } from '../../services/cache.service';
import type { AuthState, User } from '../../types';

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('giguard_token'),
  user: JSON.parse(localStorage.getItem('giguard_user') || 'null'),
  token: localStorage.getItem('giguard_token'),
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (payload: { phone: string }, { rejectWithValue }) => {
    try {
      loggerService.debug('Attempting login for phone:', payload);
      const response = await apiService.request({
        method: 'POST',
        url: '/auth/login',
        data: payload,
      });
      
      const data = response.data;
      authService.setToken(data.token);
      authService.setUser(data.user);
      
      loggerService.info('Login successful for phone:', payload.phone);
      return data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      loggerService.error('Login error:', { error: errorMessage, phone: payload.phone });
      return rejectWithValue(errorMessage);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    payload: { phone: string; name?: string; platform?: string; zone?: string; city?: string },
    { rejectWithValue }
  ) => {
    try {
      loggerService.debug('Attempting registration for phone:', payload);
      const response = await apiService.request({
        method: 'POST',
        url: '/auth/register',
        data: payload,
      });
      
      const data = response.data;
      authService.setToken(data.token);
      authService.setUser(data.user);
      
      loggerService.info('Registration successful for phone:', payload.phone);
      return data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      loggerService.error('Registration error:', { error: errorMessage, phone: payload.phone });
      return rejectWithValue(errorMessage);
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
      authService.clearAuth();
      cacheService.clearAll();
      loggerService.info('User logged out');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;

