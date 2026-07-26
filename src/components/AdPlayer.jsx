import React, { useState, useEffect } from 'react';
import { Play, CheckCircle2, Award, DollarSign, X, ExternalLink, Volume2, ShieldCheck, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../i18n/translations';

export default function AdPlayer() {
  const { activeAdPlaying, setActiveAdPlaying, recordAdImpression, recordAdClick, currentCurrency } = useApp();
  const [timeLeft, setTimeLeft] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!activeAdPlaying) return;
    setTimeLeft(activeAdPlaying.durationSeconds || 15);
    setIsCompleted(false);
  }, [activeAdPlaying]);

  useEffect(() => {
    if (!activeAdPlaying || isCompleted) return;

    if (timeLeft <= 0) {
      setIsCompleted(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isCompleted, activeAdPlaying]);

  if (!activeAdPlaying) return null;

  const totalDuration = activeAdPlaying.durationSeconds || 15;
  const progressPct = Math.min(100, Math.round(((totalDuration - timeLeft) / totalDuration) * 100));

  const handleClaim = () => {
    recordAdImpression(activeAdPlaying.id);
  };

  const handleAdClick = () => {
    recordAdClick(activeAdPlaying.id);
  };

  return (
    <div className="modal-overlay" onClick={() => { if (isCompleted) setActiveAdPlaying(null); }}>
      <div className="modal-content" style={{ maxWidth: '640px', padding: '0', overflow: 'hidden', background: '#0B0F19', border: '1px solid var(--border-color)' }} onClick={e => e.stopPropagation()}>
        {/* Header Bar */}
        <div style={{ padding: '1rem 1.25rem', background: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="badge badge-success">Sponsored Ad Campaign</span>
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'white' }}>{activeAdPlaying.advertiserName}</span>
          </div>

          <button 
            onClick={() => setActiveAdPlaying(null)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Ad Media Display Container */}
        <div style={{
          height: '320px', background: '#1F2937', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem'
        }}>
          {/* Creative Image / Video Background */}
          {activeAdPlaying.creativeUrl && (
            <img 
              src={activeAdPlaying.creativeUrl} 
              alt={activeAdPlaying.name}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
            />
          )}

          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 20%, rgba(11, 15, 25, 0.95) 100%)' }}></div>

          {/* Ad Headline & Description */}
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'white', marginBottom: '0.3rem' }}>
              {activeAdPlaying.headline || activeAdPlaying.name}
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#D1D5DB', marginBottom: '1rem' }}>
              {activeAdPlaying.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0, 0, 0, 0.6)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <Clock size={14} color="var(--accent-amber)" />
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>
                  {!isCompleted ? `${timeLeft}s remaining` : 'Ad Completed!'}
                </span>
              </div>

              <button className="btn btn-secondary btn-sm" onClick={handleAdClick}>
                <span>Visit Sponsor</span>
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Ad Progress Bar */}
        <div style={{ width: '100%', height: '8px', background: '#1F2937' }}>
          <div style={{ width: `${progressPct}%`, height: '100%', background: isCompleted ? 'var(--accent-green)' : 'var(--primary)', transition: 'width 0.3s ease' }}></div>
        </div>

        {/* Footer Action */}
        <div style={{ padding: '1.25rem', background: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Cash Reward Bounty</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
              +{formatCurrency(activeAdPlaying.userRewardCash, currentCurrency)}
            </div>
          </div>

          {isCompleted ? (
            <button className="btn btn-primary btn-lg" onClick={handleClaim} style={{ background: 'linear-gradient(135deg, #10B981, #059669)', borderColor: '#10B981' }}>
              <Sparkles size={18} /> Claim Reward (+{formatCurrency(activeAdPlaying.userRewardCash, currentCurrency)})
            </button>
          ) : (
            <button className="btn btn-secondary" disabled style={{ opacity: 0.6 }}>
              Watching Ad... ({timeLeft}s)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
