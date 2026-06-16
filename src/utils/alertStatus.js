export function classifyAlert({ recordStatus, currentStatus }) {
  if (currentStatus === 'stabilized') return 'stabilized';
  if (currentStatus === 'stabilized_gap_stuck') return 'gap_stuck';
  if (recordStatus === 2) return 'in_progress';
  return 'failed';
}

export const ALERT_STATUSES = [
  {
    key: 'in_progress',
    label: 'In Progress',
    dot: '#3b82f6',
    accent: '#3b82f6',
  },
  {
    key: 'stabilized',
    label: 'Stabilized',
    dot: '#1f9d57',
    accent: '#1f9d57',
  },
  {
    key: 'gap_stuck',
    label: 'Gap Stuck',
    dot: '#df4636',
    accent: '#df4636',
  },
  {
    key: 'failed',
    label: 'Failed',
    dot: '#df4636',
    accent: '#df4636',
  },
];

export function alertStatusMeta(key) {
  return ALERT_STATUSES.find(s => s.key === key) ?? ALERT_STATUSES[0];
}
