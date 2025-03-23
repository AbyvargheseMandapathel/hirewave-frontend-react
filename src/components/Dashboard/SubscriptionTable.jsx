import React, { useState } from 'react';
import { FaSearch, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const SubscriptionTable = ({ subscriptions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="ml-1 text-[#64748b]" />;
    return sortDirection === 'asc' ? 
      <FaSortUp className="ml-1 text-[#818cf8]" /> : 
      <FaSortDown className="ml-1 text-[#818cf8]" />;
  };
  
  const filteredSubscriptions = subscriptions
    .filter(sub => 
      sub.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.status.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'user':
          comparison = a.user.localeCompare(b.user);
          break;
        case 'plan':
          comparison = a.plan.localeCompare(b.plan);
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'date':
          comparison = new Date(a.date) - new Date(b.date);
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  
  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-white">Premium Subscriptions</h3>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <FaSearch className="text-[#64748b]" />
          </span>
          <input 
            type="text" 
            placeholder="Search subscriptions..." 
            className="bg-[#0f172a] text-white pl-10 pr-4 py-2 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-[#94a3b8]">
          <thead>
            <tr className="border-b border-[#334155]">
              <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort('user')}>
                <div className="flex items-center">
                  User {getSortIcon('user')}
                </div>
              </th>
              <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort('plan')}>
                <div className="flex items-center">
                  Plan {getSortIcon('plan')}
                </div>
              </th>
              <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort('amount')}>
                <div className="flex items-center">
                  Amount {getSortIcon('amount')}
                </div>
              </th>
              <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort('status')}>
                <div className="flex items-center">
                  Status {getSortIcon('status')}
                </div>
              </th>
              <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort('date')}>
                <div className="flex items-center">
                  Date {getSortIcon('date')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSubscriptions.map((sub, index) => (
              <tr key={index} className="border-b border-[#334155] hover:bg-[#334155]">
                <td className="px-4 py-2">{sub.user}</td>
                <td className="px-4 py-2">{sub.plan}</td>
                <td className="px-4 py-2">${sub.amount}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    sub.status === 'Active' ? 'bg-green-900/30 text-green-400' :
                    sub.status === 'Pending' ? 'bg-yellow-900/30 text-yellow-400' :
                    'bg-red-900/30 text-red-400'
                  }`}>
                    {sub.status}
                  </span>
                </td>
                <td className="px-4 py-2">{sub.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionTable;