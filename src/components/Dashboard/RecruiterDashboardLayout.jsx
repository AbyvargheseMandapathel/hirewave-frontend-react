import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, FaBriefcase, FaUsers, FaChartBar, FaCog, 
  FaBell, FaSearch, FaUserCircle, FaBars, FaTimes, 
  FaPlus, FaCalendarAlt, FaClipboardList, FaFileAlt
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

const RecruiterDashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Toggle notifications dropdown
  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    if (!notificationsOpen) setProfileOpen(false);
  };

  // Toggle profile dropdown
  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
    if (!profileOpen) setNotificationsOpen(false);
  };

  // Check if a nav item is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Sample notifications
  const notifications = [
    { id: 1, text: 'New application for Senior Developer', time: '5 min ago' },
    { id: 2, text: 'Interview scheduled with John Doe', time: '1 hour ago' },
    { id: 3, text: 'Candidate accepted job offer', time: '3 hours ago' },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#94a3b8]">
      <style>{scrollbarStyles}</style>
      
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-30 w-64 h-full bg-[#1e293b] border-r border-[#334155] transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-[#334155]">
          <Link to="/dashboard/recruiter" className="text-xl font-bold text-white">
            HireWave
          </Link>
          <button 
            className="lg:hidden text-[#94a3b8] hover:text-white"
            onClick={toggleSidebar}
          >
            <FaTimes />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="px-4 py-6 overflow-y-auto h-[calc(100vh-4rem)]">
          <ul className="space-y-1">
            <li>
              <Link 
                to="/dashboard/recruiter" 
                className={`flex items-center px-4 py-3 rounded-lg ${
                  isActive('/dashboard/recruiter') 
                    ? 'bg-[#0f172a] text-white' 
                    : 'hover:bg-[#0f172a] hover:text-white'
                }`}
              >
                <FaHome className="mr-3" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/recruiter/jobs" 
                className={`flex items-center px-4 py-3 rounded-lg ${
                  isActive('/dashboard/recruiter/jobs') 
                    ? 'bg-[#0f172a] text-white' 
                    : 'hover:bg-[#0f172a] hover:text-white'
                }`}
              >
                <FaBriefcase className="mr-3" />
                <span>My Jobs</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/add-job" 
                className={`flex items-center px-4 py-3 rounded-lg ${
                  isActive('/add-job') 
                    ? 'bg-[#0f172a] text-white' 
                    : 'hover:bg-[#0f172a] hover:text-white'
                }`}
              >
                <FaPlus className="mr-3" />
                <span>Post New Job</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/recruiter/create-job-form" 
                className={`flex items-center px-4 py-3 rounded-lg ${
                  isActive('/dashboard/recruiter/create-job-form') 
                    ? 'bg-[#0f172a] text-white' 
                    : 'hover:bg-[#0f172a] hover:text-white'
                }`}
              >
                <FaFileAlt className="mr-3" />
                <span>Custom Job Forms</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/recruiter/candidates" 
                className={`flex items-center px-4 py-3 rounded-lg ${
                  isActive('/dashboard/recruiter/candidates') 
                    ? 'bg-[#0f172a] text-white' 
                    : 'hover:bg-[#0f172a] hover:text-white'
                }`}
              >
                <FaUsers className="mr-3" />
                <span>Candidates</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/recruiter/interviews" 
                className={`flex items-center px-4 py-3 rounded-lg ${
                  isActive('/dashboard/recruiter/interviews') 
                    ? 'bg-[#0f172a] text-white' 
                    : 'hover:bg-[#0f172a] hover:text-white'
                }`}
              >
                <FaCalendarAlt className="mr-3" />
                <span>Interviews</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/recruiter/applications" 
                className={`flex items-center px-4 py-3 rounded-lg ${
                  isActive('/dashboard/recruiter/applications') 
                    ? 'bg-[#0f172a] text-white' 
                    : 'hover:bg-[#0f172a] hover:text-white'
                }`}
              >
                <FaClipboardList className="mr-3" />
                <span>Applications</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/recruiter/analytics" 
                className={`flex items-center px-4 py-3 rounded-lg ${
                  isActive('/dashboard/recruiter/analytics') 
                    ? 'bg-[#0f172a] text-white' 
                    : 'hover:bg-[#0f172a] hover:text-white'
                }`}
              >
                <FaChartBar className="mr-3" />
                <span>Analytics</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/settings" 
                className={`flex items-center px-4 py-3 rounded-lg ${
                  isActive('/dashboard/settings') 
                    ? 'bg-[#0f172a] text-white' 
                    : 'hover:bg-[#0f172a] hover:text-white'
                }`}
              >
                <FaCog className="mr-3" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      
      {/* Main content */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        {/* Header */}
        <header className="h-16 bg-[#1e293b] border-b border-[#334155] flex items-center justify-between px-6">
          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-[#94a3b8] hover:text-white"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
          
          {/* Search */}
          <div className="hidden md:flex items-center flex-1 max-w-md ml-6">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaSearch className="text-[#64748b]" />
              </div>
              <input 
                type="text" 
                placeholder="Search candidates, jobs..." 
                className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
              />
            </div>
          </div>
          
          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button 
                className="text-[#94a3b8] hover:text-white relative"
                onClick={toggleNotifications}
              >
                <FaBell />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  3
                </span>
              </button>
              
              {/* Notifications dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#1e293b] border border-[#334155] rounded-lg shadow-lg z-10">
                  <div className="p-4 border-b border-[#334155]">
                    <h3 className="text-white font-medium">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className="p-4 border-b border-[#334155] hover:bg-[#0f172a]"
                      >
                        <p className="text-white">{notification.text}</p>
                        <p className="text-xs text-[#64748b] mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-4">
                    <Link 
                      to="/dashboard/notifications" 
                      className="text-[#818cf8] hover:text-[#a5b4fc] text-sm"
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Profile */}
            <div className="relative">
              <button 
                className="flex items-center text-[#94a3b8] hover:text-white"
                onClick={toggleProfile}
              >
                <FaUserCircle className="text-xl mr-2" />
                <span className="hidden md:block">John Recruiter</span>
              </button>
              
              {/* Profile dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1e293b] border border-[#334155] rounded-lg shadow-lg z-10">
                  <div className="p-4 border-b border-[#334155]">
                    <h3 className="text-white font-medium">John Recruiter</h3>
                    <p className="text-xs text-[#64748b]">john@techcorp.com</p>
                  </div>
                  <div className="py-2">
                    <Link 
                      to="/dashboard/profile" 
                      className="block px-4 py-2 hover:bg-[#0f172a] text-[#94a3b8] hover:text-white"
                    >
                      Profile
                    </Link>
                    <Link 
                      to="/dashboard/settings" 
                      className="block px-4 py-2 hover:bg-[#0f172a] text-[#94a3b8] hover:text-white"
                    >
                      Settings
                    </Link>
                    <Link 
                      to="/logout" 
                      className="block px-4 py-2 hover:bg-[#0f172a] text-[#94a3b8] hover:text-white"
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default RecruiterDashboardLayout;