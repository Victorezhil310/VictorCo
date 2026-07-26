import React, { useState } from 'react';
import { 
  ShieldCheck, CheckCircle2, XCircle, Clock, Globe, FileText, 
  CreditCard, Sliders, AlertTriangle, Lock, UserCheck, DollarSign, Sparkles, LogOut 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AdminPortal() {
  const { 
    isAdminUnlocked, lockAdmin, sites, kycData, payouts, 
    systemSettings, adminApproveSite, adminApproveKyc, 
    adminProcessPayout, setSystemSettings 
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState('sites'); // sites, kyc, payouts, settings
  const [cpmInput, setCpmInput] = useState(systemSettings.defaultCpm);
  const [fillRateInput, setFillRateInput] = useState(systemSettings.networkFillRate);

  if (!isAdminUnlocked) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: '500px', margin: '3rem auto' }}>
        <div style={{
          width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.15)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-red)', marginBottom: '1.25rem'
        }}>
          <Lock size={32} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>Master Admin Area Locked</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0.5rem 0 1.5rem' }}>
          This portal requires Master Security PIN authorization. Click Admin Login above to enter PIN.
        </p>
      </div>
    );
  }

  const pendingSites = sites.filter(s => s.status === 'Pending');
  const pendingPayouts = payouts.filter(p => p.status === 'Pending');

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSystemSettings({
      ...systemSettings,
      defaultCpm: parseFloat(cpmInput) || 4.50,
      networkFillRate: parseFloat(fillRateInput) || 98.5
    });
    alert('Global Network Settings saved!');
  };

  return (
    <div>
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(109, 40, 217, 0.3), rgba(17, 24, 39, 0.95))',
        border: '1px solid rgba(139, 92, 246, 0.4)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem 2rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <ShieldCheck size={28} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>Master Network Admin Portal</h1>
              <span className="badge badge-success">Session Active</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#D8B4FE', marginTop: '0.2rem' }}>
              Master PIN authenticated • Governing site compliance, identity verification, and bank payouts.
            </p>
          </div>
        </div>

        <button className="btn btn-secondary btn-sm" onClick={lockAdmin} style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: 'var(--accent-red)' }}>
          <Lock size={14} /> Exit Admin Session
        </button>
      </div>

      {/* Admin Stat Cards */}
      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        <div className="stat-box">
          <div className="stat-header">
            <span>Pending Domain Audits</span>
            <Globe size={18} color="var(--accent-amber)" />
          </div>
          <div className="stat-value" style={{ color: 'var(--accent-amber)' }}>
            {pendingSites.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Websites awaiting approval</div>
        </div>

        <div className="stat-box">
          <div className="stat-header">
            <span>KYC Compliance Audits</span>
            <FileText size={18} color={kycData.status === 'Pending' ? 'var(--accent-amber)' : 'var(--accent-green)'} />
          </div>
          <div className="stat-value" style={{ color: kycData.status === 'Pending' ? 'var(--accent-amber)' : 'var(--accent-green)' }}>
            {kycData.status === 'Pending' ? 1 : 0}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Identity documents queue</div>
        </div>

        <div className="stat-box">
          <div className="stat-header">
            <span>Pending Bank Payouts</span>
            <CreditCard size={18} color="var(--primary)" />
          </div>
          <div className="stat-value" style={{ color: 'var(--primary)' }}>
            {pendingPayouts.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Wire transfers to release</div>
        </div>

        <div className="stat-box">
          <div className="stat-header">
            <span>Network Floor CPM</span>
            <Sparkles size={18} color="var(--accent-purple)" />
          </div>
          <div className="stat-value" style={{ color: 'var(--accent-purple)' }}>
            ${systemSettings.defaultCpm.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>RTB auction floor price</div>
        </div>
      </div>

      {/* Admin Sub-Tabs */}
      <div className="tabs-container">
        <button 
          className={`tab-btn ${activeAdminTab === 'sites' ? 'active' : ''}`}
          onClick={() => setActiveAdminTab('sites')}
        >
          Domain Approvals ({pendingSites.length})
        </button>
        <button 
          className={`tab-btn ${activeAdminTab === 'kyc' ? 'active' : ''}`}
          onClick={() => setActiveAdminTab('kyc')}
        >
          KYC Compliance Audit {kycData.status === 'Pending' && '🔴'}
        </button>
        <button 
          className={`tab-btn ${activeAdminTab === 'payouts' ? 'active' : ''}`}
          onClick={() => setActiveAdminTab('payouts')}
        >
          Bank Payout Releases ({pendingPayouts.length})
        </button>
        <button 
          className={`tab-btn ${activeAdminTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveAdminTab('settings')}
        >
          Network Controls & Settings
        </button>
      </div>

      {/* TAB 1: SITE APPROVALS */}
      {activeAdminTab === 'sites' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Publisher Domain Approval Desk</h3>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Website Title</th>
                  <th>URL Domain</th>
                  <th>Category</th>
                  <th>Submitted Date</th>
                  <th>Current Status</th>
                  <th>Admin Decision</th>
                </tr>
              </thead>
              <tbody>
                {sites.map(site => (
                  <tr key={site.id}>
                    <td style={{ fontWeight: 700 }}>{site.name}</td>
                    <td>
                      <a href={site.url} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                        {site.url}
                      </a>
                    </td>
                    <td>{site.category}</td>
                    <td>{site.submittedAt || site.verifiedAt || '2026-02-01'}</td>
                    <td>
                      {site.status === 'Approved' ? (
                        <span className="badge badge-success">Approved</span>
                      ) : site.status === 'Pending' ? (
                        <span className="badge badge-warning">Pending Audit</span>
                      ) : (
                        <span className="badge badge-danger">Rejected</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button 
                          className="btn btn-primary btn-sm"
                          style={{ background: 'var(--accent-green)', borderColor: 'var(--accent-green)' }}
                          onClick={() => adminApproveSite(site.id, 'Approved')}
                        >
                          <CheckCircle2 size={14} /> Approve
                        </button>
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => adminApproveSite(site.id, 'Rejected')}
                        >
                          <XCircle size={14} /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: KYC DESK */}
      {activeAdminTab === 'kyc' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Publisher KYC & ID Formalities Review</h3>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
            <div className="grid-2" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Publisher Legal Name</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>{kycData.fullName}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tax ID (TIN / SSN)</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-purple)', fontFamily: 'var(--font-mono)' }}>{kycData.taxId}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID Document Type & No</span>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>{kycData.idType} ({kycData.idNumber})</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Uploaded Document File</span>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--primary)' }}>📄 {kycData.documentFileName || 'id_proof.pdf'}</div>
              </div>
            </div>

            <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Current Status: </span>
                <strong style={{ color: kycData.status === 'Approved' ? 'var(--accent-green)' : 'var(--accent-amber)' }}>{kycData.status}</strong>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  className="btn btn-primary btn-sm"
                  style={{ background: 'var(--accent-green)', borderColor: 'var(--accent-green)' }}
                  onClick={() => adminApproveKyc('Approved')}
                >
                  <CheckCircle2 size={14} /> Approve Identity
                </button>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => adminApproveKyc('Rejected')}
                >
                  <XCircle size={14} /> Reject Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BANK PAYOUTS */}
      {activeAdminTab === 'payouts' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Bank Wire Payout Dispatch Desk</h3>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Request Ref</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Payout Method</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {payouts.map(p => (
                  <tr key={p.id}>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{p.reference}</td>
                    <td>{p.date}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-green)' }}>${p.amount.toFixed(2)}</td>
                    <td>{p.method}</td>
                    <td>
                      {p.status === 'Completed' ? (
                        <span className="badge badge-success">Completed</span>
                      ) : (
                        <span className="badge badge-warning">Pending Wire</span>
                      )}
                    </td>
                    <td>
                      {p.status === 'Pending' ? (
                        <button 
                          className="btn btn-primary btn-sm"
                          style={{ background: 'var(--accent-green)', borderColor: 'var(--accent-green)' }}
                          onClick={() => adminProcessPayout(p.id, 'Completed')}
                        >
                          <CheckCircle2 size={14} /> Mark Wire Sent
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Wire Dispatched</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: SETTINGS */}
      {activeAdminTab === 'settings' && (
        <div className="card" style={{ maxWidth: '600px' }}>
          <div className="card-header">
            <h3 className="card-title">Ad Network Yield & Compliance Rules</h3>
          </div>

          <form onSubmit={handleSaveSettings}>
            <div className="form-group">
              <label className="form-label">Global Network Default Floor CPM ($)</label>
              <input 
                type="number"
                step="0.10"
                className="form-input"
                value={cpmInput}
                onChange={e => setCpmInput(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Programmatic RTB Fill Rate Target (%)</label>
              <input 
                type="number"
                step="0.5"
                className="form-input"
                value={fillRateInput}
                onChange={e => setFillRateInput(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1rem' }}>
              <input 
                type="checkbox"
                id="autoApprove"
                checked={systemSettings.autoApproveSites}
                onChange={e => setSystemSettings({ ...systemSettings, autoApproveSites: e.target.checked })}
                style={{ width: '18px', height: '18px' }}
              />
              <label htmlFor="autoApprove" style={{ fontSize: '0.9rem', color: 'var(--text-main)', cursor: 'pointer' }}>
                Auto-approve newly submitted domain properties
              </label>
            </div>

            <button type="submit" className="btn btn-admin" style={{ width: '100%', marginTop: '1.25rem' }}>
              Save Master Rules
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
