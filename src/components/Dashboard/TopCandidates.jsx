import React from 'react';
import { Link } from 'react-router-dom';

const TopCandidates = ({ candidates }) => {
  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-white">Top Candidates</h3>
      </div>
      
      <div className="space-y-4">
        {candidates.map((candidate) => (
          <div 
            key={candidate.id} 
            className="flex items-center justify-between p-3 bg-[#0f172a] rounded-lg hover:bg-[#1e293b] border border-[#334155]"
          >
            <div>
              <Link to={`/candidate/${candidate.id}`} className="text-white hover:text-[#818cf8] font-medium">
                {candidate.name}
              </Link>
              <p className="text-[#94a3b8] text-sm">{candidate.role}</p>
            </div>
            <div className="flex items-center">
              <div className="mr-4">
                <div className="text-xs text-[#94a3b8] mb-1">Match Score</div>
                <div className="flex items-center">
                  <div className="w-16 h-2 bg-[#1e293b] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#818cf8] to-[#a5b4fc]" 
                      style={{ width: `${candidate.score}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-white">{candidate.score}%</span>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                candidate.status === 'Interview' 
                  ? 'bg-blue-900 text-blue-300' 
                  : candidate.status === 'Shortlisted'
                    ? 'bg-yellow-900 text-yellow-300'
                    : 'bg-green-900 text-green-300'
              }`}>
                {candidate.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <Link to="/dashboard/candidates" className="text-[#818cf8] hover:text-[#a5b4fc] text-sm">
          View all candidates
        </Link>
      </div>
    </div>
  );
};

export default TopCandidates;