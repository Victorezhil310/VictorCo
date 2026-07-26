import React, { useState } from 'react';
import { 
  Zap, Play, CheckSquare, Wallet, Trophy, FileText, ShieldCheck, Unlock, Lock, Sparkles, Coins, Gem, RotateCcw, Languages 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import AdminPinModal from './AdminPinModal';
import { LANGUAGES, CURRENCIES, formatCurrency } from '../i18n/translations';

export default function Navbar() {
  const { 
    user, isAdminUnlocked, activeTab, setActiveTab, lockAdmin, resetToZeroAccount,
    currentLang, setCurrentLang, currentCurrency, setCurrentCurrency
  } = useApp();

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const t = LANGUAGES[currentLang] || LANGUAGES.en;

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
            <div className="logo-icon" style={{ background: 'linear-gradient(135deg, #FF9900, #10B981)' }}>
              <Zap size={22} fill="white" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="logo-text">VictorCo</span>
                <span className="logo-badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-green)' }}>INDIA 🇮🇳</span>
              </div>
              <p style={{ fontSize: '0.65rem', color: 'var(--accent-green)', fontWeight: 700, letterSpacing: '0.3px' }}>
                BEST EARNING APP OF THE YEAR 2026
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
              <span>{t.watch}</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'tasks' ? 'active' : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              <CheckSquare size={17} />
              <span>{t.tasks}</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'wallet' ? 'active' : ''}`}
              onClick={() => setActiveTab('wallet')}
            >
              <Wallet size={17} />
              <span>{t.wallet}</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'leaderboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('leaderboard')}
            >
              <Trophy size={17} />
              <span>{t.leaderboard}</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'terms' ? 'active' : ''}`}
              onClick={() => setActiveTab('terms')}
            >
              <FileText size={17} />
              <span>{t.terms}</span>
            </li>
          </ul>

          {/* Right Header Balance Chips */}
          <div className="nav-actions">
            {/* Currency Selector */}
            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-card)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <select 
                value={currentCurrency} 
                onChange={e => setCurrentCurrency(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: 'var(--accent-green)', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', outline: 'none' }}
              >
                {Object.keys(CURRENCIES).map(currKey => (
                  <option key={currKey} value={currKey} style={{ background: '#1F2937', color: 'white' }}>
                    {CURRENCIES[currKey].symbol} {currKey}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset to Fresh ₹0 Button */}
            <button 
              className="btn btn-secondary btn-sm"
              onClick={resetToZeroAccount}
              title={t.resetAccount}
              style={{ padding: '0.5rem', color: 'var(--text-muted)' }}
            >
              <RotateCcw size={15} />
            </button>

            {/* Cash Balance Chip */}
            <div style={{
              background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)',
              padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.4rem'
            }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
                {formatCurrency(user.balance, currentCurrency)}
              </span>
            </div>

            {/* Coins */}
            <div style={{
              background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)',
              padding: '0.35rem 0.65rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-amber)'
            }}>
              <Coins size={15} />
              <span>{user.coins}</span>
            </div>

            {/* Admin Control Desk (Direct clear button!) */}
            {isAdminUnlocked ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
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
                  style={{ padding: '0.45rem', color: 'var(--accent-red)' }}
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
                <span>Admin Login (PIN 20032004)</span>
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
