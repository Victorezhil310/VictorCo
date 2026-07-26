import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const AppContext = createContext();

const MASTER_ADMIN_PIN = "20032004";

// Initial Demo Seed Data
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
    verifiedAt: '2026-02-10'
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
    verifiedAt: '2026-03-01'
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
    submittedAt: '2026-07-24'
  }
];

const INITIAL_AD_UNITS = [
  {
    id: 'ad_unit_101',
    siteId: 'site_1',
    siteName: 'TechPulse Daily',
    name: 'Header Leaderboard Banner',
    format: 'Display Banner (728x90)',
    type: 'responsive',
    status: 'Active',
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
    codeSnippet: `<script async src="https://cdn.admetricspro.com/v1/ad.js" data-ad-client="pub_99214" data-ad-slot="ad_unit_102"></script>`
  },
  {
    id: 'ad_unit_103',
    siteId: 'site_2',
    siteName: 'Finance & Crypto Blog',
    name: 'In-Article Native Feed',
    format: 'Native Fluid Feed',
    type: 'native',
    status: 'Active',
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
  status: 'Approved', // Approved, Pending, Rejected
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
    amount: 1540.00,
    method: 'Direct Wire (Bank of America)',
    reference: 'TXN-882190-2026',
    status: 'Completed'
  },
  {
    id: 'pay_902',
    date: '2026-05-31',
    amount: 980.50,
    method: 'Direct Wire (Bank of America)',
    reference: 'TXN-773120-2026',
    status: 'Completed'
  }
];

export const AppProvider = ({ children }) => {
  // Persistence state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('admetrics_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [isAdminUnlocked, setIsAdminUnlocked] = useState(() => {
    return localStorage.getItem('admetrics_admin_session') === 'true';
  });

  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, sites, adunits, kyc, payments, admin

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
    { id: 1, text: 'Welcome to AdMetrics Pro! Complete your KYC to unlock direct bank wire payouts.', time: '2 hours ago', unread: true },
    { id: 2, text: 'Site TechPulse Daily hit 48,000+ daily ad impressions!', time: '1 day ago', unread: false }
  ]);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('admetrics_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('admetrics_sites', JSON.stringify(sites));
  }, [sites]);

  useEffect(() => {
    localStorage.setItem('admetrics_adunits', JSON.stringify(adUnits));
  }, [adUnits]);

  useEffect(() => {
    localStorage.setItem('admetrics_kyc', JSON.stringify(kycData));
  }, [kycData]);

  useEffect(() => {
    localStorage.setItem('admetrics_bank', JSON.stringify(bankData));
  }, [bankData]);

  useEffect(() => {
    localStorage.setItem('admetrics_payouts', JSON.stringify(payouts));
  }, [payouts]);

  useEffect(() => {
    localStorage.setItem('admetrics_admin_session', isAdminUnlocked ? 'true' : 'false');
  }, [isAdminUnlocked]);

  // Total Earnings Calculation
  const totalEarnings = sites.reduce((acc, site) => acc + (site.earnings || 0), 0);
  const currentBalance = totalEarnings - payouts.filter(p => p.status === 'Completed').reduce((acc, p) => acc + p.amount, 0);

  // Authentication & Admin PIN Handler
  const verifyAdminPin = (enteredPin) => {
    if (enteredPin === MASTER_ADMIN_PIN) {
      setIsAdminUnlocked(true);
      setActiveTab('admin');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      return { success: true };
    }
    return { success: false, message: 'Invalid Admin Master PIN. Verification Failed.' };
  };

  const lockAdmin = () => {
    setIsAdminUnlocked(false);
    if (activeTab === 'admin') {
      setActiveTab('dashboard');
    }
  };

  const loginUser = (email, name) => {
    setUser({
      id: `pub_${Math.floor(10000 + Math.random() * 90000)}`,
      name: name || 'Publisher User',
      email: email,
      role: 'publisher',
      accountStatus: 'Active',
      joinedDate: new Date().toISOString().split('T')[0]
    });
  };

  const logoutUser = () => {
    setIsAdminUnlocked(false);
    setActiveTab('dashboard');
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
      submittedAt: new Date().toISOString().split('T')[0]
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
      codeSnippet: `<script async src="https://cdn.admetricspro.com/v1/ad.js" data-ad-client="${user.id}" data-ad-slot="ad_unit_${Date.now()}"></script>`
    };
    setAdUnits(prev => [newAdUnit, ...prev]);
    return newAdUnit;
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
      throw new Error('Requested amount exceeds current available balance.');
    }
    if (amount < bankData.payoutThreshold) {
      throw new Error(`Minimum payout threshold is $${bankData.payoutThreshold}`);
    }
    const newPayout = {
      id: `pay_${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      amount: parseFloat(amount),
      method: `Bank Wire (${bankData.bankName})`,
      reference: `REQ-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'Pending'
    };
    setPayouts(prev => [newPayout, ...prev]);
    confetti({ particleCount: 50, spread: 60 });
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
      verifyAdminPin,
      lockAdmin,
      loginUser,
      logoutUser,
      addWebsite,
      createAdUnit,
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
