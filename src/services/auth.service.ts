import { apiService } from './api-enhanced.service';
import { cacheService } from './cache.service';
import { loggerService } from './logger.service';
import { API_CONFIG } from '../config';

/**
 * Authentication Service
 * Handles all authentication-related operations
 */

export interface LoginPayload {
  phone: string;
}

export interface RegisterPayload {
  phone: string;
  name?: string;
  platform?: string;
  zone?: string;
  city?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    phone: string;
    platform: string | null;
    zone: string | null;
    city: string | null;
    role: string;
  };
  token: string;
}

class AuthService {
  /**
   * Login user
   */
  async login(payload: LoginPayload): Promise<AuthResponse> {
    try {
      loggerService.debug('Attempting login', { phone: payload.phone });

      const response = await apiService.post<{ data: AuthResponse }>(
        API_CONFIG.endpoints.auth.login,
        payload
      );

      if (response && response.data) {
        const { user, token } = response.data;

        // Store token and user
        this.setToken(token);
        this.setUser(user);

        // Clear sensitive cache
        cacheService.clearAll();

        loggerService.info('Login successful', { userId: user.id });
        return response.data;
      }

      throw new Error('Invalid response from server');
    } catch (error) {
      loggerService.error('Login failed', { error: error instanceof Error ? error.message : error });
      throw error;
    }
  }

  /**
   * Register user
   */
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    try {
      loggerService.debug('Attempting registration', { phone: payload.phone });

      const response = await apiService.post<{ data: AuthResponse }>(
        API_CONFIG.endpoints.auth.register,
        payload
      );

      if (response && response.data) {
        const { user, token } = response.data;

        // Store token and user
        this.setToken(token);
        this.setUser(user);

        // Clear sensitive cache
        cacheService.clearAll();

        loggerService.info('Registration successful', { userId: user.id });
        return response.data;
      }

      throw new Error('Invalid response from server');
    } catch (error) {
      loggerService.error('Registration failed', { error: error instanceof Error ? error.message : error });
      throw error;
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      loggerService.debug('Attempting logout');

      // Optional: Call logout endpoint if backend supports it
      // await apiService.post(API_CONFIG.endpoints.auth.logout);

      // Clear local storage
      this.clearToken();
      this.clearUser();

      // Clear cache
      cacheService.clearAll();

      loggerService.info('Logout successful');
    } catch (error) {
      // Clear local storage even if API call fails
      this.clearToken();
      this.clearUser();
      loggerService.error('Logout failed', { error: error instanceof Error ? error.message : error });
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Get current user
   */
  getCurrentUser() {
    const userJson = localStorage.getItem(API_CONFIG.authUserKey);
    return userJson ? JSON.parse(userJson) : null;
  }

  /**
   * Get auth token
   */
  getToken(): string | null {
    try {
      return localStorage.getItem(API_CONFIG.authTokenKey);
    } catch (error) {
      loggerService.error('Failed to get token', error);
      return null;
    }
  }

  /**
   * Set auth token
   */
  setToken(token: string): void {
    try {
      localStorage.setItem(API_CONFIG.authTokenKey, token);
    } catch (error) {
      loggerService.error('Failed to set token', error);
    }
  }

  /**
   * Set user data
   */
  setUser(user: AuthResponse['user']): void {
    try {
      localStorage.setItem(API_CONFIG.authUserKey, JSON.stringify(user));
    } catch (error) {
      loggerService.error('Failed to set user', error);
    }
  }

  /**
   * Clear auth token and user data
   */
  clearAuth(): void {
    this.clearToken();
    this.clearUser();
  }

  /**
   * Clear auth token
   */
  private clearToken(): void {
    try {
      localStorage.removeItem(API_CONFIG.authTokenKey);
    } catch (error) {
      loggerService.error('Failed to clear token', error);
    }
  }

  /**
   * Clear user data
   */
  private clearUser(): void {
    try {
      localStorage.removeItem(API_CONFIG.authUserKey);
    } catch (error) {
      loggerService.error('Failed to clear user', error);
    }
  }

  /**
   * Refresh token (for future implementation)
   */
  async refreshToken(): Promise<string> {
    try {
      loggerService.debug('Attempting token refresh');

      // TODO: Implement token refresh endpoint
      // const response = await apiService.post<{ data: { token: string } }>(
      //   '/auth/refresh',
      //   {}
      // );

      // const token = response.data.token;
      // this.setToken(token);

      // return token;

      throw new Error('Token refresh not implemented');
    } catch (error) {
      loggerService.error('Token refresh failed', error);
      throw error;
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;
