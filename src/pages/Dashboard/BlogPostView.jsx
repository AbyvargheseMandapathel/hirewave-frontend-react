import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const BlogPostView = () => {
  const { postId } = useParams(); // Get the postId from the URL
  const navigate = useNavigate();
  const location = useLocation(); // Access the passed state
  const { post } = location.state || {}; // Retrieve the post data from state

  // Handle going back
  const handleBack = () => {
    navigate('/dashboard/admin/blog'); // Navigate back to the blog dashboard
  };

  // If no post data is found, show a message
  if (!post) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">Post Not Found</h1>
            <p className="text-[#94a3b8]">The requested post could not be found.</p>
          </div>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-[#0f172a] text-[#94a3b8] rounded-lg border border-[#334155] hover:bg-[#1e293b]"
          >
            Back to Dashboard
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">View Blog Post</h1>
          <p className="text-[#94a3b8]">Viewing post with ID: {postId}</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#94a3b8]">Title</label>
            <div className="text-white">{post.title}</div> {/* Use actual post data */}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#94a3b8]">Content</label>
            <div className="text-white">{post.excerpt || 'No content available.'}</div> {/* Use actual post data */}
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-[#0f172a] text-[#94a3b8] rounded-lg border border-[#334155] hover:bg-[#1e293b]"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BlogPostView;