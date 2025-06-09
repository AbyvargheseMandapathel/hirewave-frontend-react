import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import DashboardStats from '../../components/Dashboard/DashboardStats';
import JobsTable from '../../components/Dashboard/JobsTable';
import JobsStatusChart from '../../components/Dashboard/JobsStatusChart';
import JobsActivityLog from '../../components/Dashboard/JobsActivityLog';
import { FaFilter, FaDownload, FaUserTie, FaBuilding, FaEye, FaThumbsUp } from 'react-icons/fa';

const JobsAdminDashboard = () => {
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'admin', 'recruiter'

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          'https://hirewavebackend-edxfrq215-q1lgmfjl.leapcell.dev/api/jobs/?page=1&limit=6'
        );
        if (!response.ok) throw new Error('Failed to fetch jobs');

        const result = await response.json();

        // Map API response to your UI structure
        const mappedJobs = result.results.map((job, index) => ({
          id: job.id || index + 1,
          title: job.title || 'Untitled',
          company: job.company || 'Private',
          status: job.status === 'active' ? 'Open' : job.status.charAt(0).toUpperCase() + job.status.slice(1),
          date: new Date(job.created_at).toLocaleDateString(),
          views: Math.floor(Math.random() * 200) + 100, // mock data
          interested: Math.floor(Math.random() * 30) + 10, // mock data
          postedBy: job.posted_by ? 'recruiter' : 'admin',
          recruiterName: job.posted_by ? 'John Doe' : undefined,
          externalLink: job.external_link || '#', 
        }));

        setJobsData(mappedJobs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on active tab
  const filteredJobs = activeTab === 'all'
    ? jobsData
    : jobsData.filter((job) => job.postedBy === activeTab);

  // Stats calculation
  const statsData = [
    {
      title: 'Total Jobs',
      value: jobsData.length.toString(),
      change: '+12%',
      isPositive: true,
      icon: <FaBuilding className="text-[#818cf8] text-xl" />,
    },
    {
      title: 'Total Views',
      value: jobsData.reduce((sum, job) => sum + job.views, 0).toLocaleString(),
      change: '+18%',
      isPositive: true,
      icon: <FaEye className="text-[#818cf8] text-xl" />,
    },
    {
      title: 'Interested Users',
      value: jobsData.reduce((sum, job) => sum + job.interested, 0).toLocaleString(),
      change: '+24%',
      isPositive: true,
      icon: <FaThumbsUp className="text-[#818cf8] text-xl" />,
    },
    {
      title: 'Applications',
      value: jobsData.reduce(
        (sum, job) => sum + (job.applications ? parseInt(job.applications, 10) : 0),
        0
      ).toLocaleString(),
      change: '+15%',
      isPositive: true,
      icon: <FaUserTie className="text-[#818cf8] text-xl" />,
    },
  ];

  // Recent activities (mock for now)
  const jobActivities = [
    { id: 1, type: 'job_posted', title: 'Job Posted', description: 'Senior Developer', time: '2 hours ago' },
    { id: 2, type: 'job_updated', title: 'Job Updated', description: 'UX Designer', time: '3 hours ago' },
    { id: 3, type: 'job_closed', title: 'Job Closed', description: 'DevOps Engineer', time: '1 day ago' },
  ];

  // Show loading or error
  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 text-white">Loading jobs...</div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-6 text-red-500">Error fetching jobs: {error}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Jobs Dashboard</h1>
          <p className="text-[#94a3b8]">Manage and monitor all job postings across your platform</p>
        </div>

        {/* Jobs Stats */}
        <DashboardStats stats={statsData} />

        {/* Filter Tabs */}
        <div className="flex mb-6 bg-[#1e293b] rounded-lg p-1 w-fit">
          <button
            className={`px-4 py-2 rounded-md ${activeTab === 'all' ? 'bg-[#334155] text-white' : 'text-[#94a3b8]'}`}
            onClick={() => setActiveTab('all')}
          >
            All Jobs
          </button>
          <button
            className={`px-4 py-2 rounded-md flex items-center ${activeTab === 'admin' ? 'bg-[#334155] text-white' : 'text-[#94a3b8]'}`}
            onClick={() => setActiveTab('admin')}
          >
            <FaBuilding className="mr-2" /> Admin Posted
          </button>
          <button
            className={`px-4 py-2 rounded-md flex items-center ${activeTab === 'recruiter' ? 'bg-[#334155] text-white' : 'text-[#94a3b8]'}`}
            onClick={() => setActiveTab('recruiter')}
          >
            <FaUserTie className="mr-2" /> Recruiter Posted
          </button>
        </div>

        {/* Jobs Table and Activity Log */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <JobsTable
              jobs={filteredJobs}
              showPostedBy={true}
              showApplicants={activeTab !== 'admin'}
              showStatus={true}
            />
          </div>
          <div>
            <JobsActivityLog activities={jobActivities} showUser={true} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobsAdminDashboard;