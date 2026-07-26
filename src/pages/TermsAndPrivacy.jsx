import React from 'react';
import { FileText, Shield, Lock, Scale } from 'lucide-react';

export default function TermsAndPrivacy() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>VictorCo Terms & Anti-Cheat Rules</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          Fair Play Policies, Reward Distribution Rules, and User Privacy Safeguards.
        </p>
      </div>

      <div className="card" style={{ padding: '2rem', lineHeight: '1.7', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
          1. Watch & Earn Reward Terms
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          By participating in the VictorCo Watch & Earn program, users agree to watch sponsored video ads until completion to unlock cash and coin bounties.
        </p>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: '1.25rem 0 0.5rem' }}>
          1.1 Anti-Fraud & Fair Play Policy
        </h3>
        <p style={{ marginBottom: '1rem' }}>
          Automated bot scripts, emulators, auto-clickers, and proxy bypasses are strictly monitored. Accounts violating fair play will forfeit earned balances.
        </p>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: '1.25rem 0 0.5rem' }}>
          1.2 Minimum Withdrawal Threshold
        </h3>
        <p style={{ marginBottom: '1rem' }}>
          Withdrawals via PayPal, Bank Wire, Crypto USDT, or Gift Cards require a minimum accumulated wallet balance of <strong>$5.00</strong>.
        </p>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: '1.25rem 0 0.5rem' }}>
          1.3 Master Admin Gate Authorization
        </h3>
        <p style={{ marginBottom: '1rem' }}>
          Administrative functions and payout approvals are protected under Master PIN authorization (`20032004`).
        </p>
      </div>
    </div>
  );
}
