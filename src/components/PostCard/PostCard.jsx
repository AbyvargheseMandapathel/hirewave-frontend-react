import React from 'react';
import { Link } from 'react-router-dom';
import { FaEllipsisV } from 'react-icons/fa';

const PostCard = ({ post }) => {
  return (
    <div className="p-4 bg-[#0f172a] rounded-lg border border-[#334155] hover:border-[#475569] transition-colors">
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
  );
};

export default PostCard;