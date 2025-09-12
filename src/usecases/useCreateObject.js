import { useState, useCallback, useRef } from 'react';
import apiService from '../services/api';

export function useCreateObject() {
  const [object, setObject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const create = useCallback(async (collection, data, options = {}) => {
    setLoading(true);
    setError(null);
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      const response = await apiService.post(`/collections/${collection}`, data, {
        signal: abortControllerRef.current.signal,
        ...options,
      });
      setObject(response);
      return response;
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Create object hook was aborted');
        return null;
      }
      const errorMessage = `Create object failed: ${err.message}`;
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
    create,
    object,
    loading,
    error,
    abort,
  };
}
