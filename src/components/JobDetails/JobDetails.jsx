import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaBriefcase, FaClock } from 'react-icons/fa';
import SimilarJobs from '../SimilarJobs/SimilarJobs';
import AdCard from '../AdCard/AdCard';

const JobDetails = ({ job, jobs }) => {
  // Filter similar jobs (exclude current job)
  const similarJobs = jobs?.filter(j => j.id !== job?.id).slice(0, 3) || [];
  const [mainHeight, setMainHeight] = useState(0);
  
  // Get the height of the main content to set the max height for the sidebar
  useEffect(() => {
    const updateHeight = () => {
      const mainContent = document.getElementById('job-details-main');
      if (mainContent) {
        setMainHeight(mainContent.offsetHeight);
      }
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    return () => window.removeEventListener('resize', updateHeight);
  }, [job]);

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div id="job-details-main" className="bg-[#1e293b] rounded-xl p-8 shadow-2xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-8">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl font-bold text-white mb-2">{job?.title}</h1>
                <div className="flex items-center text-[#94a3b8]">
                  <FaBuilding className="mr-2" />
                  <span className="text-lg">{job?.company}</span>
                </div>
              </div>
              <span className="text-sm bg-[#334155] text-[#94a3b8] px-4 py-2 rounded-full h-fit">
                {job?.type}
              </span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <DetailItem 
                icon={<FaMapMarkerAlt className="text-[#818cf8] text-xl" />}
                label="Location"
                value={job?.location}
              />
              <DetailItem 
                icon={<FaMoneyBillWave className="text-[#818cf8] text-xl" />}
                label="Salary"
                value={job?.salary}
              />
              <DetailItem 
                icon={<FaBriefcase className="text-[#818cf8] text-xl" />}
                label="Job Type"
                value={job?.type}
              />
              <DetailItem 
                icon={<FaClock className="text-[#818cf8] text-xl" />}
                label="Posted"
                value={job?.posted}
              />
            </div>

            {/* Job Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Job Description</h2>
              <p className="text-[#94a3b8] leading-relaxed whitespace-pre-line">
                {job?.description}
              </p>
            </div>

            {/* Requirements */}
            {job?.requirements?.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Requirements</h2>
                <ul className="list-disc list-inside text-[#94a3b8] space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Apply Button */}
            <Link
              to="/apply"
              className="bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] text-white px-8 py-3 rounded-lg hover:from-[#a5b4fc] hover:to-[#818cf8] transition-all duration-300 inline-block w-full text-center"
            >
              Apply Now
            </Link>
          </div>
        </div>

        {/* Sidebar - Now with dynamic height and scrolling */}
        <div 
          className="lg:sticky lg:top-6 self-start"
          style={{ 
            maxHeight: mainHeight > 0 ? `${mainHeight}px` : 'auto'
          }}
        >
          <div 
            className="space-y-8 overflow-y-auto no-scrollbar" 
            style={{ 
              maxHeight: mainHeight > 0 ? `${mainHeight}px` : 'auto'
            }}
          >
            <AdCard />
            {similarJobs.length > 0 && <SimilarJobs jobs={similarJobs} />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Detail Item Component
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center p-4 bg-[#0f172a] rounded-lg">
    <span className="mr-3">{icon}</span>
    <div>
      <p className="text-[#94a3b8] text-sm">{label}</p>
      <p className="text-white">{value}</p>
    </div>
  </div>
);

export default JobDetails;