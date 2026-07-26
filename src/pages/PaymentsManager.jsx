import React, { useState } from 'react';
import { CreditCard, Landmark, DollarSign, Download, ArrowUpRight, CheckCircle2, Clock, ShieldCheck, Wallet, Globe2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../i18n/translations';

export default function PaymentsManager() {
  const { bankData, payouts, currentBalance, updateBankDetails, requestPayout, currentCurrency } = useApp();
  
  const [payoutMethod, setPayoutMethod] = useState(bankData.payoutMethod || 'Bank Wire');
  const [bankForm, setBankForm] = useState({
    payoutMethod: bankData.payoutMethod || 'Bank Wire',
    accountHolder: bankData.accountHolder || '',
    bankName: bankData.bankName || '',
    accountNumber: bankData.accountNumber || '',
    routingNumber: bankData.routingNumber || '',
    swiftCode: bankData.swiftCode || '',
    paypalEmail: bankData.paypalEmail || '',
    cryptoWallet: bankData.cryptoWallet || '',
    cryptoNetwork: bankData.cryptoNetwork || 'USDT (TRC-20)',
    currency: bankData.currency || 'USD ($)',
    payoutThreshold: bankData.payoutThreshold || 100
  });

  const [payoutAmountInput, setPayoutAmountInput] = useState('');
  const [isEditingBank, setIsEditingBank] = useState(false);
  const [payoutMessage, setPayoutMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleBankSubmit = (e) => {
    e.preventDefault();
    updateBankDetails({ ...bankForm, payoutMethod });
    setIsEditingBank(false);
  };

  const handleRequestPayout = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setPayoutMessage('');

    try {
      const amt = parseFloat(payoutAmountInput);
      if (isNaN(amt) || amt <= 0) {
        throw new Error('Please enter a valid payout amount.');
      }
      const newPay = requestPayout(amt, payoutMethod);
      setPayoutMessage(`Payout request of ${formatCurrency(newPay.amount, currentCurrency)} submitted successfully! Reference: ${newPay.reference}`);
      setPayoutAmountInput('');
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Multi-Channel Withdrawal & Payout Center</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          Configure direct wire transfers, PayPal, Crypto (USDT/USDC), Wise, or Payoneer for global revenue payouts.
        </p>
      </div>

      <div className="grid-3" style={{ gridTemplateColumns: '1fr 2fr', marginBottom: '2rem' }}>
        {/* Available Balance & Withdrawal Form */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span className="badge badge-success" style={{ marginBottom: '0.5rem' }}>Global Payout Engine</span>
            <h3 className="card-title">Available Payout Balance</h3>

            <div style={{ margin: '1.25rem 0' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
                {formatCurrency(currentBalance, currentCurrency)}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Minimum Threshold: <strong>{formatCurrency(bankData.payoutThreshold, currentCurrency)}</strong>
              </div>
            </div>

            {payoutMessage && (
              <div style={{ background: 'var(--accent-green-bg)', border: '1px solid rgba(16, 185, 129, 0.3)', color: 'var(--accent-green)', padding: '0.65rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', marginBottom: '1rem' }}>
                {payoutMessage}
              </div>
            )}

            {errorMessage && (
              <div style={{ background: 'var(--accent-red-bg)', border: '1px solid rgba(239, 68, 68, 0.3)', color: 'var(--accent-red)', padding: '0.65rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', marginBottom: '1rem' }}>
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleRequestPayout}>
              <div className="form-group">
                <label className="form-label">Select Payout Channel</label>
                <select 
                  className="form-select"
                  value={payoutMethod}
                  onChange={e => setPayoutMethod(e.target.value)}
                >
                  <option value="Bank Wire">🏦 Direct Bank Wire Transfer (FEDWIRE / SWIFT)</option>
                  <option value="PayPal">💳 PayPal Instant Payout</option>
                  <option value="Crypto">🪙 Crypto Wallet (USDT / USDC TRC-20)</option>
                  <option value="Wise">📱 Wise / Revolut Instant Transfer</option>
                  <option value="Payoneer">💳 Payoneer / Stripe Connect</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Withdrawal Amount ({currentCurrency})</label>
                <input 
                  type="number"
                  step="0.01"
                  className="form-input"
                  placeholder={`Max: $${currentBalance.toFixed(2)}`}
                  value={payoutAmountInput}
                  onChange={e => setPayoutAmountInput(e.target.value)}
                  required
                />
              </div>

              <button 
                type="submit"
                className="btn btn-primary" 
                style={{ width: '100%' }}
                disabled={currentBalance < bankData.payoutThreshold}
              >
                <ArrowUpRight size={16} /> Request Withdrawal ({payoutMethod})
              </button>
            </form>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
            <ShieldCheck size={14} style={{ display: 'inline', marginRight: '4px' }} />
            Anti-Fraud Verification Enabled • 0 Payout Processing Fees
          </div>
        </div>

        {/* Payout Details Card */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">
                <Wallet size={18} color="var(--primary)" /> Configured Payout Method Details
              </h3>
              <p className="card-subtitle">Primary account receiving automated publisher earnings</p>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => setIsEditingBank(!isEditingBank)}>
              {isEditingBank ? 'Cancel' : 'Edit Method Info'}
            </button>
          </div>

          {isEditingBank ? (
            <form onSubmit={handleBankSubmit}>
              <div className="form-group">
                <label className="form-label">Payout Channel</label>
                <select 
                  className="form-select"
                  value={payoutMethod}
                  onChange={e => setPayoutMethod(e.target.value)}
                >
                  <option value="Bank Wire">Bank Wire (SWIFT / IBAN)</option>
                  <option value="PayPal">PayPal Payout</option>
                  <option value="Crypto">Crypto Wallet (USDT / USDC)</option>
                  <option value="Wise">Wise / Revolut</option>
                  <option value="Payoneer">Payoneer / Stripe</option>
                </select>
              </div>

              {payoutMethod === 'Bank Wire' && (
                <>
                  <div className="grid-2" style={{ gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Account Holder Name</label>
                      <input type="text" className="form-input" value={bankForm.accountHolder} onChange={e => setBankForm({ ...bankForm, accountHolder: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Bank Name</label>
                      <input type="text" className="form-input" value={bankForm.bankName} onChange={e => setBankForm({ ...bankForm, bankName: e.target.value })} required />
                    </div>
                  </div>
                  <div className="grid-2" style={{ gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Account Number / IBAN</label>
                      <input type="text" className="form-input" value={bankForm.accountNumber} onChange={e => setBankForm({ ...bankForm, accountNumber: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">SWIFT / Routing Code</label>
                      <input type="text" className="form-input" value={bankForm.swiftCode} onChange={e => setBankForm({ ...bankForm, swiftCode: e.target.value })} required />
                    </div>
                  </div>
                </>
              )}

              {payoutMethod === 'PayPal' && (
                <div className="form-group">
                  <label className="form-label">Verified PayPal Email</label>
                  <input type="email" className="form-input" placeholder="publisher@paypal.com" value={bankForm.paypalEmail} onChange={e => setBankForm({ ...bankForm, paypalEmail: e.target.value })} required />
                </div>
              )}

              {payoutMethod === 'Crypto' && (
                <div className="grid-2" style={{ gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Network Protocol</label>
                    <select className="form-select" value={bankForm.cryptoNetwork} onChange={e => setBankForm({ ...bankForm, cryptoNetwork: e.target.value })}>
                      <option value="USDT (TRC-20)">USDT (TRC-20 Tron)</option>
                      <option value="USDC (ERC-20)">USDC (ERC-20 Ethereum)</option>
                      <option value="USDT (BEP-20)">USDT (BEP-20 BSC)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Wallet Address</label>
                    <input type="text" className="form-input" placeholder="T..." value={bankForm.cryptoWallet} onChange={e => setBankForm({ ...bankForm, cryptoWallet: e.target.value })} required />
                  </div>
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Save Payout Channel Details
              </button>
            </form>
          ) : (
            <div>
              <div className="grid-2" style={{ gap: '1.25rem', margin: '1rem 0' }}>
                <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active Channel</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-purple)', marginTop: '0.2rem' }}>{payoutMethod}</div>
                </div>

                <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Minimum Threshold</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
                    {formatCurrency(bankData.payoutThreshold, currentCurrency)}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--accent-green)' }}>
                <CheckCircle2 size={16} />
                <span>Encrypted Payout Gateway Active & Instant Wire Capable</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Ledger Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <Download size={18} color="var(--accent-green)" /> Multi-Channel Withdrawal Ledger History
          </h3>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Reference #</th>
                <th>Request Date</th>
                <th>Channel Method</th>
                <th>Status</th>
                <th>Amount ({currentCurrency})</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map(pay => (
                <tr key={pay.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{pay.reference}</td>
                  <td>{pay.date}</td>
                  <td>{pay.method}</td>
                  <td>
                    {pay.status === 'Completed' ? (
                      <span className="badge badge-success"><CheckCircle2 size={12} /> Completed</span>
                    ) : (
                      <span className="badge badge-warning"><Clock size={12} /> Processing</span>
                    )}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-green)' }}>
                    {formatCurrency(pay.amount, currentCurrency)}
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
