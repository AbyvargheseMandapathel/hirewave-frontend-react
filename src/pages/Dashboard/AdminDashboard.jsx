import React, { useState, useEffect, useMemo } from 'react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import DashboardStats from '../../components/Dashboard/DashboardStats';
import VisitorAnalytics from '../../components/Dashboard/VisitorAnalytics';
import RecentActivityLog from '../../components/Dashboard/RecentActivityLog';
import { FaUsers, FaBriefcase, FaRss, FaChartLine, FaMoneyBillWave, FaSpinner } from 'react-icons/fa';
import { adminDashboardService } from '../../services/dashboardService';

/**
 * @typedef {Object} DashboardStat
 * @property {string} title
 * @property {string|number} value
 * @property {React.ReactNode} [icon]
 * @property {string} [change]
 * @property {boolean} [isPositive]
 */

/**
 * @typedef {Object} Activity
 * @property {number} id
 * @property {string} type
 * @property {string} title
 * @property {string} description
 * @property {string} time
 */

const AdminDashboard = () => {
  const [visitorData, setVisitorData] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    total_jobs: 0,
    total_users: 0,
    unique_visitors: 0,
    last_updated: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard data
  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching dashboard stats...');
        const stats = await adminDashboardService.getStats();
        console.log('Received stats:', stats);

        if (isMounted) {
          setDashboardStats(stats);
          setVisitorData(generateVisitorData()); // Mock data generation
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load dashboard data');
          console.error('Dashboard data fetch error:', err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDashboardData();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  // Generate mock visitor data (replace with real API call)
  const generateVisitorData = () => {
    return Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toLocaleDateString(),
      visitors: Math.floor(Math.random() * 100) + 50,
      pageViews: Math.floor(Math.random() * 200) + 100
    })).reverse();
  };

  // Stats cards data
  const statsCards = useMemo(() => [
    {
      title: 'Total Users',
      value: typeof dashboardStats.total_users === 'number' ? dashboardStats.total_users.toLocaleString() : '0',
      icon: <FaUsers className="text-blue-400" size={20} />,
      change: '+12%',
      isPositive: true
    },
    {
      title: 'Total Jobs',
      value: typeof dashboardStats.total_jobs === 'number' ? dashboardStats.total_jobs.toLocaleString() : '0',
      icon: <FaBriefcase className="text-purple-400" size={20} />,
      change: '+5%',
      isPositive: true
    },
    {
      title: 'Unique Visitors',
      value: typeof dashboardStats.unique_visitors === 'number' ? dashboardStats.unique_visitors.toLocaleString() : '0',
      icon: <FaRss className="text-green-400" size={20} />,
      change: '+18%',
      isPositive: true
    },
    {
      title: 'Conversion Rate',
      value: '18%',
      icon: <FaChartLine className="text-yellow-400" size={20} />,
      change: '+5%',
      isPositive: true
    },
    {
      title: 'Revenue',
      value: '$12,450',
      icon: <FaMoneyBillWave className="text-red-400" size={20} />,
      change: '+22%',
      isPositive: true
    }
  ], [dashboardStats]);

  // Recent activity data (replace with real API call)
  const recentActivities = useMemo(() => [
    { id: 1, type: 'user_joined', title: 'User Joined', description: 'Alex Johnson', time: '2 hours ago' },
    { id: 2, type: 'new_visitor', title: 'New Visitor', description: 'IP 192.168.1.45', time: '3 hours ago' },
    { id: 3, type: 'recruiter_login', title: 'Recruiter Login', description: 'Sarah Williams', time: '5 hours ago' },
    { id: 4, type: 'job_posted', title: 'Job Posted', description: 'Michael Brown', time: '1 day ago' },
    { id: 5, type: 'user_registration', title: 'User Registration', description: 'Emily Davis', time: '1 day ago' }
  ], []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <FaSpinner className="animate-spin text-blue-500 text-4xl" />
    </div>
  );
  
  if (error) return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
        <button 
          className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
          {dashboardStats.last_updated && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Last updated: {new Date(dashboardStats.last_updated).toLocaleString()}
            </p>
          )}
        </header>

        {/* Stats Cards Section */}
        <section className="mb-8">
          <DashboardStats stats={statsCards} loading={loading} />
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Analytics Section */}
          <section className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <VisitorAnalytics data={visitorData} />
            </div>
          </section>

          {/* Sidebar Section */}
          <section className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <RecentActivityLog activities={recentActivities} />
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default React.memo(AdminDashboard);