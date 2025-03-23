import React from 'react';
import { Link } from 'react-router-dom';
import { FaEllipsisV, FaPlus } from 'react-icons/fa';

const RecentJobs = ({ jobs }) => {
  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-white">Recent Job Postings</h3>
        <Link 
          to="/add-job" 
          className="flex items-center text-[#818cf8] hover:text-[#a5b4fc]"
        >
          <FaPlus className="mr-1" />
          <span>Add Job</span>
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-[#94a3b8] border-b border-[#334155]">
              <th className="pb-2 text-left font-medium">Job Title</th>
              <th className="pb-2 text-center font-medium">Applicants</th>
              <th className="pb-2 text-center font-medium">Status</th>
              <th className="pb-2 text-center font-medium">Date</th>
              <th className="pb-2 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-b border-[#334155] text-white">
                <td className="py-4">
                  <Link to={`/job/${job.id}`} className="hover:text-[#818cf8]">
                    {job.title}
                  </Link>
                </td>
                <td className="py-4 text-center">{job.applicants}</td>
                <td className="py-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    job.status === 'Active' 
                      ? 'bg-green-900 text-green-300' 
                      : 'bg-gray-700 text-gray-300'
                  }`}>
                    {job.status}
                  </span>
                </td>
                <td className="py-4 text-center text-[#94a3b8]">{job.date}</td>
                <td className="py-4 text-right">
                  <button className="text-[#94a3b8] hover:text-white">
                    <FaEllipsisV />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-center">
        <Link to="/dashboard/jobs" className="text-[#818cf8] hover:text-[#a5b4fc] text-sm">
          View all job postings
        </Link>
      </div>
    </div>
  );
};

export default RecentJobs;