import React, { useState, useRef } from 'react';
import { ShieldCheck, Lock, KeyRound, AlertCircle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AdminPinModal({ isOpen, onClose }) {
  const { verifyAdminPin } = useApp();
  const [pin, setPin] = useState(['', '', '', '', '', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef([]);

  if (!isOpen) return null;

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);
    setErrorMsg('');

    // Auto focus next box
    if (value && index < 7) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim();
    if (/^\d{8}$/.test(pasted)) {
      const digits = pasted.split('');
      setPin(digits);
      inputRefs.current[7]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullPin = pin.join('');
    if (fullPin.length < 8) {
      setErrorMsg('Please enter all 8 security digits.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = verifyAdminPin(fullPin);
      setIsSubmitting(false);
      if (res.success) {
        setPin(['', '', '', '', '', '', '', '']);
        onClose();
      } else {
        setErrorMsg(res.message);
        setPin(['', '', '', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    }, 400);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '440px' }} onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-purple)', marginBottom: '1rem'
          }}>
            <ShieldCheck size={28} />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>Master Admin Gate</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Enter your 8-digit Master Security PIN to unlock full network administration controls.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {errorMsg && (
            <div style={{
              background: 'var(--accent-red-bg)', border: '1px solid rgba(239, 68, 68, 0.3)', color: 'var(--accent-red)',
              padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem'
            }}>
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="pin-grid" onPaste={handlePaste}>
            {pin.map((digit, idx) => (
              <input
                key={idx}
                ref={el => inputRefs.current[idx] = el}
                type="password"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(idx, e.target.value)}
                onKeyDown={e => handleKeyDown(idx, e)}
                className={`pin-digit ${digit ? 'filled' : ''}`}
                style={{ width: '38px', height: '48px', fontSize: '1.2rem' }}
                autoComplete="off"
              />
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-admin" style={{ flex: 1 }} disabled={isSubmitting}>
              {isSubmitting ? 'Authenticating...' : 'Unlock Admin Portal'}
            </button>
          </div>
        </form>

        <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <Lock size={12} style={{ display: 'inline', marginRight: '4px' }} />
          Encrypted Master PIN Gate • Strict Role Access Control
        </div>
      </div>
    </div>
  );
}
