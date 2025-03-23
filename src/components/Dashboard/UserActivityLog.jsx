import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUserPlus, FaSignInAlt, FaUserEdit, FaUserMinus, 
  FaUserCog, FaUserShield, FaUserSlash 
} from 'react-icons/fa';

const UserActivityLog = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_registered':
        return <div className="bg-green-900 p-2 rounded-full"><FaUserPlus className="text-green-300" /></div>;
      case 'user_login':
        return <div className="bg-blue-900 p-2 rounded-full"><FaSignInAlt className="text-blue-300" /></div>;
      case 'user_updated':
        return <div className="bg-purple-900 p-2 rounded-full"><FaUserEdit className="text-purple-300" /></div>;
      case 'user_deleted':
        return <div className="bg-red-900 p-2 rounded-full"><FaUserMinus className="text-red-300" /></div>;
      case 'role_changed':
        return <div className="bg-yellow-900 p-2 rounded-full"><FaUserCog className="text-yellow-300" /></div>;
      case 'admin_action':
        return <div className="bg-indigo-900 p-2 rounded-full"><FaUserShield className="text-indigo-300" /></div>;
      case 'user_suspended':
        return <div className="bg-gray-900 p-2 rounded-full"><FaUserSlash className="text-gray-300" /></div>;
      default:
        return <div className="bg-gray-900 p-2 rounded-full"><FaUserEdit className="text-gray-300" /></div>;
    }
  };

  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-white">User Activity Log</h3>
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
                <h4 className="text-white font-medium">{activity.title}</h4>
                <p className="text-[#94a3b8] text-sm">{activity.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[#64748b] text-xs">{activity.time}</span>
                  <Link to={`/user/${activity.user.replace(/\s+/g, '-').toLowerCase()}`} className="text-[#818cf8] text-xs hover:text-[#a5b4fc]">
                    View User
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-[#94a3b8]">No recent activities</div>
      )}
    </div>
  );
};

export default UserActivityLog;