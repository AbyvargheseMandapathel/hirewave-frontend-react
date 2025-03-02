import React from 'react';
import { Link } from 'react-router-dom';
import { FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaBriefcase, FaClock } from 'react-icons/fa';

const JobDetails = ({ job }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      <div className="bg-[#1e293b] rounded-xl p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
            <div className="flex items-center text-[#94a3b8]">
              <FaBuilding className="mr-2" />
              <span className="text-lg">{job.company}</span>
            </div>
          </div>
          <span className="text-sm bg-[#334155] text-[#94a3b8] px-4 py-2 rounded-full">
            {job.type}
          </span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-center p-4 bg-[#0f172a] rounded-lg">
            <FaMapMarkerAlt className="text-[#818cf8] mr-3 text-xl" />
            <div>
              <p className="text-[#94a3b8] text-sm">Location</p>
              <p className="text-white">{job.location}</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-[#0f172a] rounded-lg">
            <FaMoneyBillWave className="text-[#818cf8] mr-3 text-xl" />
            <div>
              <p className="text-[#94a3b8] text-sm">Salary</p>
              <p className="text-white">{job.salary}</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-[#0f172a] rounded-lg">
            <FaBriefcase className="text-[#818cf8] mr-3 text-xl" />
            <div>
              <p className="text-[#94a3b8] text-sm">Job Type</p>
              <p className="text-white">{job.type}</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-[#0f172a] rounded-lg">
            <FaClock className="text-[#818cf8] mr-3 text-xl" />
            <div>
              <p className="text-[#94a3b8] text-sm">Posted</p>
              <p className="text-white">{job.posted}</p>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Job Description</h2>
          <p className="text-[#94a3b8] leading-relaxed">{job.description}</p>
        </div>

        {/* Requirements */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Requirements</h2>
          <ul className="list-disc list-inside text-[#94a3b8] space-y-2">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        {/* Apply Button */}
        <Link
          to="/apply"
          className="bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] text-white px-8 py-3 rounded-lg hover:from-[#a5b4fc] hover:to-[#818cf8] transition-all duration-300 inline-block w-full text-center"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default JobDetails;