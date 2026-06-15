import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import IterationLog from '../components/IterationLog.jsx';
import { useAllAlerts } from '../hooks/useAllAlerts.js';
import { formatElapsed, formatDateTime, toUtc } from '../utils/time.js';

const PAGE_SIZES = [20, 50, 100];
const SHIMMER = 'linear-gradient(90deg,var(--shimmer1) 25%,var(--shimmer2) 50%,var(--shimmer1) 75%)';
const COLS = '90px minmax(180px,2fr) minmax(130px,1.2fr) 174px 54px 80px minmax(160px,1.3fr) 26px';

// ─── sub-components ──────────────────────────────────────────────────────────

function SkeletonRow() {
  const cell = (w, h = '11px') => (
    <div style={{ height: h, width: w, borderRadius: h === '18px' ? '5px' : '4px', background: SHIMMER, backgroundSize: '200% 100%', animation: 'scShimmer 1.3s infinite' }} />
  );
  return (
    <div style={{ display: 'grid', gridTemplateColumns: COLS, alignItems: 'center', gap: '10px', padding: '0 16px', height: '46px', borderBottom: '1px solid var(--border)' }}>
      {cell('46px')} {cell('75%')} {cell('55%')} {cell('90px', '18px')} {cell('20px')} {cell('48px')} {cell('110px')} <div />
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
  const perfUrl = `https://treeherder.mozilla.org/perfherder/alerts?id=${alert.summary_id}`;

  return (
    <div>
      <div
        onClick={() => onToggle(alert.alert_id)}
        style={{
          display: 'grid', gridTemplateColumns: COLS, alignItems: 'center', gap: '10px',
          padding: '0 13px',
          height: '46px', borderBottom: '1px solid var(--border)',
          cursor: 'pointer',
          background: isExp ? 'var(--row-hover)' : 'transparent',
          transition: 'background .12s',
          borderLeft: alert.isRunning ? '3px solid #3b82f6' : '3px solid transparent',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--row-hover)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = isExp ? 'var(--row-hover)' : 'transparent'; }}
      >
        <a
          href={perfUrl}
          target="_blank"
          rel="noreferrer"
          onClick={e => e.stopPropagation()}
          style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12.5px', color: 'var(--text2)', textDecoration: 'none', transition: 'color .12s' }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.textDecoration = 'underline'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.textDecoration = 'none'; }}
        >
          <span style={{ color: 'var(--text3)' }}>#</span>{alert.summary_id}
        </a>
        <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{alert.testName}</span>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: 'var(--text2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{alert.platform}</span>
        <StatusBadge status={alert.currentStatus} dark={dark} />
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12.5px', color: 'var(--text)' }}>{alert.totalIterations}</span>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: 'var(--text2)' }}>{formatElapsed(alert.elapsedMs)}</span>
        {alert.isRunning
          ? <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#3b82f6', flexShrink: 0 }} />
              Running
            </span>
          : <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: 'var(--text2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>
              {formatDateTime(alert.completedAt)}
            </span>
        }
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

function FilterInput({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        fontFamily: "'IBM Plex Sans', system-ui, sans-serif", fontSize: '12.5px',
        padding: '6px 10px', borderRadius: '7px',
        border: '1px solid var(--border)', background: 'var(--panel)',
        color: 'var(--text)', outline: 'none', minWidth: '180px',
        transition: 'border-color .12s',
      }}
      onFocus={e => { e.currentTarget.style.borderColor = '#3b82f6'; }}
      onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
    />
  );
}

function FilterSelect({ value, onChange, children }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        fontFamily: "'IBM Plex Sans', system-ui, sans-serif", fontSize: '12.5px',
        padding: '6px 10px', borderRadius: '7px',
        border: '1px solid var(--border)', background: 'var(--panel)',
        color: 'var(--text)', outline: 'none', cursor: 'pointer',
        transition: 'border-color .12s',
      }}
      onFocus={e => { e.currentTarget.style.borderColor = '#3b82f6'; }}
      onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
    >
      {children}
    </select>
  );
}

function StatCard({ label, value, accent, dot }) {
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: '10px', background: 'var(--panel)', padding: '14px 16px', transition: 'background .18s ease, border-color .18s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9.5px', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)' }}>{label}</span>
        {dot && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: dot, flexShrink: 0 }} />}
      </div>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '30px', fontWeight: 600, lineHeight: 1, letterSpacing: '-0.8px', color: accent || 'var(--text)', marginTop: '8px' }}>{value}</div>
    </div>
  );
}

function PageBtn({ onClick, disabled, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', fontWeight: 600,
        padding: '5px 11px', borderRadius: '6px', cursor: disabled ? 'default' : 'pointer',
        border: '1px solid var(--border)', background: 'var(--panel)',
        color: disabled ? 'var(--text3)' : 'var(--text2)',
        opacity: disabled ? 0.5 : 1,
        transition: 'background .12s, color .12s',
      }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.background = 'var(--row-hover)'; e.currentTarget.style.color = 'var(--text)'; } }}
      onMouseLeave={e => { if (!disabled) { e.currentTarget.style.background = 'var(--panel)'; e.currentTarget.style.color = 'var(--text2)'; } }}
    >
      {children}
    </button>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

export default function Alerts({ dark, onToggleDark, onToggleCollapse }) {
  const { alerts, loading, error, refetch } = useAllAlerts();
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get('id');

  const [search, setSearch] = useState(idParam ?? '');
  const [platformFilter, setPlatformFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [expanded, setExpanded] = useState(null);
  const [logStyle, setLogStyle] = useState('timeline');

  useEffect(() => {
    if (idParam) {
      setSearch(idParam);
      setExpanded(Number(idParam));
    }
  }, [idParam]);

  const platforms = useMemo(() => {
    const set = new Set(alerts.map(a => a.platform).filter(Boolean));
    return [...set].sort();
  }, [alerts]);

  const statuses = useMemo(() => {
    const set = new Set(alerts.map(a => a.currentStatus).filter(Boolean));
    return [...set].sort();
  }, [alerts]);

  const filtered = useMemo(() => {
    return alerts.filter(a => {
      if (search && !a.testName.toLowerCase().includes(search.toLowerCase()) && !String(a.summaryId).includes(search)) return false;
      if (platformFilter && a.platform !== platformFilter) return false;
      if (statusFilter && a.currentStatus !== statusFilter) return false;
      if (dateFrom || dateTo) {
        const ts = new Date(toUtc(a.firstTimestamp)).getTime();
        if (dateFrom && ts < new Date(dateFrom).getTime()) return false;
        if (dateTo) {
          const end = new Date(dateTo);
          end.setDate(end.getDate() + 1);
          if (ts >= end.getTime()) return false;
        }
      }
      return true;
    }).sort((a, b) => b.summaryId - a.summaryId);
  }, [alerts, search, platformFilter, statusFilter, dateFrom, dateTo]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageAlerts = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const total = filtered.length;
  const inProgress = filtered.filter(a => a.isRunning).length;
  const stabilized = filtered.filter(a => a.currentStatus === 'stabilized').length;
  const gapStuck = filtered.filter(a => a.currentStatus === 'stabilized_gap_stuck').length;

  const resetPage = useCallback(() => setPage(1), []);
  const onToggleExpanded = useCallback((id) => {
    setExpanded(e => e === id ? null : id);
  }, []);

  const hasFilters = search || platformFilter || statusFilter || dateFrom || dateTo;

  return (
    <>
      <Header
        dark={dark}
        agoLabel="—"
        loading={loading}
        error={error}
        onToggleCollapse={onToggleCollapse}
        onToggleDark={onToggleDark}
        onRefresh={refetch}
        title="Alerts"
        subtitle="redash · all alerts"
      />

      <div style={{ flex: 1, overflow: 'auto', padding: '20px 22px 44px' }}>

        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', maxWidth: '900px', marginBottom: '22px' }}>
          <StatCard label="Total" value={loading ? '—' : total} />
          <StatCard label="In Progress" value={loading ? '—' : inProgress} dot="#3b82f6" accent="#3b82f6" />
          <StatCard label="Stabilized" value={loading ? '—' : stabilized} dot="#1f9d57" accent="#1f9d57" />
          <StatCard label="Gap Stuck" value={loading ? '—' : gapStuck} dot="#df4636" accent="#df4636" />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
          <FilterInput
            value={search}
            onChange={v => { setSearch(v); resetPage(); }}
            placeholder="Search tests…"
          />
          <FilterSelect value={platformFilter} onChange={v => { setPlatformFilter(v); resetPage(); }}>
            <option value="">All platforms</option>
            {platforms.map(p => <option key={p} value={p}>{p}</option>)}
          </FilterSelect>
          <FilterSelect value={statusFilter} onChange={v => { setStatusFilter(v); resetPage(); }}>
            <option value="">All statuses</option>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </FilterSelect>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10.5px', color: 'var(--text3)' }}>From</span>
            <input
              type="date"
              value={dateFrom}
              onChange={e => { setDateFrom(e.target.value); resetPage(); }}
              style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif", fontSize: '12.5px', padding: '5px 8px', borderRadius: '7px', border: '1px solid var(--border)', background: 'var(--panel)', color: 'var(--text)', outline: 'none' }}
            />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10.5px', color: 'var(--text3)' }}>To</span>
            <input
              type="date"
              value={dateTo}
              onChange={e => { setDateTo(e.target.value); resetPage(); }}
              style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif", fontSize: '12.5px', padding: '5px 8px', borderRadius: '7px', border: '1px solid var(--border)', background: 'var(--panel)', color: 'var(--text)', outline: 'none' }}
            />
          </div>
          {hasFilters && (
            <button
              onClick={() => { setSearch(''); setPlatformFilter(''); setStatusFilter(''); setDateFrom(''); setDateTo(''); setPage(1); }}
              style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10.5px', fontWeight: 600, color: 'var(--text3)', background: 'transparent', border: '1px solid var(--border)', borderRadius: '6px', padding: '5px 10px', cursor: 'pointer', transition: 'color .12s, background .12s' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'var(--row-hover)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text3)'; e.currentTarget.style.background = 'transparent'; }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Table */}
        <div style={{ border: '1px solid var(--border)', borderRadius: '10px', background: 'var(--panel)', overflow: 'hidden', transition: 'background .18s ease, border-color .18s ease' }}>

          {/* Table header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '0 13px 0 16px', height: '44px', background: 'var(--panel-alt)', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: COLS, alignItems: 'center', gap: '10px', flex: 1 }}>
              {['Summary', 'Test', 'Platform', 'Status', 'Iters', 'Elapsed', 'Completed', ''].map((h, i) => (
                <span key={i} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', fontWeight: 600, letterSpacing: '0.7px', textTransform: 'uppercase', color: 'var(--text3)' }}>{h}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '2px', padding: '2px', background: 'var(--chip)', borderRadius: '7px', flexShrink: 0 }}>
              <SegBtn label="Timeline" active={logStyle === 'timeline'} onClick={() => setLogStyle('timeline')} />
              <SegBtn label="Table" active={logStyle === 'table'} onClick={() => setLogStyle('table')} />
              <SegBtn label="Cards" active={logStyle === 'cards'} onClick={() => setLogStyle('cards')} />
            </div>
          </div>

          {/* Rows */}
          {loading
            ? [0,1,2,3,4,5].map(i => <SkeletonRow key={i} />)
            : pageAlerts.length === 0
              ? (
                <div style={{ padding: '40px 20px', textAlign: 'center', fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: 'var(--text3)' }}>
                  {hasFilters ? 'No alerts match the current filters.' : 'No alerts found.'}
                </div>
              )
              : pageAlerts.map(alert => (
                <AlertRow
                  key={alert.alert_id}
                  alert={alert}
                  dark={dark}
                  expanded={expanded}
                  onToggle={onToggleExpanded}
                  logStyle={logStyle}
                />
              ))
          }

          {/* Pagination */}
          {!loading && filtered.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderTop: '1px solid var(--border)', background: 'var(--panel-alt)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: 'var(--text3)' }}>
                  {(safePage - 1) * pageSize + 1}–{Math.min(safePage * pageSize, filtered.length)} of {filtered.length}
                </span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', color: 'var(--text3)' }}>·</span>
                {PAGE_SIZES.map(s => (
                  <PageBtn key={s} disabled={pageSize === s} onClick={() => { setPageSize(s); setPage(1); }}>{s}</PageBtn>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <PageBtn disabled={safePage === 1} onClick={() => setPage(p => p - 1)}>← Prev</PageBtn>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: 'var(--text2)', padding: '5px 10px' }}>
                  {safePage} / {totalPages}
                </span>
                <PageBtn disabled={safePage === totalPages} onClick={() => setPage(p => p + 1)}>Next →</PageBtn>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
