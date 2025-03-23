import React, { useState } from 'react';
import { FaSave, FaImage, FaTimes, FaPlus, FaCalendarAlt } from 'react-icons/fa';
import Button from '../common/Button';

const BlogPostEditor = ({ post, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    category: post?.category || '',
    status: post?.status || 'Draft',
    featured: post?.featured || false,
    publishDate: post?.publishDate || '',
    tags: post?.tags || [],
    featuredImage: post?.featuredImage || null
  });
  
  const [newTag, setNewTag] = useState('');
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };
  
  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          featuredImage: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
      <h3 className="text-xl font-medium text-white mb-6">
        {post ? 'Edit Post' : 'Create New Post'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
            Post Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title"
            className="bg-[#0f172a] text-white w-full px-4 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
            required
          />
        </div>
        
        {/* Featured Image */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Featured Image
          </label>
          <div className="flex items-center space-x-4">
            {formData.featuredImage ? (
              <div className="relative">
                <img 
                  src={formData.featuredImage} 
                  alt="Featured" 
                  className="w-32 h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setFormData({...formData, featuredImage: null})}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ) : (
              <div className="w-32 h-24 bg-[#0f172a] border border-[#334155] rounded-lg flex items-center justify-center">
                <label htmlFor="featuredImage" className="cursor-pointer text-[#94a3b8] hover:text-white">
                  <FaImage size={24} />
                  <input
                    type="file"
                    id="featuredImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            )}
            <div className="text-[#94a3b8] text-sm">
              Upload a high-quality image to make your post stand out
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-white mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={10}
            placeholder="Write your post content here..."
            className="bg-[#0f172a] text-white w-full px-4 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
            required
          />
        </div>
        
        {/* Category and Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-white mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="bg-[#0f172a] text-white w-full px-4 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
              required
            >
              <option value="">Select category</option>
              <option value="Career Advice">Career Advice</option>
              <option value="Resume Tips">Resume Tips</option>
              <option value="Workplace">Workplace</option>
              <option value="Technology">Technology</option>
              <option value="Social Media">Social Media</option>
              <option value="Job Search">Job Search</option>
              <option value="Interview Tips">Interview Tips</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-white mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="bg-[#0f172a] text-white w-full px-4 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Scheduled">Scheduled</option>
            </select>
          </div>
        </div>
        
        {/* Publish Date (visible only for Scheduled status) */}
        {formData.status === 'Scheduled' && (
          <div>
            <label htmlFor="publishDate" className="block text-sm font-medium text-white mb-2">
              Publish Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendarAlt className="text-[#94a3b8]" />
              </div>
              <input
                type="datetime-local"
                id="publishDate"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleChange}
                className="bg-[#0f172a] text-white w-full pl-10 pr-4 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
                required={formData.status === 'Scheduled'}
              />
            </div>
          </div>
        )}
        
        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map((tag, index) => (
              <div 
                key={index} 
                className="bg-[#0f172a] text-[#94a3b8] px-3 py-1 rounded-full flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-[#64748b] hover:text-[#f87171]"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag"
              className="bg-[#0f172a] text-white flex-1 px-4 py-2 rounded-l-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-[#334155] text-white px-4 py-2 rounded-r-lg hover:bg-[#475569]"
            >
              <FaPlus />
            </button>
          </div>
          <p className="text-[#64748b] text-xs mt-1">
            Press Enter or click the plus icon to add a tag
          </p>
        </div>
        
        {/* Featured Post */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="w-4 h-4 bg-[#0f172a] border border-[#334155] rounded focus:ring-[#818cf8] focus:ring-2"
          />
          <label htmlFor="featured" className="ml-2 text-sm text-[#94a3b8]">
            Feature this post (will be displayed prominently on the blog homepage)
          </label>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-4 border-t border-[#334155]">
          <Button 
            type="button" 
            onClick={onCancel}
            className="bg-[#0f172a] text-[#94a3b8] border border-[#334155] hover:bg-[#1e293b]"
          >
            Cancel
          </Button>
          <Button type="submit" className="flex items-center">
            <FaSave className="mr-2" />
            {formData.status === 'Draft' ? 'Save Draft' : 
             formData.status === 'Scheduled' ? 'Schedule Post' : 'Publish Post'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogPostEditor;