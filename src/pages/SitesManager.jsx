import React, { useState } from 'react';
import { Globe, Plus, CheckCircle2, Clock, ShieldCheck, AlertCircle, Copy, Check, ExternalLink, Smartphone, Tv } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../i18n/translations';

export default function SitesManager() {
  const { sites, addWebsite, currentCurrency } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('Technology & Gadgets');
  const [siteNameInput, setSiteNameInput] = useState('');
  const [propertyType, setPropertyType] = useState('Website'); // Website, Mobile App, Video Stream
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
    if (propertyType === 'Website' && !formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    const created = addWebsite(formattedUrl, categoryInput, siteNameInput, propertyType);
    setSelectedSiteForVerification(created);
    setUrlInput('');
    setSiteNameInput('');
    setIsAddModalOpen(false);
  };

  const copyVerificationMeta = (siteToken) => {
    const metaTag = `<meta name="admetrics-site-verification" content="admetrics_${siteToken}">`;
    navigator.clipboard.writeText(metaTag);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Monetized Properties (Web, Mobile Apps & Video)</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Connect your websites, iOS/Android mobile apps, and video streams for real-time programmatic ad auctions.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={18} /> Add Monetized Property
        </button>
      </div>

      {/* Domain Verification Card */}
      {selectedSiteForVerification && (
        <div className="card" style={{ marginBottom: '2rem', border: '1px solid var(--primary-glow)', background: 'rgba(17, 24, 39, 0.95)' }}>
          <div className="card-header">
            <div>
              <span className="badge badge-info" style={{ marginBottom: '0.5rem' }}>Ownership Verification Tag</span>
              <h3 className="card-title">Verify Property: {selectedSiteForVerification.name}</h3>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => setSelectedSiteForVerification(null)}>Dismiss</button>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Copy and paste this HTML verification tag into your site's <code>&lt;head&gt;</code> or App manifest:
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
              alert('Property Ownership Verified! Domain scanner completed cleanly.');
              setSelectedSiteForVerification(null);
            }}>
              <ShieldCheck size={14} /> Run Automatic Ownership Scan
            </button>
          </div>
        </div>
      )}

      {/* Properties Grid */}
      <div className="grid-3">
        {sites.map((site) => (
          <div key={site.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', border: '1px solid var(--border-color)'
                }}>
                  {site.type === 'Mobile App' ? <Smartphone size={22} /> : site.type === 'Video Stream' ? <Tv size={22} /> : <Globe size={22} />}
                </div>
                {site.status === 'Approved' ? (
                  <span className="badge badge-success"><CheckCircle2 size={12} /> Approved</span>
                ) : site.status === 'Pending' ? (
                  <span className="badge badge-warning"><Clock size={12} /> Under Review</span>
                ) : (
                  <span className="badge badge-danger"><AlertCircle size={12} /> Action Needed</span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>{site.name}</h3>
                <span className="badge badge-info">{site.type || 'Website'}</span>
              </div>

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
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-green)', fontWeight: 700 }}>
                    {formatCurrency(site.earnings, currentCurrency)}
                  </span>
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
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add Property */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>Submit Property for Monetization</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Connect your web domain, mobile app (App Store / Google Play), or OTT video stream channel.
            </p>

            <form onSubmit={handleAddSubmit}>
              <div className="form-group">
                <label className="form-label">Property Type</label>
                <select 
                  className="form-select"
                  value={propertyType}
                  onChange={e => setPropertyType(e.target.value)}
                >
                  <option value="Website">Website Domain (HTML/JS Ad Tags)</option>
                  <option value="Mobile App">Mobile App (iOS / Android Mobile SDK)</option>
                  <option value="Video Stream">Video / OTT Stream (VAST/VMAP Video Tag)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Property Name / App Title</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="e.g. TechPulse Mobile App"
                  value={siteNameInput}
                  onChange={e => setSiteNameInput(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  {propertyType === 'Mobile App' ? 'App Store Bundle ID / URL' : 'Domain URL'}
                </label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder={propertyType === 'Mobile App' ? 'com.techpulse.app' : 'https://example.com'}
                  value={urlInput}
                  onChange={e => setUrlInput(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Content Category</label>
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
                  Submit Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
