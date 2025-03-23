import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecruiterDashboardLayout from '../../components/Dashboard/RecruiterDashboardLayout';
import { FaSearch, FaFilter, FaUserPlus, FaFileExport, FaSortAmountDown } from 'react-icons/fa';

const RecruiterCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [candidatesPerPage] = useState(10);

  // Generate mock candidates data
  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      const mockCandidates = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          role: 'Senior React Developer',
          status: 'Interviewed',
          matchScore: 92,
          appliedDate: 'May 15, 2023',
          tags: ['React', 'JavaScript', 'TypeScript'],
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          role: 'UX Designer',
          status: 'Screening',
          matchScore: 85,
          appliedDate: 'May 16, 2023',
          tags: ['Figma', 'UI/UX', 'Adobe XD'],
        },
        {
          id: 3,
          name: 'Michael Johnson',
          email: 'michael.j@example.com',
          role: 'DevOps Engineer',
          status: 'Applied',
          matchScore: 78,
          appliedDate: 'May 17, 2023',
          tags: ['AWS', 'Docker', 'Kubernetes'],
        },
        {
          id: 4,
          name: 'Emily Williams',
          email: 'emily.w@example.com',
          role: 'Product Manager',
          status: 'Hired',
          matchScore: 95,
          appliedDate: 'May 10, 2023',
          tags: ['Agile', 'Scrum', 'Product Development'],
        },
        {
          id: 5,
          name: 'David Brown',
          email: 'david.b@example.com',
          role: 'Backend Developer',
          status: 'Rejected',
          matchScore: 65,
          appliedDate: 'May 12, 2023',
          tags: ['Node.js', 'Express', 'MongoDB'],
        },
        {
          id: 6,
          name: 'Sarah Miller',
          email: 'sarah.m@example.com',
          role: 'Frontend Developer',
          status: 'Interviewed',
          matchScore: 88,
          appliedDate: 'May 14, 2023',
          tags: ['React', 'CSS', 'HTML'],
        },
        {
          id: 7,
          name: 'Robert Wilson',
          email: 'robert.w@example.com',
          role: 'Full Stack Developer',
          status: 'Screening',
          matchScore: 82,
          appliedDate: 'May 18, 2023',
          tags: ['JavaScript', 'Python', 'SQL'],
        },
      ];

      setCandidates(mockCandidates);
      setFilteredCandidates(mockCandidates);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter candidates based on search term and status
  useEffect(() => {
    const results = candidates.filter(candidate => {
      const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           candidate.role.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
    
    setFilteredCandidates(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, statusFilter, candidates]);

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Interviewed':
        return 'bg-blue-900 text-blue-300';
      case 'Screening':
        return 'bg-yellow-900 text-yellow-300';
      case 'Applied':
        return 'bg-purple-900 text-purple-300';
      case 'Hired':
        return 'bg-green-900 text-green-300';
      case 'Rejected':
        return 'bg-red-900 text-red-300';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };

  // Pagination
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = filteredCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate);
  const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <RecruiterDashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Candidate Management</h1>
        <p className="text-[#94a3b8]">View and manage all candidates who have applied to your job postings</p>
      </div>

      {/* Filters and Actions */}
      <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="text-[#64748b]" />
            </div>
            <input
              type="text"
              placeholder="Search candidates by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center">
            <FaFilter className="text-[#64748b] mr-2" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#0f172a] text-white rounded-lg border border-[#334155] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
            >
              <option value="all">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Screening">Screening</option>
              <option value="Interviewed">Interviewed</option>
              <option value="Hired">Hired</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <button className="flex items-center px-3 py-2 bg-[#0f172a] text-white border border-[#334155] rounded-lg hover:bg-[#1e293b] transition-colors">
              <FaUserPlus className="mr-2" />
              <span>Add Candidate</span>
            </button>
            <button className="flex items-center px-3 py-2 bg-[#0f172a] text-white border border-[#334155] rounded-lg hover:bg-[#1e293b] transition-colors">
              <FaFileExport className="mr-2" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Candidates Table */}
      <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6 mb-6">
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-[#94a3b8]">Loading candidates...</p>
          </div>
        ) : filteredCandidates.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-[#94a3b8]">No candidates found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-[#94a3b8] border-b border-[#334155]">
                    <th className="pb-3 text-left font-medium">Name</th>
                    <th className="pb-3 text-left font-medium">Role</th>
                    <th className="pb-3 text-center font-medium">Status</th>
                    <th className="pb-3 text-center font-medium">Match Score</th>
                    <th className="pb-3 text-center font-medium">Applied Date</th>
                    <th className="pb-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCandidates.map((candidate) => (
                    <tr key={candidate.id} className="border-b border-[#334155] text-white">
                      <td className="py-4">
                        <div>
                          <Link to={`/dashboard/recruiter/candidates/${candidate.id}`} className="font-medium hover:text-[#818cf8]">
                            {candidate.name}
                          </Link>
                          <p className="text-[#94a3b8] text-sm">{candidate.email}</p>
                        </div>
                      </td>
                      <td className="py-4">{candidate.role}</td>
                      <td className="py-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(candidate.status)}`}>
                          {candidate.status}
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-16 h-2 bg-[#1e293b] rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                candidate.matchScore >= 80 ? 'bg-green-500' : 
                                candidate.matchScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${candidate.matchScore}%` }}
                            ></div>
                          </div>
                          <span className="ml-2">{candidate.matchScore}%</span>
                        </div>
                      </td>
                      <td className="py-4 text-center text-[#94a3b8]">{candidate.appliedDate}</td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <Link 
                            to={`/dashboard/recruiter/candidates/${candidate.id}`}
                            className="px-2 py-1 bg-[#0f172a] text-[#94a3b8] rounded hover:bg-[#1e293b] hover:text-white"
                          >
                            View
                          </Link>
                          <button className="px-2 py-1 bg-[#0f172a] text-[#94a3b8] rounded hover:bg-[#1e293b] hover:text-white">
                            Schedule
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <nav className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-3 py-1 rounded ${
                        currentPage === number
                          ? 'bg-[#818cf8] text-white'
                          : 'bg-[#0f172a] text-[#94a3b8] hover:bg-[#1e293b]'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </RecruiterDashboardLayout>
  );
};

export default RecruiterCandidates;