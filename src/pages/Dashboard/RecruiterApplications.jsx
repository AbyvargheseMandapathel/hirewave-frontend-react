import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecruiterDashboardLayout from '../../components/Dashboard/RecruiterDashboardLayout';
import { FaSearch, FaFilter, FaFileExport, FaSortAmountDown, FaEye, FaCheck, FaTimes, FaUserTie } from 'react-icons/fa';

const RecruiterApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [jobFilter, setJobFilter] = useState('all');
  const [scoreFilter, setScoreFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [applicationsPerPage] = useState(10);
  const [jobs, setJobs] = useState([]);

  // Generate mock applications data
  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      const mockJobs = [
        { id: 1, title: 'Senior React Developer' },
        { id: 2, title: 'UX Designer' },
        { id: 3, title: 'DevOps Engineer' },
        { id: 4, title: 'Product Manager' },
        { id: 5, title: 'Backend Developer' },
      ];
      
      const mockApplications = [
        {
          id: 1,
          candidate: {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            location: 'New York, NY',
            experience: '5 years',
          },
          job: {
            id: 1,
            title: 'Senior React Developer',
          },
          status: 'Under Review',
          appliedDate: '2023-05-15',
          matchScore: 92,
          skills: ['React', 'JavaScript', 'TypeScript', 'Redux', 'Node.js'],
          education: 'Master in Computer Science',
          resumeUrl: '#',
        },
        {
          id: 2,
          candidate: {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            location: 'San Francisco, CA',
            experience: '3 years',
          },
          job: {
            id: 2,
            title: 'UX Designer',
          },
          status: 'Shortlisted',
          appliedDate: '2023-05-16',
          matchScore: 85,
          skills: ['Figma', 'UI/UX', 'Adobe XD', 'User Research'],
          education: 'Bachelor in Design',
          resumeUrl: '#',
        },
        {
          id: 3,
          candidate: {
            id: 3,
            name: 'Michael Johnson',
            email: 'michael.j@example.com',
            location: 'Austin, TX',
            experience: '4 years',
          },
          job: {
            id: 3,
            title: 'DevOps Engineer',
          },
          status: 'New',
          appliedDate: '2023-05-17',
          matchScore: 78,
          skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
          education: 'Bachelor in Computer Engineering',
          resumeUrl: '#',
        },
        {
          id: 4,
          candidate: {
            id: 4,
            name: 'Emily Williams',
            email: 'emily.w@example.com',
            location: 'Chicago, IL',
            experience: '7 years',
          },
          job: {
            id: 4,
            title: 'Product Manager',
          },
          status: 'Hired',
          appliedDate: '2023-05-10',
          matchScore: 95,
          skills: ['Product Development', 'Agile', 'Scrum', 'Market Research'],
          education: 'MBA',
          resumeUrl: '#',
        },
        {
          id: 5,
          candidate: {
            id: 5,
            name: 'David Brown',
            email: 'david.b@example.com',
            location: 'Seattle, WA',
            experience: '2 years',
          },
          job: {
            id: 5,
            title: 'Backend Developer',
          },
          status: 'Rejected',
          appliedDate: '2023-05-12',
          matchScore: 65,
          skills: ['Node.js', 'Express', 'MongoDB', 'SQL'],
          education: 'Bachelor in Computer Science',
          resumeUrl: '#',
        },
        {
          id: 6,
          candidate: {
            id: 6,
            name: 'Sarah Miller',
            email: 'sarah.m@example.com',
            location: 'Boston, MA',
            experience: '4 years',
          },
          job: {
            id: 1,
            title: 'Senior React Developer',
          },
          status: 'Under Review',
          appliedDate: '2023-05-14',
          matchScore: 88,
          skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Redux'],
          education: 'Master in Web Development',
          resumeUrl: '#',
        },
        {
          id: 7,
          candidate: {
            id: 7,
            name: 'Robert Wilson',
            email: 'robert.w@example.com',
            location: 'Denver, CO',
            experience: '3 years',
          },
          job: {
            id: 3,
            title: 'DevOps Engineer',
          },
          status: 'Shortlisted',
          appliedDate: '2023-05-18',
          matchScore: 82,
          skills: ['AWS', 'Docker', 'Jenkins', 'Linux', 'Python'],
          education: 'Bachelor in Information Technology',
          resumeUrl: '#',
        },
      ];

      setJobs(mockJobs);
      setApplications(mockApplications);
      setFilteredApplications(mockApplications);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter applications based on search term, status, job, and score
  useEffect(() => {
    const results = applications.filter(application => {
      const matchesSearch = application.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           application.candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           application.job.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || application.status === statusFilter;
      
      const matchesJob = jobFilter === 'all' || application.job.id.toString() === jobFilter;
      
      let matchesScore = true;
      if (scoreFilter === 'high') {
        matchesScore = application.matchScore >= 80;
      } else if (scoreFilter === 'medium') {
        matchesScore = application.matchScore >= 60 && application.matchScore < 80;
      } else if (scoreFilter === 'low') {
        matchesScore = application.matchScore < 60;
      }
      
      return matchesSearch && matchesStatus && matchesJob && matchesScore;
    });
    
    setFilteredApplications(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, statusFilter, jobFilter, scoreFilter, applications]);

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return 'bg-purple-900 text-purple-300';
      case 'Under Review':
        return 'bg-blue-900 text-blue-300';
      case 'Shortlisted':
        return 'bg-yellow-900 text-yellow-300';
      case 'Hired':
        return 'bg-green-900 text-green-300';
      case 'Rejected':
        return 'bg-red-900 text-red-300';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };

  // Get score color
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  // Format date to more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Pagination
  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = filteredApplications.slice(indexOfFirstApplication, indexOfLastApplication);
  const totalPages = Math.ceil(filteredApplications.length / applicationsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <RecruiterDashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Application Management</h1>
        <p className="text-[#94a3b8]">Review and manage candidate applications for your job postings</p>
      </div>

      {/* Filters and Actions */}
      <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          {/* Search */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="text-[#64748b]" />
            </div>
            <input
              type="text"
              placeholder="Search by candidate name, email, or job title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
            />
          </div>

          {/* Export Button */}
          <button className="flex items-center px-3 py-2 bg-[#0f172a] text-white border border-[#334155] rounded-lg hover:bg-[#1e293b] transition-colors">
            <FaFileExport className="mr-2" />
            <span>Export</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Status Filter */}
          <div>
            <label className="block text-[#94a3b8] mb-1 text-sm">Application Status</label>
            <div className="flex items-center">
              <FaFilter className="text-[#64748b] mr-2" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
              >
                <option value="all">All Statuses</option>
                <option value="New">New</option>
                <option value="Under Review">Under Review</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Hired">Hired</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Job Filter */}
          <div>
            <label className="block text-[#94a3b8] mb-1 text-sm">Job Position</label>
            <div className="flex items-center">
              <FaFilter className="text-[#64748b] mr-2" />
              <select
                value={jobFilter}
                onChange={(e) => setJobFilter(e.target.value)}
                className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
              >
                <option value="all">All Jobs</option>
                {jobs.map(job => (
                  <option key={job.id} value={job.id.toString()}>{job.title}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Score Filter */}
          <div>
            <label className="block text-[#94a3b8] mb-1 text-sm">Match Score</label>
            <div className="flex items-center">
              <FaFilter className="text-[#64748b] mr-2" />
              <select
                value={scoreFilter}
                onChange={(e) => setScoreFilter(e.target.value)}
                className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
              >
                <option value="all">All Scores</option>
                <option value="high">High Match (80-100%)</option>
                <option value="medium">Medium Match (60-79%)</option>
                <option value="low">Low Match (0-59%)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6 mb-6">
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-[#94a3b8]">Loading applications...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-[#94a3b8]">No applications found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-[#94a3b8] border-b border-[#334155]">
                    <th className="pb-3 text-left font-medium">Candidate</th>
                    <th className="pb-3 text-left font-medium">Job Position</th>
                    <th className="pb-3 text-center font-medium">Match Score</th>
                    <th className="pb-3 text-center font-medium">Status</th>
                    <th className="pb-3 text-center font-medium">Applied Date</th>
                    <th className="pb-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentApplications.map((application) => (
                    <tr key={application.id} className="border-b border-[#334155] text-white">
                      <td className="py-4">
                        <div>
                          <Link to={`/dashboard/recruiter/candidates/${application.candidate.id}`} className="font-medium hover:text-[#818cf8]">
                            {application.candidate.name}
                          </Link>
                          <p className="text-[#94a3b8] text-sm">{application.candidate.email}</p>
                          <div className="flex items-center text-xs text-[#94a3b8] mt-1">
                            <span className="mr-2">{application.candidate.location}</span>
                            <span>{application.candidate.experience}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <Link to={`/dashboard/recruiter/jobs/${application.job.id}`} className="hover:text-[#818cf8]">
                          {application.job.title}
                        </Link>
                      </td>
                      <td className="py-4 text-center">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 relative mb-1">
                            <svg viewBox="0 0 36 36" className="w-full h-full">
                              <path
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#0f172a"
                                strokeWidth="3"
                                strokeDasharray="100, 100"
                              />
                              <path
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke={application.matchScore >= 80 ? "#4ade80" : application.matchScore >= 60 ? "#facc15" : "#f87171"}
                                strokeWidth="3"
                                strokeDasharray={`${application.matchScore}, 100`}
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className={`text-lg font-bold ${getScoreColor(application.matchScore)}`}>
                                {application.matchScore}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap justify-center gap-1 mt-1">
                            {application.skills.slice(0, 3).map((skill, index) => (
                              <span key={index} className="px-2 py-0.5 bg-[#0f172a] text-[#94a3b8] text-xs rounded">
                                {skill}
                              </span>
                            ))}
                            {application.skills.length > 3 && (
                              <span className="px-2 py-0.5 bg-[#0f172a] text-[#94a3b8] text-xs rounded">
                                +{application.skills.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(application.status)}`}>
                          {application.status}
                        </span>
                      </td>
                      <td className="py-4 text-center text-[#94a3b8]">{formatDate(application.appliedDate)}</td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <Link 
                            to={`/dashboard/recruiter/applications/${application.id}`}
                            className="px-2 py-1 bg-[#0f172a] text-[#94a3b8] rounded hover:bg-[#1e293b] hover:text-white"
                          >
                            <FaEye />
                          </Link>
                          <button 
                            className="px-2 py-1 bg-[#0f172a] text-green-400 rounded hover:bg-[#1e293b]"
                            onClick={() => {
                              // Handle shortlist/approve action
                              alert(`Shortlisted candidate: ${application.candidate.name}`);
                            }}
                          >
                            <FaCheck />
                          </button>
                          <button 
                            className="px-2 py-1 bg-[#0f172a] text-red-400 rounded hover:bg-[#1e293b]"
                            onClick={() => {
                              // Handle reject action
                              alert(`Rejected candidate: ${application.candidate.name}`);
                            }}
                          >
                            <FaTimes />
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

      {/* Application Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#94a3b8]">Total Applications</p>
              <h3 className="text-2xl font-bold text-white">{applications.length}</h3>
            </div>
            <div className="p-3 bg-[#0f172a] rounded-lg">
              <FaUserTie className="text-[#818cf8] text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#94a3b8]">High Match</p>
              <h3 className="text-2xl font-bold text-green-400">
                {applications.filter(app => app.matchScore >= 80).length}
              </h3>
            </div>
            <div className="p-3 bg-[#0f172a] rounded-lg">
              <div className="text-green-400 text-xl font-bold">80+</div>
            </div>
          </div>
        </div>
        
        <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#94a3b8]">Medium Match</p>
              <h3 className="text-2xl font-bold text-yellow-400">
                {applications.filter(app => app.matchScore >= 60 && app.matchScore < 80).length}
              </h3>
            </div>
            <div className="p-3 bg-[#0f172a] rounded-lg">
              <div className="text-yellow-400 text-xl font-bold">60+</div>
            </div>
          </div>
        </div>
        
        <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#94a3b8]">Low Match</p>
              <h3 className="text-2xl font-bold text-red-400">
                {applications.filter(app => app.matchScore < 60).length}
              </h3>
            </div>
            <div className="p-3 bg-[#0f172a] rounded-lg">
              <div className="text-red-400 text-xl font-bold">&lt;60</div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Details Modal could be added here */}
    </RecruiterDashboardLayout>
  );
};

export default RecruiterApplications;