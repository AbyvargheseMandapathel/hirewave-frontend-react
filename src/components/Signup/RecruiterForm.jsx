import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBuilding, FaUserTie, FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa';
import Button from '../common/Button';
import InputField from '../common/InputField';

const RecruiterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    jobTitle: '',
    phoneNumber: '',
    companyWebsite: '',
    companySize: '',
    industry: '',
    agreeToTerms: false
  });
  
  // State for email verification step
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    console.log('Sending verification code to:', formData.email);
    // Here you would typically call an API to send OTP to the email
    setShowEmailVerification(true);
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

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    const finalData = { ...formData, otp: otpValue };
    console.log('Recruiter signup data with OTP verification:', finalData);
    
    if (onSubmit) {
      onSubmit(finalData);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-[#1e293b] rounded-xl shadow-2xl p-8 border border-[#334155]">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {showEmailVerification ? "Verify Your Email" : "Recruiter Signup"}
          </h1>
          <p className="text-[#94a3b8]">
            {showEmailVerification 
              ? `We've sent a 6-digit code to ${formData.email}` 
              : "Join our platform to find the best talent for your company"}
          </p>
        </div>

        {/* Form */}
        {!showEmailVerification ? (
          <form onSubmit={handleInitialSubmit} className="space-y-4">
            {/* Personal Information */}
            <div className="mb-6">
              <h2 className="text-lg font-medium text-white mb-4 border-b border-[#334155] pb-2">
                Personal Information
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <InputField
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  icon={<FaUserTie className="text-[#94a3b8]" />}
                  label="First Name"
                  required
                />
                <InputField
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  label="Last Name"
                  required
                />
              </div>
              <InputField
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                icon={<FaEnvelope className="text-[#94a3b8]" />}
                label="Email Address"
                required
              />
            </div>

            {/* Company Information */}
            <div className="mb-6">
              <h2 className="text-lg font-medium text-white mb-4 border-b border-[#334155] pb-2">
                Company Information
              </h2>
              <InputField
                id="companyName"
                name="companyName"
                type="text"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Acme Inc."
                icon={<FaBuilding className="text-[#94a3b8]" />}
                label="Company Name"
                required
              />
              <div className="grid grid-cols-2 gap-4 mt-4">
                <InputField
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="HR Manager"
                  icon={<FaUserTie className="text-[#94a3b8]" />}
                  label="Job Title"
                  required
                />
                <InputField
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  icon={<FaPhone className="text-[#94a3b8]" />}
                  label="Phone Number"
                />
              </div>
              <InputField
                id="companyWebsite"
                name="companyWebsite"
                type="url"
                value={formData.companyWebsite}
                onChange={handleChange}
                placeholder="https://example.com"
                icon={<FaGlobe className="text-[#94a3b8]" />}
                label="Company Website"
              />
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="companySize" className="block text-sm font-medium text-white mb-2">
                    Company Size
                  </label>
                  <select
                    id="companySize"
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    className="bg-[#0f172a] text-white w-full px-4 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
                    required
                  >
                    <option value="">Select size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501+">501+ employees</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-white mb-2">
                    Industry
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="bg-[#0f172a] text-white w-full px-4 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
                    required
                  >
                    <option value="">Select industry</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="education">Education</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="w-4 h-4 bg-[#0f172a] border border-[#334155] rounded focus:ring-[#818cf8] focus:ring-2"
                  required
                />
              </div>
              <label htmlFor="agreeToTerms" className="ml-2 text-sm text-[#94a3b8]">
                I agree to the <Link to="/terms" className="text-[#818cf8] hover:text-[#a5b4fc]">Terms of Service</Link> and <Link to="/privacy" className="text-[#818cf8] hover:text-[#a5b4fc]">Privacy Policy</Link>
              </label>
            </div>

            <Button type="submit">Continue with Email</Button>
          </form>
        ) : (
          // OTP Verification Form
          <form onSubmit={handleFinalSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-4 text-center">
                Enter the 6-digit verification code
              </label>
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    maxLength={1}
                    className="w-12 h-12 text-center text-xl bg-[#0f172a] text-white rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
                  />
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="text-[#94a3b8] text-sm mb-4">
                Didn't receive the code? <button type="button" className="text-[#818cf8] hover:text-[#a5b4fc]">Resend</button>
              </p>
            </div>

            <div className="flex space-x-4">
              <Button 
                type="button" 
                className="flex-1 bg-[#0f172a] text-[#94a3b8] border border-[#334155] hover:bg-[#1e293b]"
                onClick={() => setShowEmailVerification(false)}
              >
                Back
              </Button>
              <Button type="submit" className="flex-1">
                Verify & Create Account
              </Button>
            </div>
          </form>
        )}

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-[#94a3b8]">
            Already have an account?{' '}
            <Link to="/login" className="text-[#818cf8] hover:text-[#a5b4fc]">
              Sign in
            </Link>
          </p>
          <p className="text-[#94a3b8] mt-2">
            Looking for a job?{' '}
            <Link to="/signup" className="text-[#818cf8] hover:text-[#a5b4fc]">
              Sign up as a job seeker
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecruiterForm;