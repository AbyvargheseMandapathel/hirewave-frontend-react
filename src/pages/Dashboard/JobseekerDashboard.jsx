import React from 'react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import { FaBriefcase, FaBookmark, FaHistory, FaCalendarAlt } from 'react-icons/fa';

const JobseekerDashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Jobseeker Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#1e293b] p-6 rounded-lg border border-[#334155]">
            <div className="flex items-center mb-4">
              <FaBriefcase className="text-[#818cf8] text-xl mr-3" />
              <h3 className="text-white font-semibold">Applied Jobs</h3>
            </div>
            <p className="text-3xl font-bold text-white">0</p>
          </div>
          
          <div className="bg-[#1e293b] p-6 rounded-lg border border-[#334155]">
            <div className="flex items-center mb-4">
              <FaBookmark className="text-[#818cf8] text-xl mr-3" />
              <h3 className="text-white font-semibold">Saved Jobs</h3>
            </div>
            <p className="text-3xl font-bold text-white">0</p>
          </div>
          
          <div className="bg-[#1e293b] p-6 rounded-lg border border-[#334155]">
            <div className="flex items-center mb-4">
              <FaHistory className="text-[#818cf8] text-xl mr-3" />
              <h3 className="text-white font-semibold">Interviews</h3>
            </div>
            <p className="text-3xl font-bold text-white">0</p>
          </div>
          
          <div className="bg-[#1e293b] p-6 rounded-lg border border-[#334155]">
            <div className="flex items-center mb-4">
              <FaCalendarAlt className="text-[#818cf8] text-xl mr-3" />
              <h3 className="text-white font-semibold">Upcoming</h3>
            </div>
            <p className="text-3xl font-bold text-white">0</p>
          </div>
        </div>
        
        <div className="bg-[#1e293b] p-6 rounded-lg border border-[#334155] mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Recommended Jobs</h2>
          <p className="text-[#94a3b8]">No recommended jobs yet. Complete your profile to get personalized recommendations.</p>
        </div>
        
        <div className="bg-[#1e293b] p-6 rounded-lg border border-[#334155]">
          <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
          <p className="text-[#94a3b8]">No recent activity.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobseekerDashboard;