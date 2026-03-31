import React, { useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchPremium, selectPlan } from '../features/premium/slice';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import RiskGauge from '../components/ui/RiskGauge';
import Spinner from '../components/ui/Spinner';

const PremiumDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, selectedPlanId, loading, error } = useAppSelector((state) => state.premium);

  useEffect(() => {
    dispatch(fetchPremium());
  }, [dispatch]);

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-500 mb-2">{error}</p>
          <Button variant="primary" size="sm" onClick={() => dispatch(fetchPremium())}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const getInsightIcon = (icon: string) => {
    switch (icon) {
      case 'rain':
        return (
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-blue-500">
              <path d="M12 2C8.13 2 5 5.13 5 9C5 13.17 9.42 18.92 11.24 21.11C11.64 21.59 12.37 21.59 12.77 21.11C14.58 18.92 19 13.17 19 9C19 5.13 15.87 2 12 2Z" fill="currentColor"/>
            </svg>
          </div>
        );
      case 'aqi':
        return (
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-amber-500">
              <path d="M4 10H8V20H4V10ZM10 4H14V20H10V4ZM16 13H20V20H16V13Z" fill="currentColor"/>
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#6C3AED]">
              <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z" fill="currentColor"/>
            </svg>
          </div>
        );
    }
  };

  const getLevelVariant = (level: string) => {
    if (level.toLowerCase().includes('high')) return 'high';
    if (level.toLowerCase().includes('moderate')) return 'moderate';
    return 'info';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-2 cursor-pointer">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="currentColor"/>
            </svg>
            Back to Zone Selection
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Your Protection Plan</h1>
          <p className="text-sm text-gray-500 mt-1">
            Based on your working zone: <strong>{data.location}</strong>
          </p>
        </div>
        <Badge variant="info" className="flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
            <path d="M19.14 12.94C19.18 12.64 19.2 12.33 19.2 12C19.2 11.68 19.18 11.36 19.13 11.06L21.16 9.48C21.34 9.34 21.39 9.07 21.28 8.87L19.36 5.55C19.24 5.33 18.99 5.26 18.77 5.33L16.38 6.29C15.88 5.91 15.35 5.59 14.76 5.35L14.4 2.81C14.36 2.57 14.16 2.4 13.92 2.4H10.08C9.84 2.4 9.65 2.57 9.61 2.81L9.25 5.35C8.66 5.59 8.12 5.92 7.63 6.29L5.24 5.33C5.02 5.25 4.77 5.33 4.65 5.55L2.74 8.87C2.62 9.08 2.66 9.34 2.86 9.48L4.89 11.06C4.84 11.36 4.8 11.69 4.8 12C4.8 12.31 4.82 12.64 4.87 12.94L2.84 14.52C2.66 14.66 2.61 14.93 2.72 15.13L4.64 18.45C4.76 18.67 5.01 18.74 5.23 18.67L7.62 17.71C8.12 18.09 8.65 18.41 9.24 18.65L9.6 21.19C9.65 21.43 9.84 21.6 10.08 21.6H13.92C14.16 21.6 14.36 21.43 14.39 21.19L14.75 18.65C15.34 18.41 15.88 18.09 16.37 17.71L18.76 18.67C18.98 18.75 19.23 18.67 19.35 18.45L21.27 15.13C21.39 14.91 21.34 14.66 21.15 14.52L19.14 12.94Z" fill="currentColor"/>
          </svg>
          AI Risk Engine: {data.aiEngine}
        </Badge>
      </div>

      {/* Main Grid: Risk + Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Assessment */}
        <Card>
          <h2 className="text-base font-bold text-gray-800 text-center mb-2">Risk Assessment</h2>
          <p className="text-xs text-gray-500 text-center mb-6">{data.riskAssessment.source}</p>
          <div className="flex justify-center relative">
            <RiskGauge score={data.riskAssessment.score} label={data.riskAssessment.level} size={180} />
          </div>

          {/* Primary Risk Insights */}
          <div className="mt-8 border-t border-gray-100 pt-5">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-gray-400">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
              </svg>
              Primary Risk Insights
            </h3>
            <div className="space-y-3">
              {data.riskInsights.map((insight) => (
                <div key={insight.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  {getInsightIcon(insight.icon)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-gray-800">{insight.name}</p>
                      <Badge variant={getLevelVariant(insight.level)}>{insight.level}</Badge>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{insight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Plan Cards */}
        {data.plans.map((plan) => (
          <Card
            key={plan.id}
            variant={selectedPlanId === plan.id ? 'highlighted' : 'default'}
            className="relative"
          >
            {plan.isBestValue && (
              <div className="absolute -top-0 right-4">
                <Badge variant="bestValue" className="!rounded-t-none !rounded-b-lg">BEST VALUE</Badge>
              </div>
            )}

            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
              {plan.name === 'Premium Shield' && (
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#6C3AED]">
                  <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z" fill="currentColor"/>
                </svg>
              )}
            </div>
            <p className="text-xs text-gray-500 mb-4">{plan.subtitle}</p>

            <div className="mb-5">
              <span className="text-3xl font-bold text-gray-900">₹{plan.price}</span>
              <span className="text-sm text-gray-400 ml-1">/{plan.period}</span>
            </div>

            {/* Coverage Details */}
            <div className="space-y-2.5 mb-5">
              <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
                <span className="flex items-center gap-2 text-sm text-gray-600">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-emerald-500">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
                  </svg>
                  Income Cover
                </span>
                <span className="text-sm font-semibold text-gray-800">{plan.incomeCover}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
                <span className="flex items-center gap-2 text-sm text-gray-600">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-blue-500">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="currentColor"/>
                  </svg>
                  Coverage Time
                </span>
                <span className="text-sm font-semibold text-gray-800">{plan.coverageTime}</span>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-2 mb-6">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-emerald-500 flex-shrink-0">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
                  </svg>
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              variant={selectedPlanId === plan.id ? 'primary' : 'secondary'}
              size="md"
              className="w-full"
              onClick={() => dispatch(selectPlan(plan.id))}
            >
              {selectedPlanId === plan.id ? 'Plan Selected' : 'Select Plan'}
            </Button>
          </Card>
        ))}
      </div>

      {/* Subscription Summary */}
      <Card className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Subscription Summary</h2>
          <p className="text-sm text-gray-500 leading-relaxed">{data.subscriptionSummary.description}</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Weekly Total</p>
            <p className="text-3xl font-bold text-[#6C3AED]">₹{data.subscriptionSummary.weeklyTotal}</p>
            <p className="text-xs text-gray-400">+ GST (₹{data.subscriptionSummary.gst}) included</p>
          </div>
          <Button variant="primary" size="lg">
            Confirm & Subscribe
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PremiumDetails;
