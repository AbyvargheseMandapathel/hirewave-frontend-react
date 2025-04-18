import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import OTPInput from '../components/common/OTPInput';
import Button from '../components/common/Button';
import { verifyOTP, resendOTP } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isRegistration, setIsRegistration] = useState(false);
  const [message, setMessage] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [countdown, setCountdown] = useState(0);

  // Extract email and other data from location state
  useEffect(() => {
    if (location.state) {
      setEmail(location.state.email || '');
      setIsRegistration(location.state.isRegistration || false);
      setMessage(location.state.message || '');
      
      // Get referral code if it exists
      if (location.state.referralCode) {
        setReferralCode(location.state.referralCode);
      }
    } else {
      // If no state is provided, redirect to login
      navigate('/login');
    }
  }, [location, navigate]);

  // Handle countdown for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      // Focus the last input after paste
      const lastInput = document.getElementById('otp-5');
      if (lastInput) lastInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate OTP is complete
    if (otp.join('').length !== 6) {
      setError('Please enter all 6 digits of the verification code');
      return;
    }
    
    setError('');
    setSuccess('');
    setIsLoading(true);
    
    try {
      // Include referral code in verification if it exists
      const response = await verifyOTP(email, otp.join(''), referralCode);
      
      // Login the user
      if (login && typeof login === 'function') {
        login(response.user, response.access || response.token);
      }
      
      setSuccess('Verification successful! Redirecting...');
      
      // Redirect to dashboard or home page
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      console.error('Verification error:', err);
      
      // Handle different error formats
      if (err && typeof err === 'object') {
        if (err.error) {
          setError(err.error);
        } else if (err.detail) {
          setError(err.detail);
        } else if (err.message) {
          setError(err.message);
        } else {
          setError('Invalid OTP. Please try again.');
        }
      } else {
        setError('Verification failed. Please try again.');
      }
      
      // Clear OTP on error for better UX
      setOtp(['', '', '', '', '', '']);
      
      // Focus first input for quick retry
      const firstInput = document.getElementById('otp-0');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setSuccess('');
    setIsResending(true);
    
    try {
      await resendOTP(email);
      setSuccess('OTP resent successfully! Check your email.');
      
      // Start countdown for resend button (60 seconds)
      setCountdown(60);
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      console.error('Resend OTP error:', err);
      
      if (err && typeof err === 'object' && err.error) {
        setError(err.error);
      } else {
        setError('Failed to resend OTP. Please try again.');
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a]">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-[#1e293b] rounded-xl shadow-2xl p-8 max-w-md w-full border border-[#334155]">
          <div className="mb-6">
            <button 
              onClick={() => navigate('/login')}
              className="flex items-center text-[#94a3b8] hover:text-white transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Login
            </button>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Verify Your Email</h1>
            <p className="text-[#94a3b8]">
              {message || `We've sent a verification code to ${email}`}
            </p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-800 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-900/50 border border-green-800 rounded-lg text-green-200 text-sm">
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#94a3b8] mb-2">Enter 6-digit code</label>
              <OTPInput 
                otp={otp} 
                onChange={handleOtpChange}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
              />
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || otp.join('').length !== 6}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
            
            <div className="text-center">
              <p className="text-[#94a3b8] mb-2">Didn't receive the code?</p>
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={isResending || countdown > 0}
                className="text-[#818cf8] hover:text-[#a5b4fc] transition-colors disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                {countdown > 0 
                  ? `Resend Code (${countdown}s)` 
                  : isResending 
                    ? "Sending..." 
                    : "Resend Code"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default VerifyOTP;