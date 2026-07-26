import React, { useState } from 'react';
import { 
  TrendingUp, DollarSign, Eye, MousePointer, Globe, ArrowUpRight, 
  CheckCircle2, Clock, PlusCircle, ArrowRight, ShieldCheck, Download, Sparkles, Play, ShieldAlert, CreditCard
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LANGUAGES, formatCurrency } from '../i18n/translations';

export default function PublisherDashboard() {
  const { 
    user, sites, adUnits, totalEarnings, currentBalance, 
    kycData, bankData, setActiveTab, isLiveSimulating, setIsLiveSimulating,
    currentLang, currentCurrency 
  } = useApp();

  const t = LANGUAGES[currentLang] || LANGUAGES.en;

  const [timeRange, setTimeRange] = useState('7d');

  // Daily Chart Data
  const chartData = [
    { day: 'Mon', revenue: totalEarnings > 0 ? (totalEarnings * 0.12) : 0, impressions: 1200 },
    { day: 'Tue', revenue: totalEarnings > 0 ? (totalEarnings * 0.15) : 0, impressions: 1800 },
    { day: 'Wed', revenue: totalEarnings > 0 ? (totalEarnings * 0.18) : 0, impressions: 2100 },
    { day: 'Thu', revenue: totalEarnings > 0 ? (totalEarnings * 0.14) : 0, impressions: 1500 },
    { day: 'Fri', revenue: totalEarnings > 0 ? (totalEarnings * 0.20) : 0, impressions: 2500 },
    { day: 'Sat', revenue: totalEarnings > 0 ? (totalEarnings * 0.22) : 0, impressions: 3100 },
    { day: 'Sun', revenue: totalEarnings > 0 ? (totalEarnings * 0.10) : 0, impressions: 1400 },
  ];

  const maxRevenue = Math.max(...chartData.map(d => d.revenue), 10);

  const totalImpressions = sites.reduce((sum, s) => sum + (s.dailyImpressions || 0), 0);
  const totalClicks = sites.reduce((sum, s) => sum + (s.dailyClicks || 0), 0);
  const avgCpm = sites.length > 0 ? (sites.reduce((sum, s) => sum + (s.cpm || 0), 0) / sites.length) : 0;
  const avgCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';

  // Onboarding Step Progress
  const hasApprovedSite = sites.some(s => s.status === 'Approved');
  const hasKycSubmitted = kycData.status === 'Approved' || kycData.status === 'Pending';
  const hasBankLinked = bankData.accountNumber !== '' || bankData.paypalEmail !== '' || bankData.cryptoWallet !== '';

  const completedStepsCount = (hasApprovedSite ? 1 : 0) + (hasKycSubmitted ? 1 : 0) + (hasBankLinked ? 1 : 0);
  const onboardingPct = Math.round((completedStepsCount / 3) * 100);

  return (
    <div className="dashboard-page">
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.9), rgba(17, 24, 39, 0.95))',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Publisher Monetization Hub
            </span>
            {kycData.status === 'Approved' ? (
              <span className="badge badge-success">
                <ShieldCheck size={12} /> KYC Verified
              </span>
            ) : (
              <span className="badge badge-warning" onClick={() => setActiveTab('kyc')} style={{ cursor: 'pointer' }}>
                <Clock size={12} /> {kycData.status === 'Pending' ? 'KYC Under Review' : 'Setup KYC & Tax'}
              </span>
            )}
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
            Welcome, {user.name}! 🚀
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            {totalEarnings === 0 ? 'Your publisher account is open and ready. Complete onboarding steps to start live ad streaming.' : `Serving programmatic RTB ad impressions across ${sites.filter(s => s.status === 'Approved').length} approved properties.`}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', zIndex: 2 }}>
          {!isLiveSimulating && (
            <button className="btn btn-primary" onClick={() => setIsLiveSimulating(true)}>
              <Play size={16} /> {t.startLiveStream}
            </button>
          )}
          <button className="btn btn-secondary" onClick={() => setActiveTab('sites')}>
            <Globe size={16} /> {t.websites}
          </button>
          <button className="btn btn-primary" onClick={() => setActiveTab('adunits')}>
            <PlusCircle size={16} /> {t.adUnits}
          </button>
        </div>
      </div>

      {/* Onboarding Checklist Card */}
      {onboardingPct < 100 && (
        <div className="card" style={{ marginBottom: '2rem', border: '1px solid rgba(59, 130, 246, 0.4)', background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(30, 41, 59, 0.9))' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <span className="badge badge-info" style={{ marginBottom: '0.4rem' }}>Account Setup Guide</span>
              <h3 className="card-title">Publisher Account Activation Checklist ({onboardingPct}% Complete)</h3>
            </div>
            <div style={{ width: '120px', height: '8px', background: 'var(--bg-main)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${onboardingPct}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.3s ease' }}></div>
            </div>
          </div>

          <div className="grid-3" style={{ gap: '1rem' }}>
            <div style={{
              background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-md)', border: hasApprovedSite ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-color)',
              display: 'flex', alignItems: 'flex-start', gap: '0.75rem'
            }}>
              <div style={{ color: hasApprovedSite ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                {hasApprovedSite ? <CheckCircle2 size={22} /> : <Globe size={22} />}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>1. Connect Domain Website / App</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  {hasApprovedSite ? 'Property connected & approved.' : 'Add your website or mobile app.'}
                </div>
                {!hasApprovedSite && (
                  <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('sites')} style={{ marginTop: '0.6rem' }}>
                    Add Property
                  </button>
                )}
              </div>
            </div>

            <div style={{
              background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-md)', border: hasKycSubmitted ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-color)',
              display: 'flex', alignItems: 'flex-start', gap: '0.75rem'
            }}>
              <div style={{ color: hasKycSubmitted ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                {hasKycSubmitted ? <CheckCircle2 size={22} /> : <ShieldAlert size={22} />}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>2. Complete KYC Formalities</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  {hasKycSubmitted ? 'KYC details submitted.' : 'Upload Gov Photo ID proof & Tax ID.'}
                </div>
                {!hasKycSubmitted && (
                  <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('kyc')} style={{ marginTop: '0.6rem' }}>
                    Submit KYC
                  </button>
                )}
              </div>
            </div>

            <div style={{
              background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-md)', border: hasBankLinked ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-color)',
              display: 'flex', alignItems: 'flex-start', gap: '0.75rem'
            }}>
              <div style={{ color: hasBankLinked ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                {hasBankLinked ? <CheckCircle2 size={22} /> : <CreditCard size={22} />}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>3. Link Payout Method</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  {hasBankLinked ? 'Payout method configured.' : 'Bank Wire, PayPal, Crypto, or Wise.'}
                </div>
                {!hasBankLinked && (
                  <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('payments')} style={{ marginTop: '0.6rem' }}>
                    Setup Payouts
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        {/* Card 1: Total Earnings in Selected Currency */}
        <div className="stat-box">
          <div className="stat-header">
            <span>{t.lifetimeRevenue}</span>
            <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-green)' }}>
              <DollarSign size={20} />
            </div>
          </div>
          <div className="stat-value" style={{ color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
            {formatCurrency(totalEarnings, currentCurrency)}
          </div>
          <div className="stat-change up">
            <TrendingUp size={14} /> Real-time programmatic balance
          </div>
        </div>

        {/* Card 2: Today's Impressions */}
        <div className="stat-box">
          <div className="stat-header">
            <span>{t.dailyImpressions}</span>
            <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: 'var(--primary)' }}>
              <Eye size={20} />
            </div>
          </div>
          <div className="stat-value" style={{ fontFamily: 'var(--font-mono)' }}>
            {totalImpressions.toLocaleString()}
          </div>
          <div className="stat-change up">
            <TrendingUp size={14} /> RTB live auction bids
          </div>
        </div>

        {/* Card 3: Average eCPM */}
        <div className="stat-box">
          <div className="stat-header">
            <span>{t.avgCpm}</span>
            <div className="stat-icon" style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-purple)' }}>
              <Sparkles size={20} />
            </div>
          </div>
          <div className="stat-value" style={{ color: 'var(--accent-purple)', fontFamily: 'var(--font-mono)' }}>
            {formatCurrency(avgCpm, currentCurrency)}
          </div>
          <div className="stat-change up">
            <TrendingUp size={14} /> Global CPM yield price
          </div>
        </div>

        {/* Card 4: Click Through Rate */}
        <div className="stat-box">
          <div className="stat-header">
            <span>{t.ctr}</span>
            <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)' }}>
              <MousePointer size={20} />
            </div>
          </div>
          <div className="stat-value" style={{ color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>
            {avgCtr}%
          </div>
          <div className="stat-change up">
            <TrendingUp size={14} /> {totalClicks.toLocaleString()} total ad clicks
          </div>
        </div>
      </div>

      {/* Main Chart & Side Info Grid */}
      <div className="grid-3" style={{ gridTemplateColumns: '2fr 1fr', marginBottom: '2rem' }}>
        {/* Revenue Analytics Chart */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">
                <TrendingUp size={18} color="var(--primary)" /> Revenue Trends & Earnings Breakdown
              </h3>
              <p className="card-subtitle">Daily programmatic ad payout performance</p>
            </div>
            <div style={{ display: 'flex', gap: '0.35rem', background: 'var(--bg-card)', padding: '0.2rem', borderRadius: 'var(--radius-md)' }}>
              {['7d', '30d', '90d'].map(r => (
                <button 
                  key={r}
                  onClick={() => setTimeRange(r)}
                  style={{
                    border: 'none', background: timeRange === r ? 'var(--primary)' : 'transparent',
                    color: timeRange === r ? 'white' : 'var(--text-secondary)', padding: '0.3rem 0.6rem',
                    borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer'
                  }}
                >
                  {r.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Line & Bar Chart */}
          <div style={{ height: '240px', display: 'flex', alignItems: 'flex-end', gap: '1rem', padding: '1rem 0 0.5rem' }}>
            {chartData.map((d, i) => {
              const heightPct = maxRevenue > 0 ? (d.revenue / maxRevenue) * 180 : 5;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', height: '100%', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
                    {formatCurrency(d.revenue, currentCurrency)}
                  </span>
                  <div style={{
                    width: '100%', maxWidth: '38px', height: `${Math.max(heightPct, 6)}px`,
                    background: 'linear-gradient(180deg, var(--primary), rgba(59, 130, 246, 0.2))',
                    borderRadius: '6px 6px 2px 2px', transition: 'height 0.4s ease',
                    boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)'
                  }}></div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Available Balance Withdrawal Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 className="card-title">Available Payout Balance</h3>
            <p className="card-subtitle">Processed earnings ready for withdrawal</p>
            
            <div style={{ margin: '1.5rem 0' }}>
              <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', letterSpacing: '-1px' }}>
                {formatCurrency(currentBalance, currentCurrency)}
              </span>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Next automatic payout cycle: <strong>21st of this month</strong>
              </p>
            </div>

            <div style={{
              background: 'var(--bg-card)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Minimum Threshold:</span>
                <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>{formatCurrency(100, currentCurrency)}</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'var(--bg-main)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${Math.min((currentBalance / 100) * 100, 100)}%`, height: '100%', background: 'var(--accent-green)' }}></div>
              </div>
            </div>
          </div>

          <button 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            onClick={() => setActiveTab('payments')}
          >
            <span>{t.requestPayout}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Connected Properties Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <Globe size={18} color="var(--accent-cyan)" /> Connected Properties (Web, Apps & Video Streams)
            </h3>
            <p className="card-subtitle">Monetized publisher properties receiving ad bids</p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('sites')}>
            <PlusCircle size={14} /> Add Property
          </button>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Property Domain / App ID</th>
                <th>Type</th>
                <th>Category</th>
                <th>Status</th>
                <th>Daily Impressions</th>
                <th>Current eCPM</th>
                <th>Earned Revenue</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sites.map((site) => (
                <tr key={site.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-card)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', border: '1px solid var(--border-color)'
                      }}>
                        <Globe size={16} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{site.name}</div>
                        <a href={site.url} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
                          {site.url}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-info">{site.type || 'Website'}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{site.category}</span>
                  </td>
                  <td>
                    {site.status === 'Approved' ? (
                      <span className="badge badge-success"><CheckCircle2 size={12} /> Approved</span>
                    ) : site.status === 'Pending' ? (
                      <span className="badge badge-warning"><Clock size={12} /> Under Review</span>
                    ) : (
                      <span className="badge badge-danger">Rejected</span>
                    )}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{site.dailyImpressions.toLocaleString()}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-purple)', fontWeight: 700 }}>
                    {formatCurrency(site.cpm, currentCurrency)}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-green)', fontWeight: 800 }}>
                    {formatCurrency(site.earnings, currentCurrency)}
                  </td>
                  <td>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => setActiveTab('adunits')}
                    >
                      Get Code
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
