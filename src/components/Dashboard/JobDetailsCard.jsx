import React from 'react';
import { Link } from 'react-router-dom';
import { FaBuilding, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaExternalLinkAlt, FaUserTie } from 'react-icons/fa';

const JobDetailsCard = ({ job }) => {
  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">{job.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs ${
          job.status === 'Active' 
            ? 'bg-green-900 text-green-300' 
            : job.status === 'Paused'
              ? 'bg-yellow-900 text-yellow-300'
              : 'bg-gray-700 text-gray-300'
        }`}>
          {job.status}
        </span>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center text-[#94a3b8]">
          <FaBuilding className="mr-2 text-[#818cf8]" />
          <span>{job.company}</span>
        </div>
        
        <div className="flex items-center text-[#94a3b8]">
          <FaMapMarkerAlt className="mr-2 text-[#818cf8]" />
          <span>Location: Remote</span>
        </div>
        
        <div className="flex items-center text-[#94a3b8]">
          <FaClock className="mr-2 text-[#818cf8]" />
          <span>Job Type: Full-time</span>
        </div>
        
        <div className="flex items-center text-[#94a3b8]">
          <FaMoneyBillWave className="mr-2 text-[#818cf8]" />
          <span>Salary: $80,000 - $120,000</span>
        </div>
        
        <div className="flex items-center text-[#94a3b8]">
          {job.postedBy === 'admin' ? (
            <span className="flex items-center">
              <FaBuilding className="mr-2 text-[#818cf8]" />
              Posted by: Admin
            </span>
          ) : (
            <span className="flex items-center">
              <FaUserTie className="mr-2 text-[#818cf8]" />
              Posted by: {job.recruiterName}
            </span>
          )}
        </div>
      </div>
      
      <div className="border-t border-[#334155] pt-4 mb-6">
        <h4 className="text-white font-medium mb-2">Job Description</h4>
        <p className="text-[#94a3b8]">
          We are looking for an experienced {job.title} to join our team. The ideal candidate will have strong skills in...
        </p>
      </div>
      
      <div className="flex justify-between">
        <Link 
          to={`/dashboard/jobs/${job.id}`} 
          className="text-[#818cf8] hover:text-[#a5b4fc] flex items-center"
        >
          View Details
        </Link>
        
        {job.externalLink && (
          <a 
            href={job.externalLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#818cf8] hover:text-[#a5b4fc] flex items-center"
          >
            External Link <FaExternalLinkAlt className="ml-1" />
          </a>
        )}
      </div>
    </div>
  );
};

export default JobDetailsCard;