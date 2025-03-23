import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import SocialLoginButtons from '../components/common/SocialLoginButtons';
import OTPInput from '../components/common/OTPInput';

const Login = () => {
  const [email, setEmail] = useState('');
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    console.log({ email });
    setShowOtpForm(true);
  };

  const handleSubmitOtp = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    console.log({ email, otp: otpValue });
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
                  ? `We've sent a 6-digit code to ${email}` 
                  : "Sign in to access your account"}
              </p>
            </div>

            {/* Email Form */}
            {!showOtpForm ? (
              <form onSubmit={handleSubmitEmail} className="space-y-6">
                <InputField
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  icon={<FaEnvelope className="text-[#94a3b8]" />}
                />
                <Button type="submit">GET OTP</Button>
              </form>
            ) : (
              /* OTP Form */
              <form onSubmit={handleSubmitOtp} className="space-y-6">
                <button
                  type="button"
                  onClick={() => setShowOtpForm(false)}
                  className="flex items-center text-[#94a3b8] hover:text-white mb-4"
                >
                  <FaArrowLeft className="mr-2" /> Back to email
                </button>
                <OTPInput
                  otp={otp}
                  handleOtpChange={handleOtpChange}
                  handleKeyDown={handleKeyDown}
                  handlePaste={handlePaste}
                />
                <Button type="submit" disabled={otp.some(digit => !digit)}>
                  Verify & Login
                </Button>
                <div className="text-center mt-4">
                  <button
                    type="button"
                    className="text-[#818cf8] hover:text-[#a5b4fc] text-sm"
                  >
                    Didn't receive the code? Resend
                  </button>
                </div>
              </form>
            )}

            {/* Sign Up Links */}
            {!showOtpForm && (
              <div className="text-center mt-6">
                <p className="text-[#94a3b8]">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-[#818cf8] hover:text-[#a5b4fc] font-medium">
                    Sign up
                  </Link>
                </p>
                <p className="text-[#94a3b8] mt-2">
                  Are you a recruiter?{' '}
                  <Link to="/signup-recruiter" className="text-[#818cf8] hover:text-[#a5b4fc] font-medium">
                    Sign up as a Recruiter
                  </Link>
                </p>
              </div>
            )}

            {/* Social Login Options */}
            {!showOtpForm && <SocialLoginButtons />}
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
            <h2 className="text-2xl font-bold text-white mb-2">Find Your Dream Job</h2>
            <p className="text-[#94a3b8]">
              Connect with top employers and discover opportunities that match your skills and aspirations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;