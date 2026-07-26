import React, { useState } from 'react';
import { 
  TrendingUp, DollarSign, Eye, MousePointer, Globe, ArrowUpRight, 
  CheckCircle2, Clock, PlusCircle, ArrowRight, ShieldCheck, Download, Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function PublisherDashboard() {
  const { 
    user, sites, adUnits, totalEarnings, currentBalance, 
    kycData, setActiveTab 
  } = useApp();

  const [timeRange, setTimeRange] = useState('7d');

  // Daily Chart Data
  const chartData = [
    { day: 'Mon', revenue: 42.50, impressions: 12400 },
    { day: 'Tue', revenue: 58.20, impressions: 16800 },
    { day: 'Wed', revenue: 76.90, impressions: 21500 },
    { day: 'Thu', revenue: 64.10, impressions: 18200 },
    { day: 'Fri', revenue: 89.40, impressions: 25400 },
    { day: 'Sat', revenue: 112.80, impressions: 31200 },
    { day: 'Sun', revenue: 95.30, impressions: 27800 },
  ];

  const maxRevenue = Math.max(...chartData.map(d => d.revenue));

  const totalImpressions = sites.reduce((sum, s) => sum + (s.dailyImpressions || 0), 0);
  const totalClicks = sites.reduce((sum, s) => sum + (s.dailyClicks || 0), 0);
  const avgCpm = sites.length > 0 ? (sites.reduce((sum, s) => sum + (s.cpm || 0), 0) / sites.length).toFixed(2) : '0.00';
  const avgCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';

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
                <Clock size={12} /> Pending KYC Verification
              </span>
            )}
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
            Welcome back, {user.name}! 🚀
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Your ad inventory is actively serving high-CPM bidding impressions across {sites.filter(s => s.status === 'Approved').length} approved websites.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', zIndex: 2 }}>
          <button className="btn btn-secondary" onClick={() => setActiveTab('sites')}>
            <Globe size={16} /> Manage Websites
          </button>
          <button className="btn btn-primary" onClick={() => setActiveTab('adunits')}>
            <PlusCircle size={16} /> Create Ad Unit
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        {/* Card 1: Total Earnings */}
        <div className="stat-box">
          <div className="stat-header">
            <span>Lifetime Revenue</span>
            <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-green)' }}>
              <DollarSign size={20} />
            </div>
          </div>
          <div className="stat-value" style={{ color: 'var(--accent-green)' }}>
            ${totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="stat-change up">
            <TrendingUp size={14} /> +14.8% vs last month
          </div>
        </div>

        {/* Card 2: Today's Impressions */}
        <div className="stat-box">
          <div className="stat-header">
            <span>Daily Ad Impressions</span>
            <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: 'var(--primary)' }}>
              <Eye size={20} />
            </div>
          </div>
          <div className="stat-value">
            {totalImpressions.toLocaleString()}
          </div>
          <div className="stat-change up">
            <TrendingUp size={14} /> +8.3% real-time fill rate
          </div>
        </div>

        {/* Card 3: Average eCPM */}
        <div className="stat-box">
          <div className="stat-header">
            <span>Average eCPM</span>
            <div className="stat-icon" style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-purple)' }}>
              <Sparkles size={20} />
            </div>
          </div>
          <div className="stat-value" style={{ color: 'var(--accent-purple)' }}>
            ${avgCpm}
          </div>
          <div className="stat-change up">
            <TrendingUp size={14} /> High-demand programmatic RTB
          </div>
        </div>

        {/* Card 4: Click Through Rate */}
        <div className="stat-box">
          <div className="stat-header">
            <span>Click Through Rate (CTR)</span>
            <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)' }}>
              <MousePointer size={20} />
            </div>
          </div>
          <div className="stat-value" style={{ color: 'var(--accent-amber)' }}>
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
              const heightPct = (d.revenue / maxRevenue) * 180;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', height: '100%', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
                    ${d.revenue.toFixed(1)}
                  </span>
                  <div style={{
                    width: '100%', maxWidth: '38px', height: `${heightPct}px`,
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

        {/* Quick Action & Balance Withdrawal Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 className="card-title">Available Payout Balance</h3>
            <p className="card-subtitle">Processed earnings ready for direct bank wire transfer</p>
            
            <div style={{ margin: '1.5rem 0' }}>
              <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-mono)', letterSpacing: '-1px' }}>
                ${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>$100.00</span>
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
            <span>Request Bank Wire Payout</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Connected Websites Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <Globe size={18} color="var(--accent-cyan)" /> Connected Websites & Monetization Status
            </h3>
            <p className="card-subtitle">Active publisher domain properties receiving ad bids</p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('sites')}>
            <PlusCircle size={14} /> Add Website
          </button>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Website Domain</th>
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
                    ${site.cpm.toFixed(2)}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-green)', fontWeight: 800 }}>
                    ${site.earnings.toFixed(2)}
                  </td>
                  <td>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => setActiveTab('adunits')}
                    >
                      Get Ad Code
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
