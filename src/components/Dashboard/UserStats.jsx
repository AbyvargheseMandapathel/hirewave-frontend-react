import React from 'react';
import { FaUsers, FaUserTie, FaUserShield, FaUserClock } from 'react-icons/fa';

const UserStats = ({ data }) => {
  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
      <h3 className="text-lg font-medium text-white mb-4">User Statistics</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {data.map((stat, index) => (
          <div key={index} className="p-4 bg-[#0f172a] rounded-lg border border-[#334155]">
            <div className="flex items-center mb-2">
              <div className="p-2 rounded-lg bg-[#334155] mr-3">
                {stat.icon}
              </div>
              <span className="text-[#94a3b8]">{stat.title}</span>
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="mt-2 text-xs text-[#64748b]">{stat.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStats;