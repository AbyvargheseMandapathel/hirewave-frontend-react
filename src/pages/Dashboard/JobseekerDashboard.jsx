import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import { FaBriefcase, FaBookmark, FaHistory, FaCalendarAlt, FaSpinner } from 'react-icons/fa';
import { getJobseekerDashboardStats } from '../../services/dashboardService';
import { Link } from 'react-router-dom';

const JobseekerDashboard = () => {
  const [stats, setStats] = useState({
    savedJobsCount: 0,
    appliedJobsCount: 'Coming Soon',
    interviewsCount: 'Coming Soon',
    upcomingCount: 'Coming Soon'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const dashboardStats = await getJobseekerDashboardStats();
        setStats(dashboardStats);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Jobseeker Dashboard</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <FaSpinner className="animate-spin text-[#818cf8] text-4xl" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center my-8">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-[#334155] text-white px-4 py-2 rounded-lg hover:bg-[#475569]"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-[#1e293b] p-6 rounded-lg border border-[#334155]">
                <div className="flex items-center mb-4">
                  <FaBriefcase className="text-[#818cf8] text-xl mr-3" />
                  <h3 className="text-white font-semibold">Applied Jobs</h3>
                </div>
                <p className="text-3xl font-bold text-white">{stats.appliedJobsCount}</p>
              </div>
              
              <Link to="/dashboard/jobseeker/saved-jobs" className="block">
                <div className="bg-[#1e293b] p-6 rounded-lg border border-[#334155] hover:border-[#818cf8] transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <FaBookmark className="text-[#818cf8] text-xl mr-3" />
                    <h3 className="text-white font-semibold">Saved Jobs</h3>
                  </div>
                  <p className="text-3xl font-bold text-white">{stats.savedJobsCount}</p>
                </div>
              </Link>
              
              <div className="bg-[#1e293b] p-6 rounded-lg border border-[#334155]">
                <div className="flex items-center mb-4">
                  <FaHistory className="text-[#818cf8] text-xl mr-3" />
                  <h3 className="text-white font-semibold">Interviews</h3>
                </div>
                <p className="text-3xl font-bold text-white">{stats.interviewsCount}</p>
              </div>
              
              <div className="bg-[#1e293b] p-6 rounded-lg border border-[#334155]">
                <div className="flex items-center mb-4">
                  <FaCalendarAlt className="text-[#818cf8] text-xl mr-3" />
                  <h3 className="text-white font-semibold">Upcoming</h3>
                </div>
                <p className="text-3xl font-bold text-white">{stats.upcomingCount}</p>
              </div>
            </div>
            
            <div className="bg-[#1e293b] p-6 rounded-lg border border-[#334155] mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Recommended Jobs</h2>
              <p className="text-[#94a3b8]">Coming Soon - Complete your profile to get personalized recommendations.</p>
            </div>
            
            <div className="bg-[#1e293b] p-6 rounded-lg border border-[#334155]">
              <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
              <p className="text-[#94a3b8]">Coming Soon - Your recent activity will appear here.</p>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default JobseekerDashboard;