import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const AppContext = createContext();

const MASTER_ADMIN_PIN = "20032004";

// Initial Demo User Profile
const INITIAL_USER = {
  id: 'usr_88321',
  name: 'Victor User',
  email: 'victor@dribbble.com',
  balance: 0.00,
  coins: 0,
  diamonds: 0,
  adsWatchedToday: 0,
  streakDays: 1
};

// Initial Video Ads Library (Earn Money By Watching Ads!)
const INITIAL_VIDEO_ADS = [
  {
    id: 'ad_vid_1',
    title: 'AWS Cloud Services - 30s High Reward',
    sponsor: 'Amazon Web Services',
    durationSeconds: 30,
    rewardAmount: 0.75,
    coinsReward: 150,
    diamondsReward: 5,
    category: 'Technology & Cloud',
    thumbnailBg: 'linear-gradient(135deg, #FF9900, #FF5500)',
    videoUrl: 'https://cdn.dribbble.com/uploads/sample_aws.mp4',
    watchCount: 1420
  },
  {
    id: 'ad_vid_2',
    title: 'Stripe Fintech Payments - 15s Quick Earn',
    sponsor: 'Stripe Payments',
    durationSeconds: 15,
    rewardAmount: 0.50,
    coinsReward: 100,
    diamondsReward: 3,
    category: 'Finance & Banking',
    thumbnailBg: 'linear-gradient(135deg, #635BFF, #3225B4)',
    videoUrl: 'https://cdn.dribbble.com/uploads/sample_stripe.mp4',
    watchCount: 3890
  },
  {
    id: 'ad_vid_3',
    title: 'Free Fire Gaming Trailer & Diamonds',
    sponsor: 'Garena Free Fire',
    durationSeconds: 45,
    rewardAmount: 1.20,
    coinsReward: 250,
    diamondsReward: 20,
    category: 'Gaming & Esport',
    thumbnailBg: 'linear-gradient(135deg, #F59E0B, #DC2626)',
    videoUrl: 'https://cdn.dribbble.com/uploads/sample_freefire.mp4',
    watchCount: 9410
  },
  {
    id: 'ad_vid_4',
    title: 'AI Code Assistant - 20s Tech Ad',
    sponsor: 'Google AI Studio',
    durationSeconds: 20,
    rewardAmount: 0.65,
    coinsReward: 130,
    diamondsReward: 4,
    category: 'AI & Developer',
    thumbnailBg: 'linear-gradient(135deg, #10B981, #059669)',
    videoUrl: 'https://cdn.dribbble.com/uploads/sample_ai.mp4',
    watchCount: 2150
  }
];

// Initial Tasks & Bounties
const INITIAL_TASKS = [
  {
    id: 'task_daily',
    title: 'Daily Check-in Bonus',
    desc: 'Log in every day to collect free cash reward.',
    rewardCash: 1.00,
    rewardCoins: 200,
    completed: false
  },
  {
    id: 'task_watch_5',
    title: 'Watch 5 Video Ads Challenge',
    desc: 'Complete watching 5 video ads today.',
    rewardCash: 2.50,
    rewardCoins: 500,
    completed: false,
    progress: 0,
    target: 5
  },
  {
    id: 'task_refer',
    title: 'Invite Friends & Earn Commission',
    desc: 'Get $5.00 for every friend who signs up.',
    rewardCash: 5.00,
    rewardCoins: 1000,
    completed: false
  }
];

const INITIAL_PAYOUTS = [];

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('victorco_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [videoAds, setVideoAds] = useState(() => {
    const saved = localStorage.getItem('victorco_ads');
    return saved ? JSON.parse(saved) : INITIAL_VIDEO_ADS;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('victorco_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [payouts, setPayouts] = useState(() => {
    const saved = localStorage.getItem('victorco_payouts');
    return saved ? JSON.parse(saved) : INITIAL_PAYOUTS;
  });

  const [isAdminUnlocked, setIsAdminUnlocked] = useState(() => {
    return localStorage.getItem('victorco_admin_session') === 'true';
  });

  const [activeTab, setActiveTab] = useState('watch'); // watch, tasks, wallet, leaderboard, terms, admin
  const [activeWatchingAd, setActiveWatchingAd] = useState(null);

  const [liveTicker, setLiveTicker] = useState([
    { id: 1, text: '@Alex withdrew $50.00 via PayPal', time: '2m ago' },
    { id: 2, text: '@Sarah completed Free Fire ad (+ $1.20)', time: '5m ago' },
    { id: 3, text: '@Rahul withdrew 100 Diamonds', time: '12m ago' }
  ]);

  // Sync to LocalStorage
  useEffect(() => { localStorage.setItem('victorco_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('victorco_ads', JSON.stringify(videoAds)); }, [videoAds]);
  useEffect(() => { localStorage.setItem('victorco_tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('victorco_payouts', JSON.stringify(payouts)); }, [payouts]);
  useEffect(() => { localStorage.setItem('victorco_admin_session', isAdminUnlocked ? 'true' : 'false'); }, [isAdminUnlocked]);

  // Master Admin PIN Verification
  const verifyAdminPin = (enteredPin) => {
    if (enteredPin === MASTER_ADMIN_PIN) {
      setIsAdminUnlocked(true);
      setActiveTab('admin');
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      return { success: true };
    }
    return { success: false, message: 'Invalid Master Admin PIN.' };
  };

  const lockAdmin = () => {
    setIsAdminUnlocked(false);
    if (activeTab === 'admin') setActiveTab('watch');
  };

  // Complete Video Watch Reward
  const claimVideoReward = (adId) => {
    const ad = videoAds.find(a => a.id === adId);
    if (!ad) return;

    setUser(prev => {
      const newAdsWatched = prev.adsWatchedToday + 1;
      return {
        ...prev,
        balance: prev.balance + ad.rewardAmount,
        coins: prev.coins + ad.coinsReward,
        diamonds: prev.diamonds + ad.diamondsReward,
        adsWatchedToday: newAdsWatched
      };
    });

    setVideoAds(prev => prev.map(a => a.id === adId ? { ...a, watchCount: a.watchCount + 1 } : a));

    // Update Task Progress
    setTasks(prev => prev.map(t => {
      if (t.id === 'task_watch_5') {
        const newProg = Math.min(t.target, (t.progress || 0) + 1);
        return { ...t, progress: newProg, completed: newProg >= t.target };
      }
      return t;
    }));

    confetti({ particleCount: 80, spread: 70 });
    setActiveWatchingAd(null);
  };

  // Claim Daily Task
  const claimTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.completed) return;

    setUser(prev => ({
      ...prev,
      balance: prev.balance + task.rewardCash,
      coins: prev.coins + task.rewardCoins
    }));

    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: true } : t));
    confetti({ particleCount: 60, spread: 60 });
  };

  // Request Payout / Withdrawal
  const requestWithdrawal = (amount, method, details) => {
    if (amount > user.balance) {
      throw new Error(`Insufficient wallet balance ($${user.balance.toFixed(2)}). Earn more watching ads!`);
    }
    if (amount < 5.00) {
      throw new Error('Minimum withdrawal threshold is $5.00.');
    }

    const newPayout = {
      id: `payout_${Date.now()}`,
      amount: parseFloat(amount),
      method,
      details,
      status: 'Pending',
      requestDate: new Date().toISOString().split('T')[0],
      reference: `VIC-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setPayouts(prev => [newPayout, ...prev]);
    setUser(prev => ({ ...prev, balance: prev.balance - amount }));
    confetti({ particleCount: 70, spread: 70 });
    return newPayout;
  };

  // Admin Actions
  const adminApprovePayout = (payoutId, status) => {
    setPayouts(prev => prev.map(p => p.id === payoutId ? { ...p, status } : p));
    if (status === 'Approved') confetti({ particleCount: 90, spread: 80 });
  };

  const adminAddVideoAd = (adData) => {
    const newAd = {
      id: `ad_vid_${Date.now()}`,
      ...adData,
      watchCount: 0,
      thumbnailBg: 'linear-gradient(135deg, #3B82F6, #8B5CF6)'
    };
    setVideoAds(prev => [newAd, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      user,
      videoAds,
      tasks,
      payouts,
      isAdminUnlocked,
      activeTab,
      setActiveTab,
      activeWatchingAd,
      setActiveWatchingAd,
      liveTicker,
      verifyAdminPin,
      lockAdmin,
      claimVideoReward,
      claimTask,
      requestWithdrawal,
      adminApprovePayout,
      adminAddVideoAd
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
