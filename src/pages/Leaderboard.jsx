import React from 'react';
import { Trophy, Award, Flame, Star, ShieldCheck, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Leaderboard() {
  const { user } = useApp();

  const topEarners = [
    { rank: 1, name: 'TextNow Design', country: '🇺🇸 US', totalEarned: 4890.50, adsWatched: 2410, badge: '👑 Master Watcher' },
    { rank: 2, name: 'Natalie Usevych', country: '🇺🇦 UA', totalEarned: 3120.00, adsWatched: 1890, badge: '🔥 Diamond Pro' },
    { rank: 3, name: 'Imran Molla', country: '🇮🇳 IN', totalEarned: 2450.80, adsWatched: 1420, badge: '⭐ Gold Watcher' },
    { rank: 4, name: 'Saad Younis', country: '🇵🇰 PK', totalEarned: 1890.40, adsWatched: 980, badge: '⚡ Silver Watcher' },
    { rank: 5, name: user.name, country: '🇺🇸 US', totalEarned: user.balance, adsWatched: user.adsWatchedToday, badge: '🚀 Active Watcher (You)' },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Global Earners Leaderboard</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          Top Watch & Earn members ranking by total ad rewards claimed and completed payouts.
        </p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <Trophy size={18} color="var(--accent-amber)" /> Top 5 Global Earners Ranking
          </h3>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Member Name</th>
                <th>Country</th>
                <th>Badge Tier</th>
                <th>Total Ads Watched</th>
                <th>Total Earned ($)</th>
              </tr>
            </thead>
            <tbody>
              {topEarners.map(item => (
                <tr key={item.rank} style={{ background: item.name.includes('(You)') ? 'rgba(59, 130, 246, 0.1)' : 'transparent' }}>
                  <td>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      background: item.rank === 1 ? '#F59E0B' : item.rank === 2 ? '#9CA3AF' : item.rank === 3 ? '#B45309' : 'var(--bg-card)',
                      color: 'white', fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      #{item.rank}
                    </div>
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--text-main)' }}>{item.name}</td>
                  <td>{item.country}</td>
                  <td><span className="badge badge-info">{item.badge}</span></td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{item.adsWatched}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-green)' }}>
                    ${item.totalEarned.toFixed(2)}
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
