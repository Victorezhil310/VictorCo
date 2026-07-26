import React, { useState } from 'react';
import { FileText, Shield, Lock, Scale, CheckCircle2 } from 'lucide-react';

export default function TermsAndPrivacy() {
  const [activeSubTab, setActiveSubTab] = useState('terms');

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Legal Compliance & Policies</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          Terms of Service, Publisher Program Policies, Privacy Policy, and AdTech Data Processing Agreements.
        </p>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <button 
          className={`tab-btn ${activeSubTab === 'terms' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('terms')}
        >
          <Scale size={16} style={{ display: 'inline', marginRight: '6px' }} />
          Publisher Terms of Service
        </button>
        <button 
          className={`tab-btn ${activeSubTab === 'privacy' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('privacy')}
        >
          <Shield size={16} style={{ display: 'inline', marginRight: '6px' }} />
          Privacy Policy & Cookies
        </button>
        <button 
          className={`tab-btn ${activeSubTab === 'program' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('program')}
        >
          <FileText size={16} style={{ display: 'inline', marginRight: '6px' }} />
          Ad Network Content Guidelines
        </button>
      </div>

      {/* Content Card */}
      <div className="card" style={{ padding: '2rem', lineHeight: '1.7', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        {activeSubTab === 'terms' && (
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
              1. AdMetrics Pro Publisher Terms of Service
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              Last Updated: July 2026. By registering a publisher account, connecting website properties, or embedding AdMetrics Pro ad unit JavaScript tags, you ("Publisher") agree to be bound by these Terms of Service.
            </p>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: '1.25rem 0 0.5rem' }}>
              1.1 Monetization & Account Eligibility
            </h3>
            <p style={{ marginBottom: '1rem' }}>
              Publishers must own or control domain properties submitted for monetization. Submission of fraudulent traffic, automated click generation, or artificially inflated impressions is strictly prohibited and results in immediate account forfeiture.
            </p>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: '1.25rem 0 0.5rem' }}>
              1.2 KYC & Identity Formalities
            </h3>
            <p style={{ marginBottom: '1rem' }}>
              Publishers must complete mandatory KYC (Know Your Customer) and tax identification formalities prior to initiating bank wire withdrawals exceeding $100.
            </p>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: '1.25rem 0 0.5rem' }}>
              1.3 Direct Wire Payouts & Schedules
            </h3>
            <p style={{ marginBottom: '1rem' }}>
              Payments are calculated on a net-30 schedule for verified balances exceeding $100.00. Funds are disbursed via Direct FEDWIRE or SWIFT transfers to the linked bank account provided in the publisher console.
            </p>
          </div>
        )}

        {activeSubTab === 'privacy' && (
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
              2. Privacy Policy & AdTech Cookie Compliance
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              AdMetrics Pro values user data privacy and complies with GDPR, CCPA, and global ad technology privacy frameworks.
            </p>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: '1.25rem 0 0.5rem' }}>
              2.1 Programmatic Data Collection
            </h3>
            <p style={{ marginBottom: '1rem' }}>
              Our ad scripts collect anonymized telemetry including device viewport width, operating system type, IP country code, and impression timing to perform Real-Time Bidding (RTB) auctions.
            </p>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: '1.25rem 0 0.5rem' }}>
              2.2 Encrypted KYC Data Storage
            </h3>
            <p style={{ marginBottom: '1rem' }}>
              Government ID proofs and tax identification documents submitted for compliance formalities are stored using AES-256 encryption and accessible strictly by Master Admin authorization (`20032004`).
            </p>
          </div>
        )}

        {activeSubTab === 'program' && (
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
              3. Publisher Content & Brand Safety Guidelines
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              To maintain high programmatic advertiser CPM rates, connected websites must adhere to strict content standards.
            </p>

            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>No deceptive ad placement designed to trigger accidental clicks.</li>
              <li style={{ marginBottom: '0.5rem' }}>No malware, unauthorized downloads, or adult/prohibited content.</li>
              <li style={{ marginBottom: '0.5rem' }}>Clear disclosure of sponsored ad placements on native feeds.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
