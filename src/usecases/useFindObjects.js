import { useState, useCallback, useRef } from 'react';
import apiService from '../services/api';

export function useFindObjects() {
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const find = useCallback(async (collection, query = {}, options = {}) => {
    setLoading(true);
    setError(null);
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      const queryParams = new URLSearchParams();
      if (query.where) queryParams.set('where', JSON.stringify(query.where));
      if (query.limit) queryParams.set('limit', query.limit);
      if (query.skip) queryParams.set('skip', query.skip);
      if (query.sort) queryParams.set('sort', JSON.stringify(query.sort));
      if (query.includes) queryParams.set('includes', JSON.stringify(query.includes));
      if (query.keys) queryParams.set('keys', JSON.stringify(query.keys));

      const response = await apiService.get(`/collections/${collection}?${queryParams.toString()}`, {
        signal: abortControllerRef.current.signal,
        ...options,
      });
      setObjects(response);
      return response;
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Find objects hook was aborted');
        return null;
      }
      const errorMessage = `Find objects failed: ${err.message}`;
      setError(new Error(errorMessage));
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, []);

  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  return {
    find,
    objects,
    loading,
    error,
    abort,
  };
}
