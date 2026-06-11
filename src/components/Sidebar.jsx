import React from 'react';
import { statusMeta, LEGEND_STATUSES } from '../data.js';

const NavItem = ({ icon, label, active, soon }) => (
  <a
    style={{
      display: 'flex', alignItems: 'center', gap: '11px', padding: '8px 10px',
      borderRadius: '7px', textDecoration: 'none', cursor: 'pointer',
      background: active ? 'var(--chip)' : 'transparent',
      color: active ? 'var(--text)' : 'var(--text2)',
      transition: 'background .12s, color .12s',
    }}
    onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'var(--row-hover)'; e.currentTarget.style.color = 'var(--text)'; } }}
    onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text2)'; } }}
  >
    <span style={{ display: 'flex', flexShrink: 0, color: active ? 'var(--text)' : undefined }}>{icon}</span>
    {label && (
      <>
        <span style={{ fontSize: '13px', fontWeight: active ? 600 : 400, flex: 1 }}>{label}</span>
        {soon && (
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '8px', letterSpacing: '.5px', color: 'var(--text3)', border: '1px solid var(--border)', borderRadius: '4px', padding: '1px 4px' }}>SOON</span>
        )}
      </>
    )}
  </a>
);

const DashboardIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="2" y="2" width="4.6" height="4.6" rx="1" />
    <rect x="9.4" y="2" width="4.6" height="4.6" rx="1" />
    <rect x="2" y="9.4" width="4.6" height="4.6" rx="1" />
    <rect x="9.4" y="9.4" width="4.6" height="4.6" rx="1" />
  </svg>
);
const AlertsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
    <path d="M8 1.8l6.2 6.2L8 14.2 1.8 8z" />
  </svg>
);
const IterationsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 5.5h7.5a2 2 0 0 1 2 2" /><path d="M10.5 3.5l2 2-2 2" />
    <path d="M13 10.5H5.5a2 2 0 0 1-2-2" /><path d="M5.5 12.5l-2-2 2-2" />
  </svg>
);
const HistoryIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="6" /><path d="M8 4.5V8l2.4 1.4" />
  </svg>
);
const SettingsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <path d="M2 4.5h6" /><path d="M11 4.5h3" /><path d="M2 11.5h3" /><path d="M8 11.5h6" />
    <circle cx="9.5" cy="4.5" r="1.7" fill="var(--sidebar-bg)" />
    <circle cx="6.5" cy="11.5" r="1.7" fill="var(--sidebar-bg)" />
  </svg>
);

export default function Sidebar({ collapsed, dark }) {
  const showLabels = !collapsed;

  return (
    <aside style={{
      width: collapsed ? '62px' : '226px',
      flexShrink: 0,
      background: 'var(--sidebar-bg)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      transition: 'width .18s ease, background .18s ease, border-color .18s ease',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '0 16px', height: '57px', flexShrink: 0, borderBottom: '1px solid var(--border)' }}>
        <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'var(--accent)', color: 'var(--bg)', display: 'grid', placeItems: 'center', fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: '15px', flexShrink: 0 }}>S</div>
        {showLabels && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12.5px', fontWeight: 600, letterSpacing: '2px', color: 'var(--text)', whiteSpace: 'nowrap' }}>SHERLOCK</span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '8.5px', letterSpacing: '1.5px', color: 'var(--text3)', whiteSpace: 'nowrap' }}>BACKFILL MONITOR</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
        <NavItem icon={<DashboardIcon />} label={showLabels ? 'Dashboard' : null} active />
        <NavItem icon={<AlertsIcon />} label={showLabels ? 'Alerts' : null} soon />
        <NavItem icon={<IterationsIcon />} label={showLabels ? 'Iterations' : null} soon />
        <NavItem icon={<HistoryIcon />} label={showLabels ? 'History' : null} soon />
        <NavItem icon={<SettingsIcon />} label={showLabels ? 'Settings' : null} soon />
      </nav>

      {/* Status key legend */}
      {showLabels && (
        <div style={{ padding: '13px 16px', borderTop: '1px solid var(--border)' }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '9px' }}>Status key</div>
          {LEGEND_STATUSES.map(s => {
            const m = statusMeta(s, dark);
            return (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0, background: m.dot }} />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', color: 'var(--text2)', whiteSpace: 'nowrap' }}>{s}</span>
              </div>
            );
          })}
        </div>
      )}
    </aside>
  );
}
