import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const AppContext = createContext();

const MASTER_ADMIN_PIN = "20032004";
const OFFICIAL_ADSENSE_CLIENT = "ca-pub-9747982919206794";

const safeStorageRead = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved);
    return parsed !== null && parsed !== undefined ? parsed : fallback;
  } catch (e) {
    return fallback;
  }
};

// Fresh Indian Publisher Account (Starts clean at ₹0.00!)
const NEW_INDIAN_USER = {
  id: 'pub_9747982919206794',
  name: 'Victor Ezhil',
  email: 'victorezhil310@gmail.com',
  role: 'publisher',
  accountStatus: 'Active',
  joinedDate: new Date().toISOString().split('T')[0],
  balance: 0.00,
  coins: 0,
  diamonds: 0,
  adsWatchedToday: 0
};

// High-Bounty Sponsored Video Ads (INR ₹ Bounties!)
const INITIAL_VIDEO_ADS = [
  {
    id: 'ad_vid_1',
    title: 'Tata Neu & Tech SuperApp - 30s High Reward',
    sponsor: 'Tata Digital India',
    durationSeconds: 30,
    rewardAmount: 15.00,
    coinsReward: 150,
    diamondsReward: 5,
    category: 'Technology & E-Commerce',
    thumbnailBg: 'linear-gradient(135deg, #4F46E5, #9333EA)',
    watchCount: 12500
  },
  {
    id: 'ad_vid_2',
    title: 'Jio 5G Speed & Streaming - 15s Quick Earn',
    sponsor: 'Reliance Jio 5G',
    durationSeconds: 15,
    rewardAmount: 10.00,
    coinsReward: 100,
    diamondsReward: 3,
    category: 'Telecom & Tech',
    thumbnailBg: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
    watchCount: 24800
  },
  {
    id: 'ad_vid_3',
    title: 'Free Fire India Diamond Bonus Ad',
    sponsor: 'Garena Free Fire India',
    durationSeconds: 45,
    rewardAmount: 25.00,
    coinsReward: 300,
    diamondsReward: 25,
    category: 'Gaming & Esports',
    thumbnailBg: 'linear-gradient(135deg, #F59E0B, #DC2626)',
    watchCount: 54100
  },
  {
    id: 'ad_vid_4',
    title: 'Paytm Soundbox & UPI Payments - 20s Ad',
    sponsor: 'Paytm Payments',
    durationSeconds: 20,
    rewardAmount: 12.50,
    coinsReward: 125,
    diamondsReward: 4,
    category: 'Fintech & UPI',
    thumbnailBg: 'linear-gradient(135deg, #0EA5E9, #0284C7)',
    watchCount: 18200
  }
];

const INITIAL_TASKS = [
  {
    id: 'task_daily',
    title: 'Daily Check-in Bonus 🇮🇳',
    desc: 'Log in daily to claim instant ₹10.00 cash bonus.',
    rewardCash: 10.00,
    rewardCoins: 200,
    completed: false
  },
  {
    id: 'task_watch_5',
    title: 'Watch 5 Video Ads Challenge',
    desc: 'Watch 5 video ads to unlock ₹30.00 extra cash reward.',
    rewardCash: 30.00,
    rewardCoins: 500,
    completed: false,
    progress: 0,
    target: 5
  },
  {
    id: 'task_refer',
    title: 'Invite Friends & Earn Commission',
    desc: 'Get ₹50.00 for every friend who joins via your referral link.',
    rewardCash: 50.00,
    rewardCoins: 1000,
    completed: false
  }
];

const INITIAL_PAYOUTS = [];

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => safeStorageRead('victorco_user_v2', NEW_INDIAN_USER));
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(() => localStorage.getItem('admetrics_admin_session') === 'true');
  const [activeTab, setActiveTab] = useState('watch');
  const [activeWatchingAd, setActiveWatchingAd] = useState(null);
  const [isLiveSimulating, setIsLiveSimulating] = useState(true);

  // Multi-Language & Multi-Currency State
  const [currentLang, setCurrentLang] = useState(() => localStorage.getItem('admetrics_lang') || 'en');
  const [currentCurrency, setCurrentCurrency] = useState(() => localStorage.getItem('admetrics_currency') || 'INR');

  const [videoAds, setVideoAds] = useState(() => safeStorageRead('victorco_ads_v2', INITIAL_VIDEO_ADS));
  const [tasks, setTasks] = useState(() => safeStorageRead('victorco_tasks_v2', INITIAL_TASKS));
  const [payouts, setPayouts] = useState(() => safeStorageRead('admetrics_payouts_v2', INITIAL_PAYOUTS));

  const [bankData, setBankData] = useState(() => safeStorageRead('admetrics_bank_v2', {
    payoutMethod: 'UPI / PhonePe / Paytm',
    upiId: 'victor@upi',
    accountHolder: 'Victor Ezhil',
    bankName: 'State Bank of India (SBI)',
    accountNumber: '**** **** 8821',
    ifscCode: 'SBIN0001234',
    paypalEmail: '',
    cryptoWallet: '',
    payoutThreshold: 100
  }));

  const [dailyLog, setDailyLog] = useState(() => safeStorageRead('admetrics_daily_log_v2', {
    Mon: 0.00, Tue: 0.00, Wed: 0.00, Thu: 0.00, Fri: 0.00, Sat: 0.00, Sun: 0.00
  }));

  const [liveTicker, setLiveTicker] = useState([
    { id: 1, text: '@Rahul withdrew ₹500.00 via PhonePe UPI', time: '1m ago' },
    { id: 2, text: '@Priya completed Free Fire Ad (+ ₹25.00)', time: '3m ago' },
    { id: 3, text: '@Ankit withdrew ₹1,000.00 to Paytm Wallet', time: '8m ago' }
  ]);

  // Sync to LocalStorage
  useEffect(() => { try { localStorage.setItem('victorco_user_v2', JSON.stringify(user)); } catch (e) {} }, [user]);
  useEffect(() => { try { localStorage.setItem('victorco_ads_v2', JSON.stringify(videoAds)); } catch (e) {} }, [videoAds]);
  useEffect(() => { try { localStorage.setItem('victorco_tasks_v2', JSON.stringify(tasks)); } catch (e) {} }, [tasks]);
  useEffect(() => { try { localStorage.setItem('admetrics_payouts_v2', JSON.stringify(payouts)); } catch (e) {} }, [payouts]);
  useEffect(() => { try { localStorage.setItem('admetrics_bank_v2', JSON.stringify(bankData)); } catch (e) {} }, [bankData]);
  useEffect(() => { try { localStorage.setItem('admetrics_daily_log_v2', JSON.stringify(dailyLog)); } catch (e) {} }, [dailyLog]);
  useEffect(() => { try { localStorage.setItem('admetrics_lang', currentLang); } catch (e) {} }, [currentLang]);
  useEffect(() => { try { localStorage.setItem('admetrics_currency', currentCurrency); } catch (e) {} }, [currentCurrency]);
  useEffect(() => { try { localStorage.setItem('admetrics_admin_session', isAdminUnlocked ? 'true' : 'false'); } catch (e) {} }, [isAdminUnlocked]);

  // Reset to Clean ₹0.00 Baseline State
  const resetToZeroAccount = () => {
    setUser(NEW_INDIAN_USER);
    setVideoAds(INITIAL_VIDEO_ADS);
    setTasks(INITIAL_TASKS);
    setPayouts(INITIAL_PAYOUTS);
    setDailyLog({ Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 });
    setIsLiveSimulating(true);
    try { localStorage.clear(); } catch (e) {}
    try { confetti({ particleCount: 60, spread: 70 }); } catch (e) {}
  };

  // Watch Video Ad Reward Claim
  const claimVideoReward = (adId) => {
    const ad = videoAds.find(a => a.id === adId);
    if (!ad) return;

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = days[new Date().getDay()];

    setUser(prev => ({
      ...prev,
      balance: (prev.balance || 0) + ad.rewardAmount,
      coins: (prev.coins || 0) + ad.coinsReward,
      diamonds: (prev.diamonds || 0) + ad.diamondsReward,
      adsWatchedToday: (prev.adsWatchedToday || 0) + 1
    }));

    setVideoAds(prev => prev.map(a => a.id === adId ? { ...a, watchCount: a.watchCount + 1 } : a));

    setDailyLog(prev => ({
      ...prev,
      [today]: (prev[today] || 0) + ad.rewardAmount
    }));

    setTasks(prev => prev.map(t => {
      if (t.id === 'task_watch_5') {
        const newProg = Math.min(t.target, (t.progress || 0) + 1);
        return { ...t, progress: newProg, completed: newProg >= t.target };
      }
      return t;
    }));

    try { confetti({ particleCount: 80, spread: 70 }); } catch (e) {}
    setActiveWatchingAd(null);
  };

  // Claim Daily Task
  const claimTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.completed) return;

    setUser(prev => ({
      ...prev,
      balance: (prev.balance || 0) + task.rewardCash,
      coins: (prev.coins || 0) + task.rewardCoins
    }));

    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: true } : t));
    try { confetti({ particleCount: 60, spread: 60 }); } catch (e) {}
  };

  // Instant UPI / Bank Withdrawal Request
  const requestWithdrawal = (amount, method, details) => {
    if (amount > user.balance) {
      throw new Error(`Insufficient wallet balance (₹${user.balance.toFixed(2)}). Watch more ads to earn!`);
    }
    if (amount < 100.00) {
      throw new Error('Minimum withdrawal threshold is ₹100.00.');
    }

    const newPayout = {
      id: `payout_${Date.now()}`,
      amount: parseFloat(amount),
      method: method || 'UPI Transfer',
      details: details || bankData.upiId || 'victor@upi',
      status: 'Pending',
      requestDate: new Date().toISOString().split('T')[0],
      reference: `UPI-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setPayouts(prev => [newPayout, ...prev]);
    setUser(prev => ({ ...prev, balance: prev.balance - amount }));
    try { confetti({ particleCount: 70, spread: 70 }); } catch (e) {}
    return newPayout;
  };

  // Admin PIN Gate Handler
  const verifyAdminPin = (enteredPin) => {
    if (enteredPin === MASTER_ADMIN_PIN) {
      setIsAdminUnlocked(true);
      setActiveTab('admin');
      try { confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } }); } catch (e) {}
      return { success: true };
    }
    return { success: false, message: 'Invalid Master Admin PIN. Access Denied.' };
  };

  const lockAdmin = () => {
    setIsAdminUnlocked(false);
    if (activeTab === 'admin') setActiveTab('watch');
  };

  const adminApprovePayout = (payoutId, status) => {
    setPayouts(prev => prev.map(p => p.id === payoutId ? { ...p, status } : p));
    if (status === 'Approved') try { confetti({ particleCount: 90, spread: 80 }); } catch (e) {}
  };

  const adminAddVideoAd = (adData) => {
    const newAd = {
      id: `ad_vid_${Date.now()}`,
      ...adData,
      watchCount: 0,
      thumbnailBg: 'linear-gradient(135deg, #4F46E5, #9333EA)'
    };
    setVideoAds(prev => [newAd, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      user,
      videoAds,
      tasks,
      payouts,
      bankData,
      setBankData,
      dailyLog,
      isAdminUnlocked,
      activeTab,
      setActiveTab,
      activeWatchingAd,
      setActiveWatchingAd,
      currentLang,
      setCurrentLang,
      currentCurrency,
      setCurrentCurrency,
      liveTicker,
      isLiveSimulating,
      setIsLiveSimulating,
      resetToZeroAccount,
      claimVideoReward,
      claimTask,
      requestWithdrawal,
      verifyAdminPin,
      lockAdmin,
      adminApprovePayout,
      adminAddVideoAd,
      OFFICIAL_ADSENSE_CLIENT
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
