import React, { useState } from 'react';
import { CreditCard, Landmark, DollarSign, Download, ArrowUpRight, CheckCircle2, Clock, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function PaymentsManager() {
  const { bankData, payouts, currentBalance, updateBankDetails, requestPayout } = useApp();
  
  const [bankForm, setBankForm] = useState({
    accountHolder: bankData.accountHolder || '',
    bankName: bankData.bankName || '',
    accountNumber: bankData.accountNumber || '',
    routingNumber: bankData.routingNumber || '',
    swiftCode: bankData.swiftCode || '',
    currency: bankData.currency || 'USD ($)',
    payoutThreshold: bankData.payoutThreshold || 100
  });

  const [payoutAmountInput, setPayoutAmountInput] = useState('');
  const [isEditingBank, setIsEditingBank] = useState(false);
  const [payoutMessage, setPayoutMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleBankSubmit = (e) => {
    e.preventDefault();
    updateBankDetails(bankForm);
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
      const newPay = requestPayout(amt);
      setPayoutMessage(`Payout request of $${newPay.amount.toFixed(2)} submitted successfully! Reference: ${newPay.reference}`);
      setPayoutAmountInput('');
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Bank Accounts & Payout Center</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          Configure direct wire transfer details, set automatic payout thresholds, and initiate bank withdrawals.
        </p>
      </div>

      <div className="grid-3" style={{ gridTemplateColumns: '1fr 2fr', marginBottom: '2rem' }}>
        {/* Available Balance & Quick Withdraw Form */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span className="badge badge-success" style={{ marginBottom: '0.5rem' }}>Direct Bank Wire</span>
            <h3 className="card-title">Available Payout Balance</h3>

            <div style={{ margin: '1.25rem 0' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
                ${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Minimum Payout Threshold: <strong>${bankData.payoutThreshold}.00</strong>
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
                <label className="form-label">Withdrawal Amount ($ USD)</label>
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
                <ArrowUpRight size={16} /> Request Direct Wire Transfer
              </button>
            </form>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
            <ShieldCheck size={14} style={{ display: 'inline', marginRight: '4px' }} />
            Wire Processing Time: 1 Business Day • No Wire Transfer Fees
          </div>
        </div>

        {/* Bank Account Details Card */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">
                <Landmark size={18} color="var(--primary)" /> Linked Bank Account Details
              </h3>
              <p className="card-subtitle">Primary account receiving automated wire payouts</p>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => setIsEditingBank(!isEditingBank)}>
              {isEditingBank ? 'Cancel' : 'Edit Bank Info'}
            </button>
          </div>

          {isEditingBank ? (
            <form onSubmit={handleBankSubmit}>
              <div className="grid-2" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Account Holder Name</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={bankForm.accountHolder}
                    onChange={e => setBankForm({ ...bankForm, accountHolder: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Bank Name</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={bankForm.bankName}
                    onChange={e => setBankForm({ ...bankForm, bankName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid-2" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Account Number / IBAN</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={bankForm.accountNumber}
                    onChange={e => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Routing Number / ABA</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={bankForm.routingNumber}
                    onChange={e => setBankForm({ ...bankForm, routingNumber: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid-2" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">SWIFT / BIC Code</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={bankForm.swiftCode}
                    onChange={e => setBankForm({ ...bankForm, swiftCode: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Minimum Payout Threshold ($)</label>
                  <input 
                    type="number" 
                    className="form-input"
                    value={bankForm.payoutThreshold}
                    onChange={e => setBankForm({ ...bankForm, payoutThreshold: parseInt(e.target.value) || 100 })}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Save Bank Details
              </button>
            </form>
          ) : (
            <div>
              <div className="grid-2" style={{ gap: '1.25rem', margin: '1rem 0' }}>
                <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Account Holder</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>{bankData.accountHolder}</div>
                </div>

                <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Bank Name</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>{bankData.bankName}</div>
                </div>

                <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Account Number / IBAN</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-purple)', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>{bankData.accountNumber}</div>
                </div>

                <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>SWIFT / Routing Code</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>{bankData.swiftCode}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--accent-green)' }}>
                <CheckCircle2 size={16} />
                <span>Verified Direct Wire Bank Account (FEDWIRE / SWIFT Ready)</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Ledger Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <Download size={18} color="var(--accent-green)" /> Wire Transfer Payout Ledger History
          </h3>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Wire Reference #</th>
                <th>Request Date</th>
                <th>Payout Method</th>
                <th>Status</th>
                <th>Amount ($ USD)</th>
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
                      <span className="badge badge-warning"><Clock size={12} /> Wire Processing</span>
                    )}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-green)' }}>
                    ${pay.amount.toFixed(2)}
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
