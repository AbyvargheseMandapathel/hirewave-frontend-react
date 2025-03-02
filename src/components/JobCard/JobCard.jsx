import React from 'react';
import { Link } from 'react-router-dom';
import { FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaBriefcase } from 'react-icons/fa';

const JobCard = ({ job }) => {
  return (
    <Link 
      to={`/job/${job.id}`}
      className="bg-[#1e293b] rounded-lg p-6 hover:transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl block"
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
  );
};

export default JobCard;