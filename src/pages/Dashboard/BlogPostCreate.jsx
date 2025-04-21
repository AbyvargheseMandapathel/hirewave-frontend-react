import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import BlogPostEditor from '../../components/Blog/BlogPostEditor';


const BlogPostCreate = () => {
  const navigate = useNavigate();
  
  const handleSave = (formData) => {
    console.log('Saving new blog post:', formData);
    // Here you would typically make an API call to save the post
    
    // Navigate back to the blog dashboard
    navigate('/dashboard/admin/blog');
  };
  
  const handleCancel = () => {
    navigate('/dashboard/admin/blog');
  };
  
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Create New Blog Post</h1>
          <p className="text-[#94a3b8]">Share your knowledge with the community</p>
        </div>
        
        <BlogPostEditor 
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </DashboardLayout>
  );
};

export default BlogPostCreate;