import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBriefcase, FaEdit, FaPause, FaStop, FaPlay, 
  FaArrowRight, FaTrash, FaUserPlus, FaBuilding, FaUserTie 
} from 'react-icons/fa';

const JobsActivityLog = ({ activities, showUser = false }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'job_posted':
        return <div className="bg-green-900 p-2 rounded-full"><FaBriefcase className="text-green-300" /></div>;
      case 'job_updated':
        return <div className="bg-blue-900 p-2 rounded-full"><FaEdit className="text-blue-300" /></div>;
      case 'job_paused':
        return <div className="bg-yellow-900 p-2 rounded-full"><FaPause className="text-yellow-300" /></div>;
      case 'job_closed':
        return <div className="bg-gray-900 p-2 rounded-full"><FaStop className="text-gray-300" /></div>;
      case 'job_reactivated':
        return <div className="bg-purple-900 p-2 rounded-full"><FaPlay className="text-purple-300" /></div>;
      case 'job_deleted':
        return <div className="bg-red-900 p-2 rounded-full"><FaTrash className="text-red-300" /></div>;
      case 'application_received':
        return <div className="bg-indigo-900 p-2 rounded-full"><FaUserPlus className="text-indigo-300" /></div>;
      default:
        return <div className="bg-gray-900 p-2 rounded-full"><FaBriefcase className="text-gray-300" /></div>;
    }
  };

  const getUserIcon = (userType) => {
    return userType === 'admin' 
      ? <FaBuilding className="mr-1 text-[#818cf8]" /> 
      : <FaUserTie className="mr-1 text-[#818cf8]" />;
  };

  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-white">Job Activity Log</h3>
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
                {showUser && activity.user && (
                  <div className="mt-2 flex items-center text-xs text-[#64748b]">
                    <span className="flex items-center">
                      {getUserIcon(activity.userType)}
                      By: {activity.user}
                    </span>
                  </div>
                )}
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
        <Link to="/dashboard/jobs/activity" className="text-[#818cf8] hover:text-[#a5b4fc] text-sm flex items-center justify-center">
          View All Activity <FaArrowRight className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default JobsActivityLog;