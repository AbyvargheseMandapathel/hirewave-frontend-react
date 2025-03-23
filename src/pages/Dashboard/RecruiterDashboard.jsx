import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecruiterDashboardLayout from '../../components/Dashboard/RecruiterDashboardLayout';
import DashboardStats from '../../components/Dashboard/DashboardStats';
import RecentJobs from '../../components/Dashboard/RecentJobs';
import CandidateApplications from '../../components/Dashboard/CandidateApplications';
import UpcomingInterviews from '../../components/Dashboard/UpcomingInterviews';
import JobMetricsOverview from '../../components/Dashboard/JobMetricsOverview';
import { FaBriefcase, FaUserTie, FaCalendarCheck, FaChartLine } from 'react-icons/fa';

const RecruiterDashboard = () => {
  // Stats for the recruiter dashboard
  const statsData = [
    {
      title: 'Active Jobs',
      value: '12',
      change: '10%',
      isPositive: true,
    },
    {
      title: 'Interviews Scheduled',
      value: '28',
      change: '5%',
      isPositive: true,
    },
    {
      title: 'Conversion Rate',
      value: '18%',
      change: '2%',
      isPositive: false,
    },
  ];

  // Recent job postings
  const [recentJobs, setRecentJobs] = useState([]);
  
  // Recent applications
  const [applications, setApplications] = useState([]);
  
  // Upcoming interviews
  const [interviews, setInterviews] = useState([]);

  // Generate mock data
  useEffect(() => {
    // Generate recent jobs data
    const mockJobs = [
      {
        id: 1,
        title: 'Senior React Developer',
        applicants: 24,
        status: 'Active',
        date: 'May 15, 2023',
      },
      {
        id: 2,
        title: 'UX Designer',
        applicants: 18,
        status: 'Active',
        date: 'May 10, 2023',
      },
      {
        id: 3,
        title: 'DevOps Engineer',
        applicants: 9,
        status: 'Paused',
        date: 'Apr 28, 2023',
      },
      {
        id: 4,
        title: 'Product Manager',
        applicants: 15,
        status: 'Active',
        date: 'Apr 22, 2023',
      },
    ];
    
    // Generate applications data
    const mockApplications = [
      {
        id: 1,
        name: 'John Smith',
        position: 'Senior React Developer',
        status: 'Interview',
        date: 'May 18, 2023',
        match: 92,
      },
      {
        id: 2,
        name: 'Alice Johnson',
        position: 'UX Designer',
        status: 'Screening',
        date: 'May 17, 2023',
        match: 85,
      },
      {
        id: 3,
        name: 'Robert Davis',
        position: 'DevOps Engineer',
        status: 'Applied',
        date: 'May 16, 2023',
        match: 78,
      },
      {
        id: 4,
        name: 'Emily Wilson',
        position: 'Product Manager',
        status: 'Rejected',
        date: 'May 15, 2023',
        match: 65,
      },
    ];
    
    // Generate interviews data
    const mockInterviews = [
      {
        id: 1,
        candidate: 'John Smith',
        position: 'Senior React Developer',
        date: 'May 20, 2023',
        time: '10:00 AM',
      },
      {
        id: 2,
        candidate: 'Alice Johnson',
        position: 'UX Designer',
        date: 'May 21, 2023',
        time: '2:30 PM',
      },
      {
        id: 3,
        candidate: 'Michael Brown',
        position: 'Senior React Developer',
        date: 'May 22, 2023',
        time: '11:15 AM',
      },
    ];
    
    setRecentJobs(mockJobs);
    setApplications(mockApplications);
    setInterviews(mockInterviews);
  }, []);

  return (
    <RecruiterDashboardLayout>
      <div>
        <h1 className="text-2xl font-bold text-white mb-6">Recruiter Dashboard</h1>
        
        {/* Dashboard Stats */}
        <DashboardStats stats={statsData} />
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Link 
            to="/add-job" 
            className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6 flex flex-col items-center justify-center hover:bg-[#2d3748] transition-colors"
          >
            <FaBriefcase className="text-[#818cf8] text-3xl mb-3" />
            <span className="text-white font-medium">Post New Job</span>
          </Link>
          
          <Link 
            to="/dashboard/recruiter/candidates" 
            className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6 flex flex-col items-center justify-center hover:bg-[#2d3748] transition-colors"
          >
            <FaUserTie className="text-[#818cf8] text-3xl mb-3" />
            <span className="text-white font-medium">Browse Candidates</span>
          </Link>
          
          <Link 
            to="/dashboard/recruiter/interviews" 
            className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6 flex flex-col items-center justify-center hover:bg-[#2d3748] transition-colors"
          >
            <FaCalendarCheck className="text-[#818cf8] text-3xl mb-3" />
            <span className="text-white font-medium">Schedule Interview</span>
          </Link>
          
          <Link 
            to="/dashboard/recruiter/analytics" 
            className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6 flex flex-col items-center justify-center hover:bg-[#2d3748] transition-colors"
          >
            <FaChartLine className="text-[#818cf8] text-3xl mb-3" />
            <span className="text-white font-medium">View Analytics</span>
          </Link>
        </div>
        
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <RecentJobs jobs={recentJobs} />
          </div>
          <div>
            <UpcomingInterviews interviews={interviews} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CandidateApplications applications={applications} />
          </div>
          <div>
            <JobMetricsOverview />
          </div>
        </div>
      </div>
    </RecruiterDashboardLayout>
  );
};

export default RecruiterDashboard;