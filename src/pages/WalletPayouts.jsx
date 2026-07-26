import React, { useState } from 'react';
import { Wallet, DollarSign, Download, ArrowUpRight, CheckCircle2, Clock, ShieldCheck, CreditCard, Gem, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../i18n/translations';

export default function WalletPayouts() {
  const { user, payouts, requestWithdrawal, bankData, setBankData, currentCurrency } = useApp();

  const [payoutMethod, setPayoutMethod] = useState(bankData.payoutMethod || 'UPI / PhonePe / Paytm');
  const [amountInput, setAmountInput] = useState('');
  const [accountDetails, setAccountDetails] = useState(bankData.upiId || 'victor@upi');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleWithdraw = (e) => {
    e.preventDefault();
    setMessage('');
    setErrorMsg('');

    try {
      const amt = parseFloat(amountInput);
      if (isNaN(amt) || amt <= 0) throw new Error('Please enter a valid amount.');
      const res = requestWithdrawal(amt, payoutMethod, accountDetails);
      setMessage(`Instant withdrawal request of ${formatCurrency(res.amount, currentCurrency)} (${res.method}) submitted! Ref: ${res.reference}`);
      setAmountInput('');
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Instant Wallet & UPI Withdrawal Gateway</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          Transfer your ad watch earnings instantly to UPI (Google Pay, PhonePe, Paytm), IMPS Bank Transfer, or Crypto!
        </p>
      </div>

      <div className="grid-3" style={{ gridTemplateColumns: '1fr 2fr', marginBottom: '2rem' }}>
        {/* Wallet Balance Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span className="badge badge-success" style={{ marginBottom: '0.5rem' }}>Instant UPI & IMPS Ready</span>
            <h3 className="card-title">Available Cash Balance</h3>

            <div style={{ margin: '1.25rem 0' }}>
              <div style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
                {formatCurrency(user.balance, currentCurrency)}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Minimum Withdrawal: <strong>{formatCurrency(100, currentCurrency)}</strong>
              </div>
            </div>

            {message && (
              <div style={{ background: 'var(--accent-green-bg)', border: '1px solid rgba(16, 185, 129, 0.3)', color: 'var(--accent-green)', padding: '0.65rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', marginBottom: '1rem' }}>
                {message}
              </div>
            )}

            {errorMsg && (
              <div style={{ background: 'var(--accent-red-bg)', border: '1px solid rgba(239, 68, 68, 0.3)', color: 'var(--accent-red)', padding: '0.65rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', marginBottom: '1rem' }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleWithdraw}>
              <div className="form-group">
                <label className="form-label">Select Payout Channel</label>
                <select 
                  className="form-select"
                  value={payoutMethod}
                  onChange={e => {
                    setPayoutMethod(e.target.value);
                    if (e.target.value.includes('UPI')) setAccountDetails('victor@upi');
                    else if (e.target.value.includes('Bank')) setAccountDetails('SBI Account: 3821094821, IFSC: SBIN0001234');
                    else setAccountDetails('victor@paypal.com');
                  }}
                >
                  <option value="UPI / PhonePe / Paytm">📱 Instant UPI / PhonePe / Paytm / GPay</option>
                  <option value="IMPS / NEFT Indian Bank">🏦 IMPS / NEFT Direct Bank Transfer</option>
                  <option value="PayPal">💳 PayPal Global Transfer</option>
                  <option value="Crypto USDT">🪙 Crypto Wallet (USDT TRC-20)</option>
                  <option value="Free Fire Diamonds">💎 Free Fire Diamonds Redeem Code</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Withdrawal Amount ({currentCurrency})</label>
                <input 
                  type="number"
                  step="1"
                  className="form-input"
                  placeholder="Min: 100"
                  value={amountInput}
                  onChange={e => setAmountInput(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">UPI ID / Bank Account Details</label>
                <input 
                  type="text"
                  className="form-input"
                  placeholder="e.g. 9876543210@paytm or victor@okicici"
                  value={accountDetails}
                  onChange={e => setAccountDetails(e.target.value)}
                  required
                />
              </div>

              <button 
                type="submit"
                className="btn btn-primary" 
                style={{ width: '100%' }}
                disabled={user.balance < 100}
              >
                <Send size={16} /> Instant Withdraw to {payoutMethod.split(' ')[0]}
              </button>
            </form>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
            <ShieldCheck size={14} style={{ display: 'inline', marginRight: '4px' }} />
            24x7 Instant Auto-Payout Engine • 0 Withdrawal Fee
          </div>
        </div>

        {/* Withdrawal Ledger History */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Download size={18} color="var(--accent-green)" /> Recent Withdrawal Ledger History
            </h3>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Ref #</th>
                  <th>Date</th>
                  <th>Method</th>
                  <th>Destination</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payouts.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                      No withdrawal requests yet. Watch video ads to earn your first ₹100.00!
                    </td>
                  </tr>
                ) : (
                  payouts.map(p => (
                    <tr key={p.id}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{p.reference}</td>
                      <td>{p.requestDate}</td>
                      <td>{p.method}</td>
                      <td>{p.details}</td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-green)' }}>
                        {formatCurrency(p.amount, currentCurrency)}
                      </td>
                      <td>
                        {p.status === 'Approved' ? (
                          <span className="badge badge-success">Completed</span>
                        ) : (
                          <span className="badge badge-warning">Processing</span>
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
