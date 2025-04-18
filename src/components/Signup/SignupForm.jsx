import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaCalendar, FaGraduationCap, FaUserGraduate, FaUserFriends } from 'react-icons/fa';
import InputField from '../common/InputField';
import Button from '../common/Button';
import { registerUser } from '../../services/authService';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm_password: '',
    dob: '',
    college: '',
    yearOfPassing: '',
    status: '',
    referralCode: 'NEW' // Default referral code
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Required fields validation
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirm_password) {
      errors.confirm_password = 'Passwords do not match';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    setIsSubmitting(true);
    
    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      setIsLoading(false);
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Ensure referral code is 'NEW' if empty
      const referralCode = formData.referralCode.trim() || 'NEW';
      
      // Format the data according to backend expectations
      const userData = {
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirm_password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dob: formData.dob || null,
        college: formData.college || '',
        yearOfPassing: formData.yearOfPassing || '',
        status: formData.status || '',
        referralCode: referralCode,
        user_type: 'jobseeker'
      };
      
      // Call the registration service
      const response = await registerUser(userData);
      
      // Show success message
      setSuccess(response.message || 'Registration successful! Redirecting to verification...');
      
      // If successful, redirect to OTP verification page after a short delay
      setTimeout(() => {
        navigate('/verify-otp', { 
          state: { 
            email: formData.email,
            isRegistration: true,
            referralCode: referralCode, // Pass referral code to verification page
            message: response.message || 'Please enter the verification code sent to your email'
          } 
        });
      }, 1500);
    } catch (err) {
      console.error('Registration error:', err);
      
      // Handle backend validation errors
      if (err && typeof err === 'object') {
        // Check for specific field errors
        const fieldErrors = {};
        let hasFieldErrors = false;
        
        for (const field of ['email', 'password', 'firstName', 'lastName', 'confirm_password', 'referralCode']) {
          if (err[field]) {
            fieldErrors[field] = Array.isArray(err[field]) ? err[field][0] : err[field];
            hasFieldErrors = true;
          }
        }
        
        if (hasFieldErrors) {
          setFormErrors(fieldErrors);
          setError('Please correct the errors below');
        } else if (err.error) {
          setError(err.error);
        } else if (err.detail) {
          setError(err.detail);
        } else {
          setError('Registration failed. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#1e293b] rounded-xl shadow-2xl p-8 border border-[#334155]">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-[#94a3b8]">Join HireWave to find your dream job</p>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-800 rounded-lg text-red-200 text-sm">
          {error}
        </div>
      )}
      
      {/* Success message */}
      {success && (
        <div className="mb-4 p-3 bg-green-900/50 border border-green-800 rounded-lg text-green-200 text-sm">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            icon={<FaUser className="text-[#94a3b8]" />}
            label="First Name"
            required
            error={formErrors.firstName}
          />
          
          <InputField
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            icon={<FaUser className="text-[#94a3b8]" />}
            label="Last Name"
            required
            error={formErrors.lastName}
          />
        </div>
        
        <InputField
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          icon={<FaEnvelope className="text-[#94a3b8]" />}
          label="Email Address"
          required
          error={formErrors.email}
        />
        
        <InputField
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create Password"
          icon={<FaLock className="text-[#94a3b8]" />}
          label="Password"
          required
          error={formErrors.password}
        />
        
        <InputField
          id="confirm_password"
          name="confirm_password"
          type="password"
          value={formData.confirm_password}
          onChange={handleChange}
          placeholder="Confirm Password"
          icon={<FaLock className="text-[#94a3b8]" />}
          label="Confirm Password"
          required
          error={formErrors.confirm_password}
        />
        
        <InputField
          id="dob"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          placeholder="Date of Birth"
          icon={<FaCalendar className="text-[#94a3b8]" />}
          label="Date of Birth"
          error={formErrors.dob}
        />
        
        <InputField
          id="college"
          name="college"
          type="text"
          value={formData.college}
          onChange={handleChange}
          placeholder="College/University"
          icon={<FaGraduationCap className="text-[#94a3b8]" />}
          label="College/University"
          error={formErrors.college}
        />
        
        <InputField
          id="yearOfPassing"
          name="yearOfPassing"
          type="text"
          value={formData.yearOfPassing}
          onChange={handleChange}
          placeholder="Year of Passing"
          icon={<FaUserGraduate className="text-[#94a3b8]" />}
          label="Year of Passing"
          error={formErrors.yearOfPassing}
        />
        
        <InputField
          id="status"
          name="status"
          type="text"
          value={formData.status}
          onChange={handleChange}
          placeholder="Current Status"
          icon={<FaUser className="text-[#94a3b8]" />}
          label="Current Status"
          error={formErrors.status}
        />
        
        <InputField
          id="referralCode"
          name="referralCode"
          type="text"
          value={formData.referralCode}
          onChange={handleChange}
          placeholder="Referral Code "
          icon={<FaUserFriends className="text-[#94a3b8]" />}
          label="Referral Code"
          error={formErrors.referralCode}
          helperText="Enter a referral code"
        />
        
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || isSubmitting}
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;