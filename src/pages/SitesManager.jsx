import React, { useState } from 'react';
import { Globe, Plus, CheckCircle2, Clock, ShieldCheck, AlertCircle, Copy, Check, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SitesManager() {
  const { sites, addWebsite } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('Technology & Gadgets');
  const [siteNameInput, setSiteNameInput] = useState('');
  const [selectedSiteForVerification, setSelectedSiteForVerification] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const categories = [
    'Technology & Gadgets',
    'Finance & Crypto',
    'News & Media',
    'Lifestyle & Cooking',
    'Gaming & Esports',
    'Health & Fitness',
    'Entertainment',
    'Education & Careers'
  ];

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!urlInput) return;
    
    let formattedUrl = urlInput.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    const created = addWebsite(formattedUrl, categoryInput, siteNameInput);
    setSelectedSiteForVerification(created);
    setUrlInput('');
    setSiteNameInput('');
    setIsAddModalOpen(false);
  };

  const copyVerificationMeta = (siteToken) => {
    const metaTag = `<meta name="admetrics-site-verification" content="${siteToken || 'admetrics_verify_token_99214'}">`;
    navigator.clipboard.writeText(metaTag);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Websites & Domain Properties</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Connect your websites to verify ownership and enable automated programmatic ad bidding.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={18} /> Add New Website
        </button>
      </div>

      {/* Domain Verification Notice Modal / Card */}
      {selectedSiteForVerification && (
        <div className="card" style={{ marginBottom: '2rem', border: '1px solid var(--primary-glow)', background: 'rgba(17, 24, 39, 0.95)' }}>
          <div className="card-header">
            <div>
              <span className="badge badge-info" style={{ marginBottom: '0.5rem' }}>Ownership Verification Required</span>
              <h3 className="card-title">Verify Domain: {selectedSiteForVerification.name}</h3>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => setSelectedSiteForVerification(null)}>Dismiss</button>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Copy and paste this HTML verification tag into the <code>&lt;head&gt;</code> section of your site to confirm domain authority:
          </p>

          <div className="code-box" style={{ marginBottom: '1rem' }}>
            <code>{`<meta name="admetrics-site-verification" content="admetrics_${selectedSiteForVerification.id}">`}</code>
            <button className="copy-btn" onClick={() => copyVerificationMeta(selectedSiteForVerification.id)}>
              {copiedCode ? <Check size={14} color="var(--accent-green)" /> : <Copy size={14} />}
              <span>{copiedCode ? 'Copied' : 'Copy Tag'}</span>
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-primary btn-sm" onClick={() => {
              alert('Verification scan completed! Domain tag verified. Submitted to Admin for final review.');
              setSelectedSiteForVerification(null);
            }}>
              <ShieldCheck size={14} /> Run Automatic Verification Scan
            </button>
          </div>
        </div>
      )}

      {/* Sites Grid */}
      <div className="grid-3">
        {sites.map((site) => (
          <div key={site.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', border: '1px solid var(--border-color)'
                }}>
                  <Globe size={22} />
                </div>
                {site.status === 'Approved' ? (
                  <span className="badge badge-success"><CheckCircle2 size={12} /> Approved</span>
                ) : site.status === 'Pending' ? (
                  <span className="badge badge-warning"><Clock size={12} /> Under Review</span>
                ) : (
                  <span className="badge badge-danger"><AlertCircle size={12} /> Action Needed</span>
                )}
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>{site.name}</h3>
              <a 
                href={site.url} 
                target="_blank" 
                rel="noreferrer" 
                style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.2rem' }}
              >
                <span>{site.url}</span>
                <ExternalLink size={12} />
              </a>

              <div style={{ margin: '1.25rem 0 1rem', padding: '0.75rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                  <span>Category:</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{site.category}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                  <span>Daily Impressions:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-main)' }}>{site.dailyImpressions.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <span>Monetized Revenue:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-green)', fontWeight: 700 }}>${site.earnings.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <button 
                className="btn btn-secondary btn-sm" 
                style={{ flex: 1 }}
                onClick={() => setSelectedSiteForVerification(site)}
              >
                Verification Tag
              </button>
              <button 
                className="btn btn-primary btn-sm" 
                style={{ flex: 1 }}
                disabled={site.status !== 'Approved'}
              >
                {site.status === 'Approved' ? 'Create Ad Unit' : 'Awaiting Review'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add Website */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>Submit Website for Monetization</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Enter your website domain URL. Our compliance team and automated crawler will verify domain quality and content guidelines.
            </p>

            <form onSubmit={handleAddSubmit}>
              <div className="form-group">
                <label className="form-label">Website Title / Brand Name</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="e.g. TechPulse Daily"
                  value={siteNameInput}
                  onChange={e => setSiteNameInput(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Website Domain URL</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="https://example.com"
                  value={urlInput}
                  onChange={e => setUrlInput(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Primary Content Category</label>
                <select 
                  className="form-select"
                  value={categoryInput}
                  onChange={e => setCategoryInput(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Submit Domain
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
