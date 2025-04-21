import React, { useState, useEffect } from 'react';
import { FaUser, FaReply, FaSpinner } from 'react-icons/fa';
import Button from '../common/Button';
import { getAuthHeader, isLoggedIn, getCurrentUser } from '../../services/authService';
import axios from 'axios';

const BlogComments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const isUserLoggedIn = isLoggedIn();
  const currentUser = getCurrentUser();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
        const response = await axios.get(`${API_URL}/blog/comments/`, {
          params: { post: postId },
          headers: getAuthHeader()
        });
        
        setComments(response.data.results || []);
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError('Failed to load comments');
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    try {
      setSubmitting(true);
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const response = await axios.post(
        `${API_URL}/blog/comments/`,
        { post: postId, content: newComment },
        { headers: getAuthHeader() }
      );
      
      // If admin, comment is automatically approved
      if (currentUser?.user_type === 'admin') {
        setComments([response.data, ...comments]);
      } else {
        // Show a message that comment is pending approval
        alert('Your comment has been submitted and is pending approval.');
      }
      
      setNewComment('');
    } catch (err) {
      console.error('Error submitting comment:', err);
      alert('Failed to submit comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="border-t border-[#334155] pt-8">
      <h3 className="text-2xl font-bold text-white mb-6">Comments</h3>
      
      {/* Comment form */}
      {isUserLoggedIn ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="mb-4">
            <label htmlFor="comment" className="block text-[#94a3b8] mb-2">
              Leave a comment
            </label>
            <textarea
              id="comment"
              rows="4"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] p-3 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
              placeholder="Share your thoughts..."
              required
            ></textarea>
          </div>
          <Button 
            type="submit" 
            disabled={submitting}
            className="flex items-center"
          >
            {submitting ? <FaSpinner className="animate-spin mr-2" /> : null}
            Post Comment
          </Button>
          {currentUser?.user_type !== 'admin' && (
            <p className="text-xs text-[#94a3b8] mt-2">
              Comments are moderated and will appear after approval.
            </p>
          )}
        </form>
      ) : (
        <div className="bg-[#0f172a] rounded-lg border border-[#334155] p-4 mb-8">
          <p className="text-[#94a3b8] mb-2">
            Please log in to leave a comment.
          </p>
          <Button 
            as="a" 
            href="/login" 
            className="text-sm"
          >
            Log In
          </Button>
        </div>
      )}
      
      {/* Comments list */}
      {loading ? (
        <div className="flex justify-center py-8">
          <FaSpinner className="animate-spin text-[#818cf8] text-2xl" />
        </div>
      ) : error ? (
        <div className="text-red-400 py-4">
          {error}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-[#94a3b8]">
          No comments yet. Be the first to share your thoughts!
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map(comment => (
            <div key={comment.id} className="bg-[#0f172a] rounded-lg p-4 border border-[#334155]">
              <div className="flex items-start">
                <div className="mr-3">
                  {comment.author_image ? (
                    <img 
                      src={comment.author_image} 
                      alt={comment.author_name} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#334155] flex items-center justify-center">
                      <FaUser className="text-[#94a3b8]" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-white font-medium">{comment.author_name}</h4>
                      <p className="text-xs text-[#94a3b8]">
                        {new Date(comment.created_at).toLocaleDateString()} at {new Date(comment.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                    {isUserLoggedIn && (
                      <button 
                        className="text-[#94a3b8] hover:text-[#818cf8]"
                        aria-label="Reply"
                      >
                        <FaReply />
                      </button>
                    )}
                  </div>
                  <div className="mt-2 text-[#94a3b8]">
                    {comment.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogComments;