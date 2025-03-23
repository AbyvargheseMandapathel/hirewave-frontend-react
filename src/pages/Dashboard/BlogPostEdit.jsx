import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import BlogPostEditor from '../../components/Blog/BlogPostEditor';

const BlogPostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate fetching post data
    const fetchPost = async () => {
      try {
        // This would be an API call in a real application
        // For now, we'll use mock data
        const mockPost = {
          id: parseInt(id),
          title: 'How to Create a Standout Resume',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          category: 'Resume Tips',
          status: 'Published',
          featured: false,
          publishDate: '2023-04-10T10:00',
          tags: ['resume', 'job search', 'career'],
          featuredImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdW1lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
          author: 'Alice Johnson',
          date: 'Apr 10, 2023',
          views: 987,
          comments: 15
        };
        
        setPost(mockPost);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [id]);
  
  const handleSave = (formData) => {
    console.log('Updating blog post:', formData);
    // Here you would typically make an API call to update the post
    
    // Navigate back to the blog dashboard
    navigate('/dashboard/blog');
  };
  
  const handleCancel = () => {
    navigate('/dashboard/blog');
  };
  
  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#818cf8]"></div>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Edit Blog Post</h1>
          <p className="text-[#94a3b8]">Update your blog post content and settings</p>
        </div>
        
        <BlogPostEditor 
          post={post}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </DashboardLayout>
  );
};

export default BlogPostEdit;