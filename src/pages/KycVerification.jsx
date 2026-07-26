import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, FileText, CheckCircle2, Clock, Upload, User, Building, MapPin, CreditCard, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function KycVerification() {
  const { kycData, submitKyc } = useApp();
  const [formData, setFormData] = useState({
    fullName: kycData.fullName || '',
    dateOfBirth: kycData.dateOfBirth || '',
    nationality: kycData.nationality || 'United States',
    idType: kycData.idType || 'Passport',
    idNumber: kycData.idNumber || '',
    taxId: kycData.taxId || '',
    address: kycData.address || '',
    city: kycData.city || '',
    country: kycData.country || 'United States',
  });
  const [fileSelected, setFileSelected] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFileSelected(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitKyc({
      ...formData,
      documentFileName: fileSelected || kycData.documentFileName || 'scanned_government_id.pdf'
    });
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>KYC Identity & Tax Formalities</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          Complete publisher verification formalities required by international ad tech compliance & anti-fraud policies.
        </p>
      </div>

      {/* KYC Status Banner */}
      <div className="card" style={{ marginBottom: '2rem', background: kycData.status === 'Approved' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)', border: kycData.status === 'Approved' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: kycData.status === 'Approved' ? 'var(--accent-green-bg)' : 'var(--accent-amber-bg)',
              color: kycData.status === 'Approved' ? 'var(--accent-green)' : 'var(--accent-amber)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {kycData.status === 'Approved' ? <ShieldCheck size={28} /> : <ShieldAlert size={28} />}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Verification Formalities: {kycData.status}
                </h3>
                {kycData.status === 'Approved' && (
                  <span className="badge badge-success"><CheckCircle2 size={12} /> Verified</span>
                )}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                {kycData.status === 'Approved' 
                  ? `Identity verified on ${kycData.verifiedAt}. Direct wire payout limits are fully unlocked.` 
                  : 'Document submitted for compliance audit. Review takes 1-12 hours.'}
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Compliance Tier</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>Tier 1 Global Publisher</div>
          </div>
        </div>
      </div>

      {isSubmitted && (
        <div style={{
          background: 'var(--accent-green-bg)', border: '1px solid rgba(16, 185, 129, 0.3)', color: 'var(--accent-green)',
          padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem'
        }}>
          <CheckCircle2 size={20} />
          <span>KYC Details & ID Document submitted successfully! Transmitted to Master Admin review desk.</span>
        </div>
      )}

      {/* Form Grid */}
      <div className="grid-3" style={{ gridTemplateColumns: '2fr 1fr' }}>
        {/* Verification Form */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <FileText size={18} color="var(--primary)" /> Publisher Profile & Legal Identity
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid-2" style={{ gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Legal Full Name (Matching ID)</label>
                <input 
                  type="text"
                  name="fullName"
                  className="form-input"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input 
                  type="date"
                  name="dateOfBirth"
                  className="form-input"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid-2" style={{ gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Government ID Type</label>
                <select 
                  name="idType"
                  className="form-select"
                  value={formData.idType}
                  onChange={handleChange}
                >
                  <option value="Passport">International Passport</option>
                  <option value="National ID">National ID Card / SSN Card</option>
                  <option value="Drivers License">Driver's License</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Government ID Number</label>
                <input 
                  type="text"
                  name="idNumber"
                  className="form-input"
                  placeholder="e.g. P984210984"
                  value={formData.idNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Tax Identification Number (TIN / SSN / VAT ID)</label>
              <input 
                type="text"
                name="taxId"
                className="form-input"
                placeholder="e.g. TIN-883-294-110"
                value={formData.taxId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Residential / Business Address</label>
              <input 
                type="text"
                name="address"
                className="form-input"
                placeholder="Street Address, Suite"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid-2" style={{ gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">City</label>
                <input 
                  type="text"
                  name="city"
                  className="form-input"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Country</label>
                <input 
                  type="text"
                  name="country"
                  className="form-input"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Document Upload Box */}
            <div className="form-group">
              <label className="form-label">Upload Government Photo ID Document</label>
              <div style={{
                border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.5rem',
                textAlign: 'center', background: 'var(--bg-card)', cursor: 'pointer'
              }}>
                <Upload size={28} color="var(--primary)" style={{ marginBottom: '0.5rem' }} />
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  {fileSelected ? fileSelected : (kycData.documentFileName || 'Click to select scanned ID file (PDF, JPG, PNG)')}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Max size: 10MB • AES-256 Encrypted Security Storage
                </div>
                <input 
                  type="file" 
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  id="kyc-file-input"
                />
                <label htmlFor="kyc-file-input" className="btn btn-secondary btn-sm" style={{ marginTop: '0.75rem' }}>
                  Browse File
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Submit KYC Formalities
            </button>
          </form>
        </div>

        {/* Security & Verification Guidelines */}
        <div>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3 className="card-title" style={{ marginBottom: '0.75rem' }}>
              <Lock size={16} color="var(--accent-green)" /> Why KYC Formalities?
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              AdMetrics Pro adheres to strict international ad fraud prevention, AML (Anti-Money Laundering), and tax reporting standards (Form W-8BEN / W-9 equivalent).
            </p>
            <ul style={{ paddingLeft: '1.2rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.75rem', lineHeight: '1.6' }}>
              <li>Direct wire transfers above $100 require identity matching.</li>
              <li>Protects your publisher balance against unauthorized claims.</li>
              <li>Ensures fast 24-hour wire processing.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
