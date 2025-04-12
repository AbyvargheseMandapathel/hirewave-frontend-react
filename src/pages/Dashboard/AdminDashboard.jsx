import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import DashboardStats from '../../components/Dashboard/DashboardStats';
import VisitorAnalytics from '../../components/Dashboard/VisitorAnalytics';
import RecentActivityLog from '../../components/Dashboard/RecentActivityLog';
import TopCandidates from '../../components/Dashboard/TopCandidates';
import { FaUsers, FaBriefcase, FaRss, FaChartLine, FaMoneyBillWave } from 'react-icons/fa';
import FeatureFlagsPanel from './FeatureFlagsPanel';

const AdminDashboard = () => {
  const [visitorData, setVisitorData] = useState([]);
  
  
  // Generate visitor data
  useEffect(() => {
    const generateVisitorData = () => {
      const data = [];
      for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (30 - i - 1));
        data.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          visitors: Math.floor(Math.random() * 3000) + 400,
        });
      }
      
      setVisitorData(data);
    };
    
    generateVisitorData();
  }, []);
  
  // Dashboard stats data
  const statsData = [
    { title: 'Total Jobs', value: '124', change: '+12%', isPositive: true },
    { title: 'Total Users', value: '3,485', change: '+24%', isPositive: true },
    { title: 'Active Recruiters', value: '68', change: '+8%', isPositive: true },
    { title: 'Conversion Rate', value: '18%', change: '+5%', isPositive: true },
  ];
  
  // Recent activity data
  const recentActivities = [
    { 
      id: 1, 
      type: 'user_joined', 
      title: 'User Joined', 
      description: 'Alex Johnson', 
      time: '2 hours ago' 
    },
    { 
      id: 2, 
      type: 'new_visitor', 
      title: 'New Visitor', 
      description: 'IP 192.168.1.45', 
      time: '3 hours ago' 
    },
    { 
      id: 3, 
      type: 'recruiter_login', 
      title: 'Recruiter Login', 
      description: 'Sarah Williams', 
      time: '5 hours ago' 
    },
    { 
      id: 4, 
      type: 'job_posted', 
      title: 'Job Posted', 
      description: 'Michael Brown', 
      time: '1 day ago' 
    },
    { 
      id: 5, 
      type: 'user_registration', 
      title: 'User Registration', 
      description: 'Emily Davis', 
      time: '1 day ago' 
    },
    { 
      id: 6, 
      type: 'user_registration', 
      title: 'User Registration', 
      description: 'Alex Johnson', 
      time: '1 day ago' 
    },
  ];
  
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="mb-6">
          <DashboardStats stats={statsData} />
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Visitor Analytics */}
          <div className="lg:col-span-2">
            <VisitorAnalytics data={visitorData} />
          </div>
          
          {/* Right Column - Activity Log */}
          <div>
            <RecentActivityLog activities={recentActivities} />
          </div>
        </div>
      </div>
      
      {/* Only show in development */}
      {import.meta.env.MODE === 'development' && (
        <div className="mt-6">
          <FeatureFlagsPanel />
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;