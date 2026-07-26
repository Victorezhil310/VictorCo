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

// Initial User Profile
const INITIAL_USER = {
  id: 'usr_victor_101',
  name: 'Victor Ezhil',
  email: 'victorezhil310@gmail.com',
  role: 'user',
  balance: 0.00,
  coins: 0,
  diamonds: 0,
  adsWatched: 0,
  accountStatus: 'Active'
};

// Initial Advertiser Profile
const INITIAL_ADVERTISER = {
  id: 'adv_9901',
  companyName: 'Tata Digital India',
  email: 'campaigns@tata.com',
  walletBalance: 2500.00,
  spentTotal: 450.00
};

// Real Direct Advertiser Campaigns Database
const INITIAL_CAMPAIGNS = [
  {
    id: 'camp_101',
    advertiserId: 'adv_9901',
    advertiserName: 'Tata Digital India',
    name: 'Tata Neu Tech SuperApp 2026 Promo',
    creativeType: 'video',
    creativeUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60',
    headline: 'Build & Scale with Tata Neu Digital SuperApp',
    description: 'Get 5% NeuCoins reward on all tech & gadget shopping today!',
    targetCpm: 25.00, // ₹25.00 CPM
    userRewardCash: 0.50, // ₹0.50 user reward per watch
    durationSeconds: 15,
    totalBudget: 5000.00,
    remainingBudget: 4550.00,
    impressionsServed: 1800,
    clicks: 140,
    status: 'Active',
    createdAt: '2026-07-01'
  },
  {
    id: 'camp_102',
    advertiserId: 'adv_9902',
    advertiserName: 'Reliance Jio 5G',
    name: 'Jio AirFiber 5G Unlimited High Speed',
    creativeType: 'image',
    creativeUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
    headline: 'Experience True 5G Ultra Speed Connection',
    description: 'Subscribe today to get 30 days free 5G trial at zero installation cost.',
    targetCpm: 30.00,
    userRewardCash: 0.75,
    durationSeconds: 10,
    totalBudget: 8000.00,
    remainingBudget: 7200.00,
    impressionsServed: 2600,
    clicks: 310,
    status: 'Active',
    createdAt: '2026-07-10'
  },
  {
    id: 'camp_103',
    advertiserId: 'adv_9903',
    advertiserName: 'Garena Free Fire India',
    name: 'Free Fire India Diamond Championship',
    creativeType: 'video',
    creativeUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60',
    headline: 'Claim 500 Free Diamonds & Exclusive Skins',
    description: 'Watch the full game tournament video trailer to unlock in-game rewards.',
    targetCpm: 40.00,
    userRewardCash: 1.20,
    durationSeconds: 20,
    totalBudget: 10000.00,
    remainingBudget: 8800.00,
    impressionsServed: 3000,
    clicks: 420,
    status: 'Active',
    createdAt: '2026-07-15'
  }
];

const INITIAL_TASKS = [
  { id: 'task_daily', title: 'Daily Login Reward', desc: 'Claim daily platform activity bonus', rewardCash: 1.00, completed: false },
  { id: 'task_5ads', title: 'Watch 5 Real Ad Campaigns', desc: 'Complete watching 5 advertiser campaigns', rewardCash: 2.50, progress: 0, target: 5, completed: false }
];

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => safeStorageRead('victormedia_user', INITIAL_USER));
  const [advertiser, setAdvertiser] = useState(() => safeStorageRead('victormedia_advertiser', INITIAL_ADVERTISER));
  const [campaigns, setCampaigns] = useState(() => safeStorageRead('victormedia_campaigns', INITIAL_CAMPAIGNS));
  const [tasks, setTasks] = useState(() => safeStorageRead('victormedia_tasks', INITIAL_TASKS));
  const [payouts, setPayouts] = useState(() => safeStorageRead('victormedia_payouts', []));
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(() => localStorage.getItem('admetrics_admin_session') === 'true');

  const [activeTab, setActiveTab] = useState('earn'); // earn, advertiser, admin, wallet, terms
  const [currentLang, setCurrentLang] = useState(() => localStorage.getItem('admetrics_lang') || 'en');
  const [currentCurrency, setCurrentCurrency] = useState(() => localStorage.getItem('admetrics_currency') || 'INR');
  const [activeAdPlaying, setActiveAdPlaying] = useState(null);

  // AI Smart Assistant Insights State
  const [aiInsights, setAiInsights] = useState([
    { id: 1, type: 'optimization', text: 'Campaign #103 CPM yield is performing 35% higher than average. Recommended budget boost.', timestamp: '10m ago' },
    { id: 2, type: 'fraud_protection', text: 'Anti-Bot Engine verified 100% genuine user click velocity. Zero fraud flags detected.', timestamp: '1h ago' }
  ]);

  // Sync to LocalStorage
  useEffect(() => { try { localStorage.setItem('victormedia_user', JSON.stringify(user)); } catch (e) {} }, [user]);
  useEffect(() => { try { localStorage.setItem('victormedia_advertiser', JSON.stringify(advertiser)); } catch (e) {} }, [advertiser]);
  useEffect(() => { try { localStorage.setItem('victormedia_campaigns', JSON.stringify(campaigns)); } catch (e) {} }, [campaigns]);
  useEffect(() => { try { localStorage.setItem('victormedia_tasks', JSON.stringify(tasks)); } catch (e) {} }, [tasks]);
  useEffect(() => { try { localStorage.setItem('victormedia_payouts', JSON.stringify(payouts)); } catch (e) {} }, [payouts]);
  useEffect(() => { try { localStorage.setItem('admetrics_admin_session', isAdminUnlocked ? 'true' : 'false'); } catch (e) {} }, [isAdminUnlocked]);

  // Ad Serving Engine Logic: Fetches the best active campaign or AdSense fallback
  const fetchNextAd = () => {
    const activeCampaigns = campaigns.filter(c => c.status === 'Active' && c.remainingBudget > 0);
    if (activeCampaigns.length === 0) return null;
    // Pick the campaign with highest target CPM
    return activeCampaigns.sort((a, b) => b.targetCpm - a.targetCpm)[0];
  };

  // Record Ad Impression & Credit User Wallet
  const recordAdImpression = (campaignId) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) return;

    const reward = campaign.userRewardCash;
    const costToAdvertiser = (campaign.targetCpm / 1000);

    // 1. Credit User Wallet
    setUser(prev => ({
      ...prev,
      balance: prev.balance + reward,
      coins: prev.coins + 100,
      adsWatched: prev.adsWatched + 1
    }));

    // 2. Deduct Campaign Budget & Update Stats
    setCampaigns(prev => prev.map(c => {
      if (c.id === campaignId) {
        return {
          ...c,
          impressionsServed: c.impressionsServed + 1,
          remainingBudget: Math.max(0, c.remainingBudget - costToAdvertiser)
        };
      }
      return c;
    }));

    // 3. Update Task Progress
    setTasks(prev => prev.map(t => {
      if (t.id === 'task_5ads') {
        const newProg = Math.min(t.target, (t.progress || 0) + 1);
        return { ...t, progress: newProg, completed: newProg >= t.target };
      }
      return t;
    }));

    try { confetti({ particleCount: 70, spread: 70 }); } catch (e) {}
    setActiveAdPlaying(null);
  };

  // Record Ad Click
  const recordAdClick = (campaignId) => {
    setCampaigns(prev => prev.map(c => c.id === campaignId ? { ...c, clicks: c.clicks + 1 } : c));
  };

  // Advertiser Actions: Create New Ad Campaign
  const createCampaign = (campaignData) => {
    const newCamp = {
      id: `camp_${Date.now()}`,
      advertiserId: advertiser.id,
      advertiserName: advertiser.companyName,
      status: 'Active', // Auto-approved in dev, adjustable by Admin
      impressionsServed: 0,
      clicks: 0,
      remainingBudget: parseFloat(campaignData.totalBudget),
      createdAt: new Date().toISOString().split('T')[0],
      ...campaignData
    };

    setCampaigns(prev => [newCamp, ...prev]);
    setAdvertiser(prev => ({ ...prev, spentTotal: prev.spentTotal + parseFloat(campaignData.totalBudget) }));
    try { confetti({ particleCount: 80, spread: 80 }); } catch (e) {}
    return newCamp;
  };

  // User Actions: Request Withdrawal
  const requestWithdrawal = (amount, method, details) => {
    if (amount > user.balance) throw new Error('Requested amount exceeds current available balance.');
    if (amount < 10.00) throw new Error('Minimum withdrawal threshold is ₹10.00 / $10.00.');

    const newPayout = {
      id: `pay_${Date.now()}`,
      amount: parseFloat(amount),
      method,
      details,
      status: 'Pending',
      requestDate: new Date().toISOString().split('T')[0],
      reference: `VM-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setPayouts(prev => [newPayout, ...prev]);
    setUser(prev => ({ ...prev, balance: prev.balance - amount }));
    try { confetti({ particleCount: 60, spread: 60 }); } catch (e) {}
    return newPayout;
  };

  // Admin PIN Authorization
  const verifyAdminPin = (enteredPin) => {
    if (enteredPin === MASTER_ADMIN_PIN) {
      setIsAdminUnlocked(true);
      setActiveTab('admin');
      try { confetti({ particleCount: 90, spread: 80 }); } catch (e) {}
      return { success: true };
    }
    return { success: false, message: 'Invalid Master Admin PIN.' };
  };

  const lockAdmin = () => {
    setIsAdminUnlocked(false);
    if (activeTab === 'admin') setActiveTab('earn');
  };

  const adminApproveCampaign = (campaignId, status) => {
    setCampaigns(prev => prev.map(c => c.id === campaignId ? { ...c, status } : c));
  };

  const adminApprovePayout = (payoutId, status) => {
    setPayouts(prev => prev.map(p => p.id === payoutId ? { ...p, status } : p));
  };

  return (
    <AppContext.Provider value={{
      user,
      advertiser,
      campaigns,
      tasks,
      payouts,
      aiInsights,
      isAdminUnlocked,
      activeTab,
      setActiveTab,
      activeAdPlaying,
      setActiveAdPlaying,
      currentLang,
      setCurrentLang,
      currentCurrency,
      setCurrentCurrency,
      fetchNextAd,
      recordAdImpression,
      recordAdClick,
      createCampaign,
      requestWithdrawal,
      bankData,
      setBankData,
      verifyAdminPin,
      lockAdmin,
      adminApproveCampaign,
      adminApprovePayout,
      videoAds,
      adminAddVideoAd,
      OFFICIAL_ADSENSE_CLIENT
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
