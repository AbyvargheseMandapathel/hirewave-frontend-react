import React, { useState,useEffect } from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft, FaUserTie } from 'react-icons/fa';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import SocialLoginButtons from '../components/common/SocialLoginButtons';
import OTPInput from '../components/common/OTPInput';
import { requestOTP, verifyOTP, resendOTP } from '../services/authService';
import Navbar from '../components/Navbar';


const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [returnUrl, setReturnUrl] = useState('/');

  // Extract returnUrl from query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const returnPath = params.get('returnUrl');
    if (returnPath) {
      setReturnUrl(returnPath);
    }
  }, [location]);

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await requestOTP(email);
      setShowOtpForm(true);
    } catch (err) {
      setError(err.error || 'Failed to send OTP. Please try again.');
      // Add a signup link if the error is about unregistered user
      if (err.error && err.error.includes('No account found')) {
        setError(
          <>
            {err.error} <Link to="/signup" className="text-[#818cf8] hover:underline">Sign up here</Link>.
          </>
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate OTP before submission
    const otpString = otp.join('');
    if (otpString.length !== 6 || !/^\d{6}$/.test(otpString)) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log('Sending OTP:', { email, otpString });
      
      const response = await verifyOTP(email, otp);
      console.log('Login successful:', response);
      
      // Add a small delay to ensure localStorage is updated
      setTimeout(() => {
        // Redirect to dashboard router instead of returnUrl
        navigate('/dashboard');
      }, 500);
    } catch (err) {
      console.error('OTP verification error:', err);
      setError(err.error || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setIsLoading(true);
    
    try {
      await resendOTP(email);
      setOtp(['', '', '', '', '', '']);
    } catch (err) {
      setError(err.error || 'Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
    const pastedData = e.clipboardData.getData('text');
    if (!/^\d+$/.test(pastedData)) return;
    const digits = pastedData.slice(0, 6).split('');
    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });
    setOtp(newOtp);
    for (let i = digits.length; i < 6; i++) {
      const nextInput = document.getElementById(`otp-${i}`);
      if (nextInput) {
        nextInput.focus();
        break;
      }
      if (i === 5) document.getElementById('otp-5').focus();
    }
  };

  return (
    <>
    <Navbar/>
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-200px)]">
      {/* Left Column - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-[#1e293b] rounded-xl shadow-2xl p-8 border border-[#334155]">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                {showOtpForm ? "Verify Your Email" : "Welcome Back"}
              </h1>
              <p className="text-[#94a3b8]">
                {showOtpForm 
                  ? `We've sent a verification code to ${email}`
                  : "Login to access your account"
                }
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-800 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}

            {/* Email Form */}
            {!showOtpForm ? (
              <form onSubmit={handleSubmitEmail} className="space-y-4">
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  icon={<FaEnvelope className="text-[#94a3b8]" />}
                  label="Email Address"
                  required
                />
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Continue with Email"}
                </Button>
                
                <div className="relative flex items-center justify-center my-6">
                  <div className="border-t border-[#334155] w-full"></div>
                  <div className="bg-[#1e293b] px-3 text-[#94a3b8] text-sm absolute">or</div>
                </div>
                
                <SocialLoginButtons />
                
                <div className="text-center mt-6">
                  <p className="text-[#94a3b8]">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-[#818cf8] hover:text-[#a5b4fc]">
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            ) : (
              /* OTP Verification Form */
              <form onSubmit={handleSubmitOtp} className="space-y-4">
                <div className="mb-6">
                  <button
                    type="button"
                    onClick={() => setShowOtpForm(false)}
                    className="flex items-center text-[#94a3b8] hover:text-white"
                  >
                    <FaArrowLeft className="mr-2" /> Change email
                  </button>
                </div>
                
                <div className="mb-6">
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
                  disabled={isLoading || otp.some(digit => digit === '')}
                >
                  {isLoading ? "Verifying..." : "Verify & Login"}
                </Button>
                
                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-[#818cf8] hover:text-[#a5b4fc]"
                    disabled={isLoading}
                  >
                    Resend Code
                  </button>
                </div>
              </form>
            )}
          </div>
          
          {/* Add recruiter signup link */}
          <div className="mt-4 flex justify-center items-center bg-[#0f172a] p-3 rounded-lg border border-[#334155]">
            <FaUserTie className="text-[#818cf8] mr-2" />
            <span className="text-[#94a3b8]">Are you hiring? </span>
            <Link to="/recruiter-signup" className="text-[#818cf8] hover:text-[#a5b4fc] font-medium ml-2">
              Sign up as a recruiter
            </Link>
          </div>
        </div>
      </div>

      {/* Right Column - Image (visible only on desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0f172a] items-center justify-center p-4">
        <div className="max-w-lg">
          <img 
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80" 
            alt="Login" 
            className="rounded-xl shadow-2xl object-cover"
          />
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back!</h2>
            <p className="text-[#94a3b8]">
              Log in to access your personalized job recommendations and track your applications.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;