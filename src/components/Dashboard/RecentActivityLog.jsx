import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaChartLine, FaUserTie, FaBriefcase, FaArrowRight } from 'react-icons/fa';

const RecentActivityLog = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_joined':
        return <div className="bg-green-900 p-2 rounded-full"><FaUserPlus className="text-green-300" /></div>;
      case 'new_visitor':
        return <div className="bg-blue-900 p-2 rounded-full"><FaChartLine className="text-blue-300" /></div>;
      case 'recruiter_login':
        return <div className="bg-purple-900 p-2 rounded-full"><FaUserTie className="text-purple-300" /></div>;
      case 'job_posted':
        return <div className="bg-yellow-900 p-2 rounded-full"><FaBriefcase className="text-yellow-300" /></div>;
      case 'user_registration':
        return <div className="bg-green-900 p-2 rounded-full"><FaUserPlus className="text-green-300" /></div>;
      default:
        return <div className="bg-gray-900 p-2 rounded-full"><FaChartLine className="text-gray-300" /></div>;
    }
  };

  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-white">Recent Activity Log</h3>
      </div>
      
      {activities.length > 0 ? (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-start p-4 bg-[#0f172a] rounded-lg border border-[#334155]"
            >
              <div className="mr-3">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-white font-medium">{activity.title}</span>
                  <span className="text-[#64748b] text-xs">{activity.time}</span>
                </div>
                <p className="text-[#94a3b8] text-sm">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-[#94a3b8]">No recent activities</p>
        </div>
      )}
      
      <div className="mt-4 text-center">
        <Link to="/dashboard/activity" className="text-[#818cf8] hover:text-[#a5b4fc] text-sm flex items-center justify-center">
          View All Activity <FaArrowRight className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default RecentActivityLog;