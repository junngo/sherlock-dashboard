import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header.jsx';
import StatCards from '../components/StatCards.jsx';
import InProgressTable from '../components/InProgressTable.jsx';
import CompletedTable from '../components/CompletedTable.jsx';
import { useAlerts } from '../hooks/useAlerts.js';
import { useInProgressCount } from '../hooks/useInProgressCount.js';
import { useCompletedTodayCount } from '../hooks/useCompletedTodayCount.js';
import { useCompletedTodayAlerts } from '../hooks/useCompletedTodayAlerts.js';
import { formatAgoFromMs } from '../utils/time.js';

export default function Dashboard({ dark, onToggleDark, onToggleCollapse }) {
  const [expanded, setExpanded] = useState(null);
  const [logStyle, setLogStyle] = useState('timeline');
  const [tick, setTick] = useState(0);

  const { alerts, loading, error, refetch, lastUpdated } = useAlerts();
  const { count: ipCount, platformCount: ipPlatformCount, longestElapsed: ipLongest, loading: ipLoading, refetch: ipRefetch } = useInProgressCount();
  const { count: ctCount, stabilizedCount: ctStab, gapStuckCount: ctStuck, currentDate: ctDate, loading: ctLoading, refetch: ctRefetch } = useCompletedTodayCount();
  const { alerts: completedAlerts, loading: ctListLoading, refetch: ctListRefetch } = useCompletedTodayAlerts();

  useEffect(() => {
    const iv = setInterval(() => setTick(t => t + 1), 5000);
    return () => clearInterval(iv);
  }, []);

  const agoLabel = lastUpdated ? formatAgoFromMs(Date.now() - lastUpdated) : '—';

  const toggleExpanded = useCallback((id) => {
    setExpanded(e => e === id ? null : id);
  }, []);

  const ctTotal = ctStab != null && ctStuck != null ? ctStab + ctStuck : null;
  const stabPct = ctTotal > 0 ? Math.round(ctStab / ctTotal * 100) : 0;

  const stats = {
    inProgress: ipLoading ? '—' : (ipCount ?? '—'),
    inProgressSub: ipLoading || ipCount === null
      ? '—'
      : `${ipPlatformCount} platform${ipPlatformCount !== 1 ? 's' : ''} · longest ${ipLongest}`,
    completed: ctLoading ? '—' : (ctCount ?? '—'),
    completedSub: ctLoading || ctDate === null ? null : ctDate,
    stab: ctStab ?? 0,
    stuck: ctStuck ?? 0,
    stabPct: stabPct + '%',
    stuckPct: (100 - stabPct) + '%',
  };

  return (
    <>
      <Header
        dark={dark}
        agoLabel={agoLabel}
        loading={loading}
        error={error}
        onToggleCollapse={onToggleCollapse}
        onToggleDark={onToggleDark}
        onRefresh={() => { refetch(); ipRefetch(); ctRefetch(); ctListRefetch(); }}
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
          alerts={completedAlerts}
          dark={dark}
          loading={ctListLoading}
        />
      </div>
    </>
  );
}
