import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import StatCards from './components/StatCards.jsx';
import InProgressTable from './components/InProgressTable.jsx';
import CompletedTable from './components/CompletedTable.jsx';
import { useAlerts } from './hooks/useAlerts.js';
import { COMPLETED } from './data.js';
import { formatElapsed, formatAgoFromMs } from './utils/time.js';

const LIGHT = {
  '--bg': '#f5f6f7', '--panel': '#ffffff', '--panel-alt': '#fafbfb',
  '--border': '#e5e8ea', '--border-strong': '#d6dade',
  '--text': '#15181c', '--text2': '#586069', '--text3': '#8b929b',
  '--row-hover': '#f1f3f4', '--sidebar-bg': '#fbfbfc',
  '--chip': '#eceef0', '--accent': '#15181c',
  '--shimmer1': '#eceef0', '--shimmer2': '#f6f7f8',
};
const DARK = {
  '--bg': '#0a0c0f', '--panel': '#111418', '--panel-alt': '#0d1014',
  '--border': '#20262e', '--border-strong': '#2a313a',
  '--text': '#e6e9ec', '--text2': '#98a1ab', '--text3': '#69727d',
  '--row-hover': '#161a1f', '--sidebar-bg': '#0c0f13',
  '--chip': '#191e24', '--accent': '#e6e9ec',
  '--shimmer1': '#161a1f', '--shimmer2': '#1d2228',
};

export default function App() {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem('sherlock-theme') === 'dark'; } catch { return false; }
  });
  const [collapsed, setCollapsed] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [logStyle, setLogStyle] = useState('timeline');
  const [tick, setTick] = useState(0);

  const { alerts, loading, error, refetch, lastUpdated } = useAlerts();

  useEffect(() => {
    const iv = setInterval(() => setTick(t => t + 1), 5000);
    return () => clearInterval(iv);
  }, []);

  // Expand first alert once data loads
  useEffect(() => {
    if (!loading && alerts.length > 0 && expanded === null) {
      setExpanded(alerts[0].alert_id);
    }
  }, [loading, alerts]);

  const agoLabel = lastUpdated
    ? formatAgoFromMs(Date.now() - lastUpdated)
    : '—';

  const toggleDark = useCallback(() => {
    setDark(d => {
      const nd = !d;
      try { localStorage.setItem('sherlock-theme', nd ? 'dark' : 'light'); } catch {}
      return nd;
    });
  }, []);

  const toggleExpanded = useCallback((id) => {
    setExpanded(e => e === id ? null : id);
  }, []);

  const colors = dark ? DARK : LIGHT;

  const platforms = new Set(alerts.map(a => a.platform));
  const longestMs = alerts.length > 0 ? Math.max(...alerts.map(a => a.elapsedMs ?? 0)) : 0;

  const stab = COMPLETED.filter(a => a.status === 'stabilized').length;
  const stuck = COMPLETED.length - stab;
  const stabPct = COMPLETED.length > 0 ? Math.round(stab / COMPLETED.length * 100) : 0;

  const stats = {
    inProgress: alerts.length,
    inProgressSub: alerts.length > 0
      ? `${platforms.size} platform${platforms.size !== 1 ? 's' : ''} · longest ${formatElapsed(longestMs)}`
      : '—',
    completed: COMPLETED.length,
    stab, stuck,
    stabPct: stabPct + '%',
    stuckPct: (100 - stabPct) + '%',
  };

  return (
    <div
      style={{
        ...colors,
        background: 'var(--bg)', color: 'var(--text)',
        minHeight: '100vh', height: '100vh',
        display: 'flex', overflow: 'hidden',
        fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
        fontSize: '13px',
        transition: 'background .18s ease, color .18s ease',
      }}
    >
      <Sidebar collapsed={collapsed} dark={dark} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: 'var(--bg)' }}>
        <Header
          dark={dark}
          agoLabel={agoLabel}
          loading={loading}
          error={error}
          onToggleCollapse={() => setCollapsed(c => !c)}
          onToggleDark={toggleDark}
          onRefresh={refetch}
        />
        <div style={{ flex: 1, overflow: 'auto', padding: '20px 22px 44px' }}>
          <StatCards stats={stats} dark={dark} />
          <InProgressTable
            alerts={alerts}
            dark={dark}
            loading={loading}
            expanded={expanded}
            onToggle={toggleExpanded}
            logStyle={logStyle}
            onSetLogStyle={setLogStyle}
          />
          <CompletedTable
            completed={COMPLETED}
            dark={dark}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
