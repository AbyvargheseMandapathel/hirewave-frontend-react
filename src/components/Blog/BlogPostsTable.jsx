import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEllipsisV,
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEye,
  FaComment,
  FaStar,
  FaEdit,
  FaTrash,
  FaExternalLinkAlt,
} from "react-icons/fa";

const BlogPostsTable = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8); // Updated to display 8 posts per page

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

  // Filter posts based on search term
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    let comparison = 0;
    if (sortField === "title") {
      comparison = a.title.localeCompare(b.title);
    } else if (sortField === "author") {
      comparison = a.author.localeCompare(b.author);
    } else if (sortField === "category") {
      comparison = a.category.localeCompare(b.category);
    } else if (sortField === "status") {
      comparison = a.status.localeCompare(b.status);
    } else if (sortField === "date") {
      comparison = new Date(a.date) - new Date(b.date);
    } else if (sortField === "views") {
      comparison = a.views - b.views;
    } else if (sortField === "comments") {
      comparison = a.comments - b.comments;
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Status badge component
  const StatusBadge = ({ status }) => {
    let bgColor = "";
    let textColor = "";

    switch (status) {
      case "Published":
        bgColor = "bg-green-900";
        textColor = "text-green-300";
        break;
      case "Draft":
        bgColor = "bg-yellow-900";
        textColor = "text-yellow-300";
        break;
      case "Scheduled":
        bgColor = "bg-blue-900";
        textColor = "text-blue-300";
        break;
      default:
        bgColor = "bg-gray-900";
        textColor = "text-gray-300";
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h3 className="text-lg font-medium text-white">Blog Posts</h3>
          <div className="mt-4 md:mt-0 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-[#64748b]" />
            </div>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#0f172a] text-white pl-10 pr-4 py-2 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#334155]">
            <thead className="bg-[#0f172a]">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("title")}
                >
                  <div className="flex items-center">
                    Title {getSortIcon("title")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("author")}
                >
                  <div className="flex items-center">
                    Author {getSortIcon("author")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("category")}
                >
                  <div className="flex items-center">
                    Category {getSortIcon("category")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    Status {getSortIcon("status")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("date")}
                >
                  <div className="flex items-center">
                    Date {getSortIcon("date")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("views")}
                >
                  <div className="flex items-center">
                    Views {getSortIcon("views")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("comments")}
                >
                  <div className="flex items-center">
                    Comments {getSortIcon("comments")}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#1e293b] divide-y divide-[#334155]">
              {currentPosts.map((post) => (
                <tr key={post.id} className="hover:bg-[#0f172a]">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {post.featured && (
                        <FaStar className="text-yellow-400 mr-2" />
                      )}
                      <div className="text-sm font-medium text-white">
                        {post.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#94a3b8]">{post.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#94a3b8]">{post.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={post.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#94a3b8]">{post.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-[#94a3b8]">
                      <FaEye className="mr-1 text-[#64748b]" />
                      {post.views.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-[#94a3b8]">
                      <FaComment className="mr-1 text-[#64748b]" />
                      {post.comments}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        className="text-[#818cf8] hover:text-[#a5b4fc]"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-[#f87171] hover:text-[#fca5a5]"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                      <button
                        className="text-[#94a3b8] hover:text-white"
                        title="View"
                      >
                        <FaExternalLinkAlt />
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
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-[#94a3b8]">
              Showing {indexOfFirstPost + 1} to{" "}
              {Math.min(indexOfLastPost, sortedPosts.length)} of{" "}
              {sortedPosts.length} posts
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 1
                    ? "bg-[#0f172a] text-[#64748b] cursor-not-allowed"
                    : "bg-[#0f172a] text-[#94a3b8] hover:bg-[#334155]"
                }`}
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === i + 1
                      ? "bg-[#818cf8] text-white"
                      : "bg-[#0f172a] text-[#94a3b8] hover:bg-[#334155]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${
                  currentPage === totalPages
                    ? "bg-[#0f172a] text-[#64748b] cursor-not-allowed"
                    : "bg-[#0f172a] text-[#94a3b8] hover:bg-[#334155]"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostsTable;