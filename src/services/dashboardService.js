import axios from 'axios';
import { getAuthHeader } from './authService';
import { getSavedJobs } from './savedJobService';

const API_URL = import.meta.env.VITE_API_URL || 'https://hirewavebackend-edxfrq215-q1lgmfjl.leapcell.dev/api';

// Create a configured axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor to include auth headers
apiClient.interceptors.request.use(config => {
  const authHeader = getAuthHeader();
  if (authHeader) {
    config.headers = {
      ...config.headers,
      ...authHeader
    };
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(response => response, error => {
  if (error.response) {
    // Server responded with a status code outside 2xx range
    console.error('API Error:', error.response.status, error.response.data);
  } else if (error.request) {
    // Request was made but no response received
    console.error('Network Error:', error.request);
  } else {
    // Something happened in setting up the request
    console.error('Request Error:', error.message);
  }
  return Promise.reject(error);
});

// Admin Dashboard API Services
export const getAdminDashboardStats = async () => {
  try {
    const response = await apiClient.get('/admin/dashboard/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching admin dashboard stats:', error);
    throw new Error('Failed to fetch admin dashboard stats');
  }
};

export const getAdminJobsStats = async () => {
  try {
    const response = await apiClient.get('/admin/dashboard/jobs');
    return response.data;
  } catch (error) {
    console.error('Error fetching admin jobs stats:', error);
    throw new Error('Failed to fetch admin jobs stats');
  }
};

export const getAdminUsersStats = async () => {
  try {
    const response = await apiClient.get('/admin/dashboard/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching admin users stats:', error);
    throw new Error('Failed to fetch admin users stats');
  }
};

export const getAdminActivityLog = async (page = 1, limit = 10) => {
  try {
    const response = await apiClient.get('/admin/dashboard/activity-log', {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching admin activity log:', error);
    throw new Error('Failed to fetch admin activity log');
  }
};

// Jobseeker Dashboard API Services
export const getJobseekerDashboardStats = async () => {
  try {
    const savedJobsResponse = await getSavedJobs();
    const savedJobsCount = savedJobsResponse?.length || 0;
    
    return {
      savedJobsCount,
      appliedJobsCount: 0,
      interviewsCount: 0,
      upcomingCount: 0
    };
  } catch (error) {
    console.error('Error fetching jobseeker dashboard stats:', error);
    return {
      savedJobsCount: 0,
      appliedJobsCount: 0,
      interviewsCount: 0,
      upcomingCount: 0
    };
  }
};

export const getJobseekerApplications = async (page = 1, limit = 10) => {
  try {
    // TODO: Implement actual API call when backend is ready
    return {
      results: [],
      count: 0,
      message: 'Feature coming soon'
    };
  } catch (error) {
    console.error('Error fetching jobseeker applications:', error);
    throw new Error('Failed to fetch job applications');
  }
};

export const getJobseekerSavedJobs = async (page = 1, limit = 10) => {
  try {
    const response = await getSavedJobs();
    return {
      results: response || [],
      count: response?.length || 0
    };
  } catch (error) {
    console.error('Error fetching jobseeker saved jobs:', error);
    throw new Error('Failed to fetch saved jobs');
  }
};

export const getJobseekerInterviews = async (page = 1, limit = 10) => {
  try {
    // TODO: Implement actual API call when backend is ready
    return {
      results: [],
      count: 0,
      message: 'Feature coming soon'
    };
  } catch (error) {
    console.error('Error fetching jobseeker interviews:', error);
    throw new Error('Failed to fetch interviews');
  }
};

export const getRecommendedJobs = async (page = 1, limit = 10) => {
  try {
    
    return {
      results: [],
      count: 0,
      message: 'Feature coming soon'
    };
  } catch (error) {
    console.error('Error fetching recommended jobs:', error);
    throw new Error('Failed to fetch recommended jobs');
  }
};