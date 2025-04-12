import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaCalendar, FaGraduationCap, FaUserGraduate } from 'react-icons/fa';
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
    referralCode: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
    
    try {
      const response = await registerUser(formData);
      setSuccess(response.message);
      // Redirect to login page with email pre-filled after 2 seconds
      setTimeout(() => {
        navigate('/login', { state: { email: formData.email } });
      }, 2000);
    } catch (err) {
      if (err.email) {
        setError(`Email error: ${err.email[0]}`);
      } else if (err.password) {
        setError(`Password error: ${err.password[0]}`);
      } else if (err.non_field_errors) {
        setError(err.non_field_errors[0]);
      } else {
        setError(err.error || 'Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
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
        />
        
        <InputField
          id="referralCode"
          name="referralCode"
          type="text"
          value={formData.referralCode}
          onChange={handleChange}
          placeholder="Referral Code (Optional)"
          icon={<FaUser className="text-[#94a3b8]" />}
          label="Referral Code"
        />
        
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;