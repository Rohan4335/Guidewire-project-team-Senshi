export const API_CONFIG = {
  // API Base Configuration
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: import.meta.env.VITE_API_TIMEOUT ? parseInt(import.meta.env.VITE_API_TIMEOUT) : 30000,
  maxRetries: import.meta.env.VITE_API_MAX_RETRIES ? parseInt(import.meta.env.VITE_API_MAX_RETRIES) : 3,
  retryDelay: import.meta.env.VITE_API_RETRY_DELAY ? parseInt(import.meta.env.VITE_API_RETRY_DELAY) : 1000,

  // Feature Flags
  enableLogging: import.meta.env.VITE_ENABLE_LOGGING === 'true',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  enableErrorTracking: import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true',

  // Cache Configuration
  cacheEnabled: import.meta.env.VITE_CACHE_ENABLED === 'true',
  cacheDuration: import.meta.env.VITE_CACHE_DURATION ? parseInt(import.meta.env.VITE_CACHE_DURATION) : 300000,

  // Authentication
  authTokenKey: import.meta.env.VITE_AUTH_TOKEN_KEY || 'giguard_token',
  authUserKey: import.meta.env.VITE_AUTH_USER_KEY || 'giguard_user',

  // Application
  appName: import.meta.env.VITE_APP_NAME || 'GiGuard',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  appEnv: import.meta.env.VITE_APP_ENV || 'development',

  // Logging
  logLevel: import.meta.env.VITE_LOG_LEVEL || 'debug',
  logFormat: import.meta.env.VITE_LOG_FORMAT || 'json',

  // API Endpoints (relative to baseURL)
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      logout: '/auth/logout',
    },
    user: {
      profile: '/user/profile',
      update: '/user/update',
    },
    dashboard: '/dashboard',
    policies: '/policies',
    claims: '/claims',
    premium: '/premium',
    health: '/health',
  },
};

// Legacy export for backward compatibility
export const API_BASE_URL = API_CONFIG.baseURL;

