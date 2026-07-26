import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, XCircle, Play, Plus, CreditCard, Lock, Sparkles, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AdminPortal() {
  const { 
    isAdminUnlocked, lockAdmin, videoAds, payouts, adminApprovePayout, adminAddVideoAd 
  } = useApp();

  const [titleInput, setTitleInput] = useState('');
  const [sponsorInput, setSponsorInput] = useState('');
  const [cashRewardInput, setCashRewardInput] = useState(0.75);
  const [durationInput, setDurationInput] = useState(30);

  if (!isAdminUnlocked) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: '500px', margin: '3rem auto' }}>
        <div style={{
          width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.15)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-red)', marginBottom: '1.25rem'
        }}>
          <Lock size={32} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>VictorCo Master Admin Locked</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0.5rem 0 1.5rem' }}>
          This master portal requires Security PIN authorization (`20032004`). Click Admin Login above to unlock.
        </p>
      </div>
    );
  }

  const handleAddAd = (e) => {
    e.preventDefault();
    if (!titleInput || !sponsorInput) return;

    adminAddVideoAd({
      title: titleInput,
      sponsor: sponsorInput,
      rewardAmount: parseFloat(cashRewardInput) || 0.75,
      coinsReward: Math.round(cashRewardInput * 200),
      diamondsReward: 5,
      durationSeconds: parseInt(durationInput) || 30,
      category: 'Sponsored Ads'
    });

    setTitleInput('');
    setSponsorInput('');
    alert('New Sponsored Video Ad added live to the Watch & Earn gallery!');
  };

  const pendingPayouts = payouts.filter(p => p.status === 'Pending');

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
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>VictorCo Master Admin Portal</h1>
              <span className="badge badge-success">Master PIN Active (20032004)</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#D8B4FE', marginTop: '0.2rem' }}>
              Control video ad bounties, review user payouts, and manage reward rates.
            </p>
          </div>
        </div>

        <button className="btn btn-secondary btn-sm" onClick={lockAdmin} style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: 'var(--accent-red)' }}>
          <Lock size={14} /> Exit Admin Session
        </button>
      </div>

      <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Add New Video Ad Form */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Plus size={18} color="var(--primary)" /> Add Sponsored Video Ad Bounty
            </h3>
          </div>

          <form onSubmit={handleAddAd}>
            <div className="form-group">
              <label className="form-label">Ad Title</label>
              <input type="text" className="form-input" placeholder="e.g. Tesla CyberTruck 30s Ad" value={titleInput} onChange={e => setTitleInput(e.target.value)} required />
            </div>

            <div className="form-group">
              <label className="form-label">Sponsor Brand Name</label>
              <input type="text" className="form-input" placeholder="e.g. Tesla Motors" value={sponsorInput} onChange={e => setSponsorInput(e.target.value)} required />
            </div>

            <div className="grid-2" style={{ gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Cash Reward ($ USD)</label>
                <input type="number" step="0.05" className="form-input" value={cashRewardInput} onChange={e => setCashRewardInput(e.target.value)} required />
              </div>

              <div className="form-group">
                <label className="form-label">Watch Duration (Seconds)</label>
                <input type="number" className="form-input" value={durationInput} onChange={e => setDurationInput(e.target.value)} required />
              </div>
            </div>

            <button type="submit" className="btn btn-admin" style={{ width: '100%', marginTop: '1rem' }}>
              Publish Video Ad to Gallery
            </button>
          </form>
        </div>

        {/* Withdrawal Approvals Console */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <CreditCard size={18} color="var(--accent-green)" /> Pending User Withdrawals ({pendingPayouts.length})
            </h3>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Ref #</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Details</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {payouts.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                      No withdrawal requests in queue.
                    </td>
                  </tr>
                ) : (
                  payouts.map(p => (
                    <tr key={p.id}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{p.reference}</td>
                      <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-green)', fontWeight: 800 }}>${p.amount.toFixed(2)}</td>
                      <td>{p.method}</td>
                      <td>{p.details}</td>
                      <td>
                        {p.status === 'Pending' ? (
                          <button 
                            className="btn btn-primary btn-sm"
                            style={{ background: 'var(--accent-green)', borderColor: 'var(--accent-green)' }}
                            onClick={() => adminApprovePayout(p.id, 'Approved')}
                          >
                            <CheckCircle2 size={14} /> Approve Payout
                          </button>
                        ) : (
                          <span className="badge badge-success">Approved</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
