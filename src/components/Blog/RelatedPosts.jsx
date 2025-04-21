import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';

const RelatedPosts = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-[#94a3b8] text-center py-4">
        No related posts found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <Link 
          key={post.id} 
          to={`/blog/${post.slug}`}
          className="block group"
        >
          <div className="flex space-x-4">
            {post.featured_image_url ? (
              <img 
                src={post.featured_image_url} 
                alt={post.title} 
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
              />
            ) : (
              <div className="w-20 h-20 bg-[#0f172a] rounded-lg flex-shrink-0 flex items-center justify-center text-[#334155]">
                No Image
              </div>
            )}
            <div>
              <h4 className="text-white group-hover:text-[#818cf8] transition-colors duration-200 font-medium line-clamp-2">
                {post.title}
              </h4>
              <div className="flex items-center text-xs text-[#94a3b8] mt-1">
                <FaCalendarAlt className="mr-1" />
                <span>{new Date(post.published_at || post.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RelatedPosts;