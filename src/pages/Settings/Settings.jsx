import React, { useState } from 'react';
import { FaUser, FaLock, FaBell, FaDesktop, FaShieldAlt, FaSignOutAlt } from 'react-icons/fa';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import ProfileSettings from '../../components/Settings/ProfileSettings';
import SecuritySettings from '../../components/Settings/SecuritySettings';
import NotificationSettings from '../../components/Settings/NotificationSettings';
import AppearanceSettings from '../../components/Settings/AppearanceSettings';
import PrivacySettings from '../../components/Settings/PrivacySettings';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'notifications':
        return <NotificationSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
          <p className="text-[#94a3b8]">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-4">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left ${
                    activeTab === 'profile'
                      ? 'bg-[#0f172a] text-white'
                      : 'text-[#94a3b8] hover:bg-[#0f172a] hover:text-white'
                  }`}
                >
                  <FaUser className="mr-3" />
                  <span>Profile</span>
                </button>

                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left ${
                    activeTab === 'notifications'
                      ? 'bg-[#0f172a] text-white'
                      : 'text-[#94a3b8] hover:bg-[#0f172a] hover:text-white'
                  }`}
                >
                  <FaBell className="mr-3" />
                  <span>Notifications</span>
                </button>
                
                <div className="pt-6 border-t border-[#334155]">
                  <button
                    className="w-full flex items-center px-4 py-3 rounded-lg text-left text-red-400 hover:bg-red-900/20 hover:text-red-300"
                  >
                    <FaSignOutAlt className="mr-3" />
                    <span>Logout</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;