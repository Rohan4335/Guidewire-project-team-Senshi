const { v4: uuidv4 } = require('uuid');

// Pre-seeded users
const users = [
  {
    id: 'usr_001',
    name: 'Rahul Kumar',
    phone: '9876543210',
    platform: 'Zomato',
    zone: 'Koramangala 4th Block',
    city: 'Bangalore, Karnataka',
    role: 'Zomato Partner',
    avatar: null,
    createdAt: '2023-09-15T10:00:00Z',
  },
];

// Tokens store
const tokens = {};

// Dashboard data
const dashboardData = {
  weatherWarning: {
    type: 'extreme',
    title: 'Extreme Weather Warning',
    message: 'Heavy rain expected in Bengaluru South from 4:00 PM. Stay safe, your income is protected.',
  },
  policyStatus: {
    planName: 'WEEKLY SHIELD',
    status: 'ACTIVE',
    expiresIn: '3 days',
    expiryDate: 'Oct 31',
  },
  protectedEarnings: {
    current: 1200,
    goal: 3500,
    percentage: 34,
    premiumPaid: 149,
    premiumNote: 'AI Risk Adjusted',
  },
  antiFraud: {
    status: 'FULLY VERIFIED',
    gps: 'Active',
    device: 'Healthy',
  },
  riskIndicators: [
    {
      id: 1,
      name: 'Rain Intensity',
      detail: 'Heavy (12mm/hr)',
      level: 'high',
      icon: 'rain',
    },
    {
      id: 2,
      name: 'Air Quality (AQI)',
      detail: '312 (Very Poor)',
      level: 'high',
      icon: 'aqi',
    },
    {
      id: 3,
      name: 'Heat Index',
      detail: '34°C (Normal)',
      level: 'low',
      icon: 'heat',
    },
  ],
  triggerAlert: {
    title: 'Automatic Trigger Looming',
    message: 'Risk threshold is at 82%. Payout of ₹250 will trigger if rain persists for 30 more minutes.',
    amount: 250,
  },
  recentPayouts: [
    {
      id: 'p1',
      date: 'Oct 24, 2023',
      triggerReason: 'Extreme Rain (Koramangala)',
      amount: 450,
      status: 'Completed',
    },
    {
      id: 'p2',
      date: 'Oct 21, 2023',
      triggerReason: 'Severe AQI Alert',
      amount: 320,
      status: 'Completed',
    },
    {
      id: 'p3',
      date: 'Oct 18, 2023',
      triggerReason: 'Flash Flood Disruption',
      amount: 150,
      status: 'Completed',
    },
  ],
};

// Claims / Live Trigger data
const claimsData = {
  monitoringLocation: 'Koramangala, Sector 4',
  systemStatus: 'online',
  environmentStats: [
    {
      id: 1,
      label: 'Rainfall',
      value: '18.5',
      unit: 'mm/hr',
      severity: 'High',
      icon: 'rainfall',
    },
    {
      id: 2,
      label: 'AQI Index',
      value: '142',
      unit: '',
      severity: 'Moderate',
      icon: 'aqi',
    },
    {
      id: 3,
      label: 'Temperature',
      value: '31',
      unit: '°C',
      severity: 'Normal',
      icon: 'temperature',
    },
  ],
  eventTimeline: [
    {
      id: 1,
      time: '02:00 PM',
      title: 'Disruption Detected',
      description: 'Heavy localized rainfall detected via IMD & Satellite data in Koramangala Zone.',
      status: 'completed',
      isLive: false,
    },
    {
      id: 2,
      time: '02:15 PM',
      title: 'Threshold Breached',
      description: 'Precipitation exceeded 15mm/hr for 15 consecutive minutes. parametric condition met.',
      status: 'completed',
      isLive: false,
    },
    {
      id: 3,
      time: '02:30 PM',
      title: 'Payout Triggered',
      description: 'AI verified location consistency. Automatic payout initialized to your linked UPI.',
      status: 'active',
      isLive: true,
    },
  ],
  payoutSummary: {
    type: 'PARAMETRIC TRIGGER',
    title: 'Claim Triggered Automatically',
    description: 'Heavy rain disruption detected in your active zone. No action required from your side.',
    estimatedPayout: 450,
    currency: 'INR',
    coverageLevel: 'Gold Plan (90%)',
    disruptionPeriod: '2:15 PM - 3:45 PM (Est.)',
    hourlyProtection: 300,
  },
  recentPayouts: [
    {
      id: 'c1',
      date: 'Oct 24, 2023',
      triggerReason: 'Extreme Rain (Koramangala)',
      amount: 450,
      status: 'Completed',
    },
    {
      id: 'c2',
      date: 'Oct 21, 2023',
      triggerReason: 'Severe AQI Alert',
      amount: 320,
      status: 'Completed',
    },
  ],
};

// Policy / Risk Profile data
const policyData = {
  riskAssessment: {
    score: 65,
    level: 'Medium Risk',
    source: 'Generated from historical & live data',
  },
  riskInsights: [
    {
      id: 1,
      name: 'Rain Intensity',
      level: 'High',
      description: 'Koramangala has 15% higher waterlogging risk during monsoon than average Bangalore.',
      icon: 'rain',
    },
    {
      id: 2,
      name: 'Air Quality (AQI)',
      level: 'Moderate',
      description: 'HSR Layout pollution spikes between 6 PM - 10 PM. Automated payouts at AQI > 250.',
      icon: 'aqi',
    },
    {
      id: 3,
      name: 'Payout Frequency',
      level: '2.4x / Mo',
      description: 'Partners in your zone received average 2 payouts last month due to extreme weather.',
      icon: 'frequency',
    },
  ],
  coverage: {
    planName: 'Weekly Shield',
    status: 'ACTIVE',
    coverageHours: '40 Hours / Week',
    earningsProtection: '70%',
    expiresIn: '3 days (Oct 31)',
    premiumPaid: 149,
  },
};

// Premium / Plans data
const premiumData = {
  location: 'Koramangala & HSR Layout, Bangalore',
  aiEngine: 'v2.4 Active',
  riskAssessment: {
    score: 65,
    level: 'Medium Risk',
    source: 'Generated from historical & live data',
  },
  riskInsights: [
    {
      id: 1,
      name: 'Rain Intensity',
      level: 'High',
      description: 'Koramangala has 15% higher waterlogging risk during monsoon than average Bangalore.',
      icon: 'rain',
    },
    {
      id: 2,
      name: 'Air Quality (AQI)',
      level: 'Moderate',
      description: 'HSR Layout pollution spikes between 6 PM - 10 PM. Automated payouts at AQI > 250.',
      icon: 'aqi',
    },
    {
      id: 3,
      name: 'Payout Frequency',
      level: '2.4x / Mo',
      description: 'Partners in your zone received average 2 payouts last month due to extreme weather.',
      icon: 'frequency',
    },
  ],
  plans: [
    {
      id: 'standard',
      name: 'Standard Protection',
      subtitle: 'Perfect for heavy delivery periods',
      price: 39,
      period: 'week',
      incomeCover: '70% Earnings',
      coverageTime: '40 Hours / Week',
      features: [
        'Weather disruption cover',
        'Pollution health alert payouts',
        'Weekly payout summary',
        'Standard customer support',
      ],
      isBestValue: false,
      isSelected: false,
    },
    {
      id: 'premium',
      name: 'Premium Shield',
      subtitle: 'Perfect for heavy delivery periods',
      price: 59,
      period: 'week',
      incomeCover: '95% Earnings',
      coverageTime: '70 Hours / Week',
      features: [
        'Extreme weather & heat cover',
        'Priority fraud verification',
        '24/7 Dedicated partner line',
        'Accidental injury rider incl.',
        'Multi-platform data sync',
      ],
      isBestValue: true,
      isSelected: true,
    },
  ],
  subscriptionSummary: {
    planName: 'PREMIUM',
    weeklyTotal: 59,
    gst: 7.02,
    description: 'You are subscribing to the PREMIUM plan. Payment will be deducted weekly from your GiGuard wallet or linked UPI. You can pause or cancel anytime before Monday 12 AM.',
  },
};

// Location / Zone data
const zones = [
  {
    id: 'zone_1',
    name: 'Koramangala 4th Block',
    city: 'Bangalore, Karnataka',
    riskLevel: 'Moderate Risk',
    coverageArea: '~4.2 sq km',
    weatherSensors: 3,
    lat: 12.9352,
    lng: 77.6245,
  },
  {
    id: 'zone_2',
    name: 'HSR Layout',
    city: 'Bangalore, Karnataka',
    riskLevel: 'High Risk',
    coverageArea: '~5.1 sq km',
    weatherSensors: 4,
    lat: 12.9116,
    lng: 77.6389,
  },
  {
    id: 'zone_3',
    name: 'Indiranagar',
    city: 'Bangalore, Karnataka',
    riskLevel: 'Low Risk',
    coverageArea: '~3.8 sq km',
    weatherSensors: 2,
    lat: 12.9784,
    lng: 77.6408,
  },
];

const platforms = [
  { id: 'zomato', name: 'Zomato', logo: '🟠' },
  { id: 'swiggy', name: 'Swiggy', logo: '🟧' },
  { id: 'zepto', name: 'Zepto', logo: '🟣' },
  { id: 'blinkit', name: 'Blinkit', logo: '🟡' },
];

module.exports = {
  users,
  tokens,
  dashboardData,
  claimsData,
  policyData,
  premiumData,
  zones,
  platforms,
};
