import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBlogPosts, deleteBlogPost } from "../../services/blogApi";
import { toast } from "react-hot-toast";
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

const BlogPostsTable = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const navigate = useNavigate();

  // Fetch blog posts
  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      console.log('🔄 Starting to load posts...');
      try {
        setLoading(true);
        const response = await fetchBlogPosts();
        console.log('📦 Response received:', response);
        
        if (isMounted) {
          const postsData = Array.isArray(response) ? response : response.results || [];
          setPosts(postsData);
          setError(null);
        }
      } catch (err) {
        console.error('❌ Error loading posts:', err);
        if (isMounted) {
          setError('Failed to fetch blog posts');
          setPosts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle delete
  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      try {
        await deleteBlogPost(postId);
        setPosts(posts.filter(post => post.id !== postId));
        toast.success('Post deleted successfully');
      } catch (err) {
        toast.error('Failed to delete post');
        console.error('Error:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#818cf8]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-400">{error}</div>
        </div>
      </div>
    );
  }

  // Filter posts based on search term
  const filteredPosts = Array.isArray(posts) ? posts.filter(
    (post) =>
      post?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post?.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post?.category?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const fields = {
      title: () => a.title.localeCompare(b.title),
      author: () => a.author.localeCompare(b.author),
      category: () => a.category.localeCompare(b.category),
      status: () => a.status.localeCompare(b.status),
      date: () => new Date(a.date) - new Date(b.date),
      views: () => a.views - b.views,
      comments: () => a.comments - b.comments,
    };

    const result = fields[sortField] ? fields[sortField]() : 0;
    return sortDirection === "asc" ? result : -result;
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusStyles = {
      Published: "bg-green-900 text-green-300",
      Draft: "bg-yellow-900 text-yellow-300",
      Scheduled: "bg-blue-900 text-blue-300",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          statusStyles[status] || "bg-gray-900 text-gray-300"
        }`}
      >
        {status}
      </span>
    );
  };

  // Action handlers
  const handleEdit = (post) => {
    navigate(`/dashboard/blog/edit/${post.id}`, { state: { post } });
  };


  const handleView = (post) => {
    navigate(`/dashboard/blog/view/${post.id}`, { state: { post } });
  };

  // Add this function before the return statement
  const getSortIcon = (field) => {
    if (sortField !== field) {
      return <FaSort className="ml-1 text-gray-400" />;
    }
    return sortDirection === 'asc' 
      ? <FaSortUp className="ml-1 text-indigo-400" />
      : <FaSortDown className="ml-1 text-indigo-400" />;
  };

  // Add sort handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
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
                { [
                    { id: 'title', label: 'Title' },
                    { id: 'author', label: 'Author' },
                    { id: 'category', label: 'Category' },
                    { id: 'status', label: 'Status' },
                    { id: 'date', label: 'Date' },
                    { id: 'views', label: 'Views' },
                    { id: 'comments', label: 'Comments' }
                  ].map((column) => (
                  <th
                    key={column.id}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort(column.id)}
                  >
                    <div className="flex items-center">
                      {column.label}
                      {getSortIcon(column.id)}
                    </div>
                  </th>
                ))}
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>

            <tbody className="bg-[#1e293b] divide-y divide-[#334155]">
              {currentPosts.map((post) => (
                <tr key={post.id} className="hover:bg-[#0f172a]">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {post.featured && <FaStar className="text-yellow-400 mr-2" />}
                      <div className="text-sm font-medium text-white">{post.title}</div>
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
                    <div className="text-sm text-[#94a3b8]">
                      {new Date(post.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-[#94a3b8]">
                      <FaEye className="mr-1 text-[#64748b]" />
                      {post.views || 0}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-[#94a3b8]">
                      <FaComment className="mr-1 text-[#64748b]" />
                      {post.comments_count || 0}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        className="text-[#818cf8] hover:text-[#a5b4fc]"
                        title="Edit"
                        onClick={() => handleEdit(post)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-[#f87171] hover:text-[#fca5a5]"
                        title="Delete"
                        onClick={() => handleDelete(post.id)}
                      >
                        <FaTrash />
                      </button>
                      <button
                        className="text-[#94a3b8] hover:text-white"
                        title="View"
                        onClick={() => handleView(post)}
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
                  currentPage === 1 ? "bg-[#0f172a] text-[#64748b] cursor-not-allowed" : "bg-[#0f172a] text-[#94a3b8] hover:bg-[#334155]"
                }`}
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === i + 1 ? "bg-[#818cf8] text-white" : "bg-[#0f172a] text-[#94a3b8] hover:bg-[#334155]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${
                  currentPage === totalPages ? "bg-[#0f172a] text-[#64748b] cursor-not-allowed" : "bg-[#0f172a] text-[#94a3b8] hover:bg-[#334155]"
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