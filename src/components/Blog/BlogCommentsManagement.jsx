import React, { useState } from 'react';
import { FaCheck, FaTimes, FaReply, FaEllipsisV } from 'react-icons/fa';

const BlogCommentsManagement = ({ comments }) => {
  const [activeComment, setActiveComment] = useState(null);
  const [replyText, setReplyText] = useState('');
  
  const handleApprove = (commentId) => {
    console.log('Approving comment:', commentId);
    // Here you would make an API call to approve the comment
  };
  
  const handleReject = (commentId) => {
    console.log('Rejecting comment:', commentId);
    // Here you would make an API call to reject the comment
  };
  
  const handleReply = (commentId) => {
    console.log('Replying to comment:', commentId, 'with text:', replyText);
    // Here you would make an API call to post the reply
    setReplyText('');
    setActiveComment(null);
  };
  
  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
      <h3 className="text-lg font-medium text-white mb-6">Recent Comments</h3>
      
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-[#334155] pb-6 last:border-0 last:pb-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-white font-medium">{comment.author}</span>
                <span className="text-[#64748b] text-sm ml-2">on {comment.postTitle}</span>
              </div>
              <span className="text-[#64748b] text-xs">{comment.date}</span>
            </div>
            
            <p className="text-[#94a3b8] mb-3">{comment.content}</p>
            
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                {comment.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(comment.id)}
                      className="flex items-center text-xs text-green-400 hover:text-green-300"
                    >
                      <FaCheck className="mr-1" /> Approve
                    </button>
                    <button
                      onClick={() => handleReject(comment.id)}
                      className="flex items-center text-xs text-red-400 hover:text-red-300"
                    >
                      <FaTimes className="mr-1" /> Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => setActiveComment(activeComment === comment.id ? null : comment.id)}
                  className="flex items-center text-xs text-[#818cf8] hover:text-[#a5b4fc]"
                >
                  <FaReply className="mr-1" /> Reply
                </button>
              </div>
              
              <div className="relative">
                <button className="text-[#94a3b8] hover:text-white">
                  <FaEllipsisV />
                </button>
              </div>
            </div>
            
            {activeComment === comment.id && (
              <div className="mt-3">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write your reply..."
                  className="bg-[#0f172a] text-white w-full px-4 py-2 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
                  rows={3}
                />
                <div className="flex justify-end mt-2 space-x-2">
                  <button
                    onClick={() => setActiveComment(null)}
                    className="px-3 py-1 text-sm text-[#94a3b8] bg-[#0f172a] rounded-lg hover:bg-[#1e293b]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleReply(comment.id)}
                    className="px-3 py-1 text-sm text-white bg-[#818cf8] rounded-lg hover:bg-[#6366f1]"
                    disabled={!replyText.trim()}
                  >
                    Post Reply
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {comments.length === 0 && (
        <div className="text-center py-8">
          <p className="text-[#94a3b8]">No comments yet</p>
        </div>
      )}
      
      <div className="mt-6 pt-4 border-t border-[#334155]">
        <div className="flex justify-between items-center">
          <span className="text-[#94a3b8]">Total Comments</span>
          <span className="text-white font-medium">{comments.length}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCommentsManagement;