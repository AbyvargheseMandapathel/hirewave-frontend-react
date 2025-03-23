import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecruiterDashboardLayout from '../../components/Dashboard/RecruiterDashboardLayout';
import { FaSearch, FaFilter, FaCalendarPlus, FaFileExport, FaCalendarAlt, FaClock, FaUserTie } from 'react-icons/fa';

const RecruiterInterviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [filteredInterviews, setFilteredInterviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [interviewsPerPage] = useState(10);

  // Generate mock interviews data
  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      const mockInterviews = [
        {
          id: 1,
          candidate: {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Senior React Developer',
          },
          job: {
            id: 1,
            title: 'Senior React Developer',
          },
          date: '2023-06-15',
          time: '10:00 AM',
          duration: '45 minutes',
          type: 'Video Call',
          status: 'Scheduled',
          notes: 'Discuss experience with React hooks and state management',
        },
        {
          id: 2,
          candidate: {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'UX Designer',
          },
          job: {
            id: 2,
            title: 'Senior UX Designer',
          },
          date: '2023-06-16',
          time: '2:30 PM',
          duration: '60 minutes',
          type: 'In-person',
          status: 'Completed',
          notes: 'Review portfolio and discuss design process',
        },
        {
          id: 3,
          candidate: {
            id: 3,
            name: 'Michael Johnson',
            email: 'michael.j@example.com',
            role: 'DevOps Engineer',
          },
          job: {
            id: 3,
            title: 'DevOps Engineer',
          },
          date: '2023-06-17',
          time: '11:15 AM',
          duration: '30 minutes',
          type: 'Phone Call',
          status: 'Scheduled',
          notes: 'Initial screening call',
        },
        {
          id: 4,
          candidate: {
            id: 4,
            name: 'Emily Williams',
            email: 'emily.w@example.com',
            role: 'Product Manager',
          },
          job: {
            id: 4,
            title: 'Product Manager',
          },
          date: '2023-06-14',
          time: '9:00 AM',
          duration: '60 minutes',
          type: 'Video Call',
          status: 'Cancelled',
          notes: 'Discuss product development experience',
        },
        {
          id: 5,
          candidate: {
            id: 5,
            name: 'David Brown',
            email: 'david.b@example.com',
            role: 'Backend Developer',
          },
          job: {
            id: 5,
            title: 'Node.js Developer',
          },
          date: '2023-06-18',
          time: '3:00 PM',
          duration: '45 minutes',
          type: 'Video Call',
          status: 'Scheduled',
          notes: 'Technical interview focusing on Node.js and database design',
        },
      ];

      setInterviews(mockInterviews);
      setFilteredInterviews(mockInterviews);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter interviews based on search term, status, and date
  useEffect(() => {
    const results = interviews.filter(interview => {
      const matchesSearch = interview.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           interview.candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           interview.job.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || interview.status === statusFilter;
      
      let matchesDate = true;
      if (dateFilter === 'today') {
        const today = new Date().toISOString().split('T')[0];
        matchesDate = interview.date === today;
      } else if (dateFilter === 'upcoming') {
        const today = new Date().toISOString().split('T')[0];
        matchesDate = interview.date > today;
      } else if (dateFilter === 'past') {
        const today = new Date().toISOString().split('T')[0];
        matchesDate = interview.date < today;
      }
      
      return matchesSearch && matchesStatus && matchesDate;
    });
    
    setFilteredInterviews(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, statusFilter, dateFilter, interviews]);

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-900 text-blue-300';
      case 'Completed':
        return 'bg-green-900 text-green-300';
      case 'Cancelled':
        return 'bg-red-900 text-red-300';
      case 'Rescheduled':
        return 'bg-yellow-900 text-yellow-300';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };

  // Format date to more readable format
  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Pagination
  const indexOfLastInterview = currentPage * interviewsPerPage;
  const indexOfFirstInterview = indexOfLastInterview - interviewsPerPage;
  const currentInterviews = filteredInterviews.slice(indexOfFirstInterview, indexOfLastInterview);
  const totalPages = Math.ceil(filteredInterviews.length / interviewsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <RecruiterDashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Interview Management</h1>
        <p className="text-[#94a3b8]">Schedule and manage candidate interviews</p>
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
              placeholder="Search by candidate name or job title..."
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
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Rescheduled">Rescheduled</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="flex items-center">
            <FaCalendarAlt className="text-[#64748b] mr-2" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-[#0f172a] text-white rounded-lg border border-[#334155] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <button className="flex items-center px-3 py-2 bg-[#0f172a] text-white border border-[#334155] rounded-lg hover:bg-[#1e293b] transition-colors">
              <FaCalendarPlus className="mr-2" />
              <span>Schedule Interview</span>
            </button>
            <button className="flex items-center px-3 py-2 bg-[#0f172a] text-white border border-[#334155] rounded-lg hover:bg-[#1e293b] transition-colors">
              <FaFileExport className="mr-2" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interviews Table */}
      <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6 mb-6">
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-[#94a3b8]">Loading interviews...</p>
          </div>
        ) : filteredInterviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-[#94a3b8]">No interviews found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-[#94a3b8] border-b border-[#334155]">
                    <th className="pb-3 text-left font-medium">Candidate</th>
                    <th className="pb-3 text-left font-medium">Job Position</th>
                    <th className="pb-3 text-center font-medium">Date & Time</th>
                    <th className="pb-3 text-center font-medium">Type</th>
                    <th className="pb-3 text-center font-medium">Status</th>
                    <th className="pb-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentInterviews.map((interview) => (
                    <tr key={interview.id} className="border-b border-[#334155] text-white">
                      <td className="py-4">
                        <div>
                          <Link to={`/dashboard/recruiter/candidates/${interview.candidate.id}`} className="font-medium hover:text-[#818cf8]">
                            {interview.candidate.name}
                          </Link>
                          <p className="text-[#94a3b8] text-sm">{interview.candidate.email}</p>
                        </div>
                      </td>
                      <td className="py-4">
                        <Link to={`/dashboard/recruiter/jobs/${interview.job.id}`} className="hover:text-[#818cf8]">
                          {interview.job.title}
                        </Link>
                      </td>
                      <td className="py-4 text-center">
                        <div>
                          <div className="flex items-center justify-center">
                            <FaCalendarAlt className="text-[#64748b] mr-2" />
                            <span>{formatDate(interview.date)}</span>
                          </div>
                          <div className="flex items-center justify-center text-[#94a3b8] text-sm mt-1">
                            <FaClock className="mr-1" />
                            <span>{interview.time} ({interview.duration})</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-center">{interview.type}</td>
                      <td className="py-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(interview.status)}`}>
                          {interview.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <Link 
                            to={`/dashboard/recruiter/interviews/${interview.id}`}
                            className="px-2 py-1 bg-[#0f172a] text-[#94a3b8] rounded hover:bg-[#1e293b] hover:text-white"
                          >
                            View
                          </Link>
                          <button className="px-2 py-1 bg-[#0f172a] text-[#94a3b8] rounded hover:bg-[#1e293b] hover:text-white">
                            Reschedule
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

export default RecruiterInterviews;