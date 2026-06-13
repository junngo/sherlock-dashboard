import { useState, useEffect, useCallback, useRef } from 'react';
import { buildUrl, API_ENDPOINTS } from '../config/api.js';
import { toUtc, formatElapsed } from '../utils/time.js';

export function useInProgressCount() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const fetch_ = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(buildUrl(API_ENDPOINTS.inProgressCount), { signal: controller.signal });
      if (!res.ok) throw new Error(`Redash returned HTTP ${res.status}`);
      const json = await res.json();
      const row = json.query_result.data.rows[0];
      const elapsedMs = Date.now() - new Date(toUtc(row.oldest_timestamp)).getTime();
      setData({
        count: row.in_progress_count,
        platformCount: row.platform_count,
        oldestTimestamp: row.oldest_timestamp,
        longestElapsed: formatElapsed(elapsedMs),
      });
      setError(null);
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.warn('[useInProgressCount] fetch failed:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch_();
    return () => abortRef.current?.abort();
  }, [fetch_]);

  return {
    count: data?.count ?? null,
    platformCount: data?.platformCount ?? null,
    oldestTimestamp: data?.oldestTimestamp ?? null,
    longestElapsed: data?.longestElapsed ?? null,
    loading,
    error,
    refetch: fetch_,
  };
}
