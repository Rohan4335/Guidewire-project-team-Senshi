// ===== Auth Types =====
export interface User {
  id: string;
  name: string;
  phone: string;
  platform: string | null;
  zone: string | null;
  city: string | null;
  role: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginPayload {
  phone: string;
}

export interface RegisterPayload {
  phone: string;
  name?: string;
  platform?: string;
  zone?: string;
  city?: string;
}

// ===== Dashboard Types =====
export interface WeatherWarning {
  type: string;
  title: string;
  message: string;
}

export interface PolicyStatus {
  planName: string;
  status: string;
  expiresIn: string;
  expiryDate: string;
}

export interface ProtectedEarnings {
  current: number;
  goal: number;
  percentage: number;
  premiumPaid: number;
  premiumNote: string;
}

export interface AntiFraud {
  status: string;
  gps: string;
  device: string;
}

export interface RiskIndicator {
  id: number;
  name: string;
  detail: string;
  level: string;
  icon: string;
}

export interface TriggerAlert {
  title: string;
  message: string;
  amount: number;
}

export interface Payout {
  id: string;
  date: string;
  triggerReason: string;
  amount: number;
  status: string;
}

export interface DashboardData {
  weatherWarning: WeatherWarning;
  policyStatus: PolicyStatus;
  protectedEarnings: ProtectedEarnings;
  antiFraud: AntiFraud;
  riskIndicators: RiskIndicator[];
  triggerAlert: TriggerAlert;
  recentPayouts: Payout[];
}

export interface DashboardState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
}

// ===== Claims Types =====
export interface EnvironmentStat {
  id: number;
  label: string;
  value: string;
  unit: string;
  severity: string;
  icon: string;
}

export interface TimelineEvent {
  id: number;
  time: string;
  title: string;
  description: string;
  status: string;
  isLive: boolean;
}

export interface PayoutSummary {
  type: string;
  title: string;
  description: string;
  estimatedPayout: number;
  currency: string;
  coverageLevel: string;
  disruptionPeriod: string;
  hourlyProtection: number;
}

export interface ClaimsData {
  monitoringLocation: string;
  systemStatus: string;
  environmentStats: EnvironmentStat[];
  eventTimeline: TimelineEvent[];
  payoutSummary: PayoutSummary;
  recentPayouts: Payout[];
}

export interface ClaimsState {
  data: ClaimsData | null;
  loading: boolean;
  error: string | null;
}

// ===== Policy Types =====
export interface RiskAssessment {
  score: number;
  level: string;
  source: string;
}

export interface RiskInsight {
  id: number;
  name: string;
  level: string;
  description: string;
  icon: string;
}

export interface Coverage {
  planName: string;
  status: string;
  coverageHours: string;
  earningsProtection: string;
  expiresIn: string;
  premiumPaid: number;
}

export interface PolicyData {
  riskAssessment: RiskAssessment;
  riskInsights: RiskInsight[];
  coverage: Coverage;
}

export interface PolicyState {
  data: PolicyData | null;
  loading: boolean;
  error: string | null;
}

// ===== Premium Types =====
export interface PlanFeature {
  text: string;
}

export interface PremiumPlan {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  period: string;
  incomeCover: string;
  coverageTime: string;
  features: string[];
  isBestValue: boolean;
  isSelected: boolean;
}

export interface SubscriptionSummary {
  planName: string;
  weeklyTotal: number;
  gst: number;
  description: string;
}

export interface PremiumData {
  location: string;
  aiEngine: string;
  riskAssessment: RiskAssessment;
  riskInsights: RiskInsight[];
  plans: PremiumPlan[];
  subscriptionSummary: SubscriptionSummary;
}

export interface PremiumState {
  data: PremiumData | null;
  selectedPlanId: string | null;
  loading: boolean;
  error: string | null;
}

// ===== Location Types =====
export interface Zone {
  id: string;
  name: string;
  city: string;
  riskLevel: string;
  coverageArea: string;
  weatherSensors: number;
  lat: number;
  lng: number;
}

export interface Platform {
  id: string;
  name: string;
  logo: string;
}

export interface LocationState {
  zones: Zone[];
  selectedZone: Zone | null;
  selectedPlatform: Platform | null;
  loading: boolean;
  error: string | null;
}

// ===== API Response =====
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}
