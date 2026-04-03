import { useEffect, useState, useCallback } from 'react';
import { apiService } from '../services/api-enhanced.service';
import { cacheService } from '../services/cache.service';
import { loggerService } from '../services/logger.service';

/**
 * Custom hook for fetching data from API with caching
 */
export function useApi<T>(
  url: string,
  options?: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any;
    cacheDuration?: number;
    enabled?: boolean;
  }
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cacheKey = `${options?.method || 'GET'}:${url}`;
      const cachedData = cacheService.get<T>(cacheKey);

      if (cachedData) {
        setData(cachedData);
        setLoading(false);
        return;
      }

      // Fetch from API
      let response;
      switch (options?.method) {
        case 'POST':
          response = await apiService.post<T>(url, options.body);
          break;
        case 'PUT':
          response = await apiService.put<T>(url, options.body);
          break;
        case 'DELETE':
          response = await apiService.delete<T>(url);
          break;
        default:
          response = await apiService.get<T>(url);
      }

      // Cache the response
      if (response) {
        cacheService.set<T>(cacheKey, response, options?.cacheDuration);
      }

      setData(response);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      loggerService.error('Hook useApi failed', { url, error });
    } finally {
      setLoading(false);
    }
  }, [url, options?.method, options?.body, options?.cacheDuration]);

  useEffect(() => {
    if (options?.enabled !== false) {
      fetchData();
    }
  }, [fetchData, options?.enabled]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

/**
 * Custom hook for mutations (POST, PUT, DELETE)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useApiMutation<TData = any, TResponse = any>(
  url: string,
  method: 'POST' | 'PUT' | 'DELETE' = 'POST'
) {
  const [data, setData] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (payload?: TData) => {
      try {
        setLoading(true);
        setError(null);

        let response;
        switch (method) {
          case 'POST':
            response = await apiService.post<TResponse>(url, payload);
            break;
          case 'PUT':
            response = await apiService.put<TResponse>(url, payload);
            break;
          case 'DELETE':
            response = await apiService.delete<TResponse>(url);
            break;
        }

        setData(response);

        // Clear cache after mutation
        cacheService.clear(`GET:${url}`);

        return response;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        loggerService.error('Hook useApiMutation failed', { url, method, error });
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [url, method]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    mutate,
    reset,
  };
}

/**
 * Custom hook for paginated API data
 */
export function useApiPagination<T>(
  baseUrl: string,
  pageSize = 10,
  options?: {
    cacheDuration?: number;
    enabled?: boolean;
  }
) {
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<T[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPage = useCallback(async (pageNum: number) => {
    try {
      setLoading(true);
      setError(null);

      const url = `${baseUrl}?page=${pageNum}&limit=${pageSize}`;
      const cacheKey = `pagination:${url}`;

      // Check cache
      const cachedData = cacheService.get<{ data: T[]; totalPages: number }>(cacheKey);
      if (cachedData) {
        setAllData(cachedData.data);
        setTotalPages(cachedData.totalPages);
        setPage(pageNum);
        setLoading(false);
        return;
      }

      // Fetch from API
      const response = await apiService.get<{ data: T[]; totalPages: number }>(url);

      if (response) {
        cacheService.set(cacheKey, response, options?.cacheDuration);
        setAllData(response.data);
        setTotalPages(response.totalPages);
        setPage(pageNum);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      loggerService.error('Pagination fetch failed', { baseUrl, page: pageNum, error });
    } finally {
      setLoading(false);
    }
  }, [baseUrl, pageSize, options?.cacheDuration]);

  useEffect(() => {
    if (options?.enabled !== false) {
      fetchPage(1);
    }
  }, [fetchPage, options?.enabled]);

  return {
    data: allData,
    page,
    totalPages,
    loading,
    error,
    goToPage: fetchPage,
    nextPage: () => fetchPage(Math.min(page + 1, totalPages)),
    prevPage: () => fetchPage(Math.max(page - 1, 1)),
  };
}
