import React from 'react';
import { Link } from 'react-router-dom';

const UpcomingInterviews = ({ interviews }) => {
  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-white">Upcoming Interviews</h3>
      </div>
      
      {interviews.length > 0 ? (
        <div className="space-y-4">
          {interviews.map((interview) => (
            <div 
              key={interview.id} 
              className="p-4 bg-[#0f172a] rounded-lg border border-[#334155]"
            >
              <div className="flex justify-between items-start mb-2">
                <Link to={`/candidate/${interview.id}`} className="text-white hover:text-[#818cf8] font-medium">
                  {interview.candidate}
                </Link>
                <div className="text-[#94a3b8] text-sm">{interview.time}</div>
              </div>
              <p className="text-[#94a3b8] text-sm mb-2">{interview.position}</p>
              <div className="text-xs text-[#64748b]">{interview.date}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-[#94a3b8]">No upcoming interviews</p>
        </div>
      )}
      
      <div className="mt-4 text-center">
        <Link to="/dashboard/interviews" className="text-[#818cf8] hover:text-[#a5b4fc] text-sm">
          View all interviews
        </Link>
      </div>
    </div>
  );
};

export default UpcomingInterviews;