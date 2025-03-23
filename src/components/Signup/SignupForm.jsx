import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCalendarAlt, FaUniversity, FaGraduationCap, FaUserTag, FaGift } from 'react-icons/fa';
import InputField from '../common/InputField';
import Button from '../common/Button';
import SelectField from '../common/SelectField';

const SignupForm = () => {
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
    console.log(formData);
  };

  return (
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
            <InputField
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
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
              placeholder="Doe"
              label="Last Name"
              required
            />
          </div>

          {/* Date of Birth */}
          <InputField
            id="dob"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            icon={<FaCalendarAlt className="text-[#94a3b8]" />}
            label="Date of Birth"
            required
          />

          {/* College */}
          <InputField
            id="college"
            name="college"
            type="text"
            value={formData.college}
            onChange={handleChange}
            placeholder="University Name"
            icon={<FaUniversity className="text-[#94a3b8]" />}
            label="College"
            required
          />

          {/* Year of Passing */}
          <SelectField
            id="yearOfPassing"
            name="yearOfPassing"
            value={formData.yearOfPassing}
            onChange={handleChange}
            icon={<FaGraduationCap className="text-[#94a3b8]" />}
            label="Year of Passing"
            required
            options={Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i)}
          />

          {/* Status */}
          <SelectField
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            icon={<FaUserTag className="text-[#94a3b8]" />}
            label="Status"
            required
            options={[
              { value: 'student', label: 'Student' },
              { value: 'fresher', label: 'Fresher' },
              { value: 'experienced', label: 'Experienced' }
            ]}
          />

          {/* Referral Code (Optional) */}
          <InputField
            id="referralCode"
            name="referralCode"
            type="text"
            value={formData.referralCode}
            onChange={handleChange}
            placeholder="Optional"
            icon={<FaGift className="text-[#94a3b8]" />}
            label="Referral Code (if any)"
          />

          {/* Submit Button */}
          <div className="pt-2">
            <Button type="submit">Create Account</Button>
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
  );
};

export default SignupForm;