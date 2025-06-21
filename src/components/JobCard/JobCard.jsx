import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaBriefcase, FaDollarSign } from 'react-icons/fa';

const JobCard = ({ job }) => {
  const handleShareAndEarn = (e) => {
    e.preventDefault();
    e.stopPropagation();
  
    navigate('/refer-and-win');
  };

  return (
    <div className="bg-[#1e293b] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <Link 
        to={`/job/${job.id}`}
        className="block p-6 hover:transform hover:scale-105 transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-4">
          <FaBuilding className="text-[#94a3b8] w-8 h-8" />
          <span className="text-sm bg-[#334155] text-[#94a3b8] px-3 py-1 rounded-full">
            {job.type}
          </span>
        </div>
        
        <h2 className="text-xl font-semibold text-white mb-2">{job.title}</h2>
        <p className="text-[#94a3b8] mb-4">{job.company}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-[#94a3b8]">
            <FaMapMarkerAlt className="mr-2" />
            {job.location}
          </div>
          <div className="flex items-center text-[#94a3b8]">
            <FaMoneyBillWave className="mr-2" />
            {job.salary}
          </div>
          <div className="flex items-center text-[#94a3b8]">
            <FaBriefcase className="mr-2" />
            {job.type}
          </div>
        </div>
      </Link>
      
      {/* Share & Earn Button */}
      <div className="px-6 pb-6 mt-auto">
        <button
          onClick={handleShareAndEarn}
          className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-600 hover:to-teal-500 transition-all duration-300 flex items-center justify-between group"
        >
          <span className="text-left">Boost Earnings by Sharing</span>
          <FaDollarSign className="text-green-300 group-hover:scale-110 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
};

export default JobCard;