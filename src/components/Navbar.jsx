import React, { useState } from 'react';
import { 
  Zap, LayoutDashboard, Globe, Code2, ShieldAlert, CreditCard, 
  ShieldCheck, Lock, Unlock, Bell, User, LogOut, PlusCircle, CheckCircle2, Scale 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import AdminPinModal from './AdminPinModal';

export default function Navbar() {
  const { 
    user, isAdminUnlocked, activeTab, setActiveTab, lockAdmin, 
    currentBalance, kycData, notifications 
  } = useApp();

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);

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
              <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.3px' }}>
                AdSense Monetization & Ad Network
              </p>
            </div>
          </div>

          {/* Nav Navigation Links */}
          <ul className="nav-links">
            <li 
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard size={17} />
              <span>Dashboard</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'sites' ? 'active' : ''}`}
              onClick={() => setActiveTab('sites')}
            >
              <Globe size={17} />
              <span>Websites</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'adunits' ? 'active' : ''}`}
              onClick={() => setActiveTab('adunits')}
            >
              <Code2 size={17} />
              <span>Ad Units</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'kyc' ? 'active' : ''}`}
              onClick={() => setActiveTab('kyc')}
            >
              <ShieldAlert size={17} />
              <span>KYC & Tax</span>
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
              <span>Bank & Payouts</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'terms' ? 'active' : ''}`}
              onClick={() => setActiveTab('terms')}
            >
              <Scale size={17} />
              <span>Terms & Policies</span>
            </li>
          </ul>

          {/* Right Header Actions */}
          <div className="nav-actions">
            {/* Balance Badge */}
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-color)',
              padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', alignItems: 'flex-end'
            }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Unpaid Balance
              </span>
              <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
                ${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            {/* Notification Bell */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowNotifs(!showNotifs)}
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.55rem', borderRadius: 'var(--radius-md)' }}
              >
                <Bell size={18} />
                {notifications.some(n => n.unread) && (
                  <span style={{
                    position: 'absolute', top: '2px', right: '2px', width: '8px', height: '8px',
                    borderRadius: '50%', background: 'var(--accent-red)'
                  }} />
                )}
              </button>

              {showNotifs && (
                <div className="card" style={{
                  position: 'absolute', top: '120%', right: 0, width: '320px', padding: '1rem', zIndex: 200,
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.85rem', fontWeight: 700 }}>
                    <span>Notifications</span>
                    <span style={{ color: 'var(--primary)', fontSize: '0.75rem', cursor: 'pointer' }}>Mark all read</span>
                  </div>
                  {notifications.map(n => (
                    <div key={n.id} style={{
                      padding: '0.6rem 0', borderBottom: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--text-secondary)'
                    }}>
                      <div style={{ color: 'var(--text-main)', marginBottom: '0.2rem' }}>{n.text}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{n.time}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Admin Gate Button */}
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

            {/* User Profile Chip */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.35rem 0.6rem',
              background: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)'
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #10B981, #059669)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.85rem'
              }}>
                {user.name.charAt(0)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>{user.name}</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>ID: {user.id}</span>
              </div>
            </div>
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
