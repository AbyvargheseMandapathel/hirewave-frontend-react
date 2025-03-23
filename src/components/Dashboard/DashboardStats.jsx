import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-[#1e293b] rounded-xl shadow-lg p-6 border border-[#334155]">
          <p className="text-[#94a3b8] mb-2">{stat.title}</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
            <span className={`text-sm flex items-center ${stat.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {stat.isPositive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;