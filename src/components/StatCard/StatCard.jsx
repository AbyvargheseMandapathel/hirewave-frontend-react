import React from 'react';

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-4">
      <div className="text-[#94a3b8] mb-1">{title}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  );
};

export default StatCard;