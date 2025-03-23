import React from 'react';
import { FaUsers, FaUserCheck, FaUserClock, FaUserTimes, FaChartBar } from 'react-icons/fa';

const ApplicationStats = ({ job }) => {
  // Mock data for application stages
  const applicationStages = [
    { stage: 'Applied', count: job.applications, color: '#60a5fa', icon: <FaUsers className="text-[#60a5fa]" /> },
    { stage: 'Screening', count: Math.floor(job.applications * 0.7), color: '#818cf8', icon: <FaUserClock className="text-[#818cf8]" /> },
    { stage: 'Interview', count: Math.floor(job.applications * 0.4), color: '#a5b4fc', icon: <FaUserCheck className="text-[#a5b4fc]" /> },
    { stage: 'Rejected', count: Math.floor(job.applications * 0.3), color: '#f87171', icon: <FaUserTimes className="text-[#f87171]" /> },
    { stage: 'Hired', count: Math.floor(job.applications * 0.1), color: '#34d399', icon: <FaUserCheck className="text-[#34d399]" /> },
  ];

  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-white">Application Pipeline</h3>
        <div className="flex items-center text-[#94a3b8] text-sm">
          <FaChartBar className="mr-2" />
          <span>Job: {job.title}</span>
        </div>
      </div>

      <div className="space-y-4">
        {applicationStages.map((stage, index) => (
          <div key={index} className="bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                {stage.icon}
                <span className="ml-2 text-white">{stage.stage}</span>
              </div>
              <span className="text-white font-medium">{stage.count}</span>
            </div>
            <div className="w-full bg-[#1e293b] rounded-full h-2">
              <div 
                className="h-2 rounded-full" 
                style={{ 
                  width: `${(stage.count / job.applications) * 100}%`,
                  backgroundColor: stage.color 
                }}
              ></div>
            </div>
            <div className="mt-1 text-xs text-[#64748b] text-right">
              {((stage.count / job.applications) * 100).toFixed(1)}% of applicants
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h4 className="text-white font-medium mb-4">Application Timeline</h4>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#334155]"></div>
          
          <div className="space-y-4">
            {applicationStages.map((stage, index) => (
              <div key={index} className="relative pl-10">
                <div className="absolute left-0 w-8 h-8 rounded-full bg-[#0f172a] border-2 flex items-center justify-center" style={{ borderColor: stage.color }}>
                  {stage.icon}
                </div>
                <div className="bg-[#0f172a] p-3 rounded-lg border border-[#334155]">
                  <div className="flex justify-between items-center">
                    <span className="text-white">{stage.stage}</span>
                    <span className="text-[#94a3b8] text-sm">{stage.count} applicants</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStats;