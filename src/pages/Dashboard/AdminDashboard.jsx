import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome, FaBriefcase, FaUsers, FaChartBar, FaCog,
  FaBell, FaSearch, FaPlus, FaEllipsisV, FaUserCircle,
  FaBars, FaTimes, FaArrowLeft, FaArrowRight, FaMoneyBillWave
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

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [chartData, setChartData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [chartOffset, setChartOffset] = useState(0);
  const chartContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Generate chart data based on selected time range
  useEffect(() => {
    const generateChartData = () => {
      let days = 10; // Changed from 7 to 10 days by default
      if (timeRange === '30days') days = 30;
      if (timeRange === 'alltime') days = 365; // All time stats (1 year)

      const data = [];
      for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (days - i - 1));
        data.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          visitors: Math.floor(Math.random() * 4000) + 100,
        });
      }

      // Debug statement to track chart data generation
      console.log(`Generated ${data.length} days of chart data for ${timeRange}:`, data);

      setChartData(data);
      setChartOffset(0); // Reset chart offset when time range changes
    };

    generateChartData();
  }, [timeRange]);

  // Mouse event handlers for dragging
  const handleMouseDown = (e) => {
    if (timeRange === '7days') return; // No dragging for 7 days view

    setIsDragging(true);
    setStartX(e.pageX - chartContainerRef.current.offsetLeft);
    setScrollLeft(chartContainerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const x = e.pageX - chartContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    chartContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Navigation functions for chart
  const handlePrevious = () => {
    if (chartOffset > 0) {
      setChartOffset(chartOffset - 1);
    }
  };

  const handleNext = () => {
    if (chartOffset < chartData.length - 7) {
      setChartOffset(chartOffset + 1);
    }
  };

  // Updated sample data for dashboard with your requested stats
  const stats = [
    { title: 'Total Jobs', value: '124', change: '+12%', isPositive: true, icon: <FaBriefcase className="text-[#818cf8] text-xl" /> },
    { title: 'Recruiters', value: '48', change: '+8%', isPositive: true, icon: <FaUsers className="text-[#818cf8] text-xl" /> },
    { title: 'Users', value: '1,284', change: '+18%', isPositive: true, icon: <FaUserCircle className="text-[#818cf8] text-xl" /> },
    { title: 'Visitors', value: '5,672', change: '+24%', isPositive: true, icon: <FaChartBar className="text-[#818cf8] text-xl" /> },
  ];

  // Sample visitor log data
  const visitorLogs = [
    { id: 1, action: 'User Joined', user: 'Alex Johnson', time: '2 hours ago', icon: <FaUserCircle className="text-green-400" /> },
    { id: 2, action: 'New Visitor', user: 'IP 192.168.1.45', time: '3 hours ago', icon: <FaChartBar className="text-blue-400" /> },
    { id: 3, action: 'Recruiter Login', user: 'Sarah Williams', time: '5 hours ago', icon: <FaUsers className="text-purple-400" /> },
    { id: 4, action: 'Job Posted', user: 'Michael Brown', time: '1 day ago', icon: <FaBriefcase className="text-yellow-400" /> },
    { id: 5, action: 'User Registration', user: 'Emily Davis', time: '1 day ago', icon: <FaUserCircle className="text-green-400" /> },
  ];

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
            to="/dashboard"
            className="flex items-center px-4 py-3 text-[#94a3b8] hover:bg-[#334155] hover:text-white"
          >
            <FaHome className="mr-3" />
            Overview
          </Link>
          <Link
            to="/dashboard/jobs"
            className="flex items-center px-4 py-3 text-[#94a3b8] hover:bg-[#334155] hover:text-white"
          >
            <FaBriefcase className="mr-3" />
            Jobs
          </Link>
          <Link
            to="/dashboard/applicants"
            className="flex items-center px-4 py-3 text-[#94a3b8] hover:bg-[#334155] hover:text-white"
          >
            <FaUsers className="mr-3" />
            Applicants
          </Link>
          <Link
            to="/dashboard/analytics"
            className="flex items-center px-4 py-3 text-[#94a3b8] hover:bg-[#334155] hover:text-white"
          >
            <FaChartBar className="mr-3" />
            Analytics
          </Link>
          <Link
            to="/dashboard/financial"
            className="flex items-center px-4 py-3 text-[#94a3b8] hover:bg-[#334155] hover:text-white"
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
            className="flex items-center px-4 py-3 text-[#94a3b8] hover:bg-[#334155] hover:text-white"
          >
            <FaCog className="mr-3" />
            Settings
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation - with mobile support */}
        <header className="bg-[#1e293b] border-b border-[#334155]">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button
                className="text-[#94a3b8] mr-4 md:hidden hover:text-white"
                onClick={() => setIsSidebarOpen(true)}
              >
                <FaBars className="h-6 w-6" />
              </button>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaSearch className="text-[#64748b]" />
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-[#0f172a] text-white pl-10 pr-4 py-2 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center">
              {/* Notifications dropdown */}
              <div className="relative">
                <button
                  className="p-2 mr-2 text-[#94a3b8] hover:text-white relative"
                  onClick={() => {
                    setIsNotificationsOpen(!isNotificationsOpen);
                    setIsUserDropdownOpen(false);
                  }}
                >
                  <FaBell />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-[#1e293b] rounded-lg shadow-lg border border-[#334155] z-10">
                    <div className="p-4 border-b border-[#334155]">
                      <h3 className="text-white font-medium">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {[
                        { id: 1, text: 'New job application received', time: '2 hours ago' },
                        { id: 2, text: 'New user registered', time: '5 hours ago' },
                        { id: 3, text: 'System update completed', time: '1 day ago' },
                      ].map(notification => (
                        <div key={notification.id} className="p-4 border-b border-[#334155] hover:bg-[#334155]">
                          <p className="text-white">{notification.text}</p>
                          <p className="text-[#94a3b8] text-sm">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-4">
                      <button className="text-[#818cf8] hover:text-[#a5b4fc] text-sm font-medium">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User dropdown */}
              <div className="relative ml-3">
                <button
                  className="flex items-center text-[#94a3b8] hover:text-white"
                  onClick={() => {
                    setIsUserDropdownOpen(!isUserDropdownOpen);
                    setIsNotificationsOpen(false);
                  }}
                >
                  <FaUserCircle className="h-8 w-8" />
                  <span className="ml-2 hidden md:block">Admin User</span>
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#1e293b] rounded-lg shadow-lg border border-[#334155] z-10">
                    <div className="p-4 border-b border-[#334155]">
                      <p className="text-white font-medium">Admin User</p>
                      <p className="text-[#94a3b8] text-sm">admin@hirewave.com</p>
                    </div>
                    <div>
                      <a href="#profile" className="block px-4 py-2 text-[#94a3b8] hover:bg-[#334155] hover:text-white">
                        Profile
                      </a>
                      <a href="#settings" className="block px-4 py-2 text-[#94a3b8] hover:bg-[#334155] hover:text-white">
                        Settings
                      </a>
                      <a href="#logout" className="block px-4 py-2 text-[#94a3b8] hover:bg-[#334155] hover:text-white">
                        Logout
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-[#0f172a] p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Dashboard Overview</h1>
            <p className="text-[#94a3b8]">Welcome back, here's what's happening with your platform today.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-[#1e293b] rounded-xl shadow-lg p-6 border border-[#334155]">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[#94a3b8]">{stat.title}</p>
                  {stat.icon}
                </div>
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                  <span className={`text-sm ${stat.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Visitor Analytics Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Visitor Table */}
            <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6 lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-white">Visitor Analytics</h3>
                <select
                  className="bg-[#0f172a] text-[#94a3b8] border border-[#334155] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <option value="7days">Last 7 days</option>
                  <option value="30days">Last 30 days</option>
                  <option value="alltime">All Time Stats</option>
                </select>
              </div>

              {/* Visual chart representation */}
              <div className="mb-6 bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
                {timeRange !== '7days' && (
                  <div className="flex justify-between mb-2">
                    <button
                      onClick={handlePrevious}
                      disabled={chartOffset === 0}
                      className={`p-1 rounded ${chartOffset === 0 ? 'text-gray-600' : 'text-[#818cf8] hover:bg-[#334155]'}`}
                    >
                      <FaArrowLeft />
                    </button>
                    <div className="text-[#94a3b8] text-sm">
                      Showing {chartOffset + 1}-{Math.min(chartOffset + 7, chartData.length)} of {chartData.length} days
                    </div>
                    <button
                      onClick={handleNext}
                      disabled={chartOffset >= chartData.length - 7}
                      className={`p-1 rounded ${chartOffset >= chartData.length - 7 ? 'text-gray-600' : 'text-[#818cf8] hover:bg-[#334155]'}`}
                    >
                      <FaArrowRight />
                    </button>
                  </div>
                )}

                <div
                  ref={chartContainerRef}
                  className={`overflow-x-auto ${timeRange !== '7days' ? 'cursor-grab' : ''} ${isDragging ? 'cursor-grabbing' : ''}`}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* SVG Chart */}
                  <div className="h-60 w-full relative">
                    <svg className="w-full h-full" viewBox={`0 0 ${(timeRange === '7days' ? chartData.length : 7) * 60} 200`} preserveAspectRatio="none">
                      {/* Grid lines */}
                      <line x1="0" y1="150" x2="100%" y2="150" stroke="#334155" strokeWidth="1" />
                      <line x1="0" y1="100" x2="100%" y2="100" stroke="#334155" strokeWidth="1" strokeDasharray="4" />
                      <line x1="0" y1="50" x2="100%" y2="50" stroke="#334155" strokeWidth="1" strokeDasharray="4" />

                      {/* Chart bars */}
                      {(timeRange === '7days' ? chartData : chartData.slice(chartOffset, chartOffset + 7)).map((item, index) => {
                        const maxValue = Math.max(...chartData.map(d => d.visitors), 500);
                        const barHeight = (item.visitors / maxValue) * 150;
                        const barWidth = 40;
                        const barX = index * 60 + 10; // 60px per bar with spacing
                        const barY = 150 - barHeight;

                        return (
                          <g key={index}>
                            {/* Bar */}
                            <rect
                              x={barX}
                              y={barY}
                              width={barWidth}
                              height={barHeight}
                              fill="#818cf8"
                              rx="2"
                              className="transition-all duration-300 hover:fill-[#a5b4fc]"
                            />

                            {/* Value text */}
                            <text
                              x={barX + barWidth / 2}
                              y={barY - 5}
                              textAnchor="middle"
                              fontSize="10"
                              fill="#94a3b8"
                            >
                              {item.visitors}
                            </text>

                            {/* Date text */}
                            <text
                              x={barX + barWidth / 2}
                              y="170"
                              textAnchor="middle"
                              fontSize="10"
                              fill="#94a3b8"
                            >
                              {item.date}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>
              </div>

              {/* Scrollable Table to display visitor data */}
              <div className="overflow-y-auto max-h-64">
                <table className="w-full text-[#94a3b8]">
                  <thead>
                    <tr className="border-b border-[#334155]">
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Visitors</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chartData.map((item, index) => (
                      <tr key={index} className="border-b border-[#334155] hover:bg-[#334155]">
                        <td className="px-4 py-2">{item.date}</td>
                        <td className="px-4 py-2">{item.visitors}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Visitor Log */}
            <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6 flex flex-col h-full">
              <h3 className="text-lg font-medium text-white mb-6">Recent Activity Log</h3>

              <div className="overflow-y-auto flex-grow pr-2">
                <div className="space-y-4">
                  {visitorLogs.map(log => (
                    <div key={log.id} className="flex items-start p-3 rounded-lg hover:bg-[#334155] transition-colors duration-200">
                      <div className="bg-[#334155] rounded-full p-2 mr-3 flex-shrink-0">
                        {log.icon}
                      </div>
                      <div>
                        <p className="text-white font-medium">{log.action}</p>
                        <p className="text-[#94a3b8] text-sm">{log.user} • {log.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* View more button at the bottom */}
              <div className="mt-4 pt-4 border-t border-[#334155]">
                <button className="w-full py-2 px-4 bg-[#334155] hover:bg-[#475569] text-white rounded-lg transition-colors duration-200 flex items-center justify-center">
                  <span>View All Activity</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
