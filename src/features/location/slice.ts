import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { LocationState, Zone, Platform } from '../../types';

const initialState: LocationState = {
  zones: [
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
  ],
  selectedZone: null,
  selectedPlatform: null,
  loading: false,
  error: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setSelectedZone: (state, action: PayloadAction<Zone>) => {
      state.selectedZone = action.payload;
    },
    setSelectedPlatform: (state, action: PayloadAction<Platform>) => {
      state.selectedPlatform = action.payload;
    },
    clearLocation: (state) => {
      state.selectedZone = null;
      state.selectedPlatform = null;
    },
  },
});

export const { setSelectedZone, setSelectedPlatform, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;
