import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecruiterDashboardLayout from '../../components/Dashboard/RecruiterDashboardLayout';
import JobsTable from '../../components/Dashboard/JobsTable';
import JobsStatusChart from '../../components/Dashboard/JobsStatusChart';
import { FaFilter, FaPlus, FaSearch, FaFileExport,FaUserTie } from 'react-icons/fa';

const RecruiterJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Status distribution for the chart
  const [statusData, setStatusData] = useState([
    { status: 'Active', count: 0, color: '#10b981' },
    { status: 'Paused', count: 0, color: '#f59e0b' },
    { status: 'Closed', count: 0, color: '#6b7280' },
    { status: 'Draft', count: 0, color: '#3b82f6' },
  ]);

  // Generate mock jobs data
  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      const mockJobs = [
        {
          id: 1,
          title: 'Senior React Developer',
          company: 'TechCorp',
          location: 'Remote',
          type: 'Full-time',
          applicants: 24,
          status: 'Active',
          date: 'May 15, 2023',
          views: 342,
          interested: 48,
          applications: 24,
        },
        {
          id: 2,
          title: 'UX Designer',
          company: 'TechCorp',
          location: 'New York',
          type: 'Full-time',
          applicants: 18,
          status: 'Active',
          date: 'May 10, 2023',
          views: 287,
          interested: 32,
          applications: 18,
        },
        {
          id: 3,
          title: 'DevOps Engineer',
          company: 'TechCorp',
          location: 'San Francisco',
          type: 'Contract',
          applicants: 9,
          status: 'Paused',
          date: 'Apr 28, 2023',
          views: 198,
          interested: 15,
          applications: 9,
        },
        {
          id: 4,
          title: 'Product Manager',
          company: 'TechCorp',
          location: 'Chicago',
          type: 'Full-time',
          applicants: 15,
          status: 'Active',
          date: 'Apr 22, 2023',
          views: 245,
          interested: 28,
          applications: 15,
        },
        {
          id: 5,
          title: 'Frontend Developer',
          company: 'TechCorp',
          location: 'Remote',
          type: 'Part-time',
          applicants: 12,
          status: 'Closed',
          date: 'Apr 15, 2023',
          views: 210,
          interested: 22,
          applications: 12,
        },
        {
          id: 6,
          title: 'Data Scientist',
          company: 'TechCorp',
          location: 'Boston',
          type: 'Full-time',
          applicants: 7,
          status: 'Draft',
          date: 'Apr 10, 2023',
          views: 0,
          interested: 0,
          applications: 0,
        },
        {
          id: 7,
          title: 'Backend Developer',
          company: 'TechCorp',
          location: 'Austin',
          type: 'Full-time',
          applicants: 20,
          status: 'Active',
          date: 'Apr 5, 2023',
          views: 320,
          interested: 40,
          applications: 20,
        },
        {
          id: 8,
          title: 'Marketing Specialist',
          company: 'TechCorp',
          location: 'Miami',
          type: 'Full-time',
          applicants: 14,
          status: 'Closed',
          date: 'Mar 28, 2023',
          views: 230,
          interested: 25,
          applications: 14,
        },
      ];

      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      
      // Update status data for chart
      const statusCounts = {
        'Active': 0,
        'Paused': 0,
        'Closed': 0,
        'Draft': 0
      };
      
      mockJobs.forEach(job => {
        if (statusCounts[job.status] !== undefined) {
          statusCounts[job.status]++;
        }
      });
      
      setStatusData(prevData => 
        prevData.map(item => ({
          ...item,
          count: statusCounts[item.status] || 0
        }))
      );
      
      setIsLoading(false);
    }, 800);
  }, []);

  // Filter jobs based on search term and status
  useEffect(() => {
    let result = jobs;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter(job => job.status === statusFilter);
    }
    
    setFilteredJobs(result);
  }, [jobs, searchTerm, statusFilter]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle status filter change
  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  // Export jobs data as CSV
  const exportJobsData = () => {
    // Create CSV content
    const headers = ['Title', 'Location', 'Type', 'Applicants', 'Status', 'Date', 'Views'];
    const csvContent = [
      headers.join(','),
      ...filteredJobs.map(job => [
        `"${job.title}"`,
        `"${job.location}"`,
        `"${job.type}"`,
        job.applicants,
        `"${job.status}"`,
        `"${job.date}"`,
        job.views
      ].join(','))
    ].join('\n');
    
    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'recruiter_jobs.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <RecruiterDashboardLayout>
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">My Jobs</h1>
            <p className="text-[#94a3b8]">Manage and track all your job postings</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            <Link 
              to="/dashboard/recruiter/create-job" 
              className="flex items-center justify-center px-4 py-2 bg-[#818cf8] text-white rounded-lg hover:bg-[#6366f1] transition-colors"
            >
              <FaPlus className="mr-2" />
              <span>Post New Job</span>
            </Link>
            <button 
              onClick={exportJobsData}
              className="flex items-center justify-center px-4 py-2 bg-[#1e293b] text-white border border-[#334155] rounded-lg hover:bg-[#0f172a] transition-colors"
            >
              <FaFileExport className="mr-2" />
              <span>Export</span>
            </button>
          </div>
        </div>
        
        {/* Filters and Search */}
        <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaSearch className="text-[#64748b]" />
              </div>
              <input 
                type="text" 
                placeholder="Search jobs..." 
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
              />
            </div>
            
            <div className="flex items-center">
              <span className="mr-2 text-[#94a3b8]">
                <FaFilter className="inline mr-1" /> Filter:
              </span>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleStatusFilterChange('all')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    statusFilter === 'all' 
                      ? 'bg-[#818cf8] text-white' 
                      : 'bg-[#0f172a] text-[#94a3b8] hover:bg-[#1e293b]'
                  }`}
                >
                  All
                </button>
                <button 
                  onClick={() => handleStatusFilterChange('Active')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    statusFilter === 'Active' 
                      ? 'bg-green-900 text-green-300' 
                      : 'bg-[#0f172a] text-[#94a3b8] hover:bg-[#1e293b]'
                  }`}
                >
                  Active
                </button>
                <button 
                  onClick={() => handleStatusFilterChange('Paused')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    statusFilter === 'Paused' 
                      ? 'bg-yellow-900 text-yellow-300' 
                      : 'bg-[#0f172a] text-[#94a3b8] hover:bg-[#1e293b]'
                  }`}
                >
                  Paused
                </button>
                <button 
                  onClick={() => handleStatusFilterChange('Closed')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    statusFilter === 'Closed' 
                      ? 'bg-gray-700 text-gray-300' 
                      : 'bg-[#0f172a] text-[#94a3b8] hover:bg-[#1e293b]'
                  }`}
                >
                  Closed
                </button>
                <button 
                  onClick={() => handleStatusFilterChange('Draft')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    statusFilter === 'Draft' 
                      ? 'bg-blue-900 text-blue-300' 
                      : 'bg-[#0f172a] text-[#94a3b8] hover:bg-[#1e293b]'
                  }`}
                >
                  Draft
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Jobs Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6 flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#818cf8]"></div>
              </div>
            ) : (
              <JobsTable 
                jobs={filteredJobs} 
                showPostedBy={false}
                showApplicants={true}
                showStatus={true}
              />
            )}
          </div>
          <div>
            <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
              <h3 className="text-lg font-medium text-white mb-4">Job Status Summary</h3>
              
              <div className="space-y-4">
                {statusData.map((status) => (
                  <div key={status.status} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-3" 
                        style={{ backgroundColor: status.color }}
                      ></div>
                      <span className="text-white">{status.status}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-white font-medium">{status.count}</span>
                      <span className="text-[#94a3b8] ml-1">jobs</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-[#334155]">
                <div className="flex justify-between items-center">
                  <span className="text-[#94a3b8]">Total Jobs</span>
                  <span className="text-white font-medium">{jobs.length}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <span className="text-[#94a3b8] text-sm">Job Status Distribution</span>
                </div>
                <div className="h-2 bg-[#0f172a] rounded-full overflow-hidden flex">
                  {statusData.map((status) => (
                    <div 
                      key={status.status}
                      className="h-full" 
                      style={{ 
                        backgroundColor: status.color,
                        width: `${jobs.length ? (status.count / jobs.length) * 100 : 0}%`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        

        
        {/* Conversion Metrics */}
        <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
          <h3 className="text-lg font-medium text-white mb-4">Conversion Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0f172a] p-6 rounded-lg border border-[#334155]">
              <h4 className="text-white font-medium mb-2">View to Application Rate</h4>
              <div className="flex items-end">
                <div className="text-3xl font-bold text-white">
                  {jobs.length > 0 
                    ? `${Math.round((jobs.reduce((sum, job) => sum + job.applications, 0) / 
                        jobs.reduce((sum, job) => sum + job.views, 0)) * 100)}%` 
                    : '0%'}
                </div>
                <div className="ml-2 text-sm text-green-400">↑ 3%</div>
              </div>
              <p className="text-[#94a3b8] mt-2 text-sm">
                Percentage of job views that result in applications
              </p>
              <div className="mt-4 h-2 bg-[#1e293b] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#818cf8] to-[#6366f1]" 
                  style={{ 
                    width: jobs.length > 0 
                      ? `${Math.round((jobs.reduce((sum, job) => sum + job.applications, 0) / 
                          jobs.reduce((sum, job) => sum + job.views, 0)) * 100)}%` 
                      : '0%' 
                  }}
                ></div>
              </div>
            </div>
            
            <div className="bg-[#0f172a] p-6 rounded-lg border border-[#334155]">
              <h4 className="text-white font-medium mb-2">Interest to Application Rate</h4>
              <div className="flex items-end">
                <div className="text-3xl font-bold text-white">
                  {jobs.length > 0 
                    ? `${Math.round((jobs.reduce((sum, job) => sum + job.applications, 0) / 
                        jobs.reduce((sum, job) => sum + job.interested, 0)) * 100)}%` 
                    : '0%'}
                </div>
                <div className="ml-2 text-sm text-green-400">↑ 5%</div>
              </div>
              <p className="text-[#94a3b8] mt-2 text-sm">
                Percentage of interested candidates who complete applications
              </p>
              <div className="mt-4 h-2 bg-[#1e293b] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#818cf8] to-[#6366f1]" 
                  style={{ 
                    width: jobs.length > 0 
                      ? `${Math.round((jobs.reduce((sum, job) => sum + job.applications, 0) / 
                          jobs.reduce((sum, job) => sum + job.interested, 0)) * 100)}%` 
                      : '0%' 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RecruiterDashboardLayout>
  );
};

export default RecruiterJobs;