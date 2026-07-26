import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const AppContext = createContext();

const MASTER_ADMIN_PIN = "20032004";

// Fresh Clean Initial Publisher Profile (Starts at 0!)
const NEW_PUBLISHER_USER = {
  id: 'pub_99214',
  name: 'Victor Publisher',
  email: 'victor@publisher.com',
  role: 'publisher',
  accountStatus: 'Pending Onboarding',
  joinedDate: new Date().toISOString().split('T')[0]
};

const FRESH_EMPTY_SITES = [
  {
    id: 'site_1',
    name: 'TechPulse Daily',
    url: 'https://techpulsedaily.com',
    type: 'Website',
    category: 'Technology & Gadgets',
    status: 'Approved',
    dailyImpressions: 0,
    dailyClicks: 0,
    cpm: 3.45,
    earnings: 0.00,
    submittedAt: new Date().toISOString().split('T')[0],
    healthScore: 98,
    sslVerified: true
  }
];

const FRESH_EMPTY_AD_UNITS = [
  {
    id: 'ad_unit_101',
    siteId: 'site_1',
    siteName: 'TechPulse Daily',
    name: 'Header Leaderboard Banner',
    format: 'Display Leaderboard (728x90)',
    platform: 'Web',
    type: 'responsive',
    status: 'Active',
    impressions: 0,
    clicks: 0,
    codeSnippet: `<script async src="https://cdn.admetricspro.com/v1/ad.js" data-ad-client="pub_99214" data-ad-slot="ad_unit_101"></script>`
  }
];

const FRESH_EMPTY_KYC = {
  userId: 'pub_99214',
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
  status: 'Unsubmitted',
  submittedAt: null,
  verifiedAt: null
};

const FRESH_EMPTY_BANK = {
  payoutMethod: 'Bank Wire', // Bank Wire, PayPal, Crypto, Wise, Payoneer
  accountHolder: '',
  bankName: '',
  accountNumber: '',
  routingNumber: '',
  swiftCode: '',
  paypalEmail: '',
  cryptoWallet: '',
  cryptoNetwork: 'USDT (TRC-20)',
  currency: 'USD ($)',
  payoutThreshold: 100,
  isVerified: false
};

const FRESH_EMPTY_PAYOUTS = [];

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('admetrics_user');
    return saved ? JSON.parse(saved) : NEW_PUBLISHER_USER;
  });

  const [isAdminUnlocked, setIsAdminUnlocked] = useState(() => {
    return localStorage.getItem('admetrics_admin_session') === 'true';
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLiveSimulating, setIsLiveSimulating] = useState(false);

  // Multi-Language & Multi-Currency State
  const [currentLang, setCurrentLang] = useState(() => localStorage.getItem('admetrics_lang') || 'en');
  const [currentCurrency, setCurrentCurrency] = useState(() => localStorage.getItem('admetrics_currency') || 'USD');

  const [sites, setSites] = useState(() => {
    const saved = localStorage.getItem('admetrics_sites');
    return saved ? JSON.parse(saved) : FRESH_EMPTY_SITES;
  });

  const [adUnits, setAdUnits] = useState(() => {
    const saved = localStorage.getItem('admetrics_adunits');
    return saved ? JSON.parse(saved) : FRESH_EMPTY_AD_UNITS;
  });

  const [kycData, setKycData] = useState(() => {
    const saved = localStorage.getItem('admetrics_kyc');
    return saved ? JSON.parse(saved) : FRESH_EMPTY_KYC;
  });

  const [bankData, setBankData] = useState(() => {
    const saved = localStorage.getItem('admetrics_bank');
    return saved ? JSON.parse(saved) : FRESH_EMPTY_BANK;
  });

  const [payouts, setPayouts] = useState(() => {
    const saved = localStorage.getItem('admetrics_payouts');
    return saved ? JSON.parse(saved) : FRESH_EMPTY_PAYOUTS;
  });

  const [systemSettings, setSystemSettings] = useState(() => {
    const saved = localStorage.getItem('admetrics_settings');
    return saved ? JSON.parse(saved) : { defaultCpm: 4.50, networkFillRate: 98.5, autoApproveSites: true, antiBotProtection: true };
  });

  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Welcome to AdMetrics Pro! Complete website & app monetization setup.', time: 'Just now', unread: true }
  ]);

  // Sync state to LocalStorage
  useEffect(() => { localStorage.setItem('admetrics_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('admetrics_sites', JSON.stringify(sites)); }, [sites]);
  useEffect(() => { localStorage.setItem('admetrics_adunits', JSON.stringify(adUnits)); }, [adUnits]);
  useEffect(() => { localStorage.setItem('admetrics_kyc', JSON.stringify(kycData)); }, [kycData]);
  useEffect(() => { localStorage.setItem('admetrics_bank', JSON.stringify(bankData)); }, [bankData]);
  useEffect(() => { localStorage.setItem('admetrics_payouts', JSON.stringify(payouts)); }, [payouts]);
  useEffect(() => { localStorage.setItem('admetrics_lang', currentLang); }, [currentLang]);
  useEffect(() => { localStorage.setItem('admetrics_currency', currentCurrency); }, [currentCurrency]);
  useEffect(() => { localStorage.setItem('admetrics_admin_session', isAdminUnlocked ? 'true' : 'false'); }, [isAdminUnlocked]);

  // Real-Time Impression Ticker & Revenue Simulator
  useEffect(() => {
    if (!isLiveSimulating) return;

    const interval = setInterval(() => {
      setSites(prevSites => {
        return prevSites.map(site => {
          if (site.status !== 'Approved') return site;

          const newImp = Math.floor(Math.random() * 15) + 5;
          const clickChance = Math.random() < 0.1 ? 1 : 0;
          const addEarned = (newImp * site.cpm) / 1000;

          return {
            ...site,
            dailyImpressions: site.dailyImpressions + newImp,
            dailyClicks: site.dailyClicks + clickChance,
            earnings: site.earnings + addEarned
          };
        });
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isLiveSimulating]);

  // Reset to Fresh $0.00 State
  const resetToZeroAccount = () => {
    setUser(NEW_PUBLISHER_USER);
    setSites(FRESH_EMPTY_SITES);
    setAdUnits(FRESH_EMPTY_AD_UNITS);
    setKycData(FRESH_EMPTY_KYC);
    setBankData(FRESH_EMPTY_BANK);
    setPayouts(FRESH_EMPTY_PAYOUTS);
    setIsLiveSimulating(false);
    localStorage.clear();
    confetti({ particleCount: 50, spread: 60 });
    alert('Account reset to fresh $0.00 clean state!');
  };

  // Financial Calculations
  const totalEarnings = sites.reduce((acc, site) => acc + (site.earnings || 0), 0);
  const totalDisbursedPayouts = payouts
    .filter(p => p.status === 'Completed')
    .reduce((acc, p) => acc + p.amount, 0);

  const currentBalance = Math.max(0, totalEarnings - totalDisbursedPayouts);

  // Admin PIN Gate Handler
  const verifyAdminPin = (enteredPin) => {
    if (enteredPin === MASTER_ADMIN_PIN) {
      setIsAdminUnlocked(true);
      setActiveTab('admin');
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
      return { success: true };
    }
    return { success: false, message: 'Invalid Admin Master PIN. Access Denied.' };
  };

  const lockAdmin = () => {
    setIsAdminUnlocked(false);
    if (activeTab === 'admin') setActiveTab('dashboard');
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
      healthScore: 95,
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
      codeSnippet: platform === 'Mobile App (SDK)' 
        ? `AdMetricsSDK.loadInterstitialAd(context, "${user.id}", "ad_unit_${Date.now()}");`
        : `<script async src="https://cdn.admetricspro.com/v1/ad.js" data-ad-client="${user.id}" data-ad-slot="ad_unit_${Date.now()}"></script>`
    };
    setAdUnits(prev => [newAdUnit, ...prev]);
    return newAdUnit;
  };

  const recordAdClick = (adUnitId) => {
    setAdUnits(prev => prev.map(u => u.id === adUnitId ? { ...u, clicks: u.clicks + 1, impressions: u.impressions + 10 } : u));
    setSites(prev => prev.map(s => {
      if (s.status === 'Approved') {
        const bonus = 0.45 + (s.cpm * 0.1);
        return { ...s, dailyClicks: s.dailyClicks + 1, dailyImpressions: s.dailyImpressions + 15, earnings: s.earnings + bonus };
      }
      return s;
    }));
  };

  const submitKyc = (formData) => {
    const updated = {
      ...kycData,
      ...formData,
      userId: user.id,
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

  const requestPayout = (amount, method) => {
    if (amount > currentBalance) {
      throw new Error(`Requested payout ($${amount.toFixed(2)}) exceeds current available balance ($${currentBalance.toFixed(2)}).`);
    }
    if (amount < bankData.payoutThreshold) {
      throw new Error(`Minimum withdrawal threshold is $${bankData.payoutThreshold}`);
    }

    let payoutMethodLabel = method || bankData.payoutMethod || 'Direct Wire';
    if (payoutMethodLabel === 'PayPal') payoutMethodLabel = `PayPal (${bankData.paypalEmail || 'Email Verified'})`;
    else if (payoutMethodLabel === 'Crypto') payoutMethodLabel = `Crypto ${bankData.cryptoNetwork || 'USDT'} (${bankData.cryptoWallet.substring(0, 8)}...)`;
    else payoutMethodLabel = `Bank Wire (${bankData.bankName || 'Linked Bank'})`;

    const newPayout = {
      id: `pay_${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      amount: parseFloat(amount),
      method: payoutMethodLabel,
      reference: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'Pending'
    };
    setPayouts(prev => [newPayout, ...prev]);
    confetti({ particleCount: 60, spread: 70 });
    return newPayout;
  };

  // Master Admin Actions
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

  const adminProcessPayout = (payoutId, status) => {
    setPayouts(prev => prev.map(p => p.id === payoutId ? { ...p, status } : p));
    if (status === 'Completed') {
      confetti({ particleCount: 90, spread: 80 });
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      isAdminUnlocked,
      activeTab,
      setActiveTab,
      currentLang,
      setCurrentLang,
      currentCurrency,
      setCurrentCurrency,
      sites,
      adUnits,
      kycData,
      bankData,
      payouts,
      systemSettings,
      notifications,
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
      adminApproveSite,
      adminApproveKyc,
      adminProcessPayout,
      setSystemSettings
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
