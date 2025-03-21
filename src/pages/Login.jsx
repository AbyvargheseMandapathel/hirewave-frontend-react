import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    // Handle OTP request logic here
    console.log({ email });
    setShowOtpForm(true);
  };

  const handleSubmitOtp = (e) => {
    e.preventDefault();
    // Handle OTP verification logic here
    const otpValue = otp.join('');
    console.log({ email, otp: otpValue });
    // Redirect to dashboard or home page after successful verification
  };

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace to move to previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (!/^\d+$/.test(pastedData)) return; // Only allow numbers

    const digits = pastedData.slice(0, 6).split('');
    const newOtp = [...otp];
    
    digits.forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });
    
    setOtp(newOtp);
    
    // Focus the next empty input or the last one if all filled
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
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Enter Your Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-[#94a3b8]" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[#0f172a] text-white w-full pl-10 pr-3 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] text-white py-3 px-4 rounded-lg hover:from-[#a5b4fc] hover:to-[#818cf8] transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#818cf8] focus:ring-offset-[#1e293b]"
                  >
                    GET OTP
                  </button>
                </div>
              </form>
            ) : (
              /* OTP Form */
              <form onSubmit={handleSubmitOtp} className="space-y-6">
                {/* Back Button */}
                <button
                  type="button"
                  onClick={() => setShowOtpForm(false)}
                  className="flex items-center text-[#94a3b8] hover:text-white mb-4"
                >
                  <FaArrowLeft className="mr-2" /> Back to email
                </button>

                {/* OTP Input Fields */}
                <div>
                  <label htmlFor="otp-0" className="block text-sm font-medium text-white mb-4">
                    Enter 6-digit verification code
                  </label>
                  <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        className="bg-[#0f172a] text-white w-12 h-12 text-center rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent text-xl"
                        autoComplete="one-time-code"
                      />
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={otp.some(digit => !digit)}
                    className="w-full bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] text-white py-3 px-4 rounded-lg hover:from-[#a5b4fc] hover:to-[#818cf8] transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#818cf8] focus:ring-offset-[#1e293b] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Verify & Login
                  </button>
                </div>

                {/* Resend OTP */}
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

            {/* Sign Up Link - Only show on email form */}
            {!showOtpForm && (
              <div className="text-center mt-6">
                <p className="text-[#94a3b8]">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-[#818cf8] hover:text-[#a5b4fc] font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            )}

            {/* Social Login Options - Only show on email form */}
            {!showOtpForm && (
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#334155]"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#1e293b] text-[#94a3b8]">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-[#334155] rounded-lg bg-[#0f172a] text-sm font-medium text-[#94a3b8] hover:bg-[#1e293b]"
                  >
                    Google
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-[#334155] rounded-lg bg-[#0f172a] text-sm font-medium text-[#94a3b8] hover:bg-[#1e293b]"
                  >
                    GitHub
                  </button>
                </div>
              </div>
            )}
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