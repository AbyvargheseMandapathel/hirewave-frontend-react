import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

const JobsTable = ({
  jobs,
  showPostedBy = false,
  showApplicants = true,
  showStatus = true,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);
  const [openActionsId, setOpenActionsId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

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
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Toggle actions dropdown
  const toggleActionsDropdown = (jobId) => {
    setOpenActionsId(openActionsId === jobId ? null : jobId);
  };

  // Handle action selection
  const handleAction = (action, jobId) => {
    console.log(`Action: ${action}, Job ID: ${jobId}`);
    setOpenActionsId(null); // Close the dropdown after selecting an action
  };

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
          <tbody>
            {currentJobs.map((job) => (
              <tr key={job.id} className="border-b border-[#334155] text-white">
                <td className="py-4 px-4 md:px-2">
                  <Link to={`/job/${job.id}`} className="hover:text-[#818cf8]">
                    <div className="flex flex-col md:flex-row md:items-center">
                      <span>{job.title}</span>
                      <span className="text-[#94a3b8] text-sm md:hidden mt-1">{job.company}</span>
                    </div>
                  </Link>
                </td>
                <td className="py-4 px-2 text-[#94a3b8] hidden md:table-cell">{job.company}</td>
                {showPostedBy && (
                  <td className="py-4 px-2 text-center hidden md:table-cell">
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
                <td className="py-4 px-2 text-center hidden md:table-cell">{job.views}</td>
                <td className="py-4 px-2 text-center hidden md:table-cell">{job.interested}</td>
                {showApplicants && (
                  <td className="py-4 px-2 text-center hidden md:table-cell">{job.applicants}</td>
                )}
                {showStatus && (
                  <td className="py-4 px-2 text-center">
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
                <td className="py-4 px-2 text-center text-[#94a3b8] hidden md:table-cell">{job.date}</td>
                <td className="py-4 px-4 md:px-2 text-right">
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
                          onClick={() => handleAction("edit", job.id)}
                        >
                          <FaEdit className="mr-2" /> Edit
                        </button>
                        <button
                          className="flex items-center w-full px-4 py-2 text-sm text-[#94a3b8] hover:bg-[#334155]"
                          onClick={() => handleAction("delete", job.id)}
                        >
                          <FaTrash className="mr-2" /> Delete
                        </button>
                        <button
                          className="flex items-center w-full px-4 py-2 text-sm text-[#94a3b8] hover:bg-[#334155]"
                          onClick={() => handleAction("view", job.id)}
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

      {/* Pagination Controls */}
      <div className="mt-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-[#94a3b8] text-sm mb-3 md:mb-0">
          Showing {indexOfFirstJob + 1}-{Math.min(indexOfLastJob, filteredJobs.length)} of {filteredJobs.length} jobs
        </div>
        <div className="flex items-center">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-[#818cf8] hover:text-[#a5b4fc] disabled:text-[#64748b] disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastJob >= filteredJobs.length}
            className="px-4 py-2 text-[#818cf8] hover:text-[#a5b4fc] disabled:text-[#64748b] disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobsTable;