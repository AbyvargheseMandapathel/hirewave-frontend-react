import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaCalendarAlt, FaUser, FaTag } from 'react-icons/fa';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const JobseekerBlog = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    // Fetch blog posts (mock data for now)
    const fetchBlogPosts = () => {
      const posts = [
        {
          id: 1,
          title: 'Top 10 Interview Tips for Job Seekers',
          author: 'John Smith',
          category: 'Career Advice',
          date: 'Apr 15, 2023',
          excerpt: 'Prepare for your next interview with these proven strategies from hiring managers.',
          content: `
            <p>Preparing for a job interview can be stressful, but with the right preparation, you can walk in with confidence and impress your potential employer.</p>
            
            <h2>1. Research the Company</h2>
            <p>Before your interview, take time to thoroughly research the company. Understand their products, services, mission, and recent news.</p>
            
            <h2>2. Practice Common Questions</h2>
            <p>Prepare answers for common interview questions like "Tell me about yourself" and "Why do you want to work here?"</p>
            
            <h2>3. Prepare Your Own Questions</h2>
            <p>Having thoughtful questions ready shows your interest in the role and company.</p>
          `,
          featured: true
        },
        {
          id: 2,
          title: 'How to Create a Standout Resume',
          author: 'Alice Johnson',
          category: 'Resume Tips',
          date: 'Apr 10, 2023',
          excerpt: 'Learn the latest trends and tips for creating a resume that gets noticed by recruiters.',
          content: `
            <p>Your resume is often the first impression a potential employer has of you. Make it count!</p>
            
            <h2>Focus on Achievements</h2>
            <p>Instead of just listing job duties, highlight specific accomplishments and quantify them when possible.</p>
            
            <h2>Tailor for Each Application</h2>
            <p>Customize your resume for each job application to emphasize relevant skills and experience.</p>
          `,
          featured: false
        },
        {
          id: 3,
          title: 'Remote Work Trends in 2023',
          author: 'Robert Davis',
          category: 'Workplace',
          date: 'Apr 5, 2023',
          excerpt: 'Discover how remote work is evolving and what it means for job seekers.',
          content: `
            <p>Remote work has transformed the job market. Here's what you need to know.</p>
            
            <h2>Hybrid Models</h2>
            <p>Many companies are adopting hybrid work models that combine remote and in-office work.</p>
            
            <h2>Global Talent Pool</h2>
            <p>Companies are increasingly hiring talent from around the world, expanding opportunities for job seekers.</p>
          `,
          featured: false
        },
        {
          id: 4,
          title: 'Navigating Salary Negotiations',
          author: 'Emily Wilson',
          category: 'Career Advice',
          date: 'Mar 28, 2023',
          excerpt: 'Learn effective strategies for negotiating your salary and benefits package.',
          content: `
            <p>Negotiating your salary can be intimidating, but it's a crucial skill for career growth.</p>
            
            <h2>Know Your Worth</h2>
            <p>Research industry standards and salary ranges for your position and location.</p>
            
            <h2>Consider the Full Package</h2>
            <p>Remember to evaluate the entire compensation package, including benefits, work-life balance, and growth opportunities.</p>
          `,
          featured: true
        }
      ];

      // Extract unique categories
      const uniqueCategories = [...new Set(posts.map(post => post.category))];
      setCategories(uniqueCategories);
      
      // Set featured posts
      setFeaturedPosts(posts.filter(post => post.featured));
      
      // Set all posts
      setBlogPosts(posts);
    };

    fetchBlogPosts();
  }, []);

  // Filter posts based on search term and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleViewPost = (post) => {
    navigate(`/jobseeker/blog/${post.id}`, { state: { post, isJobseeker: true } });
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Career Blog</h1>
          <p className="text-[#94a3b8]">Discover tips and insights for your job search and career growth</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0f172a] text-white px-4 py-3 pl-10 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b]" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#0f172a] text-white px-4 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map(post => (
                <div 
                  key={post.id}
                  className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] overflow-hidden hover:border-[#818cf8] transition-colors cursor-pointer"
                  onClick={() => handleViewPost(post)}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="px-3 py-1 rounded-full text-xs bg-purple-900 text-purple-300">
                        Featured
                      </span>
                      <span className="ml-2 px-3 py-1 rounded-full text-xs bg-[#0f172a] text-[#94a3b8]">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">{post.title}</h3>
                    <p className="text-[#94a3b8] mb-4">{post.excerpt}</p>
                    <div className="flex items-center text-xs text-[#64748b]">
                      <FaCalendarAlt className="mr-1" />
                      <span className="mr-3">{post.date}</span>
                      <FaUser className="mr-1" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <div 
                key={post.id}
                className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] overflow-hidden hover:border-[#818cf8] transition-colors cursor-pointer"
                onClick={() => handleViewPost(post)}
              >
                <div className="p-6">
                  <span className="px-3 py-1 rounded-full text-xs bg-[#0f172a] text-[#94a3b8] mb-3 inline-block">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-medium text-white mb-2">{post.title}</h3>
                  <p className="text-[#94a3b8] mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center text-xs text-[#64748b]">
                    <FaCalendarAlt className="mr-1" />
                    <span className="mr-3">{post.date}</span>
                    <FaUser className="mr-1" />
                    <span>{post.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobseekerBlog;