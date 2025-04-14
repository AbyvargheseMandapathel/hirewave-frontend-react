import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const JobsStatus = ({ jobs, loading }) => {
  if (jobs?.length > 0) {
    return null; // Jobs will be rendered elsewhere
  }

  if (loading) {
    return (
      <div className="flex justify-center my-12">
        <FaSpinner className="animate-spin text-[#818cf8] text-3xl" />
      </div>
    );
  }

  return (
    <div className="text-center text-[#94a3b8] my-12">
      No jobs found
    </div>
  );
};

export default JobsStatus;
