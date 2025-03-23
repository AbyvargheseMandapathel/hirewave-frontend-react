import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaEdit, FaCommentAlt, FaCalendarAlt, FaEye, 
  FaTrash, FaArrowRight, FaFileAlt, FaThumbsUp 
} from 'react-icons/fa';

const BlogActivityLog = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'post_published':
        return <div className="bg-green-900 p-2 rounded-full"><FaFileAlt className="text-green-300" /></div>;
      case 'post_edited':
        return <div className="bg-blue-900 p-2 rounded-full"><FaEdit className="text-blue-300" /></div>;
      case 'comment_added':
        return <div className="bg-purple-900 p-2 rounded-full"><FaCommentAlt className="text-purple-300" /></div>;
      case 'post_scheduled':
        return <div className="bg-yellow-900 p-2 rounded-full"><FaCalendarAlt className="text-yellow-300" /></div>;
      case 'post_viewed':
        return <div className="bg-indigo-900 p-2 rounded-full"><FaEye className="text-indigo-300" /></div>;
      case 'post_deleted':
        return <div className="bg-red-900 p-2 rounded-full"><FaTrash className="text-red-300" /></div>;
      case 'comment_liked':
        return <div className="bg-pink-900 p-2 rounded-full"><FaThumbsUp className="text-pink-300" /></div>;
      default:
        return <div className="bg-gray-900 p-2 rounded-full"><FaFileAlt className="text-gray-300" /></div>;
    }
  };

  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-white">Recent Activity</h3>
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
                {activity.user && (
                  <div className="mt-2 flex items-center text-xs text-[#64748b]">
                    <span>By: {activity.user}</span>
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
        <Link to="/dashboard/blog/activity" className="text-[#818cf8] hover:text-[#a5b4fc] text-sm flex items-center justify-center">
          View All Activity <FaArrowRight className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default BlogActivityLog;