import React from 'react';
import { Link } from 'react-router-dom';
import { FaBuilding, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaExternalLinkAlt, FaUserTie, FaBriefcase, FaEye, FaUserPlus } from 'react-icons/fa';

const JobDetailsCard = ({ job }) => {
  // Format date if available
  const formattedDate = job.date || job.posted_date || job.created_at || 'N/A';
  
  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">{job.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs ${
          job.status === 'active' || job.status === 'Active'
            ? 'bg-green-900 text-green-300' 
            : job.status === 'paused' || job.status === 'Paused'
              ? 'bg-yellow-900 text-yellow-300'
              : job.status === 'draft' || job.status === 'Draft'
                ? 'bg-blue-900 text-blue-300'
                : 'bg-gray-700 text-gray-300'
        }`}>
          {job.status ? job.status.charAt(0).toUpperCase() + job.status.slice(1) : 'Unknown'}
        </span>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center text-[#94a3b8]">
          <FaBuilding className="mr-2 text-[#818cf8]" />
          <span>{job.company}</span>
        </div>
        
        <div className="flex items-center text-[#94a3b8]">
          <FaMapMarkerAlt className="mr-2 text-[#818cf8]" />
          <span>Location: {job.location || 'Remote'}</span>
        </div>
        
        <div className="flex items-center text-[#94a3b8]">
          <FaBriefcase className="mr-2 text-[#818cf8]" />
          <span>Job Type: {job.type || 'Full-time'}</span>
        </div>
        
        <div className="flex items-center text-[#94a3b8]">
          <FaMoneyBillWave className="mr-2 text-[#818cf8]" />
          <span>Salary: {job.salary || '$80,000 - $120,000'}</span>
        </div>
        
        <div className="flex items-center text-[#94a3b8]">
          <FaClock className="mr-2 text-[#818cf8]" />
          <span>Posted: {formattedDate}</span>
        </div>
        
        <div className="flex items-center text-[#94a3b8]">
          {job.posted_by?.is_superuser || job.postedBy === 'admin' ? (
            <span className="flex items-center">
              <FaBuilding className="mr-2 text-[#818cf8]" />
              Posted by: Admin
            </span>
          ) : (
            <span className="flex items-center">
              <FaUserTie className="mr-2 text-[#818cf8]" />
              Posted by: {job.posted_by?.email || job.recruiterName || 'Recruiter'}
            </span>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 border-t border-[#334155] pt-4 mb-6">
        <div className="bg-[#0f172a] p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-[#94a3b8]">
              <FaEye className="mr-2 text-[#60a5fa]" />
              <span>Views</span>
            </div>
            <span className="text-white font-medium">{job.views || 0}</span>
          </div>
        </div>
        
        <div className="bg-[#0f172a] p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-[#94a3b8]">
              <FaUserPlus className="mr-2 text-[#818cf8]" />
              <span>Applicants</span>
            </div>
            <span className="text-white font-medium">{job.applications || job.applicants || 0}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Link 
          to={`/job/${job.id}`} 
          className="bg-[#0f172a] text-[#94a3b8] hover:text-white px-4 py-2 rounded-lg text-center transition-colors border border-[#334155] hover:border-[#475569] flex-1"
        >
          View Details
        </Link>
        
        {job.external_link && (
          <a 
            href={job.external_link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-[#0f172a] text-[#94a3b8] hover:text-white px-4 py-2 rounded-lg text-center transition-colors border border-[#334155] hover:border-[#475569] flex-1 flex items-center justify-center"
          >
            External Link <FaExternalLinkAlt className="ml-2" />
          </a>
        )}
      </div>
    </div>
  );
};

export default JobDetailsCard;