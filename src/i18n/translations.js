// Multi-Language & Multi-Currency Engine for VictorCo Indian Earning App 🇮🇳

export const CURRENCIES = {
  INR: { symbol: '₹', rate: 1.0, name: 'Indian Rupee (INR ₹)' },
  USD: { symbol: '$', rate: 0.012, name: 'US Dollar (USD $)' },
  EUR: { symbol: '€', rate: 0.011, name: 'Euro (EUR €)' },
  GBP: { symbol: '£', rate: 0.0094, name: 'British Pound (GBP £)' },
  AED: { symbol: 'AED ', rate: 0.044, name: 'UAE Dirham (AED)' }
};

export const LANGUAGES = {
  en: {
    flag: '🇮🇳',
    name: 'English (India)',
    dashboard: 'Dashboard',
    watch: 'Watch Ads & Earn',
    tasks: 'Daily Tasks',
    wallet: 'UPI & Bank Wallet',
    leaderboard: 'Top Earners',
    terms: 'Terms & Rules',
    admin: 'Admin Control Desk',
    unpaidBalance: 'Wallet Balance',
    lifetimeRevenue: 'Total Earned',
    dailyImpressions: 'Ads Watched',
    requestPayout: 'Instant UPI / Bank Withdraw',
    startLiveStream: 'Start Live Ads Stream',
    pauseStream: 'Pause Stream',
    resetAccount: 'Reset to ₹0 Fresh App'
  },
  hi: {
    flag: '🇮🇳',
    name: 'हिन्दी (Hindi)',
    dashboard: 'डैशबोर्ड',
    watch: 'विज्ञापन देखें और कमाएं',
    tasks: 'दैनिक कार्य',
    wallet: 'यूपीआई और बैंक बटुआ',
    leaderboard: 'शीर्ष कमाने वाले',
    terms: 'नियम और शर्तें',
    admin: 'एडमिन कंट्रोल डेस्क',
    unpaidBalance: 'वॉलेट बैलेंस',
    lifetimeRevenue: 'कुल कमाई',
    dailyImpressions: 'देखे गए विज्ञापन',
    requestPayout: 'यूपीआई / बैंक निकासी',
    startLiveStream: 'लाइव विज्ञापन शुरू करें',
    pauseStream: 'रुकें',
    resetAccount: '₹0 रीसेट करें'
  }
};

export function formatCurrency(amountInInr, currencyCode = 'INR') {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.INR;
  const converted = amountInInr * currency.rate;
  return `${currency.symbol}${converted.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
