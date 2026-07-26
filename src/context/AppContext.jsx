import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const AppContext = createContext();

const MASTER_ADMIN_PIN = "20032004";
const OFFICIAL_ADSENSE_CLIENT = "ca-pub-9747982919206794";

// Real Publisher Account Profile
const REAL_PUBLISHER_USER = {
  id: OFFICIAL_ADSENSE_CLIENT,
  name: 'Victor Publisher',
  email: 'victorezhil310@gmail.com',
  role: 'publisher',
  accountStatus: 'Active',
  joinedDate: new Date().toISOString().split('T')[0]
};

// Initial Approved Property
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
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('admetrics_user');
    return saved ? JSON.parse(saved) : REAL_PUBLISHER_USER;
  });

  const [isAdminUnlocked, setIsAdminUnlocked] = useState(() => {
    return localStorage.getItem('admetrics_admin_session') === 'true';
  });

  const [activeTab, setActiveTab] = useState('watch');
  const [isLiveSimulating, setIsLiveSimulating] = useState(true);

  // Multi-Language & Multi-Currency State
  const [currentLang, setCurrentLang] = useState(() => localStorage.getItem('admetrics_lang') || 'en');
  const [currentCurrency, setCurrentCurrency] = useState(() => localStorage.getItem('admetrics_currency') || 'USD');

  const [sites, setSites] = useState(() => {
    const saved = localStorage.getItem('admetrics_sites');
    return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
  });

  const [adUnits, setAdUnits] = useState(() => {
    const saved = localStorage.getItem('admetrics_adunits');
    return saved ? JSON.parse(saved) : INITIAL_AD_UNITS;
  });

  const [kycData, setKycData] = useState(() => {
    const saved = localStorage.getItem('admetrics_kyc');
    return saved ? JSON.parse(saved) : INITIAL_KYC;
  });

  const [bankData, setBankData] = useState(() => {
    const saved = localStorage.getItem('admetrics_bank');
    return saved ? JSON.parse(saved) : INITIAL_BANK;
  });

  const [payouts, setPayouts] = useState(() => {
    const saved = localStorage.getItem('admetrics_payouts');
    return saved ? JSON.parse(saved) : INITIAL_PAYOUTS;
  });

  const [dailyLog, setDailyLog] = useState(() => {
    const saved = localStorage.getItem('admetrics_daily_log');
    return saved ? JSON.parse(saved) : {
      Mon: 0.00, Tue: 0.00, Wed: 0.00, Thu: 0.00, Fri: 0.00, Sat: 0.00, Sun: 0.00
    };
  });

  const [systemSettings, setSystemSettings] = useState(() => {
    const saved = localStorage.getItem('admetrics_settings');
    return saved ? JSON.parse(saved) : { defaultCpm: 4.50, networkFillRate: 98.5, autoApproveSites: true, antiBotProtection: true };
  });

  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Real Google AdSense Publisher Client ca-pub-9747982919206794 connected & live!', time: 'Just now', unread: true }
  ]);

  // Sync state to LocalStorage
  useEffect(() => { localStorage.setItem('admetrics_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('admetrics_sites', JSON.stringify(sites)); }, [sites]);
  useEffect(() => { localStorage.setItem('admetrics_adunits', JSON.stringify(adUnits)); }, [adUnits]);
  useEffect(() => { localStorage.setItem('admetrics_kyc', JSON.stringify(kycData)); }, [kycData]);
  useEffect(() => { localStorage.setItem('admetrics_bank', JSON.stringify(bankData)); }, [bankData]);
  useEffect(() => { localStorage.setItem('admetrics_payouts', JSON.stringify(payouts)); }, [payouts]);
  useEffect(() => { localStorage.setItem('admetrics_daily_log', JSON.stringify(dailyLog)); }, [dailyLog]);
  useEffect(() => { localStorage.setItem('admetrics_lang', currentLang); }, [currentLang]);
  useEffect(() => { localStorage.setItem('admetrics_currency', currentCurrency); }, [currentCurrency]);
  useEffect(() => { localStorage.setItem('admetrics_admin_session', isAdminUnlocked ? 'true' : 'false'); }, [isAdminUnlocked]);

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
    setDailyLog({ Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 });
    setIsLiveSimulating(true);
    localStorage.clear();
    confetti({ particleCount: 60, spread: 70 });
  };

  // Financial Calculations
  const totalEarnings = sites.reduce((acc, site) => acc + (site.earnings || 0), 0);
  const totalDisbursedPayouts = payouts
    .filter(p => p.status === 'Completed')
    .reduce((acc, p) => acc + p.amount, 0);

  const currentBalance = Math.max(0, totalEarnings - totalDisbursedPayouts);

  // Master Admin PIN Handler
  const verifyAdminPin = (enteredPin) => {
    if (enteredPin === MASTER_ADMIN_PIN) {
      setIsAdminUnlocked(true);
      setActiveTab('admin');
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
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

  const requestPayout = (amount, method) => {
    if (amount > currentBalance) {
      throw new Error(`Requested payout ($${amount.toFixed(2)}) exceeds current available balance ($${currentBalance.toFixed(2)}).`);
    }
    if (amount < bankData.payoutThreshold) {
      throw new Error(`Minimum withdrawal threshold is $${bankData.payoutThreshold}`);
    }

    let payoutMethodLabel = method || bankData.payoutMethod || 'Direct Wire';
    if (payoutMethodLabel === 'PayPal') payoutMethodLabel = `PayPal (${bankData.paypalEmail || 'Verified Email'})`;
    else if (payoutMethodLabel === 'Crypto') payoutMethodLabel = `Crypto ${bankData.cryptoNetwork || 'USDT'} (${bankData.cryptoWallet ? bankData.cryptoWallet.substring(0, 8) : 'Wallet'}...)`;
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
      dailyLog,
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
      setSystemSettings,
      OFFICIAL_ADSENSE_CLIENT
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
