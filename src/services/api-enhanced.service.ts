import axios, { AxiosError } from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG } from '../config';
import { loggerService } from './logger.service';

/**
 * Enhanced Axios API instance with interceptors, logging, retries, and error handling
 */
// eslint-disable-next-line prefer-const
let retryCount: Record<string, number> = {};

class APIService {
  private axiosInstance: AxiosInstance;
  private isRefreshing = false;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_CONFIG.baseURL,
      timeout: API_CONFIG.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request Interceptor
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Add authorization token
        const token = this.getAuthToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Log request
        if (API_CONFIG.enableLogging) {
          loggerService.debug('API Request', {
            method: config.method?.toUpperCase(),
            url: config.url,
            data: config.data,
          });
        }

        // Add request timestamp
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (config as any).__timestamp = Date.now();

        return config;
      },
      (error) => {
        loggerService.error('Request Interceptor Error', error);
        return Promise.reject(error);
      }
    );

    // Response Interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log successful response
        if (API_CONFIG.enableLogging) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const duration = Date.now() - (response.config as any).__timestamp;
          loggerService.debug('API Response', {
            method: response.config.method?.toUpperCase(),
            url: response.config.url,
            status: response.status,
            duration: `${duration}ms`,
          });
        }

        // Reset retry count on success
        retryCount[response.config.url || ''] = 0;

        return response;
      },
      async (error: AxiosError) => {
        const config = error.config as InternalAxiosRequestConfig;
        const url = config.url || '';

        // Initialize retry count
        if (!retryCount[url]) {
          retryCount[url] = 0;
        }

        // Handle 401 Unauthorized
        if (error.response?.status === 401) {
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.clearAuthToken();
            window.location.href = '/login';
            this.isRefreshing = false;
          }
          return Promise.reject(error);
        }

        // Handle network errors and 5xx errors with retry logic
        const isRetryable =
          error.response?.status === undefined || // Network error
          error.response?.status === 408 || // Request timeout
          error.response?.status === 429 || // Rate limit
          error.response?.status >= 500; // Server error

        if (isRetryable && retryCount[url] < API_CONFIG.maxRetries) {
          retryCount[url]++;
          const delayMs = API_CONFIG.retryDelay * Math.pow(2, retryCount[url] - 1);

          loggerService.warn(`Retrying request (attempt ${retryCount[url]})`, {
            url,
            delay: `${delayMs}ms`,
            status: error.response?.status,
          });

          await this.delay(delayMs);
          return this.axiosInstance(config);
        }

        // Log error
        loggerService.error('API Error', {
          url,
          status: error.response?.status,
          message: error.message,
          data: error.response?.data,
        });

        // Handle specific errors
        if (error.response?.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        }

        if (error.response?.status && error.response.status >= 500) {
          throw new Error('Server error. Please try again later.');
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Delay helper for retry mechanism
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Get authentication token from storage
   */
  private getAuthToken(): string | null {
    try {
      return localStorage.getItem(API_CONFIG.authTokenKey);
    } catch (error) {
      loggerService.error('Failed to retrieve auth token', error);
      return null;
    }
  }

  /**
   * Clear authentication token
   */
  private clearAuthToken(): void {
    try {
      localStorage.removeItem(API_CONFIG.authTokenKey);
      localStorage.removeItem(API_CONFIG.authUserKey);
    } catch (error) {
      loggerService.error('Failed to clear auth token', error);
    }
  }

  /**
   * Generic request method for flexible API calls
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async request<T = any>(config: any): Promise<{ data: T }> {
    try {
      const response = await this.axiosInstance.request<T>(config);
      return { data: response.data };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Generic GET request
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async get<T = any>(url: string, config = {}): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Generic POST request
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async post<T = any>(url: string, data?: any, config = {}): Promise<T> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Generic PUT request
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async put<T = any>(url: string, data?: any, config = {}): Promise<T> {
    try {
      const response = await this.axiosInstance.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Generic DELETE request
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async delete<T = any>(url: string, config = {}): Promise<T> {
    try {
      const response = await this.axiosInstance.delete<T>(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Handle errors consistently
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error || error.message || 'An error occurred';
      return new Error(message);
    }
    return error instanceof Error ? error : new Error('An unexpected error occurred');
  }

  /**
   * Get axios instance for advanced usage
   */
  getInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

// Export singleton instance
export const apiService = new APIService();
export default apiService;
