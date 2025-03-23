import React from 'react';
import { FaEye, FaUserPlus, FaPercentage, FaCalendarCheck } from 'react-icons/fa';

const JobMetricsOverview = () => {
  // Mock data for job metrics
  const metrics = {
    totalViews: 1245,
    totalApplications: 143,
    conversionRate: 11.5,
    interviewRate: 19.6,
  };

  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
      <h3 className="text-lg font-medium text-white mb-6">Job Performance Overview</h3>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-[#0f172a] p-2 rounded-full mr-3">
              <FaEye className="text-[#60a5fa]" />
            </div>
            <div>
              <p className="text-[#94a3b8] text-sm">Total Views</p>
              <p className="text-white text-lg font-medium">{metrics.totalViews}</p>
            </div>
          </div>
          <div className="text-[#94a3b8] text-sm">Last 30 days</div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-[#0f172a] p-2 rounded-full mr-3">
              <FaUserPlus className="text-[#818cf8]" />
            </div>
            <div>
              <p className="text-[#94a3b8] text-sm">Applications</p>
              <p className="text-white text-lg font-medium">{metrics.totalApplications}</p>
            </div>
          </div>
          <div className="text-[#94a3b8] text-sm">Last 30 days</div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-[#0f172a] p-2 rounded-full mr-3">
              <FaPercentage className="text-[#a5b4fc]" />
            </div>
            <div>
              <p className="text-[#94a3b8] text-sm">Conversion Rate</p>
              <p className="text-white text-lg font-medium">{metrics.conversionRate}%</p>
            </div>
          </div>
          <div className="text-[#94a3b8] text-sm">Views to Applications</div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-[#0f172a] p-2 rounded-full mr-3">
              <FaCalendarCheck className="text-[#60a5fa]" />
            </div>
            <div>
              <p className="text-[#94a3b8] text-sm">Interview Rate</p>
              <p className="text-white text-lg font-medium">{metrics.interviewRate}%</p>
            </div>
          </div>
          <div className="text-[#94a3b8] text-sm">Applications to Interviews</div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-[#334155]">
        <h4 className="text-white font-medium mb-3">Performance Trends</h4>
        <div className="bg-[#0f172a] p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#94a3b8] text-sm">Views</span>
            <span className="text-white text-sm">+12% vs last month</span>
          </div>
          <div className="h-2 bg-[#1e293b] rounded-full overflow-hidden mb-4">
            <div className="h-full bg-[#60a5fa]" style={{ width: '65%' }}></div>
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#94a3b8] text-sm">Applications</span>
            <span className="text-white text-sm">+8% vs last month</span>
          </div>
          <div className="h-2 bg-[#1e293b] rounded-full overflow-hidden mb-4">
            <div className="h-full bg-[#818cf8]" style={{ width: '45%' }}></div>
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#94a3b8] text-sm">Interviews</span>
            <span className="text-white text-sm">+5% vs last month</span>
          </div>
          <div className="h-2 bg-[#1e293b] rounded-full overflow-hidden">
            <div className="h-full bg-[#a5b4fc]" style={{ width: '30%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobMetricsOverview;