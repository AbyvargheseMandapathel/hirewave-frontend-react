import React, { useState, useContext, useEffect } from 'react';
import { FaSave, FaImage, FaTimes, FaPlus, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import SimpleRichTextEditor from '../../components/SimpleRichTextEditor/SimpleRichTextEditor';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { getToken } from '../../utils/tokenUtils';
import { fetchCategoriesApi } from '../../services/blogApi';
import CategoryManager from './CategoryManager';

const BlogPostEditor = ({ post, onSave, onCancel }) => {
  const navigate = useNavigate();
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
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const { isAuthenticated, loading: authLoading, checkAuthStatus } = useContext(AuthContext);
  const [isTokenAvailable, setIsTokenAvailable] = useState(false);
  const accessToken = localStorage.getItem('accessToken');
  const [categories, setCategories] = useState([]);

  // Check authentication status and token availability
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchCategoriesApi();
        // Make sure we're handling the response format correctly
        const categoriesArray = Array.isArray(response) ? response : response.results || [];
        setCategories(categoriesArray);
        console.log('Categories loaded:', categoriesArray);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setApiError('Failed to load categories');
        setCategories([]); // Set empty array as fallback
      } finally {
        setLoadingCategories(false);
      }
    };
  
    const verifyAuth = async () => {
      if (!authLoading) {
        const hasValidToken = accessToken;
        setIsTokenAvailable(hasValidToken);
  
        if (!isAuthenticated || !hasValidToken) {
          const authValid = await checkAuthStatus();
          if (!authValid) {
            alert('Session expired. Please log in again.');
            onCancel();
          }
        }
      }
    };
  
    loadCategories();
    verifyAuth();
  }, [authLoading, isAuthenticated, checkAuthStatus, onCancel, accessToken]); 
    

  /// Add a handler for selecting a category from the CategoryManager
  const handleCategorySelect = (categoryId) => {
    console.log('Category selected:', categoryId);
    const category = categories.find(cat => cat.id === categoryId);
    if (category) {
      console.log('Found category:', category);
      setFormData(prev => ({
        ...prev,
        category: category.name
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleEditorChange = (content) => {
    setFormData(prev => ({
      ...prev,
      content: content
    }));
    if (errors.content) setErrors(prev => ({ ...prev, content: '' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be less than 2MB.');
      return;
    }

    setFormData(prev => ({
      ...prev,
      featuredImage: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setApiError('');

    try {
      // Final authentication check
      const authValid = await checkAuthStatus();
      if (!authValid || !isTokenAvailable) {
        alert('Session expired. Please log in again.');
        return;
      }

      const accessToken = getToken();
      if (!accessToken) {
        alert('Authentication token not found. Please log in again.');
        return;
      }

      const formPayload = new FormData();
      formPayload.append('title', formData.title);
      formPayload.append('content', formData.content);
      formPayload.append('status', formData.status.toLowerCase());
      formPayload.append('featured', formData.featured);
      
      if (formData.status === 'Scheduled' && formData.publishDate) {
        formPayload.append('publish_date', formData.publishDate);
      }

      // Find the category ID based on the selected category name
      if (formData.category) {
        const selectedCategory = categories.find(cat => cat.name === formData.category);
        if (selectedCategory) {
          formPayload.append('category_id', selectedCategory.id);
          console.log('Sending category ID:', selectedCategory.id);
        } else {
          console.warn('Selected category not found in categories list:', formData.category);
        }
      }

      // Add tags
      if (formData.tags && formData.tags.length > 0) {
        formData.tags.forEach(tag => {
          formPayload.append('tags', tag);
        });
      }

      // Add featured image if it's a File object
      if (formData.featuredImage instanceof File) {
        formPayload.append('featured_image', formData.featuredImage);
      }

      console.log('Form payload:', Object.fromEntries(formPayload.entries()));

      const API_URL = import.meta.env.VITE_API_URL || 'https://hirewavebackend-edxfrq215-q1lgmfjl.leapcell.dev/api';
      const url = post 
        ? `${API_URL}/blog/posts/${post.slug}/`
        : `${API_URL}/blog/posts/`;

      const method = post ? 'put' : 'post';

      const response = await axios({
        method,
        url,
        data: formPayload,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      // Call the onSave callback
      onSave(response.data);
      
      // Redirect to the blog post page
      if (response.data.slug) {
        // Wait a moment to ensure the blog post is fully processed
        setTimeout(() => {
          navigate(`/blog/${response.data.slug}`);
        }, 500);
      } else {
        console.warn('Blog post created but no slug was returned');
        // Fallback to blog listing
        navigate('/');
      }

    } catch (error) {
      console.error('Submission error:', error);
      const errorMessage = error.response?.data?.detail || 
                         error.response?.data?.message || 
                         error.message || 
                         'Failed to save post';
      
      setApiError(errorMessage);
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        alert('Authentication failed. Please log in again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
        <div className="text-white text-center py-8">Verifying authentication...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
      <h3 className="text-xl font-medium text-white mb-6">
        {post ? 'Edit Post' : 'Create New Post'}
      </h3>

      {apiError && (
        <div className="mb-4 p-3 bg-red-500 text-white rounded-lg">
          Error: {apiError}
        </div>
      )}

      
  <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title field */}
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
            disabled={submitting}
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
                  src={
                    formData.featuredImage instanceof File
                      ? URL.createObjectURL(formData.featuredImage)
                      : formData.featuredImage
                  }
                  alt="Featured preview"
                  className="w-32 h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => !submitting && setFormData(prev => ({...prev, featuredImage: null}))}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  disabled={submitting}
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ) : (
              <div className="w-32 h-24 bg-[#0f172a] border border-[#334155] rounded-lg flex items-center justify-center">
                <label htmlFor="featuredImage" className={`cursor-pointer ${submitting ? 'text-[#64748b]' : 'text-[#94a3b8] hover:text-white'}`}>
                  <FaImage size={24} />
                  <input
                    type="file"
                    id="featuredImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={submitting}
                  />
                </label>
              </div>
            )}
            <div className="text-[#94a3b8] text-sm">
              Upload a high-quality image (max 2MB)
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Content
          </label>
          <SimpleRichTextEditor
            value={formData.content}
            onChange={handleEditorChange}
            placeholder="Write your post content here..."
            disabled={submitting}
          />
        </div>

        {/* Category Manager */}
        <CategoryManager 
          onSelectCategory={handleCategorySelect}
          selectedCategory={formData.category ? 
            categories.find(cat => cat.name === formData.category)?.id : null}
        />

        {/* Category and Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category */}
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
              disabled={submitting || loadingCategories}
            >
              <option value="">Select category</option>
              {categories && categories.length > 0 && categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Status */}
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
              disabled={submitting}
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Scheduled">Scheduled</option>
            </select>
          </div>
        </div>

        {/* Publish Date */}
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
                required
                disabled={submitting}
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
                  onClick={() => !submitting && handleRemoveTag(tag)}
                  className="ml-2 text-[#64748b] hover:text-[#f87171]"
                  disabled={submitting}
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
              onKeyPress={(e) => !submitting && e.key === 'Enter' && (e.preventDefault(), handleAddTag(e))}
              disabled={submitting}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className={`bg-[#334155] text-white px-4 py-2 rounded-r-lg ${submitting ? 'opacity-50' : 'hover:bg-[#475569]'}`}
              disabled={submitting}
            >
              <FaPlus />
            </button>
          </div>
          <p className="text-[#64748b] text-xs mt-1">
            Press Enter or click + to add tags
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
            disabled={submitting}
          />
          <label htmlFor="featured" className="ml-2 text-sm text-[#94a3b8]">
            Feature this post on the homepage
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-4 border-t border-[#334155]">
          <Button 
            type="button" 
            onClick={onCancel}
            className="bg-[#0f172a] text-[#94a3b8] border border-[#334155] hover:bg-[#1e293b]"
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="flex items-center"
            disabled={authLoading || submitting}
          >
            <FaSave className="mr-2" />
            {submitting 
              ? 'Saving...' 
              : formData.status === 'Draft' 
                ? 'Save Draft' 
                : formData.status === 'Scheduled' 
                  ? 'Schedule Post' 
                  : 'Publish Post'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogPostEditor;