import React from 'react';
import { FaUsers, FaMoneyBillWave, FaChartLine, FaCalendarAlt } from 'react-icons/fa';

const FinancialSummary = ({ data }) => {
  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
      <h3 className="text-lg font-medium text-white mb-4">Financial Summary</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-[#0f172a] rounded-lg">
          <div className="flex items-center">
            <div className="bg-[#334155] p-2 rounded-lg mr-3">
              <FaUsers className="text-[#818cf8]" />
            </div>
            <span className="text-[#94a3b8]">Total Premium Users</span>
          </div>
          <span className="text-white font-semibold">{data.totalPremiumUsers}</span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-[#0f172a] rounded-lg">
          <div className="flex items-center">
            <div className="bg-[#334155] p-2 rounded-lg mr-3">
              <FaMoneyBillWave className="text-[#818cf8]" />
            </div>
            <span className="text-[#94a3b8]">Monthly Revenue</span>
          </div>
          <span className="text-white font-semibold">${data.monthlyRevenue.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-[#0f172a] rounded-lg">
          <div className="flex items-center">
            <div className="bg-[#334155] p-2 rounded-lg mr-3">
              <FaChartLine className="text-[#818cf8]" />
            </div>
            <span className="text-[#94a3b8]">Annual Revenue</span>
          </div>
          <span className="text-white font-semibold">${data.annualRevenue.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-[#0f172a] rounded-lg">
          <div className="flex items-center">
            <div className="bg-[#334155] p-2 rounded-lg mr-3">
              <FaCalendarAlt className="text-[#818cf8]" />
            </div>
            <span className="text-[#94a3b8]">Average Subscription Length</span>
          </div>
          <span className="text-white font-semibold">{data.avgSubscriptionMonths} months</span>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;