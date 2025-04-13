import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaHome, FaBriefcase, FaUsers, FaChartBar, FaCog, 
  FaBell, FaSearch, FaUserCircle, FaBars, FaTimes, 
  FaMoneyBillWave, FaSignOutAlt, FaRss
} from 'react-icons/fa';
import { getCurrentUser, logout } from '../../services/authService';

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
  const navigate = useNavigate();
  
  // Get current user and user type
  const user = getCurrentUser();
  const userType = user?.user_type || 'guest';
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  // Get dashboard title based on user type
  const getDashboardTitle = () => {
    switch(userType) {
      case 'admin':
        return 'Admin Dashboard';
      case 'recruiter':
        return 'Recruiter Dashboard';
      case 'jobseeker':
        return 'Jobseeker Dashboard';
      default:
        return 'Dashboard';
    }
  };
  
  // Get navigation links based on user type
  const getNavLinks = () => {
    const commonLinks = [
      { to: '/settings', icon: <FaCog />, text: 'Settings' },
    ];
    
    if (userType === 'admin') {
      return [
        { to: '/dashboard/admin', icon: <FaHome />, text: 'Dashboard' },
        { to: '/dashboard/admin/jobs', icon: <FaBriefcase />, text: 'Jobs' },
        { to: '/dashboard/admin/users', icon: <FaUsers />, text: 'Users' },
        { to: '/dashboard/admin/analytics', icon: <FaChartBar />, text: 'Analytics' },
        { to: '/dashboard/admin/blog', icon: <FaRss />, text: 'Blog' },
        { to: '/dashboard/admin/payments', icon: <FaMoneyBillWave />, text: 'Payments' },
        ...commonLinks
      ];
    } else if (userType === 'recruiter') {
      return [
        { to: '/dashboard/recruiter', icon: <FaHome />, text: 'Dashboard' },
        { to: '/dashboard/recruiter/jobs', icon: <FaBriefcase />, text: 'My Jobs' },
        { to: '/dashboard/recruiter/applications', icon: <FaUsers />, text: 'Applications' },
        { to: '/dashboard/recruiter/analytics', icon: <FaChartBar />, text: 'Analytics' },
        ...commonLinks
      ];
    } else if (userType === 'jobseeker') {
      return [
        { to: '/dashboard/jobseeker', icon: <FaHome />, text: 'Dashboard' },
        { to: '/dashboard/jobseeker/applications', icon: <FaBriefcase />, text: 'My Applications' },
        { to: '/dashboard/jobseeker/saved-jobs', icon: <FaUsers />, text: 'Saved Jobs' },
        { to: '/dashboard/jobseeker/profile', icon: <FaUserCircle />, text: 'My Profile' },
        ...commonLinks
      ];
    }
    
    return commonLinks;
  };
  
  const navLinks = getNavLinks();

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
            <p className="text-[#94a3b8] text-sm">{getDashboardTitle()}</p>
          </div>
          <button 
            className="text-[#94a3b8] hover:text-white md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === link.to
                      ? 'bg-[#0f172a] text-white'
                      : 'text-[#94a3b8] hover:bg-[#0f172a] hover:text-white'
                  }`}
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Logout button at bottom */}
        <div className="absolute bottom-0 w-full p-4 border-t border-[#334155]">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 rounded-lg text-[#94a3b8] hover:bg-[#0f172a] hover:text-white transition-colors"
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        {/* Top navigation */}
        <header className="bg-[#1e293b] border-b border-[#334155] p-4">
          <div className="flex justify-between items-center">
            {/* Mobile menu button */}
            <button
              className="text-[#94a3b8] hover:text-white md:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FaBars />
            </button>
            
            {/* Search bar */}
            <div className="hidden md:flex flex-1 mx-4">
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-[#0f172a] text-[#94a3b8] border border-[#334155] rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                />
                <FaSearch className="absolute left-3 top-3 text-[#64748b]" />
              </div>
            </div>
            
            {/* User actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  className="text-[#94a3b8] hover:text-white p-1"
                  onClick={() => {
                    setIsNotificationsOpen(!isNotificationsOpen);
                    setIsUserDropdownOpen(false);
                  }}
                >
                  <FaBell />
                </button>
                
                {/* Notification dropdown */}
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-[#1e293b] border border-[#334155] rounded-lg shadow-lg z-10">
                    <div className="p-4 border-b border-[#334155]">
                      <h3 className="text-white font-medium">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <div className="p-4 border-b border-[#334155]">
                        <p className="text-[#94a3b8]">No new notifications</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* User profile */}
              <div className="relative">
                <button
                  className="flex items-center text-[#94a3b8] hover:text-white"
                  onClick={() => {
                    setIsUserDropdownOpen(!isUserDropdownOpen);
                    setIsNotificationsOpen(false);
                  }}
                >
                  <FaUserCircle className="text-xl mr-2" />
                  <span className="hidden md:inline">
                    {user?.first_name && user?.last_name 
                      ? `${user.first_name} ${user.last_name}` 
                      : user?.email || 'User'}
                  </span>
                </button>
                
                {/* User dropdown */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#1e293b] border border-[#334155] rounded-lg shadow-lg z-10">
                    <div className="p-4 border-b border-[#334155]">
                      <h3 className="text-white font-medium">{user?.email || 'User'}</h3>
                      <p className="text-[#94a3b8] text-sm capitalize">{userType}</p>
                    </div>
                    <div>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-[#94a3b8] hover:bg-[#0f172a] hover:text-white"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-[#94a3b8] hover:bg-[#0f172a] hover:text-white"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;