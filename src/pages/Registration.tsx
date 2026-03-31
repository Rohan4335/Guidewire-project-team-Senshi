import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Logo from '../components/common/Logo';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { setSelectedZone, setSelectedPlatform } from '../features/location/slice';
import { registerUser } from '../features/auth/slice';
import type { Zone, Platform } from '../types';

const platforms: Platform[] = [
  { id: 'zomato', name: 'Zomato', logo: '🟠' },
  { id: 'swiggy', name: 'Swiggy', logo: '🟧' },
  { id: 'zepto', name: 'Zepto', logo: '🟣' },
  { id: 'blinkit', name: 'Blinkit', logo: '🟡' },
];

// Component to handle map fly-to when zone changes
const MapUpdater: React.FC<{ zone: Zone | null }> = ({ zone }) => {
  const map = useMap();
  useEffect(() => {
    if (zone) {
      map.flyTo([zone.lat, zone.lng], 14, { duration: 1 });
    }
  }, [zone, map]);
  return null;
};

const Registration: React.FC = () => {
  const [searchArea, setSearchArea] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { zones, selectedZone, selectedPlatform } = useAppSelector((state) => state.location);
  const { loading, user } = useAppSelector((state) => state.auth);

  const handlePlatformSelect = (platform: Platform) => {
    dispatch(setSelectedPlatform(platform));
  };

  const handleZoneSelect = (zone: Zone) => {
    dispatch(setSelectedZone(zone));
    setSearchArea(zone.name);
  };

  const filteredZones = searchArea
    ? zones.filter((z) => z.name.toLowerCase().includes(searchArea.toLowerCase()))
    : zones;

  const handleConfirm = async () => {
    if (!selectedZone || !selectedPlatform) return;

    const result = await dispatch(
      registerUser({
        phone: user?.phone || '9876543210',
        name: user?.name || 'Delivery Partner',
        platform: selectedPlatform.name,
        zone: selectedZone.name,
        city: selectedZone.city,
      })
    );

    if (registerUser.fulfilled.match(result)) {
      navigate('/dashboard');
    }
  };

  const defaultCenter: [number, number] = [12.9352, 77.6245];

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between">
        <Logo size="md" />
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">{user?.name || 'Rahul Kumar'}</p>
            <p className="text-xs text-gray-500">{user?.role || 'Partner'}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#6C3AED]/10 flex items-center justify-center text-[#6C3AED] font-bold text-sm">
            {(user?.name || 'R').charAt(0)}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 px-6 lg:px-10 py-8">
        {/* Title + Step Indicator */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Set Up Your Protection</h1>
            <p className="text-sm text-gray-500 mt-1">
              Tell us where you work to calculate your personalized risk profile.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold">1</span>
              <span className="text-xs text-gray-400">Login</span>
            </div>
            <div className="w-8 h-px bg-gray-300" />
            <div className="flex items-center gap-1.5">
              <span className="w-6 h-6 rounded-full bg-[#6C3AED] text-white flex items-center justify-center text-xs font-bold">2</span>
              <span className="text-xs font-semibold text-[#6C3AED]">Zone</span>
            </div>
            <div className="w-8 h-px bg-gray-300" />
            <div className="flex items-center gap-1.5">
              <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold">3</span>
              <span className="text-xs text-gray-400">Plan</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Delivery Platform */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#6C3AED]">
                    <path d="M20 4H4C2.89 4 2 4.89 2 6V18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V8H20V18Z" fill="currentColor"/>
                  </svg>
                  Delivery Platform
                </h2>
                <Badge variant="info">Required</Badge>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => handlePlatformSelect(platform)}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all duration-200 cursor-pointer ${
                      selectedPlatform?.id === platform.id
                        ? 'border-[#6C3AED] bg-[#6C3AED]/5'
                        : 'border-gray-100 hover:border-gray-200 bg-white'
                    }`}
                  >
                    {selectedPlatform?.id === platform.id && (
                      <div className="self-end -mt-1 -mr-1">
                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#6C3AED]">
                          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
                        </svg>
                      </div>
                    )}
                    <span className="text-2xl">{platform.logo}</span>
                    <span className={`text-sm font-semibold ${selectedPlatform?.id === platform.id ? 'text-[#6C3AED]' : 'text-gray-700'}`}>
                      {platform.name}
                    </span>
                  </button>
                ))}
              </div>
              <p className="flex items-center gap-1.5 text-xs text-gray-400 mt-4">
                <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
                </svg>
                We sync with your primary app to verify working hours during rain or pollution spikes.
              </p>
            </Card>

            {/* Current Working Zone */}
            <Card>
              <h2 className="text-base font-bold text-gray-800 flex items-center gap-2 mb-4">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#6C3AED]">
                  <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                </svg>
                Current Working Zone
              </h2>

              {selectedZone ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{selectedZone.name}</p>
                      <p className="text-xs text-gray-500">{selectedZone.city}</p>
                    </div>
                    <Badge variant={selectedZone.riskLevel === 'High Risk' ? 'high' : selectedZone.riskLevel === 'Low Risk' ? 'low' : 'moderate'}>
                      {selectedZone.riskLevel}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500">Coverage Area:</p>
                      <p className="text-sm font-semibold text-gray-800">{selectedZone.coverageArea}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Weather Sensors:</p>
                      <p className="text-sm font-semibold text-gray-800">{selectedZone.weatherSensors} Active</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-400">Select a zone on the map or search below.</p>
              )}
            </Card>

            {/* Confirm Button */}
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleConfirm}
              loading={loading}
              disabled={!selectedZone || !selectedPlatform}
            >
              Confirm Working Zone
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 ml-1">
                <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="currentColor"/>
              </svg>
            </Button>
          </div>

          {/* Right Column - Map */}
          <div className="space-y-4">
            {/* Search + Controls */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="currentColor"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search your area (e.g. Indiranagar)"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-[#6C3AED] focus:ring-2 focus:ring-[#6C3AED]/20"
                  value={searchArea}
                  onChange={(e) => setSearchArea(e.target.value)}
                />
                {/* Search results dropdown */}
                {searchArea && filteredZones.length > 0 && !selectedZone && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                    {filteredZones.map((zone) => (
                      <button
                        key={zone.id}
                        onClick={() => handleZoneSelect(zone)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50 last:border-0"
                      >
                        <p className="text-sm font-semibold text-gray-800">{zone.name}</p>
                        <p className="text-xs text-gray-500">{zone.city}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button className="px-4 py-3 bg-[#6C3AED] text-white rounded-xl text-sm font-semibold flex items-center gap-1.5 cursor-pointer hover:bg-[#5B2ED4] transition-colors">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                  <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="currentColor"/>
                </svg>
                Drop Pin
              </button>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 h-[500px] relative">
              <MapContainer
                center={selectedZone ? [selectedZone.lat, selectedZone.lng] : defaultCenter}
                zoom={13}
                scrollWheelZoom={true}
                className="h-full w-full z-0"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapUpdater zone={selectedZone} />
                {/* Show all zones */}
                {zones.map((zone) => (
                  <Circle
                    key={zone.id}
                    center={[zone.lat, zone.lng]}
                    radius={1200}
                    pathOptions={{
                      color: selectedZone?.id === zone.id ? '#6C3AED' : '#94A3B8',
                      fillColor: selectedZone?.id === zone.id ? '#6C3AED' : '#94A3B8',
                      fillOpacity: selectedZone?.id === zone.id ? 0.15 : 0.08,
                      weight: selectedZone?.id === zone.id ? 2 : 1,
                    }}
                    eventHandlers={{
                      click: () => handleZoneSelect(zone),
                    }}
                  />
                ))}
              </MapContainer>
            </div>

            {/* Why select a zone? */}
            <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#6C3AED] flex-shrink-0 mt-0.5">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
              </svg>
              <div>
                <p className="text-sm font-semibold text-gray-800">Why select a zone?</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  GiGuard uses hyperlocal data. If rain happens in Koramangala but you work in Whitefield, your payout won't trigger. Select exactly where you spend 80% of your delivery time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
