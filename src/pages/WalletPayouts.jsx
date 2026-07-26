import React, { useState } from 'react';
import { Wallet, DollarSign, Download, ArrowUpRight, CheckCircle2, Clock, ShieldCheck, CreditCard, Gem } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function WalletPayouts() {
  const { user, payouts, requestWithdrawal } = useApp();

  const [payoutMethod, setPayoutMethod] = useState('PayPal');
  const [amountInput, setAmountInput] = useState('');
  const [accountDetails, setAccountDetails] = useState('');
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
      setMessage(`Withdrawal request of $${res.amount.toFixed(2)} (${res.method}) submitted! Ref: ${res.reference}`);
      setAmountInput('');
      setAccountDetails('');
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Wallet & Instant Withdrawals</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          Redeem your earned video ad rewards directly to PayPal, Bank Wire, Crypto USDT, or Free Fire Diamonds!
        </p>
      </div>

      <div className="grid-3" style={{ gridTemplateColumns: '1fr 2fr', marginBottom: '2rem' }}>
        {/* Wallet Balance Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span className="badge badge-success" style={{ marginBottom: '0.5rem' }}>Instant Payout Gateway</span>
            <h3 className="card-title">Available Cash Balance</h3>

            <div style={{ margin: '1.25rem 0' }}>
              <div style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
                ${user.balance.toFixed(2)}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Minimum Withdrawal: <strong>$5.00</strong>
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
                <label className="form-label">Withdrawal Method</label>
                <select 
                  className="form-select"
                  value={payoutMethod}
                  onChange={e => setPayoutMethod(e.target.value)}
                >
                  <option value="PayPal">💳 PayPal Instant Cash</option>
                  <option value="Bank Wire">🏦 Bank Wire Transfer</option>
                  <option value="Crypto USDT">🪙 Crypto Wallet (USDT TRC-20)</option>
                  <option value="Free Fire Diamonds">💎 Free Fire Diamonds Pack</option>
                  <option value="Amazon Gift Card">🎁 Amazon Gift Card Code</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Withdrawal Amount ($ USD)</label>
                <input 
                  type="number"
                  step="0.01"
                  className="form-input"
                  placeholder="Min: $5.00"
                  value={amountInput}
                  onChange={e => setAmountInput(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Payout Destination / Account Info</label>
                <input 
                  type="text"
                  className="form-input"
                  placeholder={payoutMethod === 'PayPal' ? 'user@paypal.com' : payoutMethod === 'Crypto USDT' ? 'TRC20 Wallet Address' : 'Account Details / Player ID'}
                  value={accountDetails}
                  onChange={e => setAccountDetails(e.target.value)}
                  required
                />
              </div>

              <button 
                type="submit"
                className="btn btn-primary" 
                style={{ width: '100%' }}
                disabled={user.balance < 5.00}
              >
                <ArrowUpRight size={16} /> Submit Instant Payout Request
              </button>
            </form>
          </div>
        </div>

        {/* Withdrawal Ledger History */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Download size={18} color="var(--accent-green)" /> Recent Withdrawal Requests Ledger
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
                      No withdrawal requests yet. Watch video ads to earn your first $5.00!
                    </td>
                  </tr>
                ) : (
                  payouts.map(p => (
                    <tr key={p.id}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{p.reference}</td>
                      <td>{p.requestDate}</td>
                      <td>{p.method}</td>
                      <td>{p.details}</td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-green)' }}>${p.amount.toFixed(2)}</td>
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
