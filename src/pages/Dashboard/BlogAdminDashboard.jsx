import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import DashboardStats from '../../components/Dashboard/DashboardStats';
import BlogPostsTable from '../../components/Blog/BlogPostsTable';
import BlogCategoriesChart from '../../components/Blog/BlogCategoriesChart';
import BlogActivityLog from '../../components/Blog/BlogActivityLog';
import { FaFilter, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BlogAdminDashboard = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'published', 'draft', 'scheduled'
  const [filterCriteria, setFilterCriteria] = useState({ category: '', author: '' }); // State for filter criteria
  const [showFilterDropdown, setShowFilterDropdown] = useState(false); // State for filter dropdown visibility

  // Generate blog posts data
  useEffect(() => {
    const generateBlogPostsData = () => {
      // Sample blog posts data
      const data = [
        {
          id: 1,
          title: 'Top 10 Interview Tips for Job Seekers',
          author: 'John Smith',
          category: 'Career Advice',
          status: 'Published',
          date: 'Apr 15, 2023',
          views: 1342,
          comments: 28,
          featured: true,
        },
        {
          id: 2,
          title: 'How to Create a Standout Resume',
          author: 'Alice Johnson',
          category: 'Resume Tips',
          status: 'Published',
          date: 'Apr 10, 2023',
          views: 987,
          comments: 15,
          featured: false,
        },
        {
          id: 3,
          title: 'Remote Work Trends in 2023',
          author: 'Robert Davis',
          category: 'Workplace',
          status: 'Draft',
          date: 'Apr 5, 2023',
          views: 0,
          comments: 0,
          featured: false,
        },
        {
          id: 4,
          title: 'Navigating Salary Negotiations',
          author: 'Emily Wilson',
          category: 'Career Advice',
          status: 'Scheduled',
          date: 'Apr 20, 2023',
          views: 0,
          comments: 0,
          featured: false,
        },
        {
          id: 5,
          title: 'The Future of AI in Recruitment',
          author: 'Michael Brown',
          category: 'Technology',
          status: 'Published',
          date: 'Mar 28, 2023',
          views: 2156,
          comments: 42,
          featured: true,
        },
        {
          id: 6,
          title: 'Building an Effective LinkedIn Profile',
          author: 'Sarah Parker',
          category: 'Social Media',
          status: 'Published',
          date: 'Mar 22, 2023',
          views: 1654,
          comments: 31,
          featured: false,
        },
        {
          id: 7,
          title: 'Diversity and Inclusion in the Workplace',
          author: 'David Lee',
          category: 'Workplace',
          status: 'Draft',
          date: 'Mar 18, 2023',
          views: 0,
          comments: 0,
          featured: false,
        },
        {
          id: 8,
          title: 'Transitioning to a New Career Path',
          author: 'Jennifer Adams',
          category: 'Career Advice',
          status: 'Published',
          date: 'Mar 15, 2023',
          views: 876,
          comments: 19,
          featured: false,
        },
        
        {
            id: 9,
            title: 'Transitioning to a New Career Path',
            author: 'Jennifer Adams',
            category: 'Career Advice',
            status: 'Published',
            date: 'Mar 15, 2023',
            views: 876,
            comments: 19,
            featured: false,
          },
      ];

      setBlogPosts(data);
    };

    generateBlogPostsData();
  }, []);

  // Filter posts based on active tab
  const filteredPosts = activeTab === 'all'
    ? blogPosts
    : blogPosts.filter((post) => post.status.toLowerCase() === activeTab);

  // Apply additional filters
  const applyFilters = (posts) => {
    return posts.filter((post) => {
      const matchesCategory = filterCriteria.category ? post.category === filterCriteria.category : true;
      const matchesAuthor = filterCriteria.author ? post.author === filterCriteria.author : true;
      return matchesCategory && matchesAuthor;
    });
  };

  const finalFilteredPosts = applyFilters(filteredPosts);

  // Handle filter criteria change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  // Blog stats data
  const statsData = [
    { title: 'Total Posts', value: blogPosts.length, change: '+3', isPositive: true },
    { title: 'Published', value: blogPosts.filter((post) => post.status === 'Published').length, change: '+2', isPositive: true },
    { title: 'Total Views', value: blogPosts.reduce((sum, post) => sum + post.views, 0).toLocaleString(), change: '+15%', isPositive: true },
    { title: 'Comments', value: blogPosts.reduce((sum, post) => sum + post.comments, 0), change: '+8%', isPositive: true },
  ];

  // Recent blog activity data
  const recentActivities = [
    {
      id: 1,
      type: 'post_published',
      title: 'Post Published',
      description: 'Top 10 Interview Tips for Job Seekers',
      user: 'John Smith',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'post_edited',
      title: 'Post Edited',
      description: 'How to Create a Standout Resume',
      user: 'Alice Johnson',
      time: '5 hours ago',
    },
    {
      id: 3,
      type: 'comment_added',
      title: 'New Comment',
      description: 'On: The Future of AI in Recruitment',
      user: 'Visitor',
      time: '1 day ago',
    },
    {
      id: 4,
      type: 'post_scheduled',
      title: 'Post Scheduled',
      description: 'Navigating Salary Negotiations',
      user: 'Emily Wilson',
      time: '2 days ago',
    },
    {
      id: 5,
      type: 'post_draft',
      title: 'Draft Saved',
      description: 'Remote Work Trends in 2023',
      user: 'Robert Davis',
      time: '3 days ago',
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Blog Management</h1>
            <p className="text-[#94a3b8]">Manage your blog posts, categories, and comments</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center px-4 py-2 bg-[#0f172a] text-[#94a3b8] rounded-lg border border-[#334155] hover:bg-[#1e293b]"
              >
                <FaFilter className="mr-2" />
                Filter
              </button>
              {showFilterDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1e293b] rounded-lg shadow-lg border border-[#334155] p-4">
                  <div className="space-y-2">
                    <select
                      name="category"
                      value={filterCriteria.category}
                      onChange={handleFilterChange}
                      className="w-full bg-[#0f172a] text-[#94a3b8] rounded-lg p-2 focus:outline-none"
                    >
                      <option value="">Select Category</option>
                      <option value="Career Advice">Career Advice</option>
                      <option value="Resume Tips">Resume Tips</option>
                      <option value="Workplace">Workplace</option>
                      <option value="Technology">Technology</option>
                      <option value="Social Media">Social Media</option>
                    </select>
                    <input
                      type="text"
                      name="author"
                      placeholder="Filter by Author"
                      value={filterCriteria.author}
                      onChange={handleFilterChange}
                      className="w-full bg-[#0f172a] text-[#94a3b8] rounded-lg p-2 focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => navigate('/dashboard/blog/create')}
              className="flex items-center px-4 py-2 bg-[#818cf8] text-white rounded-lg hover:bg-[#6366f1]"
            >
              <FaPlus className="mr-2" />
              New Post
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <DashboardStats stats={statsData} />

        {/* Tabs */}
        <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-4 mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'all'
                  ? 'bg-[#0f172a] text-white'
                  : 'text-[#94a3b8] hover:bg-[#0f172a] hover:text-white'
              }`}
            >
              All Posts
            </button>
            <button
              onClick={() => setActiveTab('published')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'published'
                  ? 'bg-[#0f172a] text-white'
                  : 'text-[#94a3b8] hover:bg-[#0f172a] hover:text-white'
              }`}
            >
              Published
            </button>
            <button
              onClick={() => setActiveTab('draft')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'draft'
                  ? 'bg-[#0f172a] text-white'
                  : 'text-[#94a3b8] hover:bg-[#0f172a] hover:text-white'
              }`}
            >
              Drafts
            </button>
            <button
              onClick={() => setActiveTab('scheduled')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'scheduled'
                  ? 'bg-[#0f172a] text-white'
                  : 'text-[#94a3b8] hover:bg-[#0f172a] hover:text-white'
              }`}
            >
              Scheduled
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Blog Posts Table - Takes 2/3 of the space on large screens */}
          <div className="lg:col-span-2">
            <BlogPostsTable posts={finalFilteredPosts} />
          </div>

          {/* Right Sidebar - Takes 1/3 of the space on large screens */}
          <div className="space-y-6">
            <BlogActivityLog activities={recentActivities} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BlogAdminDashboard;