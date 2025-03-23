import React from 'react';
import { FaEye, FaThumbsUp, FaUserPlus, FaCalendarAlt, FaChartLine } from 'react-icons/fa';

const JobMetrics = ({ job }) => {
  // Calculate metrics
  const conversionRate = ((job.applications / job.views) * 100).toFixed(1);
  const interestRate = ((job.interested / job.views) * 100).toFixed(1);
  
  // Mock data for daily views
  const dailyViews = [
    { day: 'Mon', views: Math.floor(Math.random() * 50) + 10 },
    { day: 'Tue', views: Math.floor(Math.random() * 50) + 10 },
    { day: 'Wed', views: Math.floor(Math.random() * 50) + 10 },
    { day: 'Thu', views: Math.floor(Math.random() * 50) + 10 },
    { day: 'Fri', views: Math.floor(Math.random() * 50) + 10 },
    { day: 'Sat', views: Math.floor(Math.random() * 30) + 5 },
    { day: 'Sun', views: Math.floor(Math.random() * 30) + 5 },
  ];
  
  // Find max views for scaling
  const maxViews = Math.max(...dailyViews.map(d => d.views));

  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-white">Job Performance</h3>
        <div className="text-[#94a3b8] text-sm flex items-center">
          <FaCalendarAlt className="mr-2" />
          <span>Posted: {job.date}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
          <div className="flex items-center mb-2">
            <FaEye className="text-[#60a5fa] mr-2" />
            <span className="text-white">Total Views</span>
          </div>
          <div className="text-2xl font-bold text-white">{job.views}</div>
        </div>
        
        <div className="bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
          <div className="flex items-center mb-2">
            <FaThumbsUp className="text-[#818cf8] mr-2" />
            <span className="text-white">Interested</span>
          </div>
          <div className="text-2xl font-bold text-white">{job.interested}</div>
          <div className="text-xs text-[#64748b]">{interestRate}% of views</div>
        </div>
        
        <div className="bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
          <div className="flex items-center mb-2">
            <FaUserPlus className="text-[#a5b4fc] mr-2" />
            <span className="text-white">Applications</span>
          </div>
          <div className="text-2xl font-bold text-white">{job.applications}</div>
          <div className="text-xs text-[#64748b]">{conversionRate}% of views</div>
        </div>
        
        <div className="bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
          <div className="flex items-center mb-2">
            <FaChartLine className="text-[#34d399] mr-2" />
            <span className="text-white">Status</span>
          </div>
          <div className="text-xl font-bold">
            <span className={`px-2 py-1 rounded-full text-xs ${
              job.status === 'Active' 
                ? 'bg-green-900 text-green-300' 
                : job.status === 'Paused'
                  ? 'bg-yellow-900 text-yellow-300'
                  : 'bg-gray-700 text-gray-300'
            }`}>
              {job.status}
            </span>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-white font-medium mb-4">Daily Views</h4>
        <div className="flex items-end h-32 space-x-2">
          {dailyViews.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-[#818cf8] rounded-t-sm" 
                style={{ 
                  height: `${(day.views / maxViews) * 100}%`,
                  opacity: 0.7 + (index / 10)
                }}
              ></div>
              <div className="text-[#94a3b8] text-xs mt-2">{day.day}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobMetrics;