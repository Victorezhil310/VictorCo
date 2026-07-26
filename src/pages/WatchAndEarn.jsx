import React from 'react';
import { Play, Sparkles, Flame, Coins, Gem, DollarSign, Award, Clock, ArrowUpRight, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import RealGoogleAdSlot from '../components/RealGoogleAdSlot';
import { formatCurrency } from '../i18n/translations';

export default function WatchAndEarn() {
  const { videoAds, setActiveWatchingAd, liveTicker, user, currentCurrency, OFFICIAL_ADSENSE_CLIENT } = useApp();

  return (
    <div>
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(16, 185, 129, 0.2))',
        border: '1px solid rgba(245, 158, 11, 0.4)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem 2rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF9900, #10B981)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
          }}>
            <Sparkles size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Official Google AdSense Publisher: {OFFICIAL_ADSENSE_CLIENT}
            </span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginTop: '0.2rem' }}>
              VictorCo Watch Video Ads & Earn Real Money 🇮🇳
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Today's Ads Watched</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>
              {user.adsWatchedToday} Videos
            </div>
          </div>
        </div>
      </div>

      {/* Official Real Live Google AdSense Banner Slot */}
      <RealGoogleAdSlot 
        adSlot="984210942"
        adFormat="auto"
        style={{ display: 'block', minHeight: '90px' }}
      />

      {/* Live Community Activity Ticker */}
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)',
        padding: '0.65rem 1rem', margin: '1.5rem 0 2rem', display: 'flex', alignItems: 'center', gap: '1rem', overflow: 'hidden'
      }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-green)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
          <Flame size={14} style={{ display: 'inline', marginRight: '4px' }} /> LIVE REWARDS FEED
        </span>
        <div style={{ display: 'flex', gap: '2rem', overflowX: 'auto', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          {liveTicker.map(t => (
            <span key={t.id} style={{ whiteSpace: 'nowrap' }}>
              <strong style={{ color: 'var(--text-main)' }}>{t.text}</strong> ({t.time})
            </span>
          ))}
        </div>
      </div>

      {/* Section Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>Available High-Bounty Video Ads</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Watch full sponsored video ads, complete the watch timer, and collect instant cash & UPI reward bounties!
        </p>
      </div>

      {/* Video Ads Grid */}
      <div className="grid-2" style={{ gap: '1.5rem' }}>
        {videoAds.map(ad => (
          <div key={ad.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0', overflow: 'hidden' }}>
            <div style={{
              height: '160px', background: ad.thumbnailBg || 'linear-gradient(135deg, #1E293B, #0F172A)',
              padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="badge badge-info">{ad.category}</span>
                <span className="badge badge-success" style={{ fontFamily: 'var(--font-mono)' }}>
                  <Clock size={12} /> {ad.durationSeconds}s Watch
                </span>
              </div>

              <div style={{
                width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(8px)', border: '2px solid rgba(255, 255, 255, 0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', margin: '0 auto'
              }}>
                <Play size={24} fill="white" style={{ marginLeft: '3px' }} />
              </div>

              <div style={{ fontSize: '0.75rem', color: '#E5E7EB', fontWeight: 600 }}>
                Sponsor: {ad.sponsor}
              </div>
            </div>

            <div style={{ padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                {ad.title}
              </h3>

              <div style={{ display: 'flex', gap: '1rem', background: 'var(--bg-card)', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Cash Bounty</span>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
                    +{formatCurrency(ad.rewardAmount, currentCurrency)}
                  </div>
                </div>

                <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '1rem' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Coins</span>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>
                    +{ad.coinsReward} 🪙
                  </div>
                </div>

                <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '1rem' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Diamonds</span>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                    +{ad.diamondsReward} 💎
                  </div>
                </div>
              </div>

              <button 
                className="btn btn-primary" 
                style={{ width: '100%', background: 'linear-gradient(135deg, #10B981, #059669)', borderColor: '#10B981' }}
                onClick={() => setActiveWatchingAd(ad)}
              >
                <Play size={16} fill="white" /> Watch Ad Video (+ {formatCurrency(ad.rewardAmount, currentCurrency)})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
