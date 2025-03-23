import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const FinancialCard = ({ title, value, change, isPositive, icon, prefix = '', suffix = '' }) => {
  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg p-6 border border-[#334155]">
      <div className="flex justify-between items-center mb-2">
        <p className="text-[#94a3b8]">{title}</p>
        {icon}
      </div>
      <div className="flex items-end justify-between">
        <h3 className="text-3xl font-bold text-white">
          {prefix}{value}{suffix}
        </h3>
        <span className={`text-sm flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
          {change}
        </span>
      </div>
    </div>
  );
};

export default FinancialCard;