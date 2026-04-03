import { API_CONFIG } from '../config';
import { loggerService } from './logger.service';

/**
 * Cache Service for storing API responses
 * Reduces redundant API calls and improves application performance
 */

interface CacheEntry<T = unknown> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class CacheService {
  private cache = new Map<string, CacheEntry<unknown>>();
  private cacheSize = 100;

  /**
   * Get cached data
   */
  get<T = unknown>(key: string): T | null {
    if (!API_CONFIG.cacheEnabled) {
      return null;
    }

    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check if cache has expired
    const isExpired = Date.now() - entry.timestamp > entry.ttl;

    if (isExpired) {
      this.cache.delete(key);
      loggerService.debug('Cache expired', { key });
      return null;
    }

    loggerService.debug('Cache hit', { key });
    return entry.data as T;
  }

  /**
   * Set cache data
   */
  set<T = unknown>(key: string, data: T, ttl = API_CONFIG.cacheDuration): void {
    if (!API_CONFIG.cacheEnabled) {
      return;
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });

    loggerService.debug('Cache set', { key, ttl });
    this.maintainCacheSize();
  }

  /**
   * Clear specific cache entry
   */
  clear(key: string): void {
    this.cache.delete(key);
    loggerService.debug('Cache cleared', { key });
  }

  /**
   * Clear all cache
   */
  clearAll(): void {
    this.cache.clear();
    loggerService.debug('All cache cleared');
  }

  /**
   * Maintain cache size to prevent memory bloat
   */
  private maintainCacheSize(): void {
    if (this.cache.size > this.cacheSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      cacheEnabled: API_CONFIG.cacheEnabled,
      cacheDuration: API_CONFIG.cacheDuration,
    };
  }

  /**
   * Check if cache exists and is valid
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) {
      return false;
    }

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    return !isExpired;
  }
}

// Export singleton instance
export const cacheService = new CacheService();
export default cacheService;
