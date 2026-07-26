import React, { useState, useEffect } from 'react';
import { Play, CheckCircle2, Award, DollarSign, X, ShieldCheck, Sparkles, Volume2, Flame } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function WatchVideoModal() {
  const { activeWatchingAd, setActiveWatchingAd, claimVideoReward } = useApp();
  const [timeLeft, setTimeLeft] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!activeWatchingAd) return;
    setTimeLeft(activeWatchingAd.durationSeconds);
    setIsCompleted(false);
    setIsPlaying(true);
  }, [activeWatchingAd]);

  useEffect(() => {
    if (!activeWatchingAd || !isPlaying || isCompleted) return;

    if (timeLeft <= 0) {
      setIsCompleted(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isPlaying, isCompleted, activeWatchingAd]);

  if (!activeWatchingAd) return null;

  const totalDuration = activeWatchingAd.durationSeconds;
  const progressPct = Math.min(100, Math.round(((totalDuration - timeLeft) / totalDuration) * 100));

  const handleClaim = () => {
    claimVideoReward(activeWatchingAd.id);
  };

  return (
    <div className="modal-overlay" onClick={() => { if (isCompleted) setActiveWatchingAd(null); }}>
      <div className="modal-content" style={{ maxWidth: '640px', padding: '0', overflow: 'hidden', background: '#0B0F19', border: '1px solid var(--border-color)' }} onClick={e => e.stopPropagation()}>
        {/* Header Bar */}
        <div style={{ padding: '1rem 1.25rem', background: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="badge badge-success"><Flame size={12} /> Watch & Earn</span>
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'white' }}>{activeWatchingAd.title}</span>
          </div>

          <button 
            onClick={() => setActiveWatchingAd(null)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Player Display Container */}
        <div style={{
          height: '320px', background: activeWatchingAd.thumbnailBg || 'linear-gradient(135deg, #1E293B, #0F172A)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '2rem', textAlign: 'center'
        }}>
          {/* Sponsor Tag */}
          <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(0, 0, 0, 0.6)', padding: '0.3rem 0.6rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', color: 'white', backdropFilter: 'blur(4px)' }}>
            Sponsor: <strong>{activeWatchingAd.sponsor}</strong>
          </div>

          {/* Sound Icon */}
          <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0, 0, 0, 0.6)', padding: '0.4rem', borderRadius: '50%', color: 'white' }}>
            <Volume2 size={16} />
          </div>

          {!isCompleted ? (
            <div>
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(8px)', border: '2px solid rgba(255, 255, 255, 0.3)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: '1rem',
                animation: 'pulse 1.5s infinite'
              }}>
                <Play size={36} fill="white" style={{ marginLeft: '4px' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>Watching Ad Video Stream...</h3>
              <p style={{ fontSize: '0.85rem', color: '#D1D5DB', marginTop: '0.25rem' }}>
                Keep watching to unlock <strong>+${activeWatchingAd.rewardAmount.toFixed(2)} Cash Reward</strong>
              </p>

              <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)' }}>
                  {timeLeft}s
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>remaining</span>
              </div>
            </div>
          ) : (
            <div>
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-green-bg)',
                border: '2px solid var(--accent-green)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent-green)', marginBottom: '1rem'
              }}>
                <CheckCircle2 size={44} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>Ad Completed! Reward Ready 🎉</h3>
              <p style={{ fontSize: '0.9rem', color: '#D1D5DB', marginTop: '0.25rem' }}>
                You have successfully completed watching this ad!
              </p>
            </div>
          )}
        </div>

        {/* Video Progress Bar */}
        <div style={{ width: '100%', height: '8px', background: '#1F2937' }}>
          <div style={{ width: `${progressPct}%`, height: '100%', background: isCompleted ? 'var(--accent-green)' : 'var(--primary)', transition: 'width 0.3s ease' }}></div>
        </div>

        {/* Footer Claim Action */}
        <div style={{ padding: '1.25rem', background: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Cash Bounty</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
                +${activeWatchingAd.rewardAmount.toFixed(2)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Coins Bonus</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>
                +{activeWatchingAd.coinsReward} 🪙
              </div>
            </div>
          </div>

          {isCompleted ? (
            <button className="btn btn-primary btn-lg" onClick={handleClaim} style={{ background: 'linear-gradient(135deg, #10B981, #059669)', borderColor: '#10B981' }}>
              <Sparkles size={18} /> Claim +${activeWatchingAd.rewardAmount.toFixed(2)} Now
            </button>
          ) : (
            <button className="btn btn-secondary" disabled style={{ opacity: 0.6 }}>
              Watching... ({timeLeft}s)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
