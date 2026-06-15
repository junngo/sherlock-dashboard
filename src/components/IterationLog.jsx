import React from 'react';
import StatusBadge from './StatusBadge.jsx';
import { statusMeta } from '../data.js';

const COLS_TABLE = '40px 150px 1fr 1fr 64px 56px minmax(160px,2fr)';
const COLS_TABLE_GAPS = '10px';

function TimelineView({ iterations, dark, signatureId, frameworkId }) {
  return (
    <div>
      {iterations.map((it, i) => {
        const m = statusMeta(it.status, dark);
        const isLast = i === iterations.length - 1;
        const tBarPct = Math.round(Math.min(it.detected_t_value / 15, 1) * 100) + '%';
        return (
          <div key={it.iteration} style={{ display: 'flex', gap: '14px', alignItems: 'stretch' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '14px', flexShrink: 0 }}>
              <div style={{ width: '11px', height: '11px', borderRadius: '50%', marginTop: '4px', background: m.dot, boxShadow: '0 0 0 3px var(--panel-alt)' }} />
              {!isLast && <div style={{ flex: 1, width: '2px', marginTop: '4px', background: 'var(--border)' }} />}
            </div>
            <div style={{ flex: 1, minWidth: 0, paddingBottom: '16px' }}>
              <div style={{ border: '1px solid var(--border)', borderRadius: '7px', background: 'var(--panel)', padding: '11px 13px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11.5px', fontWeight: 600, color: 'var(--text2)' }}>ITER {it.iteration}</span>
                    <StatusBadge status={it.status} dark={dark} />
                  </div>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: 'var(--text3)' }}>{it.time} · {it.ago}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr', gap: '14px', marginTop: '11px' }}>
                  <div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', fontWeight: 600, letterSpacing: '0.7px', textTransform: 'uppercase', color: 'var(--text3)' }}>Detected push</div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginTop: '3px' }}>{it.detected_push_id}{it.detected_push_revision ? <a href={buildRevisionUrl(signatureId, frameworkId, it.detected_push_revision.slice(0, 7))} target="_blank" rel="noreferrer" title="View in Graphs" onClick={e => e.stopPropagation()} style={{ fontWeight: 400, color: 'var(--text3)', textDecoration: 'none', verticalAlign: 'middle', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.color = '#3b82f6'; }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--text3)'; }}> ({it.detected_push_revision.slice(0, 7)}↗)</a> : null}</div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10.5px', color: 'var(--text3)', marginTop: '1px' }}>from {it.previous_push_id}{it.previous_push_revision ? ` (${it.previous_push_revision.slice(0, 7)})` : ''}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', fontWeight: 600, letterSpacing: '0.7px', textTransform: 'uppercase', color: 'var(--text3)' }}>t-value</div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginTop: '3px' }}>{it.detected_t_value.toFixed(2)}</div>
                    <div style={{ height: '3px', borderRadius: '2px', background: 'var(--border)', marginTop: '6px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: tBarPct, background: m.dot }} />
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', fontWeight: 600, letterSpacing: '0.7px', textTransform: 'uppercase', color: 'var(--text3)' }}>Gap size</div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginTop: '3px' }}>{it.detected_push_gap_size}</div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10.5px', color: 'var(--text3)', marginTop: '1px' }}>pushes</div>
                  </div>
                </div>
                <div style={{ marginTop: '10px', paddingTop: '9px', borderTop: '1px solid var(--border)', fontSize: '12px', color: 'var(--text2)', lineHeight: 1.45 }}>{it.notes}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TableView({ iterations, dark, signatureId, frameworkId }) {
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: '7px', background: 'var(--panel)', overflow: 'hidden', marginBottom: '10px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: COLS_TABLE, alignItems: 'center', gap: COLS_TABLE_GAPS, padding: '0 12px', height: '32px', background: 'var(--panel-alt)', borderBottom: '1px solid var(--border)' }}>
        {['#', 'Status', 'Push', 'Previous', 't-val', 'Gap', 'Notes'].map(h => (
          <span key={h} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '8.5px', fontWeight: 600, letterSpacing: '0.6px', textTransform: 'uppercase', color: 'var(--text3)' }}>{h}</span>
        ))}
      </div>
      {iterations.map(it => (
        <div
          key={it.iteration}
          style={{ display: 'grid', gridTemplateColumns: COLS_TABLE, alignItems: 'center', gap: COLS_TABLE_GAPS, padding: '9px 12px', borderBottom: '1px solid var(--border)', transition: 'background .12s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--row-hover)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: 'var(--text3)' }}>{it.iteration}</span>
          <StatusBadge status={it.status} dark={dark} small />
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: 'var(--text)' }}>{it.detected_push_id}{it.detected_push_revision ? <a href={buildRevisionUrl(signatureId, frameworkId, it.detected_push_revision.slice(0, 7))} target="_blank" rel="noreferrer" title="View in Graphs" onClick={e => e.stopPropagation()} style={{ color: 'var(--text3)', textDecoration: 'none', verticalAlign: 'middle', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.color = '#3b82f6'; }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--text3)'; }}> ({it.detected_push_revision.slice(0, 7)}↗)</a> : null}</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: 'var(--text3)' }}>{it.previous_push_id}{it.previous_push_revision ? ` (${it.previous_push_revision.slice(0, 7)})` : ''}</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: 'var(--text)' }}>{it.detected_t_value.toFixed(2)}</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: 'var(--text2)' }}>{it.detected_push_gap_size}</span>
          <span style={{ fontSize: '11.5px', color: 'var(--text2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{it.notes}</span>
        </div>
      ))}
    </div>
  );
}

function CardsView({ iterations, dark, signatureId, frameworkId }) {
  return (
    <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '12px' }}>
      {iterations.map(it => {
        const m = statusMeta(it.status, dark);
        return (
          <div key={it.iteration} style={{ flexShrink: 0, width: '176px', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--panel)', padding: '11px 12px', borderTop: `2px solid ${m.dot}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', fontWeight: 600, color: 'var(--text2)' }}>#{it.iteration}</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', color: 'var(--text3)' }}>{it.time}</span>
            </div>
            <StatusBadge status={it.status} dark={dark} small style={{ marginTop: '9px' }} />
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginTop: '11px' }}>{it.detected_push_id}{it.detected_push_revision ? <a href={buildRevisionUrl(signatureId, frameworkId, it.detected_push_revision.slice(0, 7))} target="_blank" rel="noreferrer" title="View in Graphs" onClick={e => e.stopPropagation()} style={{ fontWeight: 400, color: 'var(--text3)', textDecoration: 'none', verticalAlign: 'middle', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.color = '#3b82f6'; }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--text3)'; }}> ({it.detected_push_revision.slice(0, 7)}↗)</a> : null}</div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', color: 'var(--text3)', marginTop: '1px' }}>from {it.previous_push_id}{it.previous_push_revision ? ` (${it.previous_push_revision.slice(0, 7)})` : ''}</div>
            <div style={{ display: 'flex', gap: '16px', marginTop: '11px', paddingTop: '9px', borderTop: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '8.5px', fontWeight: 600, letterSpacing: '.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>t-val</div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12.5px', color: 'var(--text)', marginTop: '2px' }}>{it.detected_t_value.toFixed(2)}</div>
              </div>
              <div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '8.5px', fontWeight: 600, letterSpacing: '.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Gap</div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12.5px', color: 'var(--text)', marginTop: '2px' }}>{it.detected_push_gap_size}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const EXTERNAL_ICON = (
  <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h7v7" /><path d="M13 3 7 9" />
  </svg>
);

function ExternalLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={e => e.stopPropagation()}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '10.5px', fontWeight: 600, color: 'var(--text2)', textDecoration: 'none', border: '1px solid var(--border)', padding: '4px 9px', borderRadius: '6px', transition: 'background .12s, color .12s' }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--row-hover)'; e.currentTarget.style.color = 'var(--text)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text2)'; }}
    >
      {children}
      {EXTERNAL_ICON}
    </a>
  );
}

function buildGraphsUrl(alert) {
  const params = new URLSearchParams({
    timerange: '1209600',
    series: `autoland,${alert.signatureId},1,${alert.frameworkId}`,
  });
  const revisions = [...new Set(
    alert.iterations.map(it => it.detected_push_revision?.slice(0, 7)).filter(Boolean)
  )];
  const revisionParams = revisions.map(r => `highlightedRevisions=${r}`).join('&');
  return `https://treeherder.mozilla.org/perfherder/graphs?${params.toString()}&${revisionParams}`;
}

function buildRevisionUrl(signatureId, frameworkId, revision) {
  const params = new URLSearchParams({
    timerange: '1209600',
    series: `autoland,${signatureId},1,${frameworkId}`,
  });
  return `https://treeherder.mozilla.org/perfherder/graphs?${params.toString()}&highlightedRevisions=${revision}`;
}

export default function IterationLog({ alert, dark, logStyle }) {
  const perfherderUrl = `https://treeherder.mozilla.org/perfherder/alerts?id=${alert.summary_id}`;
  const graphsUrl = buildGraphsUrl(alert);
  return (
    <div style={{ background: 'var(--panel-alt)', borderBottom: '1px solid var(--border)', padding: '15px 20px 7px' }}>
      <div style={{ maxWidth: '1000px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '13px' }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9.5px', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)' }}>Iteration log</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10.5px', color: 'var(--text3)' }}>{alert.iter} steps · alert #{alert.alert_id}</span>
          <div style={{ flex: 1 }} />
          <ExternalLink href={perfherderUrl}>Perfherder</ExternalLink>
          {alert.signatureId && alert.frameworkId && (
            <ExternalLink href={graphsUrl}>Graphs</ExternalLink>
          )}
        </div>

        {logStyle === 'timeline' && <TimelineView iterations={alert.iterations} dark={dark} signatureId={alert.signatureId} frameworkId={alert.frameworkId} />}
        {logStyle === 'table' && <TableView iterations={alert.iterations} dark={dark} signatureId={alert.signatureId} frameworkId={alert.frameworkId} />}
        {logStyle === 'cards' && <CardsView iterations={alert.iterations} dark={dark} signatureId={alert.signatureId} frameworkId={alert.frameworkId} />}
      </div>
    </div>
  );
}
