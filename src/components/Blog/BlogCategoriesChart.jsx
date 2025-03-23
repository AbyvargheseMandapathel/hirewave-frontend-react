import React from 'react';
import { FaCircle } from 'react-icons/fa';

const BlogCategoriesChart = ({ categories = [] }) => {
  // Handle undefined or empty categories
  if (!categories || categories.length === 0) {
    return (
      <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
        <h3 className="text-lg font-medium text-white mb-6">Categories Distribution</h3>
        <p className="text-[#94a3b8]">No categories available.</p>
      </div>
    );
  }

  const totalPosts = categories.reduce((sum, category) => sum + category.count, 0);

  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
      <h3 className="text-lg font-medium text-white mb-6">Categories Distribution</h3>

      {/* Category List */}
      <div className="space-y-4">
        {categories.map((category, index) => {
          const percentage = ((category.count / totalPosts) * 100).toFixed(1);
          return (
            <div
              key={index}
              className="bg-[#0f172a] p-4 rounded-lg border border-[#334155]"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FaCircle className="mr-2" style={{ color: category.color }} />
                  <span className="text-white">{category.name}</span>
                </div>
                <span className="text-[#94a3b8] text-sm">
                  {category.count} {category.count === 1 ? 'post' : 'posts'}
                </span>
              </div>
              <div className="w-full bg-[#1e293b] rounded-full h-2 mb-1">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: category.color,
                  }}
                ></div>
              </div>
              <div className="text-xs text-[#94a3b8]">{percentage}% of total posts</div>
            </div>
          );
        })}
      </div>

      {/* Total Posts */}
      <div className="mt-6 text-center">
        <div className="text-2xl font-bold text-white">{totalPosts}</div>
        <div className="text-xs text-[#94a3b8]">Total Posts</div>
      </div>
    </div>
  );
};

export default BlogCategoriesChart;