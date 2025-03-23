import React, { useState } from 'react';
import { FaToggleOn, FaToggleOff, FaCheck, FaBell, FaEnvelope, FaMobile } from 'react-icons/fa';

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    email: {
      jobAlerts: true,
      applicationUpdates: true,
      accountNotifications: true,
      marketingEmails: false
    },
    inApp: {
      jobAlerts: true,
      applicationUpdates: true,
      messages: true,
      systemUpdates: true
    },
    mobile: {
      jobAlerts: false,
      applicationUpdates: true,
      messages: true,
      systemUpdates: false
    }
  });

  const toggleNotification = (category, type) => {
    setNotifications(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: !prev[category][type]
      }
    }));
  };

  const handleSave = () => {
    console.log('Notification settings saved:', notifications);
    // Save notification settings
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Notification Settings</h2>
      
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <FaEnvelope className="text-[#818cf8] mr-2" />
          <h3 className="text-lg font-medium text-white">Email Notifications</h3>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
            <div>
              <h4 className="text-white font-medium">Job Alerts</h4>
              <p className="text-[#94a3b8] text-sm mt-1">
                Receive emails about new job opportunities matching your profile
              </p>
            </div>
            <button
              onClick={() => toggleNotification('email', 'jobAlerts')}
              className="text-2xl text-[#818cf8] focus:outline-none"
            >
              {notifications.email.jobAlerts ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
          
          <div className="flex items-center justify-between bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
            <div>
              <h4 className="text-white font-medium">Application Updates</h4>
              <p className="text-[#94a3b8] text-sm mt-1">
                Receive emails when there are updates to your job applications
              </p>
            </div>
            <button
              onClick={() => toggleNotification('email', 'applicationUpdates')}
              className="text-2xl text-[#818cf8] focus:outline-none"
            >
              {notifications.email.applicationUpdates ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
          
          <div className="flex items-center justify-between bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
            <div>
              <h4 className="text-white font-medium">Account Notifications</h4>
              <p className="text-[#94a3b8] text-sm mt-1">
                Receive emails about your account security and important updates
              </p>
            </div>
            <button
              onClick={() => toggleNotification('email', 'accountNotifications')}
              className="text-2xl text-[#818cf8] focus:outline-none"
            >
              {notifications.email.accountNotifications ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
          
          <div className="flex items-center justify-between bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
            <div>
              <h4 className="text-white font-medium">Marketing Emails</h4>
              <p className="text-[#94a3b8] text-sm mt-1">
                Receive promotional emails and newsletters
              </p>
            </div>
            <button
              onClick={() => toggleNotification('email', 'marketingEmails')}
              className="text-2xl text-[#818cf8] focus:outline-none"
            >
              {notifications.email.marketingEmails ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-8 border-t border-[#334155] pt-8">
        <div className="flex items-center mb-4">
          <FaBell className="text-[#818cf8] mr-2" />
          <h3 className="text-lg font-medium text-white">In-App Notifications</h3>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
            <div>
              <h4 className="text-white font-medium">Job Alerts</h4>
              <p className="text-[#94a3b8] text-sm mt-1">
                Receive in-app notifications about new job opportunities
              </p>
            </div>
            <button
              onClick={() => toggleNotification('inApp', 'jobAlerts')}
              className="text-2xl text-[#818cf8] focus:outline-none"
            >
              {notifications.inApp.jobAlerts ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
          
          <div className="flex items-center justify-between bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
            <div>
              <h4 className="text-white font-medium">Application Updates</h4>
              <p className="text-[#94a3b8] text-sm mt-1">
                Receive in-app notifications about your application status
              </p>
            </div>
            <button
              onClick={() => toggleNotification('inApp', 'applicationUpdates')}
              className="text-2xl text-[#818cf8] focus:outline-none"
            >
              {notifications.inApp.applicationUpdates ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
          
          <div className="flex items-center justify-between bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
            <div>
              <h4 className="text-white font-medium">Messages</h4>
              <p className="text-[#94a3b8] text-sm mt-1">
                Receive in-app notifications for new messages
              </p>
            </div>
            <button
              onClick={() => toggleNotification('inApp', 'messages')}
              className="text-2xl text-[#818cf8] focus:outline-none"
            >
              {notifications.inApp.messages ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
          
          <div className="flex items-center justify-between bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
            <div>
              <h4 className="text-white font-medium">System Updates</h4>
              <p className="text-[#94a3b8] text-sm mt-1">
                Receive in-app notifications about system updates and maintenance
              </p>
            </div>
            <button
              onClick={() => toggleNotification('inApp', 'systemUpdates')}
              className="text-2xl text-[#818cf8] focus:outline-none"
            >
              {notifications.inApp.systemUpdates ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-8 border-t border-[#334155] pt-8">
        <div className="flex items-center mb-4">
          <FaMobile className="text-[#818cf8] mr-2" />
          <h3 className="text-lg font-medium text-white">Mobile Push Notifications</h3>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
            <div>
              <h4 className="text-white font-medium">Job Alerts</h4>
              <p className="text-[#94a3b8] text-sm mt-1">
                Receive mobile push notifications about new job opportunities
              </p>
            </div>
            <button
              onClick={() => toggleNotification('mobile', 'jobAlerts')}
              className="text-2xl text-[#818cf8] focus:outline-none"
            >
              {notifications.mobile.jobAlerts ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
          
          <div className="flex items-center justify-between bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
            <div>
              <h4 className="text-white font-medium">Application Updates</h4>
              <p className="text-[#94a3b8] text-sm mt-1">
                Receive mobile push notifications about your application status
              </p>
            </div>
            <button
              onClick={() => toggleNotification('mobile', 'applicationUpdates')}
              className="text-2xl text-[#818cf8] focus:outline-none"
            >
              {notifications.mobile.applicationUpdates ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
          
          <div className="flex items-center justify-between bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
            <div>
              <h4 className="text-white font-medium">Messages</h4>
              <p className="text-[#94a3b8] text-sm mt-1">
                Receive mobile push notifications for new messages
              </p>
            </div>
            <button
              onClick={() => toggleNotification('mobile', 'messages')}
              className="text-2xl text-[#818cf8] focus:outline-none"
            >
              {notifications.mobile.messages ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
          
          <div className="flex items-center justify-between bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
            <div>
              <h4 className="text-white font-medium">System Updates</h4>
              <p className="text-[#94a3b8] text-sm mt-1">
                Receive mobile push notifications about system updates
              </p>
            </div>
            <button
              onClick={() => toggleNotification('mobile', 'systemUpdates')}
              className="text-2xl text-[#818cf8] focus:outline-none"
            >
              {notifications.mobile.systemUpdates ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
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

export default NotificationSettings;