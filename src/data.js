export const IN_PROGRESS = [
  {
    alert_id: 50532, summary_id: 41882, signatureId: 4767430, frameworkId: 13, test: 'Speedometer3 Score',
    platform: 'linux1804-64-shippable-qr', status: 'left', iter: 4, elapsed: '1h 13m',
    iterations: [
      { iteration: 1, status: 'initial', detected_push_id: 1930540, previous_push_id: 1930512, detected_push_revision: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0', previous_push_revision: 'f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1', detected_t_value: 7.21, detected_push_gap_size: 16, notes: 'Initial backfill range established from alert summary.', time: '14:18', ago: '1h 13m ago' },
      { iteration: 2, status: 'left', detected_push_id: 1930528, previous_push_id: 1930540, detected_push_revision: '086d14f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8', previous_push_revision: 'ff5217d18c57f8c82fb335fec3e3af4915d2a6b7', detected_t_value: 11.04, detected_push_gap_size: 8, notes: 'Regression persists at the earlier push — moving search window left.', time: '14:41', ago: '50m ago' },
      { iteration: 3, status: 'right', detected_push_id: 1930520, previous_push_id: 1930528, detected_push_revision: 'c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2', previous_push_revision: '086d14f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8', detected_t_value: 4.85, detected_push_gap_size: 4, notes: 'No significant regression detected here — moving right.', time: '15:02', ago: '29m ago' },
      { iteration: 4, status: 'left', detected_push_id: 1930524, previous_push_id: 1930520, detected_push_revision: 'e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4', previous_push_revision: 'c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2', detected_t_value: 9.97, detected_push_gap_size: 2, notes: 'Regression reappears between candidates — narrowing the gap.', time: '15:21', ago: '10m ago' },
    ],
  },
  {
    alert_id: 50544, summary_id: 41896, signatureId: 4821001, frameworkId: 1, test: 'tp5o Private Bytes',
    platform: 'windows11-64-shippable', status: 'right', iter: 2, elapsed: '34m',
    iterations: [
      { iteration: 1, status: 'initial', detected_push_id: 1931002, previous_push_id: 1930974, detected_t_value: 5.62, detected_push_gap_size: 12, notes: 'Initial backfill range established from alert summary.', time: '14:57', ago: '34m ago' },
      { iteration: 2, status: 'right', detected_push_id: 1930990, previous_push_id: 1931002, detected_t_value: 3.18, detected_push_gap_size: 6, notes: 'Below regression threshold — searching later pushes.', time: '15:19', ago: '12m ago' },
    ],
  },
  {
    alert_id: 50551, summary_id: 41903, signatureId: 4798234, frameworkId: 1, test: 'ts_paint_webext',
    platform: 'macosx1015-64-shippable-qr', status: 'stabilized_with_gap', iter: 6, elapsed: '2h 41m',
    iterations: [
      { iteration: 1, status: 'initial', detected_push_id: 1929800, previous_push_id: 1929772, detected_t_value: 8.40, detected_push_gap_size: 20, notes: 'Initial backfill range established from alert summary.', time: '12:50', ago: '2h 41m ago' },
      { iteration: 2, status: 'left', detected_push_id: 1929788, previous_push_id: 1929800, detected_t_value: 12.66, detected_push_gap_size: 10, notes: 'Strong regression earlier in range — moving left.', time: '13:18', ago: '2h 13m ago' },
      { iteration: 3, status: 'left', detected_push_id: 1929782, previous_push_id: 1929788, detected_t_value: 13.01, detected_push_gap_size: 6, notes: 'Regression confirmed — continuing left.', time: '13:49', ago: '1h 42m ago' },
      { iteration: 4, status: 'right', detected_push_id: 1929778, previous_push_id: 1929782, detected_t_value: 6.05, detected_push_gap_size: 3, notes: 'Drops below threshold — moving right.', time: '14:22', ago: '1h 9m ago' },
      { iteration: 5, status: 'left', detected_push_id: 1929780, previous_push_id: 1929778, detected_t_value: 10.88, detected_push_gap_size: 2, notes: 'Regression between two adjacent candidates.', time: '14:58', ago: '33m ago' },
      { iteration: 6, status: 'stabilized_with_gap', detected_push_id: 1929779, previous_push_id: 1929780, detected_t_value: 9.40, detected_push_gap_size: 1, notes: 'Culprit isolated but a missing job prevents full confirmation — gap remains.', time: '15:22', ago: '9m ago' },
    ],
  },
  {
    alert_id: 50560, summary_id: 41915, signatureId: 4812567, frameworkId: 13, test: 'damp pageload toolbox',
    platform: 'linux1804-64-shippable-qr', status: 'initial', iter: 1, elapsed: '9m',
    iterations: [
      { iteration: 1, status: 'initial', detected_push_id: 1931440, previous_push_id: 1931412, detected_t_value: 6.93, detected_push_gap_size: 14, notes: 'Initial backfill range established — awaiting first retrigger results.', time: '15:22', ago: '9m ago' },
    ],
  },
  {
    alert_id: 50538, summary_id: 41889, signatureId: 4755901, frameworkId: 13, test: 'Speedometer3 Segment-AngularJS',
    platform: 'android-hw-a55-14-0-aarch64-shippable', status: 'left', iter: 3, elapsed: '58m',
    iterations: [
      { iteration: 1, status: 'initial', detected_push_id: 1930610, previous_push_id: 1930582, detected_t_value: 9.15, detected_push_gap_size: 18, notes: 'Initial backfill range established from alert summary.', time: '14:33', ago: '58m ago' },
      { iteration: 2, status: 'left', detected_push_id: 1930596, previous_push_id: 1930610, detected_t_value: 10.72, detected_push_gap_size: 9, notes: 'Regression earlier in range — moving left.', time: '14:59', ago: '32m ago' },
      { iteration: 3, status: 'left', detected_push_id: 1930588, previous_push_id: 1930596, detected_t_value: 11.95, detected_push_gap_size: 5, notes: 'Regression persists — narrowing the window.', time: '15:24', ago: '7m ago' },
    ],
  },
];

export const COMPLETED = [
  { alert_id: 50510, test: 'tabswitch', platform: 'windows11-64-shippable', status: 'stabilized', iter: 5, taken: '1h 52m' },
  { alert_id: 50498, test: 'JS Heap Bytes (GC)', platform: 'linux1804-64-shippable-qr', status: 'stabilized_gap_stuck', iter: 7, taken: '3h 21m' },
  { alert_id: 50521, test: 'Speedometer3 Score', platform: 'macosx1470-64-shippable', status: 'stabilized', iter: 4, taken: '1h 06m' },
  { alert_id: 50489, test: 'matrix-react-bench', platform: 'linux1804-64-shippable-qr', status: 'stabilized', iter: 6, taken: '2h 14m' },
  { alert_id: 50476, test: 'webaudio decodeAudioData', platform: 'windows11-64-shippable', status: 'stabilized', iter: 3, taken: '47m' },
];

export const STATUS_META = {
  light: {
    initial:              { label: 'INITIAL',    fg: '#5a636e', bg: '#eef0f2', border: '#e0e3e7', dot: '#98a1ac' },
    right:                { label: 'RIGHT',      fg: '#5a636e', bg: '#eef0f2', border: '#e0e3e7', dot: '#98a1ac' },
    left:                 { label: 'LEFT',       fg: '#1d4ed8', bg: '#e7eefe', border: '#cddafb', dot: '#2563eb' },
    stabilized_with_gap:  { label: 'STAB · GAP', fg: '#946200', bg: '#fdf0d6', border: '#f3dba2', dot: '#d08700' },
    stabilized_gap_stuck: { label: 'GAP STUCK',  fg: '#b42318', bg: '#fde7e4', border: '#f5cac3', dot: '#df4636' },
    stabilized:           { label: 'STABILIZED', fg: '#1a7f4b', bg: '#def0e3', border: '#b1ddc1', dot: '#1f9d57' },
  },
  dark: {
    initial:              { label: 'INITIAL',    fg: '#9aa3ae', bg: '#1a1f25', border: '#2a313a', dot: '#69727d' },
    right:                { label: 'RIGHT',      fg: '#9aa3ae', bg: '#1a1f25', border: '#2a313a', dot: '#69727d' },
    left:                 { label: 'LEFT',       fg: '#7fb0ff', bg: '#0f2138', border: '#1e3a5f', dot: '#4f93ff' },
    stabilized_with_gap:  { label: 'STAB · GAP', fg: '#f0c468', bg: '#241d0d', border: '#46380f', dot: '#df9f1e' },
    stabilized_gap_stuck: { label: 'GAP STUCK',  fg: '#ff998c', bg: '#271512', border: '#4a231d', dot: '#f25a48' },
    stabilized:           { label: 'STABILIZED', fg: '#5fd08c', bg: '#0f2418', border: '#1d4029', dot: '#34b869' },
  },
};

export function statusMeta(status, dark) {
  const theme = dark ? STATUS_META.dark : STATUS_META.light;
  return theme[status] || theme.initial;
}

export const LEGEND_STATUSES = ['initial', 'left', 'right', 'stabilized_with_gap', 'stabilized_gap_stuck', 'stabilized'];
