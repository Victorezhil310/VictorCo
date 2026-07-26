import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import WatchAndEarn from './pages/WatchAndEarn';
import TaskWall from './pages/TaskWall';
import WalletPayouts from './pages/WalletPayouts';
import Leaderboard from './pages/Leaderboard';
import AdminPortal from './pages/AdminPortal';
import TermsAndPrivacy from './pages/TermsAndPrivacy';
import WatchVideoModal from './components/WatchVideoModal';
import { Zap, ShieldCheck } from 'lucide-react';

function AppContent() {
  const { activeTab, setActiveTab } = useApp();

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        {activeTab === 'watch' && <WatchAndEarn />}
        {activeTab === 'tasks' && <TaskWall />}
        {activeTab === 'wallet' && <WalletPayouts />}
        {activeTab === 'leaderboard' && <Leaderboard />}
        {activeTab === 'admin' && <AdminPortal />}
        {activeTab === 'terms' && <TermsAndPrivacy />}
      </main>

      {/* Interactive Video Stream Countdown Modal */}
      <WatchVideoModal />

      {/* Dribbble Style Footer */}
      <footer style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-color)',
        padding: '2rem 1.5rem',
        marginTop: 'auto'
      }}>
        <div style={{
          maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '6px', background: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
            }}>
              <Zap size={16} fill="white" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>VictorCo</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              © 2026 VictorCo. Inspired by Dribbble Watch & Earn Rewards.
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <span onClick={() => setActiveTab('terms')} style={{ cursor: 'pointer', color: 'var(--primary)' }}>
              Terms of Service
            </span>
            <span>•</span>
            <span onClick={() => setActiveTab('terms')} style={{ cursor: 'pointer', color: 'var(--primary)' }}>
              Privacy & Anti-Cheat Policy
            </span>
            <span>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <ShieldCheck size={14} color="var(--accent-green)" />
              <span>Master Admin Gate PIN (20032004)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
