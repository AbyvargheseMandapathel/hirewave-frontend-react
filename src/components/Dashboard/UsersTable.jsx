import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEllipsisV,
  FaPlus,
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaUserCircle,
  FaEnvelope,
  FaCalendarAlt,
  FaUserShield,
  FaUserTie,
  FaUser
} from "react-icons/fa";

const UsersTable = ({ users, showRole = true }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("joinDate");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

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

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "email":
          comparison = a.email.localeCompare(b.email);
          break;
        case "role":
          comparison = a.role.localeCompare(b.role);
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
        case "joinDate":
          comparison = new Date(a.joinDate) - new Date(b.joinDate);
          break;
        case "lastActive":
          comparison = new Date(a.lastActive) - new Date(b.lastActive);
          break;
        default:
          comparison = 0;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getRoleIcon = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        return <FaUserShield className="mr-1 text-[#818cf8]" />;
      case "recruiter":
        return <FaUserTie className="mr-1 text-[#818cf8]" />;
      default:
        return <FaUser className="mr-1 text-[#818cf8]" />;
    }
  };

  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-white">User Management</h3>
        <div className="flex items-center">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Search users..."
              className="bg-[#0f172a] text-[#94a3b8] border border-[#334155] rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8] w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b]" />
          </div>
          <Link
            to="/add-user"
            className="flex items-center text-[#818cf8] hover:text-[#a5b4fc] bg-[#0f172a] border border-[#334155] px-4 py-2 rounded-lg"
          >
            <FaPlus className="mr-2" />
            <span>Add User</span>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-[#94a3b8] border-b border-[#334155]">
              <th className="pb-3 text-left font-medium">
                <button
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort("name")}
                >
                  User {getSortIcon("name")}
                </button>
              </th>
              <th className="pb-3 text-left font-medium">
                <button
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort("email")}
                >
                  Email {getSortIcon("email")}
                </button>
              </th>
              {showRole && (
                <th className="pb-3 text-center font-medium">
                  <button
                    className="flex items-center justify-center focus:outline-none"
                    onClick={() => handleSort("role")}
                  >
                    Role {getSortIcon("role")}
                  </button>
                </th>
              )}
              <th className="pb-3 text-center font-medium">
                <button
                  className="flex items-center justify-center focus:outline-none"
                  onClick={() => handleSort("status")}
                >
                  Status {getSortIcon("status")}
                </button>
              </th>
              <th className="pb-3 text-center font-medium">
                <button
                  className="flex items-center justify-center focus:outline-none"
                  onClick={() => handleSort("joinDate")}
                >
                  Join Date {getSortIcon("joinDate")}
                </button>
              </th>
              <th className="pb-3 text-center font-medium">
                <button
                  className="flex items-center justify-center focus:outline-none"
                  onClick={() => handleSort("lastActive")}
                >
                  Last Active {getSortIcon("lastActive")}
                </button>
              </th>
              <th className="pb-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="border-b border-[#334155] text-white">
                <td className="py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#334155] flex items-center justify-center mr-3">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                      ) : (
                        <FaUserCircle className="text-[#94a3b8] text-lg" />
                      )}
                    </div>
                    <Link to={`/user/${user.id}`} className="hover:text-[#818cf8]">
                      {user.name}
                    </Link>
                  </div>
                </td>
                <td className="py-4 text-[#94a3b8]">
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2 text-[#64748b]" />
                    {user.email}
                  </div>
                </td>
                {showRole && (
                  <td className="py-4 text-center">
                    <div className="flex items-center justify-center">
                      <span className="flex items-center text-[#94a3b8]">
                        {getRoleIcon(user.role)} {user.role}
                      </span>
                    </div>
                  </td>
                )}
                <td className="py-4 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.status === "Active"
                        ? "bg-green-900 text-green-300"
                        : user.status === "Pending"
                        ? "bg-yellow-900 text-yellow-300"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-4 text-center text-[#94a3b8]">
                  <div className="flex items-center justify-center">
                    <FaCalendarAlt className="mr-2 text-[#64748b]" />
                    {user.joinDate}
                  </div>
                </td>
                <td className="py-4 text-center text-[#94a3b8]">{user.lastActive}</td>
                <td className="py-4 text-right">
                  <button className="text-[#94a3b8] hover:text-white">
                    <FaEllipsisV />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <div className="text-[#94a3b8] text-sm">
          Showing {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
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
            disabled={indexOfLastUser >= filteredUsers.length}
            className="px-4 py-2 text-[#818cf8] hover:text-[#a5b4fc] disabled:text-[#64748b] disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;