import axios from 'axios';
import { getAuthHeader } from './authService';

// Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const DEFAULT_TIMEOUT = 10000;

// Axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json' }
});

// Request interceptor
apiClient.interceptors.request.use(config => {
  const authHeader = getAuthHeader();
  if (authHeader) config.headers = { ...config.headers, ...authHeader };
  return config;
}, error => Promise.reject(error));

// Response interceptor
apiClient.interceptors.response.use(
  response => response,
  error => {
    const errorMessage = error.response?.data?.message || error.message || 'Request failed';
    console.error(`API Error: ${errorMessage}`, error.response || error);
    return Promise.reject(new Error(errorMessage));
  }
);

// Blog Service
export const blogService = {
  // Get all blog posts with optional filtering
  getPosts: async function(params = {}) {
    try {
      const { data } = await apiClient.get('/blog/posts/', { params });
      return data;
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
      throw error;
    }
  },
  
  // Get a single blog post by ID or slug
  getPost: async function(idOrSlug) {
    try {
      const { data } = await apiClient.get(`/blog/posts/${idOrSlug}/`);
      return data;
    } catch (error) {
      console.error(`Failed to fetch blog post ${idOrSlug}:`, error);
      throw error;
    }
  },
  
  // Create a new blog post
  createPost: async function(postData) {
    try {
      const { data } = await apiClient.post('/blog/posts/', postData);
      return data;
    } catch (error) {
      console.error('Failed to create blog post:', error);
      throw error;
    }
  },
  
  // Update an existing blog post
  updatePost: async function(idOrSlug, postData) {
    try {
      const { data } = await apiClient.put(`/blog/posts/${idOrSlug}/`, postData);
      return data;
    } catch (error) {
      console.error(`Failed to update blog post ${idOrSlug}:`, error);
      throw error;
    }
  },
  
  // Delete a blog post
  deletePost: async function(idOrSlug) {
    try {
      await apiClient.delete(`/blog/posts/${idOrSlug}/`);
      return true;
    } catch (error) {
      console.error(`Failed to delete blog post ${idOrSlug}:`, error);
      throw error;
    }
  },
  
  // Get comments for a blog post
  getComments: async function(postId) {
    try {
      const { data } = await apiClient.get('/blog/comments/', {
        params: { post: postId }
      });
      return data;
    } catch (error) {
      console.error(`Failed to fetch comments for post ${postId}:`, error);
      throw error;
    }
  },
  
  // Create a new comment
  createComment: async function(commentData) {
    try {
      const { data } = await apiClient.post('/blog/comments/', commentData);
      return data;
    } catch (error) {
      console.error('Failed to create comment:', error);
      throw error;
    }
  },
  
  // Get all categories
  getCategories: async function() {
    try {
      const { data } = await apiClient.get('/blog/categories/');
      return data;
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      throw error;
    }
  }
};

export default blogService;