import { useState, useEffect, useCallback, useRef } from 'react';
import { API_ENDPOINTS } from '../config/api.js';
import { IN_PROGRESS } from '../data.js';
import { formatElapsed, formatTime, formatAgo } from '../utils/time.js';

function parseRows(rows) {
  const map = new Map();

  for (const row of rows) {
    if (!map.has(row.alert_id)) {
      map.set(row.alert_id, { alert_id: row.alert_id, summary_id: row.summary_id, platform: row.platform, suite: row.suite, test: row.test, iterations: [] });
    }
    map.get(row.alert_id).iterations.push(row);
  }

  return Array.from(map.values()).map(a => {
    const iters = [...a.iterations].sort((x, y) => x.iteration - y.iteration);
    const first = iters[0];
    const last = iters[iters.length - 1];
    const elapsedMs = Date.now() - new Date(first.timestamp).getTime();

    return {
      alert_id: a.alert_id,
      summary_id: a.summary_id,
      platform: a.platform,
      test: a.suite && a.test ? `${a.suite} ${a.test}` : (a.suite || a.test || '—'),
      status: last.status,
      iter: iters.length,
      elapsed: formatElapsed(elapsedMs),
      elapsedMs,
      iterations: iters.map(it => ({
        iteration: it.iteration,
        status: it.status,
        detected_push_id: it.detected_push_id,
        previous_push_id: it.previous_push_id,
        detected_t_value: it.detected_t_value,
        detected_push_gap_size: it.detected_push_gap_size,
        notes: it.notes,
        time: formatTime(it.timestamp),
        ago: formatAgo(it.timestamp),
      })),
    };
  });
}

export function useAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const abortRef = useRef(null);

  const fetchAlerts = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(API_ENDPOINTS.inProgressAlerts, { signal: controller.signal });
      if (!res.ok) throw new Error(`Redash returned HTTP ${res.status}`);
      const json = await res.json();
      const rows = json.query_result.data.rows;
      setAlerts(parseRows(rows));
      setLastUpdated(Date.now());
      setError(null);
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.warn('[useAlerts] fetch failed, falling back to mock data:', err.message);
      setError(err.message);
      setAlerts(IN_PROGRESS);
      setLastUpdated(Date.now());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
    return () => abortRef.current?.abort();
  }, [fetchAlerts]);

  return { alerts, loading, error, refetch: fetchAlerts, lastUpdated };
}
