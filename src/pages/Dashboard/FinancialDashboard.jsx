import React, { useState, useEffect } from 'react';
import { FaMoneyBillWave, FaUsers, FaChartLine, FaCalendarAlt } from 'react-icons/fa';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import FinancialCard from '../../components/Dashboard/FinancialCard';
import RevenueChart from '../../components/Dashboard/RevenueChart';
import SubscriptionTable from '../../components/Dashboard/SubscriptionTable';
import FinancialSummary from '../../components/Dashboard/FinancialSummary';
import PlanDistribution from '../../components/Dashboard/PlanDistribution';
import RevenueByPlan from '../../components/Dashboard/RevenueByPlan';

const FinancialDashboard = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [revenueData, setRevenueData] = useState([]);
  
  // Generate revenue data based on selected time range
  useEffect(() => {
    const generateRevenueData = () => {
      let days = 7;
      if (timeRange === '30days') days = 30;
      if (timeRange === 'alltime') days = 90; // 3 months for all time
      
      const data = [];
      for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (days - i - 1));
        data.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          value: Math.floor(Math.random() * 5000) + 1000, // Revenue between $1000-$6000
        });
      }
      
      setRevenueData(data);
    };
    
    generateRevenueData();
  }, [timeRange]);
  
  // Financial stats
  const financialStats = [
    { 
      title: 'Premium Users', 
      value: '248', 
      change: '+15%', 
      isPositive: true, 
      icon: <FaUsers className="text-[#818cf8] text-xl" /> 
    },
    { 
      title: 'Monthly Revenue', 
      value: '42,580', 
      change: '+24%', 
      isPositive: true, 
      icon: <FaMoneyBillWave className="text-[#818cf8] text-xl" />,
      prefix: '$'
    },
    { 
      title: 'Avg. Subscription', 
      value: '8.2', 
      change: '+5%', 
      isPositive: true, 
      icon: <FaCalendarAlt className="text-[#818cf8] text-xl" />,
      suffix: ' months'
    },
    { 
      title: 'Annual Growth', 
      value: '32', 
      change: '+8%', 
      isPositive: true, 
      icon: <FaChartLine className="text-[#818cf8] text-xl" />,
      suffix: '%'
    },
  ];
  
  // Sample subscription data
  const subscriptions = [
    { user: 'John Smith', plan: 'Premium Plus', amount: 99.99, status: 'Active', date: 'Mar 15, 2023' },
    { user: 'Sarah Johnson', plan: 'Premium', amount: 49.99, status: 'Active', date: 'Feb 28, 2023' },
    { user: 'Michael Brown', plan: 'Premium Plus', amount: 99.99, status: 'Active', date: 'Mar 10, 2023' },
    { user: 'Emily Davis', plan: 'Basic Premium', amount: 29.99, status: 'Pending', date: 'Mar 18, 2023' },
    { user: 'David Wilson', plan: 'Premium', amount: 49.99, status: 'Active', date: 'Jan 05, 2023' },
    { user: 'Jessica Taylor', plan: 'Premium Plus', amount: 99.99, status: 'Cancelled', date: 'Mar 01, 2023' },
    { user: 'Robert Martinez', plan: 'Basic Premium', amount: 29.99, status: 'Active', date: 'Feb 15, 2023' },
    { user: 'Jennifer Anderson', plan: 'Premium', amount: 49.99, status: 'Active', date: 'Mar 12, 2023' },
    { user: 'Christopher Thomas', plan: 'Premium Plus', amount: 99.99, status: 'Active', date: 'Feb 20, 2023' },
    { user: 'Lisa Jackson', plan: 'Basic Premium', amount: 29.99, status: 'Pending', date: 'Mar 17, 2023' },
  ];
  
  // Financial summary data
  const summaryData = {
    totalPremiumUsers: 248,
    monthlyRevenue: 42580,
    annualRevenue: 510960,
    avgSubscriptionMonths: 8.2
  };
  
  // Plan distribution data
  const planDistribution = [
    { name: 'Basic Premium', count: 85, color: '#60a5fa' },
    { name: 'Premium', count: 112, color: '#818cf8' },
    { name: 'Premium Plus', count: 51, color: '#a5b4fc' },
  ];
  
  // Revenue by plan data
  const revenueByPlan = [
    { plan: 'Basic Premium', revenue: 76500, color: '#60a5fa' },
    { plan: 'Premium', revenue: 201600, color: '#818cf8' },
    { plan: 'Premium Plus', revenue: 232860, color: '#a5b4fc' },
  ];
  
  const dashboardContent = (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Financial Dashboard</h1>
        <p className="text-[#94a3b8]">Track your platform's financial performance and premium subscriptions</p>
      </div>
      
      {/* Financial Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {financialStats.map((stat, index) => (
          <FinancialCard 
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            isPositive={stat.isPositive}
            icon={stat.icon}
            prefix={stat.prefix}
            suffix={stat.suffix}
          />
        ))}
      </div>
      
      {/* Revenue Chart and Financial Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <RevenueChart 
            data={revenueData} 
            title="Revenue Analytics" 
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
          />
        </div>
        <div>
          <FinancialSummary data={summaryData} />
        </div>
      </div>
      
      {/* Plan Distribution and Revenue by Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PlanDistribution plans={planDistribution} />
        <RevenueByPlan data={revenueByPlan} />
      </div>
      
      {/* Subscription Table */}
      <div className="mb-8">
        <SubscriptionTable subscriptions={subscriptions} />
      </div>
    </div>
  );
  
  return (
    <DashboardLayout>
      {dashboardContent}
    </DashboardLayout>
  );
};

export default FinancialDashboard;