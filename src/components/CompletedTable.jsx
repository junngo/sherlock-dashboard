import React from 'react';
import StatusBadge from './StatusBadge.jsx';

const COLS = '92px minmax(150px,1.6fr) minmax(140px,1.2fr) 174px 62px 92px';
const SHIMMER = 'linear-gradient(90deg,var(--shimmer1) 25%,var(--shimmer2) 50%,var(--shimmer1) 75%)';

function SkeletonRow() {
  const cell = (w, h = '11px') => (
    <div style={{ height: h, width: w, borderRadius: h === '18px' ? '5px' : '4px', background: SHIMMER, backgroundSize: '200% 100%', animation: 'scShimmer 1.3s infinite' }} />
  );
  return (
    <div style={{ display: 'grid', gridTemplateColumns: COLS, alignItems: 'center', gap: '10px', padding: '0 16px', height: '44px', borderBottom: '1px solid var(--border)' }}>
      {cell('46px')} {cell('75%')} {cell('65%')} {cell('88px', '18px')} {cell('18px')} {cell('50px')}
    </div>
  );
}

export default function CompletedTable({ completed, dark, loading }) {
  return (
    <div style={{ marginTop: '26px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '10px' }}>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text2)' }}>Completed today</span>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', fontWeight: 600, color: 'var(--text2)', background: 'var(--chip)', padding: '1px 7px', borderRadius: '10px' }}>{completed.length}</span>
      </div>

      <div style={{ border: '1px solid var(--border)', borderRadius: '10px', background: 'var(--panel)', overflow: 'hidden', transition: 'background .18s ease, border-color .18s ease' }}>
        <div style={{ display: 'grid', gridTemplateColumns: COLS, alignItems: 'center', gap: '10px', padding: '0 16px', height: '36px', background: 'var(--panel-alt)', borderBottom: '1px solid var(--border)' }}>
          {['Alert', 'Test', 'Platform', 'Final status', 'Iters', 'Time'].map(h => (
            <span key={h} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', fontWeight: 600, letterSpacing: '0.7px', textTransform: 'uppercase', color: 'var(--text3)' }}>{h}</span>
          ))}
        </div>

        {loading
          ? [0, 1, 2].map(i => <SkeletonRow key={i} />)
          : completed.map(c => (
              <div
                key={c.alert_id}
                style={{ display: 'grid', gridTemplateColumns: COLS, alignItems: 'center', gap: '10px', padding: '0 16px', height: '44px', borderBottom: '1px solid var(--border)', transition: 'background .12s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--row-hover)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12.5px', color: 'var(--text2)' }}>
                  <span style={{ color: 'var(--text3)' }}>#</span>{c.alert_id}
                </span>
                <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{c.test}</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: 'var(--text2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{c.platform}</span>
                <StatusBadge status={c.status} dark={dark} />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12.5px', color: 'var(--text)' }}>{c.iter}</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: 'var(--text2)' }}>{c.taken}</span>
              </div>
            ))
        }
      </div>
    </div>
  );
}
