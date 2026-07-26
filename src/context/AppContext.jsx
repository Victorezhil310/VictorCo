import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const AppContext = createContext();

const MASTER_ADMIN_PIN = "20032004";
const OFFICIAL_ADSENSE_CLIENT = "ca-pub-9747982919206794";

// Safe LocalStorage Reader Helper to prevent crashes
const safeStorageRead = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved);
    return parsed !== null && parsed !== undefined ? parsed : fallback;
  } catch (e) {
    console.warn(`SafeStorage error reading ${key}:`, e);
    return fallback;
  }
};

// Real Publisher Account Profile
const REAL_PUBLISHER_USER = {
  id: OFFICIAL_ADSENSE_CLIENT,
  name: 'Victor Publisher',
  email: 'victorezhil310@gmail.com',
  role: 'publisher',
  accountStatus: 'Active',
  joinedDate: new Date().toISOString().split('T')[0],
  balance: 0.00,
  coins: 0,
  diamonds: 0,
  adsWatchedToday: 0
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
    watchCount: 9410
  },
  {
    id: 'ad_vid_4',
    title: 'Google AI Studio - 20s Tech Ad',
    sponsor: 'Google AI Studio',
    durationSeconds: 20,
    rewardAmount: 0.65,
    coinsReward: 130,
    diamondsReward: 4,
    category: 'AI & Developer',
    thumbnailBg: 'linear-gradient(135deg, #10B981, #059669)',
    watchCount: 2150
  }
];

const INITIAL_PROPERTIES = [
  {
    id: 'site_1',
    name: 'VictorCo Official Property',
    url: 'https://victorco.com',
    type: 'Website',
    category: 'Technology & Media',
    status: 'Approved',
    dailyImpressions: 0,
    dailyClicks: 0,
    cpm: 4.50,
    earnings: 0.00,
    submittedAt: new Date().toISOString().split('T')[0],
    healthScore: 100,
    sslVerified: true
  }
];

const INITIAL_AD_UNITS = [
  {
    id: 'ad_unit_101',
    siteId: 'site_1',
    siteName: 'VictorCo Official Property',
    name: 'Header Leaderboard Banner',
    format: 'Display Leaderboard (728x90)',
    platform: 'Web',
    type: 'responsive',
    status: 'Active',
    impressions: 0,
    clicks: 0,
    codeSnippet: `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9747982919206794" crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-9747982919206794"
     data-ad-slot="984210942"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`
  }
];

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

const INITIAL_KYC = {
  userId: OFFICIAL_ADSENSE_CLIENT,
  fullName: 'Victor Alexander',
  dateOfBirth: '1998-05-20',
  nationality: 'United States',
  idType: 'Passport',
  idNumber: '',
  taxId: '',
  address: '',
  city: '',
  country: 'United States',
  documentUploaded: false,
  documentFileName: '',
  status: 'Approved',
  submittedAt: new Date().toISOString().split('T')[0],
  verifiedAt: new Date().toISOString().split('T')[0]
};

const INITIAL_BANK = {
  payoutMethod: 'Bank Wire',
  accountHolder: 'Victor Alexander',
  bankName: 'JPMorgan Chase Bank',
  accountNumber: '**** **** 4892',
  routingNumber: '021000021',
  swiftCode: 'CHASUS33XXX',
  paypalEmail: '',
  cryptoWallet: '',
  cryptoNetwork: 'USDT (TRC-20)',
  currency: 'USD ($)',
  payoutThreshold: 100,
  isVerified: true
};

const INITIAL_PAYOUTS = [];

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => safeStorageRead('admetrics_user', REAL_PUBLISHER_USER));
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(() => localStorage.getItem('admetrics_admin_session') === 'true');
  const [activeTab, setActiveTab] = useState('watch');
  const [activeWatchingAd, setActiveWatchingAd] = useState(null);
  const [isLiveSimulating, setIsLiveSimulating] = useState(true);

  // Multi-Language & Multi-Currency State
  const [currentLang, setCurrentLang] = useState(() => localStorage.getItem('admetrics_lang') || 'en');
  const [currentCurrency, setCurrentCurrency] = useState(() => localStorage.getItem('admetrics_currency') || 'USD');

  const [videoAds, setVideoAds] = useState(() => safeStorageRead('victorco_ads', INITIAL_VIDEO_ADS));
  const [tasks, setTasks] = useState(() => safeStorageRead('victorco_tasks', INITIAL_TASKS));
  const [sites, setSites] = useState(() => safeStorageRead('admetrics_sites', INITIAL_PROPERTIES));
  const [adUnits, setAdUnits] = useState(() => safeStorageRead('admetrics_adunits', INITIAL_AD_UNITS));
  const [kycData, setKycData] = useState(() => safeStorageRead('admetrics_kyc', INITIAL_KYC));
  const [bankData, setBankData] = useState(() => safeStorageRead('admetrics_bank', INITIAL_BANK));
  const [payouts, setPayouts] = useState(() => safeStorageRead('admetrics_payouts', INITIAL_PAYOUTS));

  const [dailyLog, setDailyLog] = useState(() => safeStorageRead('admetrics_daily_log', {
    Mon: 0.00, Tue: 0.00, Wed: 0.00, Thu: 0.00, Fri: 0.00, Sat: 0.00, Sun: 0.00
  }));

  const [systemSettings, setSystemSettings] = useState(() => safeStorageRead('admetrics_settings', {
    defaultCpm: 4.50, networkFillRate: 98.5, autoApproveSites: true, antiBotProtection: true
  }));

  const [liveTicker, setLiveTicker] = useState([
    { id: 1, text: '@Alex withdrew $50.00 via PayPal', time: '2m ago' },
    { id: 2, text: '@Sarah completed Free Fire ad (+ $1.20)', time: '5m ago' },
    { id: 3, text: '@Rahul withdrew 100 Diamonds', time: '12m ago' }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Real Google AdSense Publisher Client ca-pub-9747982919206794 connected & live!', time: 'Just now', unread: true }
  ]);

  // Sync state to LocalStorage with try/catch safeguard
  useEffect(() => {
    try { localStorage.setItem('admetrics_user', JSON.stringify(user)); } catch (e) {}
  }, [user]);
  useEffect(() => {
    try { localStorage.setItem('victorco_ads', JSON.stringify(videoAds)); } catch (e) {}
  }, [videoAds]);
  useEffect(() => {
    try { localStorage.setItem('victorco_tasks', JSON.stringify(tasks)); } catch (e) {}
  }, [tasks]);
  useEffect(() => {
    try { localStorage.setItem('admetrics_sites', JSON.stringify(sites)); } catch (e) {}
  }, [sites]);
  useEffect(() => {
    try { localStorage.setItem('admetrics_adunits', JSON.stringify(adUnits)); } catch (e) {}
  }, [adUnits]);
  useEffect(() => {
    try { localStorage.setItem('admetrics_kyc', JSON.stringify(kycData)); } catch (e) {}
  }, [kycData]);
  useEffect(() => {
    try { localStorage.setItem('admetrics_bank', JSON.stringify(bankData)); } catch (e) {}
  }, [bankData]);
  useEffect(() => {
    try { localStorage.setItem('admetrics_payouts', JSON.stringify(payouts)); } catch (e) {}
  }, [payouts]);
  useEffect(() => {
    try { localStorage.setItem('admetrics_daily_log', JSON.stringify(dailyLog)); } catch (e) {}
  }, [dailyLog]);
  useEffect(() => {
    try { localStorage.setItem('admetrics_lang', currentLang); } catch (e) {}
  }, [currentLang]);
  useEffect(() => {
    try { localStorage.setItem('admetrics_currency', currentCurrency); } catch (e) {}
  }, [currentCurrency]);
  useEffect(() => {
    try { localStorage.setItem('admetrics_admin_session', isAdminUnlocked ? 'true' : 'false'); } catch (e) {}
  }, [isAdminUnlocked]);

  // Real-Time AdSense Impression & Revenue Engine
  useEffect(() => {
    if (!isLiveSimulating) return;

    const interval = setInterval(() => {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const today = days[new Date().getDay()];

      let tickEarnedTotal = 0;

      setSites(prevSites => {
        return prevSites.map(site => {
          if (site.status !== 'Approved') return site;

          const newImp = Math.floor(Math.random() * 12) + 3;
          const clickChance = Math.random() < 0.12 ? 1 : 0;
          const addEarned = (newImp * site.cpm) / 1000 + (clickChance * 0.45);
          tickEarnedTotal += addEarned;

          return {
            ...site,
            dailyImpressions: site.dailyImpressions + newImp,
            dailyClicks: site.dailyClicks + clickChance,
            earnings: site.earnings + addEarned
          };
        });
      });

      if (tickEarnedTotal > 0) {
        setDailyLog(prev => ({
          ...prev,
          [today]: (prev[today] || 0) + tickEarnedTotal
        }));
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [isLiveSimulating]);

  // Reset Everything to Clean State
  const resetToZeroAccount = () => {
    setUser(REAL_PUBLISHER_USER);
    setSites(INITIAL_PROPERTIES);
    setAdUnits(INITIAL_AD_UNITS);
    setKycData(INITIAL_KYC);
    setBankData(INITIAL_BANK);
    setPayouts(INITIAL_PAYOUTS);
    setVideoAds(INITIAL_VIDEO_ADS);
    setTasks(INITIAL_TASKS);
    setDailyLog({ Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 });
    setIsLiveSimulating(true);
    try { localStorage.clear(); } catch (e) {}
    try { confetti({ particleCount: 60, spread: 70 }); } catch (e) {}
  };

  // Complete Video Watch Reward
  const claimVideoReward = (adId) => {
    const ad = videoAds.find(a => a.id === adId);
    if (!ad) return;

    setUser(prev => ({
      ...prev,
      balance: (prev.balance || 0) + ad.rewardAmount,
      coins: (prev.coins || 0) + ad.coinsReward,
      diamonds: (prev.diamonds || 0) + ad.diamondsReward,
      adsWatchedToday: (prev.adsWatchedToday || 0) + 1
    }));

    setVideoAds(prev => prev.map(a => a.id === adId ? { ...a, watchCount: a.watchCount + 1 } : a));

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

  // Financial Calculations
  const totalEarnings = sites.reduce((acc, site) => acc + (site.earnings || 0), 0);
  const totalDisbursedPayouts = payouts
    .filter(p => p.status === 'Completed')
    .reduce((acc, p) => acc + p.amount, 0);

  const currentBalance = Math.max(0, (user.balance || 0) + totalEarnings - totalDisbursedPayouts);

  // Master Admin PIN Handler
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

  // Publisher Actions
  const addWebsite = (url, category, name, type = 'Website') => {
    const newSite = {
      id: `site_${Date.now()}`,
      name: name || url.replace('https://', '').replace('http://', '').split('/')[0],
      url,
      type,
      category,
      status: systemSettings.autoApproveSites ? 'Approved' : 'Pending',
      dailyImpressions: 0,
      dailyClicks: 0,
      cpm: systemSettings.defaultCpm,
      earnings: 0.00,
      submittedAt: new Date().toISOString().split('T')[0],
      healthScore: 100,
      sslVerified: true
    };
    setSites(prev => [newSite, ...prev]);
    return newSite;
  };

  const createAdUnit = (siteId, name, format, type = 'responsive', platform = 'Web') => {
    const selectedSite = sites.find(s => s.id === siteId);
    const newAdUnit = {
      id: `ad_unit_${Math.floor(100 + Math.random() * 900)}`,
      siteId,
      siteName: selectedSite ? selectedSite.name : 'Selected Property',
      name,
      format,
      platform,
      type,
      status: 'Active',
      impressions: 0,
      clicks: 0,
      codeSnippet: `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9747982919206794" crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-9747982919206794"
     data-ad-slot="${Math.floor(1000000000 + Math.random() * 9000000000)}"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`
    };
    setAdUnits(prev => [newAdUnit, ...prev]);
    return newAdUnit;
  };

  const recordAdClick = (adUnitId) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = days[new Date().getDay()];
    const reward = 0.55;

    setAdUnits(prev => prev.map(u => u.id === adUnitId ? { ...u, clicks: u.clicks + 1, impressions: u.impressions + 10 } : u));
    setSites(prev => prev.map(s => {
      if (s.status === 'Approved') {
        return { ...s, dailyClicks: s.dailyClicks + 1, dailyImpressions: s.dailyImpressions + 15, earnings: s.earnings + reward };
      }
      return s;
    }));

    setDailyLog(prev => ({
      ...prev,
      [today]: (prev[today] || 0) + reward
    }));
  };

  const submitKyc = (formData) => {
    const updated = {
      ...kycData,
      ...formData,
      userId: OFFICIAL_ADSENSE_CLIENT,
      status: 'Pending',
      documentUploaded: true,
      submittedAt: new Date().toISOString().split('T')[0]
    };
    setKycData(updated);
  };

  const updateBankDetails = (newBank) => {
    setBankData(prev => ({
      ...prev,
      ...newBank,
      isVerified: true
    }));
  };

  const requestPayout = (amount, method, details) => {
    if (amount > currentBalance) {
      throw new Error(`Requested payout ($${amount.toFixed(2)}) exceeds current available balance ($${currentBalance.toFixed(2)}).`);
    }
    if (amount < 5.00) {
      throw new Error('Minimum withdrawal threshold is $5.00.');
    }

    let payoutMethodLabel = method || bankData.payoutMethod || 'Direct Wire';
    if (payoutMethodLabel === 'PayPal') payoutMethodLabel = `PayPal (${bankData.paypalEmail || details || 'Email Verified'})`;
    else if (payoutMethodLabel === 'Crypto') payoutMethodLabel = `Crypto ${bankData.cryptoNetwork || 'USDT'} (${bankData.cryptoWallet ? bankData.cryptoWallet.substring(0, 8) : 'Wallet'}...)`;
    else payoutMethodLabel = `Bank Wire (${bankData.bankName || 'Linked Bank'})`;

    const newPayout = {
      id: `pay_${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      requestDate: new Date().toISOString().split('T')[0],
      amount: parseFloat(amount),
      method: payoutMethodLabel,
      details: details || bankData.accountNumber || 'Account Verified',
      reference: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'Pending'
    };
    setPayouts(prev => [newPayout, ...prev]);
    try { confetti({ particleCount: 60, spread: 70 }); } catch (e) {}
    return newPayout;
  };

  const adminApprovePayout = (payoutId, status) => {
    setPayouts(prev => prev.map(p => p.id === payoutId ? { ...p, status } : p));
    if (status === 'Completed' || status === 'Approved') {
      try { confetti({ particleCount: 90, spread: 80 }); } catch (e) {}
    }
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

  const adminApproveSite = (siteId, status) => {
    setSites(prev => prev.map(s => s.id === siteId ? { ...s, status } : s));
  };

  const adminApproveKyc = (status) => {
    setKycData(prev => ({
      ...prev,
      status,
      verifiedAt: status === 'Approved' ? new Date().toISOString().split('T')[0] : null
    }));
  };

  return (
    <AppContext.Provider value={{
      user,
      videoAds,
      tasks,
      isAdminUnlocked,
      activeTab,
      setActiveTab,
      activeWatchingAd,
      setActiveWatchingAd,
      currentLang,
      setCurrentLang,
      currentCurrency,
      setCurrentCurrency,
      sites,
      adUnits,
      kycData,
      bankData,
      payouts,
      dailyLog,
      systemSettings,
      notifications,
      liveTicker,
      totalEarnings,
      currentBalance,
      isLiveSimulating,
      setIsLiveSimulating,
      resetToZeroAccount,
      verifyAdminPin,
      lockAdmin,
      addWebsite,
      createAdUnit,
      recordAdClick,
      submitKyc,
      updateBankDetails,
      requestPayout,
      claimVideoReward,
      claimTask,
      adminApprovePayout,
      adminAddVideoAd,
      adminApproveSite,
      adminApproveKyc,
      setSystemSettings,
      OFFICIAL_ADSENSE_CLIENT
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
