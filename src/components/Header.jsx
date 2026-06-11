import React from 'react';

const HamburgerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M2 4h12M2 8h12M2 12h12" />
  </svg>
);
const RefreshIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13.65 5.4A6 6 0 1 0 14 8" /><path d="M14 2.4V5.6H10.7" />
  </svg>
);
const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="8" cy="8" r="3" />
    <path d="M8 1.2v1.6M8 13.2v1.6M1.2 8h1.6M13.2 8h1.6M3.1 3.1l1.1 1.1M11.8 11.8l1.1 1.1M12.9 3.1l-1.1 1.1M4.2 11.8l-1.1 1.1" />
  </svg>
);
const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
    <path d="M13.3 9.7A5.6 5.6 0 0 1 6.3 2.7 5.6 5.6 0 1 0 13.3 9.7z" />
  </svg>
);

function IconBtn({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{ width: '30px', height: '30px', display: 'grid', placeItems: 'center', borderRadius: '7px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text2)', cursor: 'pointer', transition: 'background .12s, color .12s' }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--row-hover)'; e.currentTarget.style.color = 'var(--text)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text2)'; }}
    >
      {children}
    </button>
  );
}

export default function Header({ dark, agoLabel, loading, error, onToggleCollapse, onToggleDark, onRefresh }) {
  return (
    <header style={{
      height: '57px', flexShrink: 0,
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 20px', gap: '16px',
      transition: 'background .18s ease, border-color .18s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <IconBtn onClick={onToggleCollapse}><HamburgerIcon /></IconBtn>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <span style={{ fontSize: '15.5px', fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.2px' }}>Dashboard</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', color: 'var(--text3)', letterSpacing: '.3px' }}>redash · auto-backfill</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {error && (
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', color: '#df4636', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#df4636', flexShrink: 0 }} />
            API unavailable · mock data
          </span>
        )}
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10.5px', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: error ? '#df4636' : '#1f9d57' }} />
          Updated {agoLabel}
        </span>

        <button
          onClick={onRefresh}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '6px 11px', borderRadius: '7px', border: '1px solid var(--border)', background: 'var(--panel)', color: 'var(--text)', fontSize: '12px', fontWeight: 500, fontFamily: "'IBM Plex Sans', sans-serif", cursor: 'pointer', transition: 'background .12s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--row-hover)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--panel)'; }}
        >
          <span style={{ display: 'flex', animation: loading ? 'scSpin 0.8s linear infinite' : 'none' }}>
            <RefreshIcon />
          </span>
          {loading ? 'Syncing' : 'Refresh'}
        </button>

        <div style={{ width: '1px', height: '20px', background: 'var(--border)' }} />

        <IconBtn onClick={onToggleDark}>
          {dark ? <SunIcon /> : <MoonIcon />}
        </IconBtn>
      </div>
    </header>
  );
}
