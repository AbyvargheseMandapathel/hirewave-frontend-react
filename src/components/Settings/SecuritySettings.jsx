import React, { useState } from 'react';
import { FaCheck, FaToggleOn, FaToggleOff, FaShieldAlt, FaKey } from 'react-icons/fa';

const SecuritySettings = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [sessionData, setSessionData] = useState({
    rememberLogin: true,
    sessionTimeout: '30'
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSessionChange = (e) => {
    const { name, value } = e.target;
    setSessionData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Validate and update password
    console.log('Password update:', passwordData);
  };

  const toggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Security Settings</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-white mb-4">Change Password</h3>
        <form onSubmit={handlePasswordSubmit}>
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-white mb-2">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="bg-[#0f172a] text-white w-full px-4 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-white mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="bg-[#0f172a] text-white w-full px-4 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="bg-[#0f172a] text-white w-full px-4 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] text-white py-2 px-6 rounded-lg hover:from-[#a5b4fc] hover:to-[#818cf8] transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#818cf8] focus:ring-offset-[#1e293b]"
            >
              <FaKey className="mr-2" /> Update Password
            </button>
          </div>
        </form>
      </div>
      
      <div className="mb-8 border-t border-[#334155] pt-8">
        <h3 className="text-lg font-medium text-white mb-4">Two-Factor Authentication</h3>
        <div className="bg-[#0f172a] p-4 rounded-lg border border-[#334155] mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Enable Two-Factor Authentication</h4>
              <p className="text-[#94a3b8] text-sm mt-1">
                Add an extra layer of security to your account by requiring a verification code in addition to your password.
              </p>
            </div>
            <button
              onClick={toggleTwoFactor}
              className="text-2xl text-[#818cf8] focus:outline-none"
            >
              {twoFactorEnabled ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
        </div>
        
        {twoFactorEnabled && (
          <div className="bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
            <div className="flex items-start">
              <div className="bg-[#334155] p-3 rounded-lg mr-4">
                <FaShieldAlt className="text-[#818cf8] text-xl" />
              </div>
              <div>
                <h4 className="text-white font-medium">Two-Factor Authentication is Enabled</h4>
                <p className="text-[#94a3b8] text-sm mt-1">
                  You'll be asked for a verification code when you sign in on a new device or browser.
                </p>
                <button className="mt-3 text-[#818cf8] text-sm hover:text-[#a5b4fc]">
                  Configure authentication app
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mb-8 border-t border-[#334155] pt-8">
        <h3 className="text-lg font-medium text-white mb-4">Session Settings</h3>
        <form>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
              <div>
                <h4 className="text-white font-medium">Remember Login</h4>
                <p className="text-[#94a3b8] text-sm mt-1">
                  Stay logged in for 30 days unless you manually log out
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSessionData(prev => ({ ...prev, rememberLogin: !prev.rememberLogin }))}
                className="text-2xl text-[#818cf8] focus:outline-none"
              >
                {sessionData.rememberLogin ? <FaToggleOn /> : <FaToggleOff />}
              </button>
            </div>
            
            <div className="bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
              <h4 className="text-white font-medium mb-2">Session Timeout</h4>
              <p className="text-[#94a3b8] text-sm mb-3">
                Automatically log out after a period of inactivity
              </p>
              <select
                name="sessionTimeout"
                value={sessionData.sessionTimeout}
                onChange={handleSessionChange}
                className="bg-[#1e293b] text-white w-full px-4 py-2 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="never">Never</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={() => console.log('Session settings saved:', sessionData)}
              className="flex items-center bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] text-white py-2 px-6 rounded-lg hover:from-[#a5b4fc] hover:to-[#818cf8] transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#818cf8] focus:ring-offset-[#1e293b]"
            >
              <FaCheck className="mr-2" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SecuritySettings;