import React, { useState } from 'react';
import { 
  Zap, Play, Megaphone, Wallet, Trophy, FileText, ShieldCheck, Unlock, Lock, Sparkles, Coins, Gem, RotateCcw, Languages 
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
          <div className="logo-group" onClick={() => setActiveTab('earn')}>
            <div className="logo-icon" style={{ background: 'linear-gradient(135deg, #3B82F6, #10B981)' }}>
              <Zap size={22} fill="white" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="logo-text">VictorMedia</span>
                <span className="logo-badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-green)' }}>NETWORK 🇮🇳</span>
              </div>
              <p style={{ fontSize: '0.65rem', color: 'var(--accent-green)', fontWeight: 700, letterSpacing: '0.3px' }}>
                REAL REWARDED ADVERTISING PLATFORM
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="nav-links">
            <li 
              className={`nav-item ${activeTab === 'earn' ? 'active' : ''}`}
              onClick={() => setActiveTab('earn')}
            >
              <Play size={17} />
              <span>Watch & Earn</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'advertiser' ? 'active' : ''}`}
              onClick={() => setActiveTab('advertiser')}
            >
              <Megaphone size={17} />
              <span>Advertiser Portal</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'wallet' ? 'active' : ''}`}
              onClick={() => setActiveTab('wallet')}
            >
              <Wallet size={17} />
              <span>Wallet & Withdraw</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'terms' ? 'active' : ''}`}
              onClick={() => setActiveTab('terms')}
            >
              <FileText size={17} />
              <span>Terms & Rules</span>
            </li>
          </ul>

          {/* Right Header Actions */}
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

            {/* Reset Button */}
            <button 
              className="btn btn-secondary btn-sm"
              onClick={resetToZeroAccount}
              title="Reset Account to Fresh Clean State"
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

            {/* Admin Control Desk */}
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
