import React, { useState } from 'react';
import { 
  Zap, LayoutDashboard, Globe, Code2, ShieldAlert, CreditCard, 
  ShieldCheck, Lock, Unlock, Bell, User, LogOut, PlusCircle, CheckCircle2, Scale, Play, Pause, RotateCcw, Languages, DollarSign 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import AdminPinModal from './AdminPinModal';
import { LANGUAGES, CURRENCIES, formatCurrency } from '../i18n/translations';

export default function Navbar() {
  const { 
    user, isAdminUnlocked, activeTab, setActiveTab, lockAdmin, 
    currentBalance, kycData, notifications, isLiveSimulating, setIsLiveSimulating, resetToZeroAccount,
    currentLang, setCurrentLang, currentCurrency, setCurrentCurrency
  } = useApp();

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);

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
          <div className="logo-group" onClick={() => setActiveTab('dashboard')}>
            <div className="logo-icon">
              <Zap size={22} fill="white" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="logo-text">AdMetrics</span>
                <span className="logo-badge">PRO</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '1px' }}>
                <span className="pulse-dot" style={{ backgroundColor: isLiveSimulating ? 'var(--accent-green)' : 'var(--accent-amber)' }}></span>
                <p style={{ fontSize: '0.65rem', color: isLiveSimulating ? 'var(--accent-green)' : 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.3px' }}>
                  {isLiveSimulating ? 'REAL-TIME RTB ENGINE ACTIVE' : 'LIVE STREAM READY'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="nav-links">
            <li 
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard size={17} />
              <span>{t.dashboard}</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'sites' ? 'active' : ''}`}
              onClick={() => setActiveTab('sites')}
            >
              <Globe size={17} />
              <span>{t.websites}</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'adunits' ? 'active' : ''}`}
              onClick={() => setActiveTab('adunits')}
            >
              <Code2 size={17} />
              <span>{t.adUnits}</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'kyc' ? 'active' : ''}`}
              onClick={() => setActiveTab('kyc')}
            >
              <ShieldAlert size={17} />
              <span>{t.kyc}</span>
              {kycData.status === 'Approved' ? (
                <CheckCircle2 size={13} color="var(--accent-green)" />
              ) : (
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-amber)' }}></span>
              )}
            </li>
            <li 
              className={`nav-item ${activeTab === 'payments' ? 'active' : ''}`}
              onClick={() => setActiveTab('payments')}
            >
              <CreditCard size={17} />
              <span>{t.payments}</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'terms' ? 'active' : ''}`}
              onClick={() => setActiveTab('terms')}
            >
              <Scale size={17} />
              <span>{t.terms}</span>
            </li>
          </ul>

          {/* Right Header Actions */}
          <div className="nav-actions">
            {/* Language Selector Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', background: 'var(--bg-card)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <Languages size={15} color="var(--primary)" />
              <select 
                value={currentLang} 
                onChange={e => setCurrentLang(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', outline: 'none' }}
              >
                {Object.keys(LANGUAGES).map(langKey => (
                  <option key={langKey} value={langKey} style={{ background: '#1F2937', color: 'white' }}>
                    {LANGUAGES[langKey].flag} {LANGUAGES[langKey].name}
                  </option>
                ))}
              </select>
            </div>

            {/* Currency Selector Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', background: 'var(--bg-card)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
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

            {/* Start Live Stream Button */}
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setIsLiveSimulating(!isLiveSimulating)}
              style={{ color: isLiveSimulating ? 'var(--accent-green)' : 'var(--primary)', borderColor: isLiveSimulating ? 'rgba(16, 185, 129, 0.4)' : 'var(--border-color)' }}
            >
              {isLiveSimulating ? <Pause size={14} /> : <Play size={14} />}
              <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                {isLiveSimulating ? t.pauseStream : t.startLiveStream}
              </span>
            </button>

            {/* Reset to Fresh 0 State Button */}
            <button 
              className="btn btn-secondary btn-sm"
              onClick={resetToZeroAccount}
              title={t.resetAccount}
              style={{ padding: '0.5rem', color: 'var(--text-muted)' }}
            >
              <RotateCcw size={15} />
            </button>

            {/* Unpaid Balance Badge in Selected Currency */}
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-color)',
              padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', alignItems: 'flex-end'
            }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                {t.unpaidBalance}
              </span>
              <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
                {formatCurrency(currentBalance, currentCurrency)}
              </span>
            </div>

            {/* Admin PIN Login Button */}
            {isAdminUnlocked ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button 
                  onClick={() => setActiveTab('admin')} 
                  className={`btn btn-admin btn-sm ${activeTab === 'admin' ? 'active' : ''}`}
                >
                  <ShieldCheck size={16} />
                  <span>{t.admin}</span>
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
