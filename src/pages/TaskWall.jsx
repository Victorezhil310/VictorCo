import React from 'react';
import { CheckSquare, CheckCircle2, Gift, Users, Award, Sparkles, PlusCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function TaskWall() {
  const { tasks, claimTask } = useApp();

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Task Wall & Rewards Bounties</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          Complete daily tasks, watch video challenges, and invite friends to earn bonus cash rewards!
        </p>
      </div>

      {/* Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {tasks.map(task => (
          <div key={task.id} className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: 'var(--radius-md)', background: task.completed ? 'var(--accent-green-bg)' : 'rgba(59, 130, 246, 0.15)',
                color: task.completed ? 'var(--accent-green)' : 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {task.completed ? <CheckCircle2 size={28} /> : <Gift size={28} />}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>{task.title}</h3>
                  {task.completed && <span className="badge badge-success">Completed</span>}
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{task.desc}</p>
                {task.target && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Progress: <strong>{task.progress || 0} / {task.target} ads watched</strong>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
                  +${task.rewardCash.toFixed(2)}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-amber)', fontWeight: 700 }}>
                  +{task.rewardCoins} 🪙
                </div>
              </div>

              <button 
                className="btn btn-primary"
                disabled={task.completed || (task.target && (task.progress || 0) < task.target)}
                onClick={() => claimTask(task.id)}
              >
                {task.completed ? 'Claimed' : 'Claim Reward'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
