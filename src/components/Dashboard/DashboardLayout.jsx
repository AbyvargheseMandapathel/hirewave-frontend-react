import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, FaBriefcase, FaUsers, FaChartBar, FaCog, 
  FaBell, FaSearch, FaUserCircle, FaBars, FaTimes, 
  FaMoneyBillWave, FaSignOutAlt
} from 'react-icons/fa';

// Custom scrollbar styles
const scrollbarStyles = `
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #1e293b;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background: #475569;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #64748b;
  }
`;

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#0f172a]">
      <style>{scrollbarStyles}</style>
      
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar - with mobile support */}
      <div className={`w-64 bg-[#1e293b] border-r border-[#334155] fixed inset-y-0 left-0 z-30 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out md:relative md:block`}>
        <div className="p-4 border-b border-[#334155] flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] bg-clip-text text-transparent">
              HireWave
            </h2>
            <p className="text-[#94a3b8] text-sm">Admin Dashboard</p>
          </div>
          <button 
            className="text-[#94a3b8] hover:text-white md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes />
          </button>
        </div>
        
        <nav className="mt-6">
          <div className="px-4 mb-3">
            <p className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">
              Main
            </p>
          </div>
          <Link 
            to="/dashboard/admin" 
            className={`flex items-center px-4 py-3 text-[#94a3b8] hover:bg-[#334155] hover:text-white ${location.pathname === '/dashboard' ? 'bg-[#334155] text-white' : ''}`}
          >
            <FaHome className="mr-3" />
            Overview
          </Link>
          <Link 
            to="/dashboard/admin/jobs" 
            className={`flex items-center px-4 py-3 text-[#94a3b8] hover:bg-[#334155] hover:text-white ${location.pathname === '/dashboard/jobs' ? 'bg-[#334155] text-white' : ''}`}
          >
            <FaBriefcase className="mr-3" />
            Jobs
          </Link>
          <Link 
            to="/dashboard/users" 
            className={`flex items-center px-4 py-3 text-[#94a3b8] hover:bg-[#334155] hover:text-white ${location.pathname === '/dashboard/users' ? 'bg-[#334155] text-white' : ''}`}
          >
            <FaUsers className="mr-3" />
            Users
          </Link>
          <Link 
            to="/dashboard/admin/financial" 
            className={`flex items-center px-4 py-3 text-[#94a3b8] hover:bg-[#334155] hover:text-white ${location.pathname === '/dashboard/financial' ? 'bg-[#334155] text-white' : ''}`}
          >
            <FaMoneyBillWave className="mr-3" />
            Financial
          </Link>
          
          <div className="px-4 mt-6 mb-3">
            <p className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">
              Settings
            </p>
          </div>
          <Link 
            to="/dashboard/settings" 
            className={`flex items-center px-4 py-3 text-[#94a3b8] hover:bg-[#334155] hover:text-white ${location.pathname === '/dashboard/settings' ? 'bg-[#334155] text-white' : ''}`}
          >
            <FaCog className="mr-3" />
            Settings
          </Link>
          <Link 
            to="/logout" 
            className="flex items-center px-4 py-3 text-[#94a3b8] hover:bg-[#334155] hover:text-white"
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </Link>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-[#1e293b] border-b border-[#334155] shadow-sm">
          <div className="flex items-center justify-between p-4">
            {/* Mobile menu button */}
            <button 
              className="text-[#94a3b8] hover:text-white md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <FaBars />
            </button>
            
            {/* Search */}
            <div className="relative flex-1 max-w-md mx-4 hidden md:block">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FaSearch className="text-[#64748b]" />
              </span>
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-[#0f172a] text-white pl-10 pr-4 py-2 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
              />
            </div>
            
            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button 
                  className="text-[#94a3b8] hover:text-white p-1 rounded-full hover:bg-[#334155]"
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                >
                  <FaBell />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                
                {/* Notifications dropdown */}
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-[#1e293b] border border-[#334155] rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b border-[#334155]">
                      <h3 className="text-white font-medium">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <div className="p-4 border-b border-[#334155] hover:bg-[#334155]">
                        <p className="text-[#94a3b8]">New user registered</p>
                        <p className="text-xs text-[#64748b]">2 hours ago</p>
                      </div>
                      <div className="p-4 border-b border-[#334155] hover:bg-[#334155]">
                        <p className="text-[#94a3b8]">New job posted</p>
                        <p className="text-xs text-[#64748b]">5 hours ago</p>
                      </div>
                      <div className="p-4 hover:bg-[#334155]">
                        <p className="text-[#94a3b8]">System update completed</p>
                        <p className="text-xs text-[#64748b]">1 day ago</p>
                      </div>
                    </div>
                    <div className="p-2 text-center border-t border-[#334155]">
                      <button className="text-[#818cf8] hover:text-[#a5b4fc] text-sm">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* User profile */}
              <div className="relative">
                <button 
                  className="flex items-center text-[#94a3b8] hover:text-white"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                >
                  <FaUserCircle className="h-8 w-8 text-[#818cf8]" />
                  <span className="ml-2 hidden md:block">Admin User</span>
                </button>
                
                {/* User dropdown */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#1e293b] border border-[#334155] rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b border-[#334155]">
                      <p className="text-white font-medium">Admin User</p>
                      <p className="text-xs text-[#64748b]">admin@hirewave.com</p>
                    </div>
                    <div>
                      <Link 
                        to="/dashboard/profile" 
                        className="block p-4 text-[#94a3b8] hover:bg-[#334155] hover:text-white"
                      >
                        Profile
                      </Link>
                      <Link 
                        to="/dashboard/settings" 
                        className="block p-4 text-[#94a3b8] hover:bg-[#334155] hover:text-white"
                      >
                        Settings
                      </Link>
                      <Link 
                        to="/logout" 
                        className="block p-4 text-[#94a3b8] hover:bg-[#334155] hover:text-white border-t border-[#334155]"
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;