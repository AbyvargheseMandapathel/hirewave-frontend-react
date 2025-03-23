import React, { useState } from 'react';
import { FaCamera, FaCheck } from 'react-icons/fa';

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    title: 'Senior Developer',
    bio: 'Experienced software developer with a passion for creating elegant solutions to complex problems.',
    location: 'San Francisco, CA',
    website: 'https://johnsmith.dev'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save profile data
    console.log('Profile data saved:', formData);
    // Show success message
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Profile Settings</h2>
      
      <div className="mb-8 flex flex-col items-center">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-[#334155] flex items-center justify-center overflow-hidden">
            <img 
              src="https://via.placeholder.com/150" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-0 right-0 bg-[#818cf8] text-white p-2 rounded-full hover:bg-[#a5b4fc] transition-colors">
            <FaCamera />
          </button>
        </div>
        <p className="text-[#94a3b8] text-sm">Click the camera icon to upload a new photo</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-[#0f172a] text-white w-full px-4 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-[#0f172a] text-white w-full px-4 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="bg-[#0f172a] text-white w-full px-4 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
              Job Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="bg-[#0f172a] text-white w-full px-4 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="bio" className="block text-sm font-medium text-white mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows="4"
              value={formData.bio}
              onChange={handleChange}
              className="bg-[#0f172a] text-white w-full px-4 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
            ></textarea>
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-white mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="bg-[#0f172a] text-white w-full px-4 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-white mb-2">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="bg-[#0f172a] text-white w-full px-4 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] text-white py-2 px-6 rounded-lg hover:from-[#a5b4fc] hover:to-[#818cf8] transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#818cf8] focus:ring-offset-[#1e293b]"
          >
            <FaCheck className="mr-2" /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;