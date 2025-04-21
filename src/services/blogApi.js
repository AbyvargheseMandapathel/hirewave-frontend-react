import axios from 'axios';
import { getToken } from '../utils/tokenUtils';

const API_URL = import.meta.env.VITE_API_URL || 'https://hirewavebackend-edxfrq215-q1lgmfjl.leapcell.dev/api';

// Configure axios with authentication
const getAuthConfig = () => {
  const token = getToken();
  return {
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    }
  };
};

// Category endpoints
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

// Blog post endpoints
export const fetchBlogPosts = async (filters = {}) => {
  try {
    const response = await axios.get(`${API_URL}/blog/`, {
      ...getAuthConfig(),
      params: filters
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};

export const fetchBlogPostBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API_URL}/blog/${slug}/`, getAuthConfig());
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    throw error;
  }
};

export const createBlogPost = async (postData) => {
  try {
    const response = await axios.post(
      `${API_URL}/blog/`, 
      postData,
      {
        ...getAuthConfig(),
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
};

export const updateBlogPost = async (postId, postData) => {
  try {
    const response = await axios.put(
      `${API_URL}/blog/${postId}/`, 
      postData,
      {
        ...getAuthConfig(),
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating blog post ${postId}:`, error);
    throw error;
  }
};