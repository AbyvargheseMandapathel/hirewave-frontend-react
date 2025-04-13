import React from 'react';
import JobCard from '../JobCard/JobCard';

const JobsGrid = ({ jobs, lastJobElementRef }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs?.map((job, index) => {
        // If it's the last item, attach the ref for infinite scrolling
        if (jobs.length === index + 1) {
          return (
            <div ref={lastJobElementRef} key={job.id}>
              <JobCard job={job} />
            </div>
          );
        } else {
          return <JobCard key={job.id} job={job} />;
        }
      })}
    </div>
  );
};

export default JobsGrid;