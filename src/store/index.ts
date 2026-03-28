import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/slice';
import policyReducer from '../features/policy/slice';
import claimsReducer from '../features/claims/slice';
import premiumReducer from '../features/premium/slice';
import locationReducer from '../features/location/slice';
import dashboardReducer from '../features/dashboard/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    policy: policyReducer,
    claims: claimsReducer,
    premium: premiumReducer,
    location: locationReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
