import React from 'react';
import { statusMeta } from '../data.js';

export default function StatusBadge({ status, dark, small }) {
  const m = statusMeta(status, dark);
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: small ? '4px' : '5px',
      padding: small ? '2px 6px' : '2px 7px',
      borderRadius: '4px', width: 'fit-content',
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: small ? '9.5px' : '10px',
      fontWeight: 600, letterSpacing: '.3px',
      color: m.fg, background: m.bg,
      border: `1px solid ${m.border}`,
      whiteSpace: 'nowrap',
    }}>
      <span style={{ width: small ? '4px' : '5px', height: small ? '4px' : '5px', borderRadius: '50%', flexShrink: 0, background: m.dot }} />
      {m.label}
    </span>
  );
}
