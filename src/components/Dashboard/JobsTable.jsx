import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchJobs,fetchDashboardJobs, updateJob, deleteJob } from "../../services/jobApi";
import { toast } from "react-hot-toast";
import {
  FaEllipsisV,
  FaPlus,
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaExternalLinkAlt,
  FaUserTie,
  FaBuilding,
  FaEdit,
  FaTrash,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

const JobsTable = ({ showPostedBy = false, showApplicants = true, showStatus = true }) => {
  // Update state declarations
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [openActionsId, setOpenActionsId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const navigate = useNavigate();

  // Check if the screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Reset search expanded state when switching from mobile to desktop
  useEffect(() => {
    if (!isMobile) {
      setSearchExpanded(false);
    }
  }, [isMobile]);

  // Check if response data exists before accessing it
  const loadJobs = async (pageNumber) => {
    try {
      setLoading(true);
      const response = await fetchJobs(pageNumber, pageSize);
      
      if (response && response.results) {
        setJobs(response.results);
        setTotalJobs(response.count);
        // Calculate total pages
        setTotalPages(Math.ceil(response.count / pageSize));
        setCurrentPage(pageNumber);
      }
      setError(null);
    } catch (err) {
      console.error('Error loading jobs:', err);
      setError('Failed to fetch jobs');
      toast.error('Error loading jobs');
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadJobs(1);
  }, []);

  const handleNextPage = () => {
    if (hasMore) {
      loadJobs(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      loadJobs(currentPage - 1);
    }
  };

  const handleEdit = (job) => {
    navigate(`/dashboard/jobs/edit/${job.id}`, { state: { job } });
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="ml-1 text-[#64748b]" />;
    return sortDirection === "asc" ? (
      <FaSortUp className="ml-1 text-[#818cf8]" />
    ) : (
      <FaSortDown className="ml-1 text-[#818cf8]" />
    );
  };

  const filteredJobs = jobs
    .filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.status.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "company":
          comparison = a.company.localeCompare(b.company);
          break;
        case "applicants":
          comparison = a.applicants - b.applicants;
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
        case "date":
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case "views":
          comparison = a.views - b.views;
          break;
        case "interested":
          comparison = a.interested - b.interested;
          break;
        default:
          comparison = 0;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

  // Get current jobs
  const indexOfLastJob = currentPage * pageSize;
  const indexOfFirstJob = indexOfLastJob - pageSize;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Toggle actions dropdown
  const toggleActionsDropdown = (jobId) => {
    setOpenActionsId(openActionsId === jobId ? null : jobId);
  };

  // Handle action selection
  const handleAction = async (action, jobId) => {
    setOpenActionsId(null); // Close the dropdown

    switch (action) {
      case 'edit':
        navigate(`/dashboard/jobs/edit/${jobId}`);
        break;
        
      case 'delete':
        if (window.confirm('Are you sure you want to delete this job?')) {
          try {
            await deleteJob(jobId);
            setJobs(jobs.filter(job => job.id !== jobId));
            toast.success('Job deleted successfully');
          } catch (error) {
            console.error('Error deleting job:', error);
            toast.error('Failed to delete job');
          }
        }
        break;
        
      case 'view':
        navigate(`/job/${jobId}`);
        break;
        
      default:
        break;
    }
  };

  // Update the actions dropdown in the table
  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-4 md:p-6 overflow-hidden">
      <div className="flex justify-between items-center mb-6 relative">
        <h3 className="text-lg font-medium text-white">Job Listings</h3>
        
        <div className={`flex items-center ${isMobile && searchExpanded ? 'absolute inset-0 z-10 bg-[#1e293b] p-4' : 'relative'}`}>
          {isMobile && searchExpanded ? (
            <>
              <input
                type="text"
                placeholder="Search jobs..."
                className="bg-[#0f172a] text-[#94a3b8] border border-[#334155] rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8] w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b]" />
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#64748b]"
                onClick={() => setSearchExpanded(false)}
              >
                <FaTimes />
              </button>
            </>
          ) : (
            <>
              {isMobile ? (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSearchExpanded(true)}
                    className="p-2 text-[#818cf8] bg-[#0f172a] border border-[#334155] rounded-lg"
                  >
                    <FaSearch />
                  </button>
                  <Link
                    to="/add-job"
                    className="p-2 text-[#818cf8] bg-[#0f172a] border border-[#334155] rounded-lg"
                  >
                    <FaPlus />
                  </Link>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="relative mr-4">
                    <input
                      type="text"
                      placeholder="Search jobs..."
                      className="bg-[#0f172a] text-[#94a3b8] border border-[#334155] rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8] w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b]" />
                  </div>
                  <Link
                    to="/add-job"
                    className="flex items-center text-[#818cf8] hover:text-[#a5b4fc] bg-[#0f172a] border border-[#334155] px-4 py-2 rounded-lg"
                  >
                    <FaPlus className="mr-2" />
                    <span>Add Job</span>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="overflow-x-auto -mx-4 md:mx-0">
        <table className="w-full min-w-[640px]">
          {/* Table header and body remain the same */}
          <thead>
            <tr className="text-[#94a3b8] border-b border-[#334155]">
              <th className="pb-3 text-left font-medium px-4 md:px-2">
                <button
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort("title")}
                >
                  Job Title {getSortIcon("title")}
                </button>
              </th>
              <th className="pb-3 text-left font-medium px-2 hidden md:table-cell">
                <button
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort("company")}
                >
                  Company {getSortIcon("company")}
                </button>
              </th>
              {showPostedBy && (
                <th className="pb-3 text-center font-medium px-2 hidden md:table-cell">
                  <button
                    className="flex items-center justify-center focus:outline-none"
                    onClick={() => handleSort("postedBy")}
                  >
                    Posted By {getSortIcon("postedBy")}
                  </button>
                </th>
              )}
              <th className="pb-3 text-center font-medium px-2 hidden md:table-cell">
                <button
                  className="flex items-center justify-center focus:outline-none"
                  onClick={() => handleSort("views")}
                >
                  Views {getSortIcon("views")}
                </button>
              </th>
              <th className="pb-3 text-center font-medium px-2 hidden md:table-cell">
                <button
                  className="flex items-center justify-center focus:outline-none"
                  onClick={() => handleSort("interested")}
                >
                  Interested {getSortIcon("interested")}
                </button>
              </th>
              {showApplicants && (
                <th className="pb-3 text-center font-medium px-2 hidden md:table-cell">
                  <button
                    className="flex items-center justify-center focus:outline-none"
                    onClick={() => handleSort("applicants")}
                  >
                    Applicants {getSortIcon("applicants")}
                  </button>
                </th>
              )}
              {showStatus && (
                <th className="pb-3 text-center font-medium px-2">
                  <button
                    className="flex items-center justify-center focus:outline-none"
                    onClick={() => handleSort("status")}
                  >
                    Status {getSortIcon("status")}
                  </button>
                </th>
              )}
              <th className="pb-3 text-center font-medium px-2 hidden md:table-cell">
                <button
                  className="flex items-center justify-center focus:outline-none"
                  onClick={() => handleSort("date")}
                >
                  Posted Date {getSortIcon("date")}
                </button>
              </th>
              <th className="pb-3 text-right font-medium px-4 md:px-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-[#1e293b] divide-y divide-[#334155]">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-[#0f172a]">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link 
                    to={`/job/${job.id}`}
                    className="text-[#818cf8] hover:text-[#a5b4fc]"
                  >
                    {job.title}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[#94a3b8] hidden md:table-cell">
                  {job.company}
                </td>
                {showPostedBy && (
                  <td className="px-6 py-4 whitespace-nowrap text-center hidden md:table-cell">
                    <div className="flex items-center justify-center">
                      {job.postedBy === "admin" ? (
                        <span className="flex items-center text-[#94a3b8]">
                          <FaBuilding className="mr-1 text-[#818cf8]" /> Admin
                        </span>
                      ) : (
                        <span className="flex items-center text-[#94a3b8]">
                          <FaUserTie className="mr-1 text-[#818cf8]" />{" "}
                          {job.recruiterName}
                        </span>
                      )}
                    </div>
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-center hidden md:table-cell">
                  {job.views}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center hidden md:table-cell">
                  {job.interested}
                </td>
                {showApplicants && (
                  <td className="px-6 py-4 whitespace-nowrap text-center hidden md:table-cell">
                    {job.applicants}
                  </td>
                )}
                {showStatus && (
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        job.postedBy === "admin"
                          ? "bg-purple-900 text-purple-300"
                          : job.status === "Open" || job.status === "Active"
                          ? "bg-green-900 text-green-300"
                          : job.status === "Paused"
                          ? "bg-yellow-900 text-yellow-300"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {job.postedBy === "admin" ? "External" : job.status}
                    </span>
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-center text-[#94a3b8] hidden md:table-cell">
                  {job.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end relative">
                    {job.externalLink && (
                      <a
                        href={job.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#818cf8] hover:text-[#a5b4fc] mr-3"
                        title="External Link"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    )}
                    <button
                      className="text-[#94a3b8] hover:text-white"
                      onClick={() => toggleActionsDropdown(job.id)}
                    >
                      <FaEllipsisV />
                    </button>
                    {openActionsId === job.id && (
                      <div className="absolute right-0 top-8 bg-[#1e293b] border border-[#334155] rounded-lg shadow-lg z-10">
                        <button
                          className="flex items-center w-full px-4 py-2 text-sm text-[#94a3b8] hover:bg-[#334155]"
                          onClick={() => handleAction('edit', job.id)}
                        >
                          <FaEdit className="mr-2" /> Edit
                        </button>
                        <button
                          className="flex items-center w-full px-4 py-2 text-sm text-[#94a3b8] hover:bg-[#334155]"
                          onClick={() => handleAction('delete', job.id)}
                        >
                          <FaTrash className="mr-2" /> Delete
                        </button>
                        <button
                          className="flex items-center w-full px-4 py-2 text-sm text-[#94a3b8] hover:bg-[#334155]"
                          onClick={() => handleAction('view', job.id)}
                        >
                          <FaInfoCircle className="mr-2" /> View Details
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Updated Pagination Controls */}
      <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-[#94a3b8]">
          Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalJobs)} of {totalJobs} jobs
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => loadJobs(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className={`px-4 py-2 rounded-lg border ${
              currentPage > 1 && !loading
                ? 'border-[#818cf8] text-[#818cf8] hover:bg-[#818cf8] hover:text-white'
                : 'border-[#475569] text-[#475569] cursor-not-allowed'
            }`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => loadJobs(pageNum)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    currentPage === pageNum
                      ? 'bg-[#818cf8] text-white'
                      : 'text-[#94a3b8] hover:bg-[#334155]'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => loadJobs(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className={`px-4 py-2 rounded-lg border ${
              currentPage < totalPages && !loading
                ? 'border-[#818cf8] text-[#818cf8] hover:bg-[#818cf8] hover:text-white'
                : 'border-[#475569] text-[#475569] cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="absolute inset-0 bg-[#1e293b]/50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#818cf8]"></div>
        </div>
      )}
    </div>
  );
};

export default JobsTable;