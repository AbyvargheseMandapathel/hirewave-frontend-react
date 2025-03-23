import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaCheck, FaTimes, FaUserTie } from 'react-icons/fa';

const CandidateApplications = ({ applications }) => {
  // Function to get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Interview':
        return 'bg-green-900 text-green-300';
      case 'Screening':
        return 'bg-blue-900 text-blue-300';
      case 'Applied':
        return 'bg-yellow-900 text-yellow-300';
      case 'Rejected':
        return 'bg-red-900 text-red-300';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };

  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-white">Recent Applications</h3>
        <Link 
          to="/applications" 
          className="text-[#818cf8] hover:text-[#a5b4fc] text-sm"
        >
          View All
        </Link>
      </div>
      
      {applications.length > 0 ? (
        <div className="space-y-4">
          {applications.map((application) => (
            <div 
              key={application.id} 
              className="p-4 bg-[#0f172a] rounded-lg border border-[#334155] flex justify-between items-center"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#334155] rounded-full flex items-center justify-center mr-3">
                  <FaUserTie className="text-[#94a3b8]" />
                </div>
                <div>
                  <Link to={`/candidate/${application.id}`} className="text-white hover:text-[#818cf8] font-medium">
                    {application.name}
                  </Link>
                  <p className="text-[#94a3b8] text-sm">{application.position}</p>
                  <div className="text-xs text-[#64748b] mt-1">{application.date}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-xs text-[#94a3b8] mb-1">Match</div>
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-[#1e293b] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#818cf8] to-[#a5b4fc]" 
                        style={{ width: `${application.match}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-white">{application.match}%</span>
                  </div>
                </div>
                
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(application.status)}`}>
                  {application.status}
                </span>
                
                <div className="flex space-x-2">
                  <Link to={`/candidate/${application.id}`} className="p-2 bg-[#334155] rounded-full hover:bg-[#475569]">
                    <FaEye className="text-[#94a3b8]" />
                  </Link>
                  <button className="p-2 bg-green-900 rounded-full hover:bg-green-800">
                    <FaCheck className="text-green-300" />
                  </button>
                  <button className="p-2 bg-red-900 rounded-full hover:bg-red-800">
                    <FaTimes className="text-red-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-[#94a3b8]">No applications yet.</p>
        </div>
      )}
    </div>
  );
};

export default CandidateApplications;