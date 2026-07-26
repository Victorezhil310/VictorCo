import React, { useState } from 'react';
import { Megaphone, Plus, DollarSign, Eye, MousePointer, TrendingUp, CheckCircle2, Upload, Sparkles, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../i18n/translations';

export default function AdvertiserPortal() {
  const { advertiser, campaigns, createCampaign, currentCurrency } = useApp();

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [creativeType, setCreativeType] = useState('video');
  const [creativeUrl, setCreativeUrl] = useState('');
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [targetCpm, setTargetCpm] = useState(25.00);
  const [userRewardCash, setUserRewardCash] = useState(0.50);
  const [durationSeconds, setDurationSeconds] = useState(15);
  const [totalBudget, setTotalBudget] = useState(5000.00);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!name || !headline) return;

    createCampaign({
      name,
      creativeType,
      creativeUrl: creativeUrl || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60',
      headline,
      description,
      targetCpm: parseFloat(targetCpm),
      userRewardCash: parseFloat(userRewardCash),
      durationSeconds: parseInt(durationSeconds),
      totalBudget: parseFloat(totalBudget)
    });

    setName('');
    setHeadline('');
    setDescription('');
    setCreativeUrl('');
    setIsNewModalOpen(false);
    alert('Campaign launched successfully! Live ads serving to users immediately.');
  };

  const totalImpressions = campaigns.reduce((acc, c) => acc + c.impressionsServed, 0);
  const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks, 0);

  return (
    <div>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
        border: '1px solid rgba(59, 130, 246, 0.4)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <span className="badge badge-info" style={{ marginBottom: '0.4rem' }}>Advertiser Self-Serve Portal</span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {advertiser.companyName} Campaign Manager
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Create CPM/CPC ad campaigns, upload real image/video ad creatives, and drive verified engagement.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsNewModalOpen(true)}>
          <Plus size={18} /> Create New Campaign
        </button>
      </div>

      {/* Campaign Stat Cards */}
      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        <div className="stat-box">
          <div className="stat-header">
            <span>Total Campaign Spend</span>
            <DollarSign size={18} color="var(--accent-green)" />
          </div>
          <div className="stat-value" style={{ color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
            {formatCurrency(advertiser.spentTotal, currentCurrency)}
          </div>
          <div className="stat-change up"><TrendingUp size={14} /> Active bidding budget</div>
        </div>

        <div className="stat-box">
          <div className="stat-header">
            <span>Served Impressions</span>
            <Eye size={18} color="var(--primary)" />
          </div>
          <div className="stat-value" style={{ fontFamily: 'var(--font-mono)' }}>
            {totalImpressions.toLocaleString()}
          </div>
          <div className="stat-change up"><TrendingUp size={14} /> Verified user ad views</div>
        </div>

        <div className="stat-box">
          <div className="stat-header">
            <span>Recorded Clicks</span>
            <MousePointer size={18} color="var(--accent-amber)" />
          </div>
          <div className="stat-value" style={{ color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>
            {totalClicks.toLocaleString()}
          </div>
          <div className="stat-change up"><TrendingUp size={14} /> Direct website visits</div>
        </div>
      </div>

      {/* Active Campaigns Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <Megaphone size={18} color="var(--primary)" /> Active Ad Campaigns
          </h3>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Campaign Title</th>
                <th>Format</th>
                <th>Target CPM</th>
                <th>User Reward</th>
                <th>Served Views</th>
                <th>Clicks</th>
                <th>Remaining Budget</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map(c => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 700 }}>{c.name}</td>
                  <td><span className="badge badge-info">{c.creativeType.toUpperCase()}</span></td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{formatCurrency(c.targetCpm, currentCurrency)}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-green)', fontWeight: 700 }}>
                    {formatCurrency(c.userRewardCash, currentCurrency)}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{c.impressionsServed.toLocaleString()}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)' }}>{c.clicks}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800 }}>{formatCurrency(c.remainingBudget, currentCurrency)}</td>
                  <td><span className="badge badge-success"><CheckCircle2 size={12} /> Active</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create Campaign */}
      {isNewModalOpen && (
        <div className="modal-overlay" onClick={() => setIsNewModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>Launch New Ad Campaign</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Set your target CPM rate, upload creative image/video link, and set user watch reward bounty.
            </p>

            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label className="form-label">Campaign Name</label>
                <input type="text" className="form-input" placeholder="e.g. Jio 5G High Speed Promo" value={name} onChange={e => setName(e.target.value)} required />
              </div>

              <div className="grid-2" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Creative Format</label>
                  <select className="form-select" value={creativeType} onChange={e => setCreativeType(e.target.value)}>
                    <option value="video">Video Stream Ad (15s - 30s)</option>
                    <option value="image">Display Banner Creative</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Watch Timer (Seconds)</label>
                  <input type="number" className="form-input" value={durationSeconds} onChange={e => setDurationSeconds(e.target.value)} required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Ad Creative Image / Banner URL</label>
                <input type="text" className="form-input" placeholder="https://..." value={creativeUrl} onChange={e => setCreativeUrl(e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Ad Headline</label>
                <input type="text" className="form-input" placeholder="e.g. Experience True 5G Ultra Speed" value={headline} onChange={e => setHeadline(e.target.value)} required />
              </div>

              <div className="form-group">
                <label className="form-label">Description / Offer Details</label>
                <input type="text" className="form-input" placeholder="e.g. Subscribe today to get 30 days free trial" value={description} onChange={e => setDescription(e.target.value)} />
              </div>

              <div className="grid-3" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Target CPM ({currentCurrency})</label>
                  <input type="number" step="1" className="form-input" value={targetCpm} onChange={e => setTargetCpm(e.target.value)} required />
                </div>

                <div className="form-group">
                  <label className="form-label">User Watch Reward ({currentCurrency})</label>
                  <input type="number" step="0.10" className="form-input" value={userRewardCash} onChange={e => setUserRewardCash(e.target.value)} required />
                </div>

                <div className="form-group">
                  <label className="form-label">Total Budget ({currentCurrency})</label>
                  <input type="number" step="100" className="form-input" value={totalBudget} onChange={e => setTotalBudget(e.target.value)} required />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setIsNewModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Launch Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
