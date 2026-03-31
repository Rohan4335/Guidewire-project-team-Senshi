import React, { useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchDashboard } from '../features/dashboard/slice';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import Spinner from '../components/ui/Spinner';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboard());
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
          <Button variant="primary" size="sm" onClick={() => dispatch(fetchDashboard())}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const getRiskBadgeVariant = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'high';
      case 'moderate': return 'moderate';
      default: return 'low';
    }
  };

  const getRiskIcon = (icon: string) => {
    switch (icon) {
      case 'rain':
        return (
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-blue-500">
              <path d="M12 2C8.13 2 5 5.13 5 9C5 13.17 9.42 18.92 11.24 21.11C11.64 21.59 12.37 21.59 12.77 21.11C14.58 18.92 19 13.17 19 9C19 5.13 15.87 2 12 2Z" fill="currentColor" opacity="0.3"/>
              <path d="M6.76 4.84L7.68 5.76C7.37 6.07 7.09 6.41 6.83 6.76L5.91 5.84C6.17 5.49 6.45 5.15 6.76 4.84Z" fill="currentColor"/>
            </svg>
          </div>
        );
      case 'aqi':
        return (
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-red-500">
              <path d="M4 10H8V20H4V10ZM10 4H14V20H10V4ZM16 13H20V20H16V13Z" fill="currentColor"/>
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-gray-500">
              <path d="M15 13V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V13C6.79 14.66 6.34 17.79 8 20C9.66 22.21 12.79 22.66 15 21C17.21 19.34 17.66 16.21 16 14C15.64 13.53 15.33 13.24 15 13Z" fill="currentColor"/>
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Weather Warning Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-amber-600">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-amber-800">{data.weatherWarning.title}</p>
            <p className="text-xs text-amber-600">{data.weatherWarning.message}</p>
          </div>
        </div>
        <button className="text-sm font-semibold text-amber-700 hover:text-amber-900 flex items-center gap-1 cursor-pointer whitespace-nowrap">
          View Details
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
            <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="currentColor"/>
          </svg>
        </button>
      </div>

      {/* Top Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Policy Status Card */}
        <Card className="border-l-4 border-l-[#6C3AED]">
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Policy Status</p>
            <Badge variant="active">{data.policyStatus.status}</Badge>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{data.policyStatus.planName}</h3>
          <p className="flex items-center gap-1.5 text-xs text-[#6C3AED] mb-4">
            <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
              <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="currentColor"/>
            </svg>
            Expires in {data.policyStatus.expiresIn} ({data.policyStatus.expiryDate})
          </p>
          <Button variant="secondary" size="sm" className="w-full">
            View Policy Details
          </Button>
        </Card>

        {/* Protected Earnings Card */}
        <Card>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Protected Earnings (This Week)</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">₹{data.protectedEarnings.current.toLocaleString()}</p>
          <ProgressBar
            value={data.protectedEarnings.current}
            max={data.protectedEarnings.goal}
            label={`Coverage Goal: ₹${data.protectedEarnings.goal.toLocaleString()}`}
            sublabel={`${data.protectedEarnings.percentage}% Secured`}
            className="mb-3"
          />
          <p className="text-xs text-gray-400">
            ↩ Premium Paid: ₹{data.protectedEarnings.premiumPaid} ({data.protectedEarnings.premiumNote})
          </p>
        </Card>

        {/* Anti-Fraud Status Card */}
        <Card>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Anti-Fraud Status</p>
          <div className="flex items-center gap-2 mb-4">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-emerald-500">
              <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z" fill="currentColor"/>
            </svg>
            <span className="text-lg font-bold text-gray-900">{data.antiFraud.status}</span>
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-gray-600">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                  <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="currentColor"/>
                </svg>
                GPS
              </span>
              <Badge variant="active">{data.antiFraud.gps}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-gray-600">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                  <path d="M17 1.01L7 1C5.9 1 5 1.9 5 3V21C5 22.1 5.9 23 7 23H17C18.1 23 19 22.1 19 21V3C19 1.9 18.1 1.01 17 1.01ZM17 19H7V5H17V19Z" fill="currentColor"/>
                </svg>
                Device
              </span>
              <Badge variant="active">{data.antiFraud.device}</Badge>
            </div>
          </div>
          <button className="text-xs text-[#6C3AED] font-medium mt-4 cursor-pointer hover:underline">
            View Verification Logs
          </button>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Live Disruption Risk */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Live Disruption Risk</h2>
          <p className="text-xs text-gray-500 mb-4">Current conditions in Bengaluru South Zone</p>

          <div className="space-y-3">
            {data.riskIndicators.map((indicator) => (
              <Card key={indicator.id} className="!p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getRiskIcon(indicator.icon)}
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{indicator.name}</p>
                      <p className="text-xs text-gray-500">{indicator.detail}</p>
                    </div>
                  </div>
                  <Badge variant={getRiskBadgeVariant(indicator.level)}>{indicator.level}</Badge>
                </div>
              </Card>
            ))}
          </div>

          {/* Trigger Alert */}
          <div className="mt-4 bg-[#6C3AED]/5 border border-[#6C3AED]/20 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#6C3AED]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#6C3AED]">
                  <path d="M7 2V13H10V22L17 10H13L17 2H7Z" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-[#6C3AED]">{data.triggerAlert.title}</p>
                <p className="text-xs text-gray-600 mt-1">{data.triggerAlert.message}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Automatic Payouts */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-lg font-bold text-gray-900">Recent Automatic Payouts</h2>
            <button className="text-sm font-semibold text-[#6C3AED] cursor-pointer hover:underline">View History</button>
          </div>
          <p className="text-xs text-gray-500 mb-4">Earnings credited directly to your Swiggy/Zomato wallet</p>

          <Card className="!p-0 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-5 py-3">Date</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-5 py-3">Trigger Reason</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-5 py-3">Amount</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recentPayouts.map((payout) => (
                  <tr key={payout.id} className="border-b border-gray-50 last:border-0">
                    <td className="px-5 py-3.5 text-sm text-gray-500">{payout.date}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-800">{payout.triggerReason}</td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-gray-900">₹{payout.amount}</td>
                    <td className="px-5 py-3.5">
                      <Badge variant="completed">{payout.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <p className="text-xs text-gray-400 mt-3">
            Payouts are calculated based on your platform's missed delivery volume during disruptions.
          </p>

          <button className="mt-2 text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1 cursor-pointer border border-gray-200 rounded-xl px-4 py-2">
            How is my payout calculated?
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path d="M19 19H5V5H12V3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V12H19V19ZM14 3V5H17.59L7.76 14.83L9.17 16.24L19 6.41V10H21V3H14Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
