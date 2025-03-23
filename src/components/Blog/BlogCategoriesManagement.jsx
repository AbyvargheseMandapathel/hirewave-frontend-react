import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaList, FaComment, FaChartBar } from 'react-icons/fa';

const BlogCategoriesManagement = ({ categories, onAddCategory, onUpdateCategory, onDeleteCategory }) => {
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Navigation links for blog management
  const blogManagementLinks = [
    { to: '/dashboard/blog', icon: <FaList />, label: 'All Posts' },
    { to: '/dashboard/blog/categories', icon: <FaChartBar />, label: 'Categories' },
    { to: '/dashboard/blog/comments', icon: <FaComment />, label: 'Comments' }
  ];

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      onAddCategory({
        name: newCategory.trim(),
        count: 0,
        color: getRandomColor(),
      });
      setNewCategory('');
    }
  };

  const startEditing = (category) => {
    setEditingCategory(category);
    setEditValue(category.name);
  };

  const cancelEditing = () => {
    setEditingCategory(null);
    setEditValue('');
  };

  const saveEdit = () => {
    if (editValue.trim() && editingCategory) {
      onUpdateCategory({
        ...editingCategory,
        name: editValue.trim(),
      });
      setEditingCategory(null);
      setEditValue('');
    }
  };

  const getRandomColor = () => {
    const colors = ['#60a5fa', '#818cf8', '#a5b4fc', '#34d399', '#f87171', '#fbbf24', '#f472b6'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
      {/* Navigation links */}
      <div className="flex mb-6 space-x-4 border-b border-[#334155] pb-4">
        {blogManagementLinks.map((link, index) => (
          <Link 
            key={index}
            to={link.to}
            className="flex items-center text-[#94a3b8] hover:text-[#818cf8] transition-colors"
          >
            <span className="mr-2">{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </div>

      <h3 className="text-lg font-medium text-white mb-6">Manage Categories</h3>

      {/* Add new category */}
      <div className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="bg-[#0f172a] text-white flex-1 px-4 py-2 rounded-l-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
          />
          <button
            onClick={handleAddCategory}
            className="bg-[#818cf8] text-white px-4 py-2 rounded-r-lg hover:bg-[#6366f1]"
          >
            <FaPlus />
          </button>
        </div>
      </div>

      {/* Categories list */}
      <div className="space-y-2">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-[#0f172a] rounded-lg"
          >
            {editingCategory === category ? (
              <div className="flex-1 flex items-center">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="bg-[#1e293b] text-white flex-1 px-3 py-1 rounded border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
                  autoFocus
                />
                <button
                  onClick={saveEdit}
                  className="ml-2 text-green-400 hover:text-green-300"
                >
                  <FaSave />
                </button>
                <button
                  onClick={cancelEditing}
                  className="ml-2 text-red-400 hover:text-red-300"
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-white">{category.name}</span>
                  <span className="ml-2 text-xs text-[#64748b]">
                    ({category.count} {category.count === 1 ? 'post' : 'posts'})
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEditing(category)}
                    className="text-[#818cf8] hover:text-[#a5b4fc]"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDeleteCategory(category)}
                    disabled={category.count > 0}
                    title={category.count > 0 ? 'Cannot delete category with posts' : 'Delete category'}
                    className={
                      category.count > 0
                        ? 'text-[#64748b] cursor-not-allowed'
                        : 'text-[#f87171] hover:text-[#fca5a5]'
                    }
                  >
                    <FaTrash />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogCategoriesManagement;