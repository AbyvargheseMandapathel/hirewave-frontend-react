import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaEllipsisV } from 'react-icons/fa';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import BlogCategoriesChart from '../../components/Blog/BlogCategoriesChart';
import BlogActivityLog from '../../components/Blog/BlogActivityLog';
import BlogCommentsManagement from '../../components/Blog/BlogCommentsManagement';

const BlogDashboard = () => {
  // Mock data for blog stats
  const [stats] = useState({
    totalPosts: 24,
    publishedPosts: 18,
    draftPosts: 6,
    totalViews: 12540,
    totalComments: 87,
  });

  // Mock data for categories
  const [categories] = useState([
    { name: 'Career Advice', count: 8, color: '#60a5fa' },
    { name: 'Resume Tips', count: 5, color: '#818cf8' },
    { name: 'Workplace', count: 4, color: '#a5b4fc' },
    { name: 'Technology', count: 3, color: '#34d399' },
    { name: 'Social Media', count: 2, color: '#f87171' },
    { name: 'Job Search', count: 2, color: '#fbbf24' },
  ]);

  // Mock data for recent activities
  const [activities] = useState([
    {
      id: 1,
      type: 'post_published',
      title: 'New Post Published',
      description: 'How to Create a Standout Resume in 2023',
      time: '2 hours ago',
      user: 'Alice Johnson',
    },
    {
      id: 2,
      type: 'comment_added',
      title: 'New Comment',
      description: 'John Smith commented on "10 Interview Tips"',
      time: '5 hours ago',
      user: 'System',
    },
    {
      id: 3,
      type: 'post_edited',
      title: 'Post Updated',
      description: 'Updated content in "Social Media for Job Search"',
      time: '1 day ago',
      user: 'Alice Johnson',
    },
    {
      id: 4,
      type: 'post_scheduled',
      title: 'Post Scheduled',
      description: 'Scheduled "Remote Work Trends" for next Monday',
      time: '2 days ago',
      user: 'Alice Johnson',
    },
  ]);

  // Mock data for recent comments
  const [comments] = useState([
    {
      id: 1,
      author: 'John Smith',
      postTitle: '10 Interview Tips',
      content: 'Great article! I used these tips for my recent interview and got the job.',
      date: 'Today, 10:45 AM',
      status: 'approved',
    },
    {
      id: 2,
      author: 'Emily Wilson',
      postTitle: 'How to Create a Standout Resume',
      content: 'I have a question about the format. Would this work for a creative field as well?',
      date: 'Yesterday, 3:22 PM',
      status: 'pending',
    },
    {
      id: 3,
      author: 'Michael Brown',
      postTitle: 'Social Media for Job Search',
      content: 'I tried LinkedIn but didn\'t get much response. Any other platforms you recommend?',
      date: '2 days ago',
      status: 'approved',
    },
  ]);

  // Mock data for recent posts
  const [posts] = useState([
    {
      id: 1,
      title: 'How to Create a Standout Resume in 2023',
      excerpt: 'Learn the latest trends and tips for creating a resume that gets noticed by recruiters.',
      date: 'Apr 10, 2023',
      author: 'Alice Johnson',
      category: 'Resume Tips',
      status: 'Published',
      views: 987,
      comments: 15,
    },
    {
      id: 2,
      title: '10 Interview Tips That Will Help You Get Hired',
      excerpt: 'Prepare for your next interview with these proven strategies from hiring managers.',
      date: 'Mar 28, 2023',
      author: 'Alice Johnson',
      category: 'Career Advice',
      status: 'Published',
      views: 1243,
      comments: 22,
    },
    {
      id: 3,
      title: 'Social Media for Job Search: A Complete Guide',
      excerpt: 'Leverage the power of social media to find your next career opportunity.',
      date: 'Mar 15, 2023',
      author: 'Alice Johnson',
      category: 'Social Media',
      status: 'Published',
      views: 756,
      comments: 8,
    },
    {
      id: 4,
      title: 'Remote Work Trends for 2023',
      excerpt: 'Discover how remote work is evolving and what it means for job seekers.',
      date: 'Scheduled for Apr 17, 2023',
      author: 'Alice Johnson',
      category: 'Workplace',
      status: 'Scheduled',
      views: 0,
      comments: 0,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Filter posts based on search term
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Blog Management</h1>
            <p className="text-[#94a3b8]">Manage your blog posts, comments, and analytics</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              to="/dashboard/blog/create"
              className="bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] text-white px-4 py-2 rounded-lg hover:from-[#a5b4fc] hover:to-[#818cf8] transition-all duration-300 flex items-center"
            >
              <FaPlus className="mr-2" /> Create New Post
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {Object.entries(stats).map(([key, value]) => (
            <div
              key={key}
              className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-4 hover:bg-[#0f172a] cursor-pointer"
            >
              <div className="text-[#94a3b8] mb-1">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="text-2xl font-bold text-white">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filter */}
            <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts by title or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#0f172a] text-white px-4 py-3 pl-10 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b]" />
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
              <h3 className="text-lg font-medium text-white mb-6">Recent Posts</h3>

              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 bg-[#0f172a] rounded-lg border border-[#334155] hover:border-[#475569] transition-colors"
                  >
                    <div className="flex justify-between">
                      <div>
                        <Link
                          to={`/dashboard/blog/edit/${post.id}`}
                          className="text-white hover:text-[#818cf8] font-medium"
                        >
                          {post.title}
                        </Link>
                        <div className="flex items-center mt-1 text-xs text-[#64748b]">
                          <span>{post.date}</span>
                          <span className="mx-2">•</span>
                          <span>{post.author}</span>
                          <span className="mx-2">•</span>
                          <span className="px-2 py-0.5 rounded-full bg-[#1e293b]">{post.category}</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span
                          className={`px-2 py-1 rounded-full text-xs mr-2 ${
                            post.status === 'Published'
                              ? 'bg-green-900 text-green-300'
                              : post.status === 'Scheduled'
                              ? 'bg-yellow-900 text-yellow-300'
                              : 'bg-gray-900 text-gray-300'
                          }`}
                        >
                          {post.status}
                        </span>
                        <button className="text-[#94a3b8] hover:text-white">
                          <FaEllipsisV />
                        </button>
                      </div>
                    </div>
                    <p className="text-[#94a3b8] mt-2">{post.excerpt}</p>
                    <div className="flex items-center mt-3 text-xs text-[#64748b]">
                      <span>{post.views} views</span>
                      <span className="mx-2">•</span>
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-[#94a3b8]">No posts found matching your search</p>
                </div>
              )}
            </div>

            {/* Categories Chart */}
            <BlogCategoriesChart categories={categories} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Activity Log */}
            <BlogActivityLog activities={activities} />

            {/* Recent Comments */}
            <BlogCommentsManagement comments={comments} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BlogDashboard;