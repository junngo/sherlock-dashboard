import React from 'react';

export default function StatCards({ stats }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', maxWidth: '760px' }}>
      {/* In Progress */}
      <div style={{ border: '1px solid var(--border)', borderRadius: '10px', background: 'var(--panel)', padding: '15px 17px', transition: 'background .18s ease, border-color .18s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9.5px', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)' }}>In progress</span>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#1f9d57', animation: 'scPulse 2s infinite' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '9px', marginTop: '9px' }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '34px', fontWeight: 600, lineHeight: 1, letterSpacing: '-1px', color: 'var(--text)' }}>{stats.inProgress}</span>
          <span style={{ fontSize: '12px', color: 'var(--text3)' }}>alerts iterating</span>
        </div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: 'var(--text3)', marginTop: '10px' }}>{stats.inProgressSub}</div>
      </div>

      {/* Completed (Last 24h) */}
      <div style={{ border: '1px solid var(--border)', borderRadius: '10px', background: 'var(--panel)', padding: '15px 17px', transition: 'background .18s ease, border-color .18s ease' }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9.5px', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)' }}>Completed (Last 24h)</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '9px', marginTop: '9px' }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '34px', fontWeight: 600, lineHeight: 1, letterSpacing: '-1px', color: 'var(--text)' }}>{stats.completed}</span>
          {stats.completedSub && <span style={{ fontSize: '12px', color: 'var(--text3)' }}>{stats.completedSub}</span>}
        </div>
        <div style={{ display: 'flex', height: '5px', borderRadius: '3px', overflow: 'hidden', marginTop: '13px', background: 'var(--border)' }}>
          <div style={{ width: stats.stabPct, background: '#1f9d57' }} />
          <div style={{ width: stats.stuckPct, background: '#df4636' }} />
        </div>
        <div style={{ display: 'flex', gap: '14px', marginTop: '9px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '10.5px', color: 'var(--text2)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1f9d57' }} />{stats.stab} stabilized
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#df4636' }} />{stats.stuck} gap stuck
          </span>
        </div>
      </div>
    </div>
  );
}
