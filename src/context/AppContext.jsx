import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const AppContext = createContext();

const MASTER_ADMIN_PIN = "20032004";

// Demo Initial Data
const INITIAL_USER = {
  id: 'pub_99214',
  name: 'Victor Publisher',
  email: 'victor@publisher.com',
  role: 'publisher',
  accountStatus: 'Active',
  joinedDate: '2026-01-15'
};

const INITIAL_SITES = [
  {
    id: 'site_1',
    name: 'TechPulse Daily',
    url: 'https://techpulsedaily.com',
    category: 'Technology & Gadgets',
    status: 'Approved',
    dailyImpressions: 48500,
    dailyClicks: 1420,
    cpm: 3.45,
    earnings: 1240.80,
    verifiedAt: '2026-02-10',
    healthScore: 98,
    sslVerified: true
  },
  {
    id: 'site_2',
    name: 'Finance & Crypto Blog',
    url: 'https://fintechinsights.io',
    category: 'Finance & Investing',
    status: 'Approved',
    dailyImpressions: 21300,
    dailyClicks: 980,
    cpm: 6.80,
    earnings: 980.50,
    verifiedAt: '2026-03-01',
    healthScore: 95,
    sslVerified: true
  },
  {
    id: 'site_3',
    name: 'Trendy Cooking Hub',
    url: 'https://trendycookinghub.com',
    category: 'Lifestyle & Food',
    status: 'Pending',
    dailyImpressions: 0,
    dailyClicks: 0,
    cpm: 2.10,
    earnings: 0.00,
    submittedAt: '2026-07-24',
    healthScore: 82,
    sslVerified: true
  }
];

const INITIAL_AD_UNITS = [
  {
    id: 'ad_unit_101',
    siteId: 'site_1',
    siteName: 'TechPulse Daily',
    name: 'Header Leaderboard Banner',
    format: 'Display Leaderboard (728x90)',
    type: 'responsive',
    status: 'Active',
    impressions: 28400,
    clicks: 890,
    codeSnippet: `<script async src="https://cdn.admetricspro.com/v1/ad.js" data-ad-client="pub_99214" data-ad-slot="ad_unit_101"></script>`
  },
  {
    id: 'ad_unit_102',
    siteId: 'site_1',
    siteName: 'TechPulse Daily',
    name: 'Sidebar Skyscraper Banner',
    format: 'Vertical Skyscraper (300x600)',
    type: 'banner',
    status: 'Active',
    impressions: 20100,
    clicks: 530,
    codeSnippet: `<script async src="https://cdn.admetricspro.com/v1/ad.js" data-ad-client="pub_99214" data-ad-slot="ad_unit_102"></script>`
  },
  {
    id: 'ad_unit_103',
    siteId: 'site_2',
    siteName: 'Finance & Crypto Blog',
    name: 'In-Article Native Feed',
    format: 'In-Feed Native Responsive',
    type: 'native',
    status: 'Active',
    impressions: 21300,
    clicks: 980,
    codeSnippet: `<script async src="https://cdn.admetricspro.com/v1/ad.js" data-ad-client="pub_99214" data-ad-slot="ad_unit_103"></script>`
  }
];

const INITIAL_KYC = {
  userId: 'pub_99214',
  fullName: 'Victor Alexander',
  dateOfBirth: '1995-08-14',
  nationality: 'United States',
  idType: 'Passport',
  idNumber: 'P984210984',
  taxId: 'TIN-883-294-110',
  address: '742 Evergreen Terrace, Suite 400',
  city: 'San Francisco',
  country: 'United States',
  documentUploaded: true,
  documentFileName: 'gov_passport_scanned_id.pdf',
  documentPreviewUrl: null,
  status: 'Approved',
  submittedAt: '2026-02-01',
  verifiedAt: '2026-02-02'
};

const INITIAL_BANK = {
  accountHolder: 'Victor Alexander',
  bankName: 'JPMorgan Chase Bank, N.A.',
  accountNumber: '**** **** 4892',
  routingNumber: '021000021',
  swiftCode: 'CHASUS33XXX',
  currency: 'USD ($)',
  payoutThreshold: 100,
  isVerified: true
};

const INITIAL_PAYOUTS = [
  {
    id: 'pay_901',
    date: '2026-06-30',
    amount: 980.00,
    method: 'Direct Wire (JPMorgan Chase)',
    reference: 'FEDWIRE-882190-2026',
    status: 'Completed'
  },
  {
    id: 'pay_902',
    date: '2026-05-31',
    amount: 540.00,
    method: 'Direct Wire (JPMorgan Chase)',
    reference: 'FEDWIRE-773120-2026',
    status: 'Completed'
  }
];

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('admetrics_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [isAdminUnlocked, setIsAdminUnlocked] = useState(() => {
    return localStorage.getItem('admetrics_admin_session') === 'true';
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLiveSimulating, setIsLiveSimulating] = useState(true);
  const [liveLog, setLiveLog] = useState(null);

  const [sites, setSites] = useState(() => {
    const saved = localStorage.getItem('admetrics_sites');
    return saved ? JSON.parse(saved) : INITIAL_SITES;
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

  const [systemSettings, setSystemSettings] = useState(() => {
    const saved = localStorage.getItem('admetrics_settings');
    return saved ? JSON.parse(saved) : { defaultCpm: 4.50, networkFillRate: 98.5, autoApproveSites: false };
  });

  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Welcome to AdMetrics Pro! Direct bank wire payouts are active.', time: '2 hours ago', unread: true },
    { id: 2, text: 'Site TechPulse Daily hit 48,000+ daily ad impressions!', time: '1 day ago', unread: false }
  ]);

  // Sync state to LocalStorage
  useEffect(() => { localStorage.setItem('admetrics_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('admetrics_sites', JSON.stringify(sites)); }, [sites]);
  useEffect(() => { localStorage.setItem('admetrics_adunits', JSON.stringify(adUnits)); }, [adUnits]);
  useEffect(() => { localStorage.setItem('admetrics_kyc', JSON.stringify(kycData)); }, [kycData]);
  useEffect(() => { localStorage.setItem('admetrics_bank', JSON.stringify(bankData)); }, [bankData]);
  useEffect(() => { localStorage.setItem('admetrics_payouts', JSON.stringify(payouts)); }, [payouts]);
  useEffect(() => { localStorage.setItem('admetrics_admin_session', isAdminUnlocked ? 'true' : 'false'); }, [isAdminUnlocked]);

  // REAL-TIME Impression Ticker & Revenue Simulator
  useEffect(() => {
    if (!isLiveSimulating) return;

    const interval = setInterval(() => {
      setSites(prevSites => {
        return prevSites.map(site => {
          if (site.status !== 'Approved') return site;

          // Simulate 5 - 25 new impressions per tick
          const newImp = Math.floor(Math.random() * 20) + 5;
          const clickChance = Math.random() < 0.08 ? 1 : 0;
          const addEarned = (newImp * site.cpm) / 1000;

          return {
            ...site,
            dailyImpressions: site.dailyImpressions + newImp,
            dailyClicks: site.dailyClicks + clickChance,
            earnings: site.earnings + addEarned
          };
        });
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isLiveSimulating]);

  // Financial Calculations
  const totalEarnings = sites.reduce((acc, site) => acc + (site.earnings || 0), 0);
  const totalDisbursedPayouts = payouts
    .filter(p => p.status === 'Completed')
    .reduce((acc, p) => acc + p.amount, 0);

  // Ensure balance is always positive and exact
  const currentBalance = Math.max(0, totalEarnings - totalDisbursedPayouts);

  // Admin PIN Gate Handler
  const verifyAdminPin = (enteredPin) => {
    if (enteredPin === MASTER_ADMIN_PIN) {
      setIsAdminUnlocked(true);
      setActiveTab('admin');
      confetti({
        particleCount: 100,
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
  const addWebsite = (url, category, name) => {
    const newSite = {
      id: `site_${Date.now()}`,
      name: name || url.replace('https://', '').replace('http://', '').split('/')[0],
      url,
      category,
      status: systemSettings.autoApproveSites ? 'Approved' : 'Pending',
      dailyImpressions: 0,
      dailyClicks: 0,
      cpm: systemSettings.defaultCpm,
      earnings: 0.00,
      submittedAt: new Date().toISOString().split('T')[0],
      healthScore: 90,
      sslVerified: true
    };
    setSites(prev => [newSite, ...prev]);
    return newSite;
  };

  const createAdUnit = (siteId, name, format, type) => {
    const selectedSite = sites.find(s => s.id === siteId);
    const newAdUnit = {
      id: `ad_unit_${Math.floor(100 + Math.random() * 900)}`,
      siteId,
      siteName: selectedSite ? selectedSite.name : 'Selected Site',
      name,
      format,
      type: type || 'banner',
      status: 'Active',
      impressions: 0,
      clicks: 0,
      codeSnippet: `<script async src="https://cdn.admetricspro.com/v1/ad.js" data-ad-client="${user.id}" data-ad-slot="ad_unit_${Date.now()}"></script>`
    };
    setAdUnits(prev => [newAdUnit, ...prev]);
    return newAdUnit;
  };

  const recordAdClick = (adUnitId) => {
    setAdUnits(prev => prev.map(u => u.id === adUnitId ? { ...u, clicks: u.clicks + 1 } : u));
    setSites(prev => prev.map(s => {
      if (s.status === 'Approved') {
        const bonus = (s.cpm * 0.15);
        return { ...s, dailyClicks: s.dailyClicks + 1, earnings: s.earnings + bonus };
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

  const requestPayout = (amount) => {
    if (amount > currentBalance) {
      throw new Error(`Requested payout ($${amount.toFixed(2)}) exceeds available balance ($${currentBalance.toFixed(2)}).`);
    }
    if (amount < bankData.payoutThreshold) {
      throw new Error(`Minimum withdrawal threshold is $${bankData.payoutThreshold}`);
    }
    const newPayout = {
      id: `pay_${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      amount: parseFloat(amount),
      method: `Direct Wire (${bankData.bankName})`,
      reference: `REQ-${Math.floor(100000 + Math.random() * 900000)}`,
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
