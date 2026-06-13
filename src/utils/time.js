export const toUtc = (ts) =>
  ts && (ts.endsWith('Z') || ts.includes('+')) ? ts : ts + 'Z';

export function formatElapsed(ms) {
  const min = Math.round(ms / 60000);
  if (min < 1) return '< 1m';
  if (min < 60) return `${min}m`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export function formatTime(ts) {
  return new Date(toUtc(ts)).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', hour12: false,
  });
}

export function formatDateTime(ts) {
  const d = new Date(toUtc(ts));
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const hh = String(d.getUTCHours()).padStart(2, '0');
  const min = String(d.getUTCMinutes()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd} ${hh}:${min} UTC`;
}

export function formatAgo(ts) {
  const diffMin = Math.floor((Date.now() - new Date(toUtc(ts)).getTime()) / 60000);
  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const h = Math.floor(diffMin / 60);
  const m = diffMin % 60;
  return m === 0 ? `${h}h ago` : `${h}h ${m}m ago`;
}

export function formatAgoFromMs(ms) {
  const sec = Math.max(0, Math.floor(ms / 1000));
  if (sec < 5) return 'just now';
  if (sec < 60) return `${sec}s ago`;
  return `${Math.floor(sec / 60)}m ago`;
}
