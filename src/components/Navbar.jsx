import React, { useState } from 'react';
import { 
  Zap, Play, CheckSquare, Wallet, Trophy, FileText, ShieldCheck, Unlock, Lock, Sparkles, Coins, Gem 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import AdminPinModal from './AdminPinModal';

export default function Navbar() {
  const { 
    user, isAdminUnlocked, activeTab, setActiveTab, lockAdmin 
  } = useApp();

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const handleAdminClick = () => {
    if (isAdminUnlocked) {
      setActiveTab('admin');
    } else {
      setIsAdminModalOpen(true);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-wrapper">
          {/* Logo */}
          <div className="logo-group" onClick={() => setActiveTab('watch')}>
            <div className="logo-icon">
              <Zap size={22} fill="white" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="logo-text">VictorCo</span>
                <span className="logo-badge">EARN</span>
              </div>
              <p style={{ fontSize: '0.65rem', color: 'var(--accent-amber)', fontWeight: 700, letterSpacing: '0.3px' }}>
                EARN MONEY BY WATCHING ADS
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="nav-links">
            <li 
              className={`nav-item ${activeTab === 'watch' ? 'active' : ''}`}
              onClick={() => setActiveTab('watch')}
            >
              <Play size={17} />
              <span>Watch & Earn</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'tasks' ? 'active' : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              <CheckSquare size={17} />
              <span>Task Wall</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'wallet' ? 'active' : ''}`}
              onClick={() => setActiveTab('wallet')}
            >
              <Wallet size={17} />
              <span>Wallet & Withdraw</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'leaderboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('leaderboard')}
            >
              <Trophy size={17} />
              <span>Leaderboard</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'terms' ? 'active' : ''}`}
              onClick={() => setActiveTab('terms')}
            >
              <FileText size={17} />
              <span>Terms & Rules</span>
            </li>
          </ul>

          {/* Right Header Balance Chips */}
          <div className="nav-actions">
            {/* Cash Balance */}
            <div style={{
              background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)',
              padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.4rem'
            }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
                ${user.balance.toFixed(2)}
              </span>
            </div>

            {/* Coins Balance */}
            <div style={{
              background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)',
              padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-amber)'
            }}>
              <Coins size={15} />
              <span>{user.coins}</span>
            </div>

            {/* Diamonds Balance */}
            <div style={{
              background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.3)',
              padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)'
            }}>
              <Gem size={15} />
              <span>{user.diamonds}</span>
            </div>

            {/* Admin PIN Login Button */}
            {isAdminUnlocked ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button 
                  onClick={() => setActiveTab('admin')} 
                  className={`btn btn-admin btn-sm ${activeTab === 'admin' ? 'active' : ''}`}
                >
                  <ShieldCheck size={16} />
                  <span>Admin Portal</span>
                </button>
                <button 
                  onClick={lockAdmin} 
                  title="Lock Admin Session"
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '0.5rem', color: 'var(--accent-red)' }}
                >
                  <Lock size={15} />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleAdminClick} 
                className="btn btn-admin btn-sm"
              >
                <Unlock size={16} />
                <span>Admin Login (PIN)</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Admin PIN Prompt Modal */}
      <AdminPinModal 
        isOpen={isAdminModalOpen} 
        onClose={() => setIsAdminModalOpen(false)} 
      />
    </>
  );
}
