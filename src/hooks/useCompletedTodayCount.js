import { useState, useEffect, useCallback, useRef } from 'react';
import { buildUrl, API_ENDPOINTS } from '../config/api.js';

export function useCompletedTodayCount() {
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
      const res = await fetch(buildUrl(API_ENDPOINTS.completedTodayCount), { signal: controller.signal });
      if (!res.ok) throw new Error(`Redash returned HTTP ${res.status}`);
      const json = await res.json();
      const row = json.query_result.data.rows[0];
      setData({
        count: row.completed_today_count,
        stabilizedCount: row.stabilized_count,
        gapStuckCount: row.gap_stuck_count,
        currentDate: row.current_date,
      });
      setError(null);
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.warn('[useCompletedTodayCount] fetch failed:', err.message);
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
    stabilizedCount: data?.stabilizedCount ?? null,
    gapStuckCount: data?.gapStuckCount ?? null,
    currentDate: data?.currentDate ?? null,
    loading,
    error,
    refetch: fetch_,
  };
}
