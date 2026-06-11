import React from 'react';
import StatusBadge from './StatusBadge.jsx';
import IterationLog from './IterationLog.jsx';

const COLS = '92px minmax(150px,1.5fr) minmax(140px,1.2fr) 174px 58px 90px 40px 26px';
const SHIMMER = 'linear-gradient(90deg,var(--shimmer1) 25%,var(--shimmer2) 50%,var(--shimmer1) 75%)';

const ExternalLinkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h7v7" /><path d="M13 3 7 9" /><path d="M11 9.5V13H3V5h3.5" />
  </svg>
);

function SkeletonRow() {
  const cell = (w, h = '11px') => (
    <div style={{ height: h, width: w, borderRadius: h === '18px' ? '5px' : '4px', background: SHIMMER, backgroundSize: '200% 100%', animation: 'scShimmer 1.3s infinite' }} />
  );
  return (
    <div style={{ display: 'grid', gridTemplateColumns: COLS, alignItems: 'center', gap: '10px', padding: '0 16px', height: '46px', borderBottom: '1px solid var(--border)' }}>
      {cell('46px')} {cell('80%')} {cell('70%')} {cell('90px', '18px')} {cell('20px')} {cell('48px')} <div /> <div />
    </div>
  );
}

function SegBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: '10.5px', fontWeight: 600, letterSpacing: '0.4px',
        padding: '4px 10px', borderRadius: '5px', cursor: 'pointer', transition: 'all .15s',
        background: active ? 'var(--panel)' : 'transparent',
        color: active ? 'var(--text)' : 'var(--text3)',
        border: `1px solid ${active ? 'var(--border)' : 'transparent'}`,
        boxShadow: active ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
      }}
    >
      {label}
    </button>
  );
}

function AlertRow({ alert, dark, expanded, onToggle, logStyle }) {
  const isExp = expanded === alert.alert_id;
  const perfUrl = `https://treeherder.mozilla.org/perfherder/alerts?id=${alert.alert_id}`;

  return (
    <div>
      <div
        onClick={() => onToggle(alert.alert_id)}
        style={{
          display: 'grid', gridTemplateColumns: COLS, alignItems: 'center', gap: '10px',
          padding: '0 16px', height: '46px', borderBottom: '1px solid var(--border)',
          cursor: 'pointer', background: isExp ? 'var(--row-hover)' : 'transparent',
          transition: 'background .12s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--row-hover)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = isExp ? 'var(--row-hover)' : 'transparent'; }}
      >
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12.5px', color: 'var(--text2)' }}>
          <span style={{ color: 'var(--text3)' }}>#</span>{alert.alert_id}
        </span>
        <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{alert.test}</span>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: 'var(--text2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{alert.platform}</span>
        <StatusBadge status={alert.status} dark={dark} />
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12.5px', color: 'var(--text)' }}>{alert.iter}</span>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: 'var(--text2)' }}>{alert.elapsed}</span>
        <a
          href={perfUrl}
          target="_blank"
          rel="noreferrer"
          onClick={e => e.stopPropagation()}
          style={{ width: '28px', height: '28px', display: 'grid', placeItems: 'center', borderRadius: '6px', color: 'var(--text3)', textDecoration: 'none', transition: 'background .12s, color .12s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--row-hover)'; e.currentTarget.style.color = 'var(--text)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text3)'; }}
        >
          <ExternalLinkIcon />
        </a>
        <span style={{ display: 'grid', placeItems: 'center', color: 'var(--text3)' }}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: isExp ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform .18s' }}>
            <path d="M6 4l4 4-4 4" />
          </svg>
        </span>
      </div>

      {isExp && <IterationLog alert={alert} dark={dark} logStyle={logStyle} />}
    </div>
  );
}

export default function InProgressTable({ alerts, dark, loading, expanded, onToggle, logStyle, onSetLogStyle }) {
  return (
    <div style={{ marginTop: '26px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text2)' }}>In progress</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', fontWeight: 600, color: 'var(--text2)', background: 'var(--chip)', padding: '1px 7px', borderRadius: '10px' }}>{alerts.length}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)' }}>Log view</span>
          <div style={{ display: 'flex', gap: '2px', padding: '2px', background: 'var(--chip)', borderRadius: '7px' }}>
            <SegBtn label="Timeline" active={logStyle === 'timeline'} onClick={() => onSetLogStyle('timeline')} />
            <SegBtn label="Table" active={logStyle === 'table'} onClick={() => onSetLogStyle('table')} />
            <SegBtn label="Cards" active={logStyle === 'cards'} onClick={() => onSetLogStyle('cards')} />
          </div>
        </div>
      </div>

      <div style={{ border: '1px solid var(--border)', borderRadius: '10px', background: 'var(--panel)', overflow: 'hidden', transition: 'background .18s ease, border-color .18s ease' }}>
        {/* Table header */}
        <div style={{ display: 'grid', gridTemplateColumns: COLS, alignItems: 'center', gap: '10px', padding: '0 16px', height: '36px', background: 'var(--panel-alt)', borderBottom: '1px solid var(--border)' }}>
          {['Alert', 'Test', 'Platform', 'Status', 'Iter', 'Elapsed', '', ''].map((h, i) => (
            <span key={i} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', fontWeight: 600, letterSpacing: '0.7px', textTransform: 'uppercase', color: 'var(--text3)' }}>{h}</span>
          ))}
        </div>

        {loading
          ? [0, 1, 2, 3].map(i => <SkeletonRow key={i} />)
          : alerts.map(alert => (
              <AlertRow
                key={alert.alert_id}
                alert={alert}
                dark={dark}
                expanded={expanded}
                onToggle={onToggle}
                logStyle={logStyle}
              />
            ))
        }
      </div>
    </div>
  );
}
