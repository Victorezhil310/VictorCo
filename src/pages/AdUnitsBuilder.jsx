import React, { useState } from 'react';
import { Code2, Plus, Copy, Check, Eye, Layout, Monitor, Smartphone, Sparkles, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AdUnitsBuilder() {
  const { sites, adUnits, createAdUnit } = useApp();
  const [selectedSiteId, setSelectedSiteId] = useState(sites[0]?.id || '');
  const [adName, setAdName] = useState('New Display Leaderboard');
  const [formatType, setFormatType] = useState('Display Banner (728x90)');
  const [copiedId, setCopiedId] = useState(null);
  const [previewTab, setPreviewTab] = useState('728x90');

  const approvedSites = sites.filter(s => s.status === 'Approved');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!selectedSiteId || !adName) return;
    createAdUnit(selectedSiteId, adName, formatType);
    setAdName('');
    alert('Ad Unit created successfully! Copy your script tag below.');
  };

  const copyCode = (id, snippet) => {
    navigator.clipboard.writeText(snippet);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Ad Units & Integration Snippets</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          Design custom ad units, grab async JavaScript code tags, and test live ad rendering in real-time.
        </p>
      </div>

      <div className="grid-3" style={{ gridTemplateColumns: '1fr 2fr' }}>
        {/* Ad Unit Creator Form */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Plus size={18} color="var(--primary)" /> Create Ad Unit
            </h3>
          </div>

          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label className="form-label">Target Approved Website</label>
              <select 
                className="form-select"
                value={selectedSiteId}
                onChange={e => setSelectedSiteId(e.target.value)}
                required
              >
                {approvedSites.length === 0 ? (
                  <option value="">No Approved Sites Yet</option>
                ) : (
                  approvedSites.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.url})</option>
                  ))
                )}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Ad Unit Name</label>
              <input 
                type="text" 
                className="form-input"
                placeholder="e.g. Header Leaderboard Ad"
                value={adName}
                onChange={e => setAdName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Ad Size & Format</label>
              <select 
                className="form-select"
                value={formatType}
                onChange={e => {
                  setFormatType(e.target.value);
                  if (e.target.value.includes('728x90')) setPreviewTab('728x90');
                  else if (e.target.value.includes('300x250')) setPreviewTab('300x250');
                  else if (e.target.value.includes('300x600')) setPreviewTab('300x600');
                  else setPreviewTab('native');
                }}
              >
                <option value="Display Leaderboard (728x90)">Display Leaderboard (728x90)</option>
                <option value="Medium Rectangle (300x250)">Medium Rectangle (300x250)</option>
                <option value="Vertical Skyscraper (300x600)">Vertical Skyscraper (300x600)</option>
                <option value="In-Feed Native Responsive">In-Feed Native Responsive</option>
                <option value="Sticky Footer Mobile (320x50)">Sticky Footer Mobile (320x50)</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '1rem' }}
              disabled={approvedSites.length === 0}
            >
              <Sparkles size={16} /> Create & Generate Script
            </button>
          </form>
        </div>

        {/* Live Ad Emulator Preview */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Eye size={18} color="var(--accent-purple)" /> Interactive Ad Unit Renderer
            </h3>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {['728x90', '300x250', '300x600', 'native'].map(p => (
                <button 
                  key={p}
                  onClick={() => setPreviewTab(p)}
                  className={`tab-btn ${previewTab === p ? 'active' : ''}`}
                  style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Simulated programmatic ad rendering delivered via AdMetrics Pro RTB ad server:
          </p>

          {/* Ad Banners */}
          {previewTab === '728x90' && (
            <div className="ad-emulator" style={{ height: '110px', background: 'linear-gradient(135deg, #1E293B, #0F172A)', border: '1px solid #3B82F6' }}>
              <span className="ad-sponsor-label">Ads by AdMetrics Pro</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', width: '100%', padding: '0 1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800 }}>
                  AWS
                </div>
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white' }}>Build & Scale Cloud Apps with $1,000 Credits</div>
                  <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Join millions of developers deploying scalable infrastructure globally.</div>
                </div>
                <button className="btn btn-primary btn-sm">Start Free</button>
              </div>
            </div>
          )}

          {previewTab === '300x250' && (
            <div className="ad-emulator" style={{ width: '300px', height: '250px', margin: '0 auto', background: 'linear-gradient(135deg, #1F2937, #111827)', border: '1px solid #10B981' }}>
              <span className="ad-sponsor-label">Sponsored</span>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #10B981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.75rem' }}>
                💳
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: 'white', marginBottom: '0.25rem' }}>Stripe Financial Accounts</div>
              <p style={{ fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '1rem', padding: '0 0.5rem' }}>Accept payments online with instant bank transfers and lower fees.</p>
              <button className="btn btn-primary btn-sm" style={{ background: '#10B981', borderColor: '#10B981' }}>Learn More</button>
            </div>
          )}

          {previewTab === '300x600' && (
            <div className="ad-emulator" style={{ width: '300px', height: '360px', margin: '0 auto', background: 'linear-gradient(180deg, #111827, #0B0F19)', border: '1px solid #8B5CF6' }}>
              <span className="ad-sponsor-label">Promoted Content</span>
              <div style={{ width: '100%', height: '140px', background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, marginBottom: '1rem' }}>
                🚀 AI Productivity Engine
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>Automate Your Codebase</div>
              <p style={{ fontSize: '0.8rem', color: '#9CA3AF', marginBottom: '1.25rem' }}>Deploy autonomous AI coding agents directly to your cloud workspace.</p>
              <button className="btn btn-admin btn-sm" style={{ width: '80%' }}>Try Free Trial</button>
            </div>
          )}

          {previewTab === 'native' && (
            <div className="ad-emulator" style={{ background: '#111827', border: '1px solid var(--border-color)', textAlign: 'left', alignItems: 'flex-start', padding: '1rem' }}>
              <span className="ad-sponsor-label">Recommended for you</span>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '8px', background: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📈</div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white' }}>Top 10 High-Yield Dividend Stocks for 2026</div>
                  <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.2rem' }}>Discover passive income strategies evaluated by institutional analysts.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Active Ad Units List */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <div className="card-header">
          <h3 className="card-title">
            <Layers size={18} color="var(--accent-cyan)" /> Active Ad Units & JavaScript Snippets
          </h3>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Ad Unit Name</th>
                <th>Assigned Website</th>
                <th>Format</th>
                <th>Status</th>
                <th>Embed Script Code</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {adUnits.map(unit => (
                <tr key={unit.id}>
                  <td style={{ fontWeight: 700 }}>{unit.name}</td>
                  <td>{unit.siteName}</td>
                  <td>
                    <span className="badge badge-info">{unit.format}</span>
                  </td>
                  <td>
                    <span className="badge badge-success">Active</span>
                  </td>
                  <td style={{ maxWidth: '380px' }}>
                    <div style={{ background: '#090D16', padding: '0.4rem 0.6rem', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#A5B4FC', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {unit.codeSnippet}
                    </div>
                  </td>
                  <td>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => copyCode(unit.id, unit.codeSnippet)}
                    >
                      {copiedId === unit.id ? <Check size={14} color="var(--accent-green)" /> : <Copy size={14} />}
                      <span>{copiedId === unit.id ? 'Copied!' : 'Copy Code'}</span>
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
