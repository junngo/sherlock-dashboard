import React, { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Alerts from './pages/Alerts.jsx';

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

  const toggleDark = useCallback(() => {
    setDark(d => {
      const nd = !d;
      try { localStorage.setItem('sherlock-theme', nd ? 'dark' : 'light'); } catch {}
      return nd;
    });
  }, []);

  const toggleCollapse = useCallback(() => setCollapsed(c => !c), []);

  const colors = dark ? DARK : LIGHT;

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
        <Routes>
          <Route path="/" element={<Dashboard dark={dark} onToggleDark={toggleDark} onToggleCollapse={toggleCollapse} />} />
          <Route path="/alerts" element={<Alerts dark={dark} onToggleDark={toggleDark} onToggleCollapse={toggleCollapse} />} />
        </Routes>
      </div>
    </div>
  );
}
