import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHome, FaBriefcase, FaUsers, FaChartBar, FaCog, 
  FaBell, FaSearch, FaPlus, FaEllipsisV, FaUserCircle
} from 'react-icons/fa';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data for dashboard
  const stats = [
    { title: 'Total Jobs', value: '124', change: '+12%', isPositive: true },
    { title: 'Applications', value: '1,284', change: '+18%', isPositive: true },
    { title: 'Interviews', value: '42', change: '-5%', isPositive: false },
    { title: 'New Users', value: '89', change: '+24%', isPositive: true },
  ];

  const recentJobs = [
    { id: 1, title: 'Senior React Developer', applicants: 24, status: 'Active' },
    { id: 2, title: 'UX Designer', applicants: 18, status: 'Active' },
    { id: 3, title: 'DevOps Engineer', applicants: 12, status: 'Paused' },
    { id: 4, title: 'Product Manager', applicants: 32, status: 'Active' },
  ];

  const recentApplicants = [
    { id: 1, name: 'Alex Johnson', role: 'Senior React Developer', status: 'Interview' },
    { id: 2, name: 'Sarah Williams', role: 'UX Designer', status: 'Screening' },
    { id: 3, name: 'Michael Brown', role: 'DevOps Engineer', status: 'Applied' },
    { id: 4, name: 'Emily Davis', role: 'Product Manager', status: 'Offer' },
  ];

  return (
    <div className="flex h-screen bg-[#0f172a]">
      {/* Sidebar */}
      <div className="w-64 bg-[#1e293b] border-r border-[#334155] hidden md:block">
        <div className="p-4 border-b border-[#334155]">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] bg-clip-text text-transparent">
            HireWave
          </h2>
          <p className="text-[#94a3b8] text-sm">Admin Dashboard</p>
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
        {/* Top Navigation */}
        <header className="bg-[#1e293b] border-b border-[#334155]">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button className="text-[#94a3b8] mr-4 md:hidden">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
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
              <button className="p-2 mr-2 text-[#94a3b8] hover:text-white relative">
                <FaBell />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="relative ml-3">
                <button className="flex items-center text-[#94a3b8] hover:text-white">
                  <FaUserCircle className="h-8 w-8" />
                  <span className="ml-2 hidden md:block">Admin User</span>
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-[#0f172a] p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Dashboard Overview</h1>
            <p className="text-[#94a3b8]">Welcome back, here's what's happening with your jobs today.</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-[#1e293b] rounded-xl shadow-lg p-6 border border-[#334155]">
                <p className="text-[#94a3b8] mb-1">{stat.title}</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                  <span className={`text-sm ${stat.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Tabs */}
          <div className="mb-6 border-b border-[#334155]">
            <div className="flex space-x-8">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`pb-4 text-sm font-medium ${
                  activeTab === 'overview' 
                    ? 'text-[#818cf8] border-b-2 border-[#818cf8]' 
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('jobs')}
                className={`pb-4 text-sm font-medium ${
                  activeTab === 'jobs' 
                    ? 'text-[#818cf8] border-b-2 border-[#818cf8]' 
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                Recent Jobs
              </button>
              <button 
                onClick={() => setActiveTab('applicants')}
                className={`pb-4 text-sm font-medium ${
                  activeTab === 'applicants' 
                    ? 'text-[#818cf8] border-b-2 border-[#818cf8]' 
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                Recent Applicants
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] overflow-hidden">
            {activeTab === 'overview' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Recent Activity</h3>
                  <button className="text-[#94a3b8] hover:text-white">
                    <FaEllipsisV />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-[#334155] rounded-full p-3 mr-4">
                      <FaUsers className="text-[#818cf8]" />
                    </div>
                    <div>
                      <p className="text-white font-medium">New applicant for Senior React Developer</p>
                      <p className="text-[#94a3b8] text-sm">Sarah Williams applied 2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#334155] rounded-full p-3 mr-4">
                      <FaBriefcase className="text-[#818cf8]" />
                    </div>
                    <div>
                      <p className="text-white font-medium">New job posted</p>
                      <p className="text-[#94a3b8] text-sm">Product Manager position created 5 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#334155] rounded-full p-3 mr-4">
                      <FaUsers className="text-[#818cf8]" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Interview scheduled</p>
                      <p className="text-[#94a3b8] text-sm">Alex Johnson for DevOps Engineer tomorrow at 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'jobs' && (
              <div>
                <div className="flex justify-between items-center p-6 border-b border-[#334155]">
                  <h3 className="text-lg font-medium text-white">Recent Jobs</h3>
                  <Link 
                    to="/add-job" 
                    className="flex items-center text-sm bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] text-white px-4 py-2 rounded-lg hover:from-[#a5b4fc] hover:to-[#818cf8]"
                  >
                    <FaPlus className="mr-2" /> Add New Job
                  </Link>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#0f172a]">
                      <tr>
                        <th className="text-left py-4 px-6 text-[#94a3b8] font-medium">Job Title</th>
                        <th className="text-left py-4 px-6 text-[#94a3b8] font-medium">Applicants</th>
                        <th className="text-left py-4 px-6 text-[#94a3b8] font-medium">Status</th>
                        <th className="text-left py-4 px-6 text-[#94a3b8] font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#334155]">
                      {recentJobs.map(job => (
                        <tr key={job.id} className="hover:bg-[#334155]">
                          <td className="py-4 px-6 text-white">{job.title}</td>
                          <td className="py-4 px-6 text-[#94a3b8]">{job.applicants}</td>
                          <td className="py-4 px-6">
                            <span className={`px-3 py-1 rounded-full text-xs ${
                              job.status === 'Active' 
                                ? 'bg-green-900/20 text-green-400 border border-green-500/30' 
                                : 'bg-yellow-900/20 text-yellow-400 border border-yellow-500/30'
                            }`}>
                              {job.status}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <button className="text-[#94a3b8] hover:text-white">
                              <FaEllipsisV />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            // ... existing code ...

{activeTab === 'applicants' && (
  <div>
    <div className="flex justify-between items-center p-6 border-b border-[#334155]">
      <h3 className="text-lg font-medium text-white">Recent Applicants</h3>
    </div>
    
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[#0f172a]">
          <tr>
            <th className="text-left py-4 px-6 text-[#94a3b8] font-medium">Name</th>
            <th className="text-left py-4 px-6 text-[#94a3b8] font-medium">Applied For</th>
            <th className="text-left py-4 px-6 text-[#94a3b8] font-medium">Status</th>
            <th className="text-left py-4 px-6 text-[#94a3b8] font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#334155]">
          {recentApplicants.map(applicant => (
            <tr key={applicant.id} className="hover:bg-[#334155]">
              <td className="py-4 px-6 text-white">{applicant.name}</td>
              <td className="py-4 px-6 text-[#94a3b8]">{applicant.role}</td>
              <td className="py-4 px-6">
                <span className={`px-3 py-1 rounded-full text-xs ${
                  applicant.status === 'Interview' 
                    ? 'bg-blue-900/20 text-blue-400 border border-blue-500/30'
                    : applicant.status === 'Screening'
                    ? 'bg-purple-900/20 text-purple-400 border border-purple-500/30'
                    : applicant.status === 'Applied'
                    ? 'bg-yellow-900/20 text-yellow-400 border border-yellow-500/30'
                    : 'bg-green-900/20 text-green-400 border border-green-500/30'
                }`}>
                  {applicant.status}
                </span>
              </td>
              <td className="py-4 px-6">
                <button className="text-[#94a3b8] hover:text-white">
                  <FaEllipsisV />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
          </div>
          
          {/* Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6 lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-white">Application Trends</h3>
                <select className="bg-[#0f172a] text-[#94a3b8] border border-[#334155] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                </select>
              </div>
              
              {/* Placeholder for chart */}
              <div className="h-64 bg-[#0f172a] rounded-lg border border-[#334155] flex items-center justify-center">
                <p className="text-[#94a3b8]">Application Trend Chart</p>
              </div>
            </div>
            
            <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
              <h3 className="text-lg font-medium text-white mb-6">Top Job Categories</h3>
              
              {/* Category bars */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#94a3b8]">Development</span>
                    <span className="text-[#94a3b8]">45%</span>
                  </div>
                  <div className="w-full bg-[#0f172a] rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] h-2.5 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#94a3b8]">Design</span>
                    <span className="text-[#94a3b8]">30%</span>
                  </div>
                  <div className="w-full bg-[#0f172a] rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] h-2.5 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#94a3b8]">Marketing</span>
                    <span className="text-[#94a3b8]">15%</span>
                  </div>
                  <div className="w-full bg-[#0f172a] rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] h-2.5 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#94a3b8]">Management</span>
                    <span className="text-[#94a3b8]">10%</span>
                  </div>
                  <div className="w-full bg-[#0f172a] rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] h-2.5 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;