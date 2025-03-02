import React from 'react';
import JobCard from '../JobCard/JobCard';

const JobsGrid = ({ jobs }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs?.map((job) => (
          <JobCard
            key={job.id}  
            job={job}     
          />
        ))}
      </div>
    );
  };
export default JobsGrid;