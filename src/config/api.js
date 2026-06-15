const BASE_URL = 'https://sql.telemetry.mozilla.org/api';

export const API_ENDPOINTS = {
  inProgressAlerts: {
    url: `${BASE_URL}/queries/121280/results.json`,
    apiKey: import.meta.env.VITE_REDASH_API_KEY_121280,
  },
  inProgressCount: {
    url: `${BASE_URL}/queries/121353/results.json`,
    apiKey: import.meta.env.VITE_REDASH_API_KEY_121353,
  },
  completedTodayCount: {
    url: `${BASE_URL}/queries/121364/results.json`,
    apiKey: import.meta.env.VITE_REDASH_API_KEY_121364,
  },
  completedTodayList: {
    url: `${BASE_URL}/queries/121369/results.json`,
    apiKey: import.meta.env.VITE_REDASH_API_KEY_121369,
  },
  allAlerts: {
    url: `${BASE_URL}/queries/121388/results.json`,
    apiKey: import.meta.env.VITE_REDASH_API_KEY_121388,
  },
};

export const buildUrl = (endpoint) => `${endpoint.url}?api_key=${endpoint.apiKey}`;
