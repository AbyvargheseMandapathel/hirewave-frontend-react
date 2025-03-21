import React from 'react';
import JobCard from '../JobCard/JobCard';

const SimilarJobs = ({ jobs }) => {
  return (
    <div className="bg-[#1e293b] p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold text-white mb-4">Similar Jobs</h3>
      <div className="space-y-4">
        {jobs?.map((job) => (
          <JobCard 
            key={job.id}
            job={job}
            className="transform scale-95 hover:scale-100 transition-all duration-300"
          />
        ))}
      </div>
    </div>
  );
};

export default SimilarJobs;