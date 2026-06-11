const BASE_URL = 'https://sql.telemetry.mozilla.org/api';
const API_KEY = import.meta.env.VITE_REDASH_API_KEY;

export const API_ENDPOINTS = {
  inProgressAlerts: `${BASE_URL}/queries/121280/results.json?api_key=${API_KEY}`,
};
