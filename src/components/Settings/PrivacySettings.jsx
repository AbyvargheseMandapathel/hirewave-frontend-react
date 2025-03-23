import React, { useState } from 'react';
import { FaToggleOn, FaToggleOff, FaCheck, FaShieldAlt, FaUserSecret, FaGlobe, FaDownload, FaTrash } from 'react-icons/fa';

const PrivacySettings = () => {
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    activityTracking: true,
    searchIndexing: true,
    dataCollection: true
  });

  const handleChange = (field, value) => {
    setPrivacy(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Privacy settings saved:', privacy);
    // Save privacy settings
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Privacy Settings</h2>
      
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <FaGlobe className="text-[#818cf8] mr-2" />
          <h3 className="text-lg font-medium text-white">Profile Visibility</h3>
        </div>
        
        <div className="bg-[#0f172a] p-4 rounded-lg border border-[#334155] mb-4">
          <h4 className="text-white font-medium mb-3">Who can see your profile?</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="public"
                name="profileVisibility"
                checked={privacy.profileVisibility === 'public'}
                onChange={() => handleChange('profileVisibility', 'public')}
                className="mr-2 accent-[#818cf8]"
              />
              <label htmlFor="public" className="text-[#94a3b8]">
                Public - Anyone can view your profile
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="recruiters"
                name="profileVisibility"
                checked={privacy.profileVisibility === 'recruiters'}
                onChange={() => handleChange('profileVisibility', 'recruiters')}
                className="mr-2 accent-[#818cf8]"
              />
              <label htmlFor="recruiters" className="text-[#94a3b8]">
                Recruiters Only - Only recruiters can view your profile
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="private"
                name="profileVisibility"
                checked={privacy.profileVisibility === 'private'}
                onChange={() => handleChange('profileVisibility', 'private')}
                className="mr-2 accent-[#818cf8]"
              />
              <label htmlFor="private" className="text-[#94a3b8]">
                Private - Your profile is hidden from search results
              </label>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
            <div>
              <h4 className="text-white font-medium">Show Email Address</h4>
              <p className="text-[#94a3b8] text-sm mt-1">
                Allow others to see your email address on your profile
              </p>
            </div>
            <button
              onClick={() => handleChange('showEmail', !privacy.showEmail)}
              className="text-2xl text-[#818cf8] focus:outline-none"
            >
              {privacy.showEmail ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
          
          <div className="flex items-center justify-between bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
            <div>
              <h4 className="text-white font-medium">Show Phone Number</h4>
              <p className="text-[#94a3b8] text-sm mt-1">
                Allow others to see your phone number on your profile
              </p>
            </div>
            <button
              onClick={() => handleChange('showPhone', !privacy.showPhone)}
              className="text-2xl text-[#818cf8] focus:outline-none"
            >
              {privacy.showPhone ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-8 border-t border-[#334155] pt-8">
        <div className="flex items-center mb-4">
          <FaUserSecret className="text-[#818cf8] mr-2" />
          <h3 className="text-lg font-medium text-white">Data & Tracking</h3>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
            <div>
              <h4 className="text-white font-medium">Activity Tracking</h4>
              <p className="text-[#94a3b8] text-sm mt-1">
                Allow us to track your activity to improve your experience
              </p>
            </div>
            <button
              onClick={() => handleChange('activityTracking', !privacy.activityTracking)}
              className="text-2xl text-[#818cf8] focus:outline-none"
            >
              {privacy.activityTracking ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
          
          <div className="flex items-center justify-between bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
            <div>
              <h4 className="text-white font-medium">Search Indexing</h4>
              <p className="text-[#94a3b8] text-sm mt-1">
                Allow your profile to appear in search results
              </p>
            </div>
            <button
              onClick={() => handleChange('searchIndexing', !privacy.searchIndexing)}
              className="text-2xl text-[#818cf8] focus:outline-none"
            >
              {privacy.searchIndexing ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
          
          <div className="flex items-center justify-between bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
            <div>
              <h4 className="text-white font-medium">Data Collection</h4>
              <p className="text-[#94a3b8] text-sm mt-1">
                Allow us to collect data to improve our services
              </p>
            </div>
            <button
              onClick={() => handleChange('dataCollection', !privacy.dataCollection)}
              className="text-2xl text-[#818cf8] focus:outline-none"
            >
              {privacy.dataCollection ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-8 border-t border-[#334155] pt-8">
        <div className="flex items-center mb-4">
          <FaShieldAlt className="text-[#818cf8] mr-2" />
          <h3 className="text-lg font-medium text-white">Your Data</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center justify-center bg-[#0f172a] p-4 rounded-lg border border-[#334155] hover:bg-[#1e293b]">
            <FaDownload className="mr-2 text-[#818cf8]" />
            <span className="text-white">Download Your Data</span>
          </button>
          
          <button className="flex items-center justify-center bg-[#0f172a] p-4 rounded-lg border border-red-900 hover:bg-red-900/20 text-red-400 hover:text-red-300">
            <FaTrash className="mr-2" />
            <span>Delete Your Account</span>
          </button>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] text-white py-2 px-6 rounded-lg hover:from-[#a5b4fc] hover:to-[#818cf8] transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#818cf8] focus:ring-offset-[#1e293b]"
        >
          <FaCheck className="mr-2" /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default PrivacySettings;