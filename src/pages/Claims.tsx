import React, { useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchClaims } from '../features/claims/slice';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';

const Claims: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.claims);

  useEffect(() => {
    dispatch(fetchClaims());
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
          <Button variant="primary" size="sm" onClick={() => dispatch(fetchClaims())}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'high';
      case 'moderate': return 'moderate';
      default: return 'low';
    }
  };

  const getStatIcon = (icon: string) => {
    switch (icon) {
      case 'rainfall':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-blue-400">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 13.17 9.42 18.92 11.24 21.11C11.64 21.59 12.37 21.59 12.77 21.11C14.58 18.92 19 13.17 19 9C19 5.13 15.87 2 12 2Z" fill="currentColor" opacity="0.5"/>
          </svg>
        );
      case 'aqi':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-gray-400">
            <path d="M3 17V19H9V17H3ZM3 5V7H13V5H3ZM13 21V19H21V17H13V15H11V21H13ZM7 9V11H3V13H7V15H9V9H7ZM21 13V11H11V13H21ZM15 9H17V7H21V5H17V3H15V9Z" fill="currentColor"/>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-orange-400">
            <path d="M15 13V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V13C6.79 14.66 6.34 17.79 8 20C9.66 22.21 12.79 22.66 15 21C17.21 19.34 17.66 16.21 16 14C15.64 13.53 15.33 13.24 15 13Z" fill="currentColor" opacity="0.5"/>
          </svg>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Live Trigger System</h1>
          <p className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#6C3AED]">
              <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
            </svg>
            Monitoring: <strong>{data.monitoringLocation}</strong>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="active" className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            System Online
          </Badge>
          <button className="flex items-center gap-1.5 text-sm text-gray-500 cursor-pointer hover:text-gray-700">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path d="M19.14 12.94C19.18 12.64 19.2 12.33 19.2 12C19.2 11.68 19.18 11.36 19.13 11.06L21.16 9.48C21.34 9.34 21.39 9.07 21.28 8.87L19.36 5.55C19.24 5.33 18.99 5.26 18.77 5.33L16.38 6.29C15.88 5.91 15.35 5.59 14.76 5.35L14.4 2.81C14.36 2.57 14.16 2.4 13.92 2.4H10.08C9.84 2.4 9.65 2.57 9.61 2.81L9.25 5.35C8.66 5.59 8.12 5.92 7.63 6.29L5.24 5.33C5.02 5.25 4.77 5.33 4.65 5.55L2.74 8.87C2.62 9.08 2.66 9.34 2.86 9.48L4.89 11.06C4.84 11.36 4.8 11.69 4.8 12C4.8 12.31 4.82 12.64 4.87 12.94L2.84 14.52C2.66 14.66 2.61 14.93 2.72 15.13L4.64 18.45C4.76 18.67 5.01 18.74 5.23 18.67L7.62 17.71C8.12 18.09 8.65 18.41 9.24 18.65L9.6 21.19C9.65 21.43 9.84 21.6 10.08 21.6H13.92C14.16 21.6 14.36 21.43 14.39 21.19L14.75 18.65C15.34 18.41 15.88 18.09 16.37 17.71L18.76 18.67C18.98 18.75 19.23 18.67 19.35 18.45L21.27 15.13C21.39 14.91 21.34 14.66 21.15 14.52L19.14 12.94Z" fill="currentColor"/>
            </svg>
            Trigger Logic
          </button>
        </div>
      </div>

      {/* Environment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {data.environmentStats.map((stat) => (
          <Card key={stat.id} className="text-center">
            <div className="flex justify-center mb-3">{getStatIcon(stat.icon)}</div>
            <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900">
              {stat.value} <span className="text-base font-normal text-gray-400">{stat.unit}</span>
            </p>
            <div className="mt-2">
              <Badge variant={getSeverityBadge(stat.severity)}>{stat.severity}</Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Timeline + Payout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Event Timeline */}
        <div className="lg:col-span-3">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Event Timeline</h2>
          <p className="text-xs text-gray-500 mb-6">Visualizing the automatic detection path for the current incident.</p>

          <div className="space-y-0">
            {data.eventTimeline.map((event, index) => (
              <div key={event.id} className="flex gap-4">
                {/* Timeline connector */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      event.isLive
                        ? 'bg-[#6C3AED] ring-4 ring-[#6C3AED]/20'
                        : event.status === 'completed'
                        ? 'bg-emerald-500'
                        : 'bg-gray-300'
                    }`}
                  />
                  {index < data.eventTimeline.length - 1 && (
                    <div className="w-0.5 h-full min-h-[80px] bg-gray-200" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-8">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-400">{event.time}</span>
                    {event.isLive && <Badge variant="live">LIVE NOW</Badge>}
                  </div>
                  <h3
                    className={`text-base font-bold mb-1 ${
                      event.isLive ? 'text-[#6C3AED]' : 'text-gray-900'
                    }`}
                  >
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payout Summary Card */}
        <div className="lg:col-span-2">
          <Card variant="purple" className="relative overflow-hidden">
            {/* Badge */}
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
                  <path d="M7 2V13H10V22L17 10H13L17 2H7Z" fill="currentColor"/>
                </svg>
              </div>
              <Badge variant="bestValue">PARAMETRIC TRIGGER</Badge>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{data.payoutSummary.title}</h3>
            <p className="text-sm text-white/70 leading-relaxed mb-6">{data.payoutSummary.description}</p>

            {/* Payout Details Box */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
              <p className="text-xs text-white/60 uppercase tracking-wide mb-1">Estimated Payout</p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-4xl font-bold text-white">₹{data.payoutSummary.estimatedPayout}.00</span>
                <span className="text-sm text-white/50">.{data.payoutSummary.currency}</span>
              </div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-white/60">Coverage Level</span>
                <span className="font-semibold text-amber-300">{data.payoutSummary.coverageLevel}</span>
              </div>
              <div className="border-t border-white/10 pt-2 mt-2 space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Disruption Period</span>
                  <span className="font-medium text-white">{data.payoutSummary.disruptionPeriod}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Hourly Base Protection</span>
                  <span className="font-medium text-white">₹{data.payoutSummary.hourlyProtection} / hour</span>
                </div>
              </div>
            </div>

            <Button variant="secondary" size="lg" className="w-full !bg-white !text-[#6C3AED] !border-0 hover:!bg-gray-50">
              Track Payout Status
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 ml-1">
                <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="currentColor"/>
              </svg>
            </Button>

            <p className="text-xs text-white/40 text-center mt-3 leading-relaxed">
              Payouts are processed instantly via GiGuard AI Engine. Standard bank settlement times may apply.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Claims;
