import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaUser, FaTag, FaSpinner, FaExclamationTriangle, FaBookmark, FaShare, FaEye, FaComment } from 'react-icons/fa';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import Button from '../../components/common/Button';
import RelatedPosts from '../../components/Blog/RelatedPosts';
import BlogComments from '../../components/Blog/BlogComments';
import AuthorCard from '../../components/Blog/AuthorCard';
import { getAuthHeader, isLoggedIn, getCurrentUser } from '../../services/authService';
import axios from 'axios';

const BlogDetail = () => {
  const { postSlug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const currentUser = getCurrentUser();

  // Define the incrementViewCount function
  const incrementViewCount = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://hirewavebackend-edxfrq215-q1lgmfjl.leapcell.dev/api';
      await axios.post(`${API_URL}/blog/posts/${postSlug}/increment_view/`, {}, {
        headers: getAuthHeader()
      });
    } catch (err) {
      console.error('Error incrementing view count:', err);
    }
  };

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const API_URL = import.meta.env.VITE_API_URL || 'https://hirewavebackend-edxfrq215-q1lgmfjl.leapcell.dev/api';
        const response = await axios.get(`${API_URL}/blog/posts/${postSlug}/`, {
          headers: getAuthHeader()
        });
        
        setBlog(response.data);
        
        // Fetch related posts
        const relatedResponse = await axios.get(`${API_URL}/blog/posts/`, {
          params: { 
            category: response.data.categories?.[0]?.slug,
            exclude: postSlug,
            limit: 3
          },
          headers: getAuthHeader()
        });
        
        setRelatedPosts(relatedResponse.data.results || []);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (postSlug) {
      fetchBlogPost();
      
      // Only increment view count once per session for this post
      const viewedKey = `viewed_post_${postSlug}`;
      if (!sessionStorage.getItem(viewedKey)) {
        incrementViewCount();
        // Mark this post as viewed in this session
        sessionStorage.setItem(viewedKey, 'true');
      }
    }
  }, [postSlug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt || 'Check out this blog post!',
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch((err) => console.error('Could not copy text: ', err));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0f172a]">
        <div className="text-center">
          <FaSpinner className="animate-spin text-[#818cf8] text-5xl mx-auto mb-4" />
          <p className="text-[#94a3b8] text-lg">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg shadow-lg mb-6" role="alert">
          <div className="flex items-center mb-3">
            <FaExclamationTriangle className="mr-3 text-xl" />
            <p className="text-lg font-semibold">Error Loading Article</p>
          </div>
          <p className="mb-4">{error}</p>
          <Link to="/blog" className="mt-4 inline-block bg-[#334155] text-white px-5 py-2 rounded-lg hover:bg-[#475569] transition-colors duration-300 shadow-md">
            <FaArrowLeft className="inline mr-2" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-6 rounded-lg shadow-lg mb-6" role="alert">
          <p className="text-lg font-semibold mb-4">Blog post not found.</p>
          <Link to="/blog" className="mt-4 inline-block bg-[#334155] text-white px-5 py-2 rounded-lg hover:bg-[#475569] transition-colors duration-300 shadow-md">
            <FaArrowLeft className="inline mr-2" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back button */}
        <Link to="/blog" className="inline-flex items-center text-[#818cf8] hover:text-[#a5b4fc] mb-8 transition-colors duration-300">
          <FaArrowLeft className="mr-2" /> Back to Blog
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main content */}
          <div className="lg:w-2/3">
            {/* Blog header */}
            <article className="bg-[#1e293b] rounded-2xl shadow-xl overflow-hidden mb-10">
              {blog.featured_image_url && (
                <div className="relative">
                  <img 
                    src={blog.featured_image_url} 
                    alt={blog.title} 
                    className="w-full h-64 md:h-[400px] object-cover"
                  />
                  {blog.categories && blog.categories.length > 0 && (
                    <div className="absolute top-4 left-4 flex gap-2">
                      {blog.categories.map(category => (
                        <span 
                          key={category.id || category.name} 
                          className="bg-[#818cf8] text-white px-3 py-1 rounded-full text-sm font-medium shadow-md"
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              <div className="p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{blog.title}</h1>
                
                {/* Meta information */}
                <div className="flex flex-wrap items-center text-sm text-[#94a3b8] mb-6 pb-6 border-b border-[#334155]">
                  <div className="flex items-center mr-6 mb-2">
                    <FaCalendarAlt className="mr-2 text-[#818cf8]" />
                    <span>{new Date(blog.published_at || blog.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center mr-6 mb-2">
                    <FaUser className="mr-2 text-[#818cf8]" />
                    <span>{blog.author_name || 'Admin'}</span>
                  </div>
                  <div className="flex items-center mr-6 mb-2">
                    <FaEye className="mr-2 text-[#818cf8]" />
                    <span>{blog.views || 0} views</span>
                  </div>
                  {blog.comments_count !== undefined && (
                    <div className="flex items-center mb-2">
                      <FaComment className="mr-2 text-[#818cf8]" />
                      <span>{blog.comments_count} comments</span>
                    </div>
                  )}
                </div>
                
                {/* Excerpt if available */}
                {blog.excerpt && (
                  <div className="text-lg text-[#94a3b8] italic mb-8 border-l-4 border-[#818cf8] pl-4 py-2">
                    {blog.excerpt}
                  </div>
                )}
                
                {/* Blog content */}
                <div className="prose prose-lg prose-invert max-w-none mb-8">
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-wrap gap-3 pt-6 border-t border-[#334155]">
                  <Button 
                    onClick={handleShare}
                    className="flex items-center bg-[#334155] hover:bg-[#475569] text-white transition-colors duration-300"
                  >
                    <FaShare className="mr-2" /> Share
                  </Button>
                  {isLoggedIn() && (
                    <Button 
                      className="flex items-center bg-[#334155] hover:bg-[#475569] text-white transition-colors duration-300"
                    >
                      <FaBookmark className="mr-2" /> Save
                    </Button>
                  )}
                  {currentUser?.user_type === 'admin' && (
                    <Button 
                      onClick={() => navigate(`/dashboard/admin/blog/edit/${postSlug}`)}
                      className="flex items-center bg-[#334155] hover:bg-[#475569] text-white transition-colors duration-300"
                    >
                      Edit Post
                    </Button>
                  )}
                </div>
              </div>
            </article>
            
            {/* Comments section */}
            {/* <div className="bg-[#1e293b] rounded-2xl shadow-xl p-6 md:p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Comments</h3>
              <BlogComments postId={postSlug} />
            </div>*/}
          </div> 
          
          {/* Sidebar */}
          {/* <div className="lg:w-1/3 space-y-8">
            {/* Author card
            <div className="sticky top-8">
              <AuthorCard author={blog.author} />
              
              {/* Related posts
              <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6 mt-8">
                <h3 className="text-xl font-medium text-white mb-6 border-b border-[#334155] pb-3">Related Posts</h3>
                <RelatedPosts posts={relatedPosts} />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;