import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import { FaCalendarAlt, FaUser, FaTag, FaEye, FaCommentAlt, FaStar, FaThumbsUp } from 'react-icons/fa';

const BlogPostView = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { post, isJobseeker } = location.state || {};

  // Mock comments data
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'John Doe',
      content: 'This is a great post! Very informative and well-written.',
      date: '2 hours ago',
      likes: 12,
      isLiked: false,
    },
    {
      id: 2,
      author: 'Jane Smith',
      content: 'I found this very helpful. Thanks for sharing!',
      date: '5 hours ago',
      likes: 8,
      isLiked: true,
    },
  ]);

  // Handle going back
  const handleBack = () => {
    if (isJobseeker) {
      navigate('/');
    } else {
      navigate('/dashboard/admin/blog');
    }
  };

  // Handle like for a comment
  const handleLike = (commentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, isLiked: !comment.isLiked, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1 }
          : comment
      )
    );
  };

  // Handle submitting a new comment
  const handleSubmitComment = (e) => {
    e.preventDefault();
    const newComment = {
      id: comments.length + 1,
      author: 'Current User', // Replace with actual user name
      content: e.target.comment.value,
      date: 'Just now',
      likes: 0,
      isLiked: false,
    };
    setComments([...comments, newComment]);
    e.target.reset();
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
        {/* Post Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">{post.title}</h1>
            <div className="flex flex-wrap items-center text-sm text-[#94a3b8] mt-2 gap-4">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-1" /> {post.date}
              </div>
              <div className="flex items-center">
                <FaUser className="mr-1" /> {post.author}
              </div>
              <div className="flex items-center">
                <FaTag className="mr-1" /> {post.category}
              </div>
              {post.views !== undefined && (
                <div className="flex items-center">
                  <FaEye className="mr-1" /> {post.views} views
                </div>
              )}
              {post.comments !== undefined && (
                <div className="flex items-center">
                  <FaCommentAlt className="mr-1" /> {post.comments} comments
                </div>
              )}
            </div>
          </div>
          <div>
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-[#0f172a] text-[#94a3b8] rounded-lg border border-[#334155] hover:bg-[#1e293b]"
            >
              Back to Blog
            </button>
          </div>
        </div>

        {/* Post Content */}
        <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
          {!isJobseeker && post.status && (
            <div className="mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  post.status === 'Published'
                    ? 'bg-green-900 text-green-300'
                    : post.status === 'Draft'
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-yellow-900 text-yellow-300'
                }`}
              >
                {post.status}
              </span>
              {post.featured && (
                <span className="ml-2 px-3 py-1 rounded-full text-xs bg-purple-900 text-purple-300">
                  Featured
                </span>
              )}
            </div>
          )}

        {/* Post Content */}
        <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
          <div className="mt-4 mb-6">
            {post.content ? (
              <div 
                className="prose prose-invert prose-headings:text-[#818cf8] prose-a:text-[#60a5fa] prose-strong:text-white prose-p:text-white prose-li:text-white prose-blockquote:border-l-[#818cf8] prose-blockquote:bg-[#0f172a] prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-img:rounded-lg prose-img:shadow-lg max-w-none leading-relaxed text-white"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <div className="bg-[#0f172a] p-6 rounded-lg border-l-4 border-[#818cf8]">
                <p className="text-white text-lg">{post.excerpt || 'No content available.'}</p>
              </div>
            )}
          </div>
        </div>

          {/* Comments Section */}
          <div className="mt-8 border-t border-[#334155] pt-6">
            <h3 className="text-lg font-medium text-white mb-4">Comments</h3>

            {/* Display Comments */}
            {comments.map((comment) => (
              <div key={comment.id} className="mb-4 p-4 bg-[#0f172a] rounded-lg border border-[#334155]">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-[#94a3b8]">
                    <span className="font-medium text-white">{comment.author}</span> • {comment.date}
                  </div>
                  <button
                    onClick={() => handleLike(comment.id)}
                    className={`flex items-center text-sm ${
                      comment.isLiked ? 'text-[#818cf8]' : 'text-[#94a3b8]'
                    }`}
                  >
                    <FaThumbsUp className="mr-1" /> {comment.likes}
                  </button>
                </div>
                <p className="mt-2 text-white">{comment.content}</p>
              </div>
            ))}

            {/* Add Comment Form */}
            {isJobseeker && (
              <form onSubmit={handleSubmitComment} className="mt-6">
                <textarea
                  name="comment"
                  placeholder="Write your comment here..."
                  className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] p-3 focus:outline-none focus:ring-2 focus:ring-[#818cf8] min-h-[100px]"
                  required
                />
                <div className="mt-3 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#818cf8] text-white rounded-lg hover:bg-[#6366f1]"
                  >
                    Submit Comment
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BlogPostView;