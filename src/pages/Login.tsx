import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/common/Logo';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { loginUser } from '../features/auth/slice';
import { validateField, formatPhoneNumber, phoneValidation } from '../utils/validation';

const Login: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [touched, setTouched] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error: apiError } = useAppSelector((state) => state.auth);

  // Validate phone on change - only validate when touched
  const phoneError = touched ? validateField(phone, phoneValidation) : null;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(formatPhoneNumber(value));
  };

  const handlePhoneBlur = () => {
    setTouched(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validation - set touched to show errors
    setTouched(true);
    const error = validateField(phone, phoneValidation);
    
    if (error) {
      return;
    }

    const result = await dispatch(loginUser({ phone }));
    if (loginUser.fulfilled.match(result)) {
      navigate('/dashboard');
    }
  };

  const isFormValid = !phoneError && phone.length === 10;
  const displayError = phoneError || apiError;

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between">
        <Logo size="md" />
        <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 cursor-pointer">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
            <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="currentColor"/>
          </svg>
          Back to Home
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Auth Card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Shield Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-[#6C3AED]/10 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-[#6C3AED]">
                <path
                  d="M12 2L3 7V12C3 17.55 6.84 22.74 12 24C17.16 22.74 21 17.55 21 12V7L12 2ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">Welcome to GiGuard</h1>
          <p className="text-sm text-gray-500 text-center mb-8">
            Enter your phone number to secure your weekly earnings.
          </p>

          {/* Error Alert */}
          {displayError && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              <span className="text-sm text-red-600 font-medium">{displayError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <Input
              label="Mobile Number"
              prefix={
                <span className="flex items-center gap-1.5 text-sm">
                  <span>🇮🇳</span>
                  <span className="font-medium text-gray-700">+91</span>
                </span>
              }
              type="tel"
              placeholder="Enter 10 digit number"
              value={phone}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
              maxLength={10}
              error={phoneError || undefined}
            />

            <p className="flex items-center gap-1.5 text-xs text-gray-400 mt-2 mb-6">
              <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
              </svg>
              Trusted by 50,000+ delivery partners in India
            </p>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mb-4"
              disabled={!isFormValid || loading}
            >
              Get OTP
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 ml-1">
                <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="currentColor"/>
              </svg>
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* WhatsApp Login */}
          <Button variant="secondary" size="md" className="w-full">
            <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 text-[#6C3AED]" fill="currentColor">
              <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z"/>
            </svg>
            WhatsApp Login
          </Button>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-500 mt-4">
            New partner?{' '}
            <Link to="/register" className="text-[#6C3AED] font-semibold hover:underline">
              Set up your zone →
            </Link>
          </p>

          {/* Security Notice */}
          <div className="flex items-start gap-2 mt-6 p-3 bg-gray-50 rounded-xl">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0">
              <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8Z" fill="currentColor"/>
            </svg>
            <p className="text-xs text-gray-500 leading-relaxed">
              Your data is 100% secure. We use bank-grade encryption to protect your profile and payouts.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Features Bar */}
      <div className="bg-white border-t border-gray-100 py-6 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#6C3AED]/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#6C3AED]">
                <path d="M17 1.01L7 1C5.9 1 5 1.9 5 3V21C5 22.1 5.9 23 7 23H17C18.1 23 19 22.1 19 21V3C19 1.9 18.1 1.01 17 1.01ZM17 19H7V5H17V19Z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800">Paperless Sign-up</h3>
              <p className="text-xs text-gray-500 mt-0.5">Get covered in under 2 minutes with zero paperwork.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-amber-500">
                <path d="M11.8 10.9C9.53 10.31 8.8 9.7 8.8 8.75C8.8 7.66 9.81 6.9 11.5 6.9C13.28 6.9 13.94 7.75 14 9H16.21C16.14 7.28 15.09 5.7 13 5.19V3H10V5.16C8.06 5.58 6.5 6.84 6.5 8.77C6.5 11.08 8.41 12.23 11.2 12.9C13.7 13.5 14.2 14.38 14.2 15.31C14.2 16 13.71 17.1 11.5 17.1C9.44 17.1 8.63 16.18 8.52 15H6.32C6.44 17.19 8.08 18.42 10 18.83V21H13V18.85C14.95 18.48 16.5 17.35 16.5 15.3C16.5 12.46 14.07 11.49 11.8 10.9Z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800">Automatic Payouts</h3>
              <p className="text-xs text-gray-500 mt-0.5">No claim forms. Payouts trigger automatically on weather events.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-emerald-500">
                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800">Licensed Protection</h3>
              <p className="text-xs text-gray-500 mt-0.5">Underwritten by top A-rated insurance providers.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-3 text-xs text-gray-400 bg-white border-t border-gray-50">
        © 2024 GiGuard Parametric Insurance. Licensed by IRDAI Sandbox.
      </footer>
    </div>
  );
};

export default Login;
