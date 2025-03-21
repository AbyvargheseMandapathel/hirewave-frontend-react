import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCalendarAlt, FaUniversity, FaGraduationCap, FaUserTag, FaGift } from 'react-icons/fa';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    college: '',
    yearOfPassing: '',
    status: '',
    referralCode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log(formData);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-200px)]">
      {/* Left Column - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-[#1e293b] rounded-xl shadow-2xl p-8 border border-[#334155]">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
              <p className="text-[#94a3b8]">
                Join our community and find your dream job
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-[#94a3b8]" />
                    </div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="bg-[#0f172a] text-white w-full pl-10 pr-3 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-[#0f172a] text-white w-full px-3 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-white mb-2">
                  Date of Birth
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendarAlt className="text-[#94a3b8]" />
                  </div>
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    required
                    value={formData.dob}
                    onChange={handleChange}
                    className="bg-[#0f172a] text-white w-full pl-10 pr-3 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
                  />
                </div>
              </div>

              {/* College */}
              <div>
                <label htmlFor="college" className="block text-sm font-medium text-white mb-2">
                  College
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUniversity className="text-[#94a3b8]" />
                  </div>
                  <input
                    id="college"
                    name="college"
                    type="text"
                    required
                    value={formData.college}
                    onChange={handleChange}
                    className="bg-[#0f172a] text-white w-full pl-10 pr-3 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
                    placeholder="University Name"
                  />
                </div>
              </div>

              {/* Year of Passing */}
              <div>
                <label htmlFor="yearOfPassing" className="block text-sm font-medium text-white mb-2">
                  Year of Passing
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaGraduationCap className="text-[#94a3b8]" />
                  </div>
                  <select
                    id="yearOfPassing"
                    name="yearOfPassing"
                    required
                    value={formData.yearOfPassing}
                    onChange={handleChange}
                    className="bg-[#0f172a] text-white w-full pl-10 pr-3 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent appearance-none"
                  >
                    <option value="" disabled>Select Year</option>
                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-white mb-2">
                  Status
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUserTag className="text-[#94a3b8]" />
                  </div>
                  <select
                    id="status"
                    name="status"
                    required
                    value={formData.status}
                    onChange={handleChange}
                    className="bg-[#0f172a] text-white w-full pl-10 pr-3 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent appearance-none"
                  >
                    <option value="" disabled>Select Status</option>
                    <option value="student">Student</option>
                    <option value="fresher">Fresher</option>
                    <option value="experienced">Experienced</option>
                  </select>
                </div>
              </div>

              {/* Referral Code (Optional) */}
              <div>
                <label htmlFor="referralCode" className="block text-sm font-medium text-white mb-2">
                  Referral Code (if any)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaGift className="text-[#94a3b8]" />
                  </div>
                  <input
                    id="referralCode"
                    name="referralCode"
                    type="text"
                    value={formData.referralCode}
                    onChange={handleChange}
                    className="bg-[#0f172a] text-white w-full pl-10 pr-3 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
                    placeholder="Optional"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] text-white py-3 px-4 rounded-lg hover:from-[#a5b4fc] hover:to-[#818cf8] transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#818cf8] focus:ring-offset-[#1e293b]"
                >
                  Create Account
                </button>
              </div>
            </form>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-[#94a3b8]">
                Already have an account?{' '}
                <Link to="/login" className="text-[#818cf8] hover:text-[#a5b4fc] font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Image (visible only on desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0f172a] items-center justify-center p-4">
        <div className="max-w-lg">
          <img 
            src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
            alt="Signup" 
            className="rounded-xl shadow-2xl object-cover"
          />
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Start Your Career Journey</h2>
            <p className="text-[#94a3b8]">
              Create an account to access personalized job recommendations and connect with top employers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;