import axios from 'axios';

const API_URL = 'https://hirewavebackend-edxfrq215-q1lgmfjl.leapcell.dev/api';

// Add auth config helper
const getAuthConfig = () => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
};

// Create axios instance with defaults
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for auth
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('🚀 Making request to:', config.url);
    return config;
  },
  error => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

export const fetchBlogPosts = async () => {
  console.log('📫 Fetching blog posts...');
  try {
    const response = await api.get('/blog/posts/', getAuthConfig());
    console.log('📨 Blog posts received:', response.data);
    return response.data;
  } catch (error) {
    console.error('📭 Failed to fetch blog posts:', error);
    throw error;
  }
};

export const deleteBlogPost = async (postId) => {
  try {
    await api.delete(`/blog/posts/${postId}/`, getAuthConfig());
  } catch (error) {
    console.error(`Error deleting blog post ${postId}:`, error);
    throw error;
  }
};

export const fetchCategoriesApi = async () => {
  try {
    const response = await axios.get(`${API_URL}/blog/categories/`, getAuthConfig());
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(
      `${API_URL}/blog/categories/`, 
      categoryData, 
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get('/blog/categories/', getAuthConfig());
    console.log('📋 Categories fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Failed to fetch categories:', error);
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    await api.delete(`/blog/categories/${categoryId}/`, getAuthConfig());
    console.log('🗑️ Category deleted:', categoryId);
  } catch (error) {
    console.error(`❌ Failed to delete category ${categoryId}:`, error);
    throw error;
  }
};