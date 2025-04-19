import axios from 'axios';
import { getAuthHeader } from './authService';
import { getSavedJobs } from './savedJobService';

// Configuration
const API_URL = import.meta.env.VITE_API_URL || 'https://hirewavebackend-edxfrq215-q1lgmfjl.leapcell.dev/api';
const DEFAULT_TIMEOUT = 10000;

// Update Axios instance with better auth handling
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json' }
});

// Enhanced request interceptor with token refresh
apiClient.interceptors.request.use(async config => {
  try {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${token}`
    };
    
    return config;
  } catch (error) {
    console.error('Auth configuration error:', error);
    return Promise.reject(error);
  }
}, error => Promise.reject(error));

// Enhanced response interceptor with better error handling
apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 403) {
      console.error('Access forbidden - checking authentication...');
      // Check if user is logged in
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) {
        console.error('No authentication token found');
        throw new Error('Please login to access this resource');
      }
      
      // Check if token is still valid
      try {
        const isValid = await validateToken(token);
        if (!isValid) {
          console.error('Token validation failed');
          // Clear invalid token
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
          throw new Error('Session expired. Please login again.');
        }
      } catch (validationError) {
        console.error('Token validation error:', validationError);
        throw new Error('Authentication error. Please login again.');
      }
    }
    
    const errorMessage = error.response?.data?.message || error.message || 'Request failed';
    console.error(`API Error: ${errorMessage}`, error.response || error);
    return Promise.reject(new Error(errorMessage));
  }
);

// Admin Dashboard Service
export const adminDashboardService = {
  getStats: async function() {
    try {
      // Verify admin access before making request
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user.is_admin) {
        throw new Error('Unauthorized: Admin access required');
      }

      const { data } = await apiClient.get('/auth/dashboard/admin/stats/', {
        headers: {
          'X-Requested-With': 'XMLHttpRequest', 
        }
      });
      
      return {
        total_jobs: data.total_jobs || 0,
        total_users: data.total_users || 0,
        unique_visitors: data.unique_visitors || 0,
        last_updated: data.last_updated || new Date().toISOString()
      };
    } catch (error) {
      // Provide more specific error messages
      if (error.response?.status === 403) {
        throw new Error('You do not have permission to access admin statistics');
      }
      throw error;
    }
  },

  getJobsStats: async function() {
    try {
      const { data } = await apiClient.get('/auth/dashboard/admin/job-stats/');
      return data;
    } catch (error) {
      console.error('Failed to fetch job stats:', error);
      throw error;
    }
  },

  getActivityLog: async function(page = 1, limit = 10) {
    try {
      const { data } = await apiClient.get('/auth/dashboard/admin/activity-log/', {
        params: { page, limit }
      });
      return data.results || [];
    } catch (error) {
      console.error('Failed to fetch activity log:', error);
      return [];
    }
  }
};

// Jobseeker Dashboard Service
export const jobseekerDashboardService = {
  getStats: async function() {
    try {
      const { data } = await apiClient.get('/auth/dashboard/jobseeker/stats/');
      return data;
    } catch (error) {
      console.error('Failed to fetch jobseeker stats:', error);
      throw error;
    }
  },
  
  getApplicationStats: async function() {
    try {
      const { data } = await apiClient.get('/auth/dashboard/jobseeker/application-stats/');
      return data;
    } catch (error) {
      console.error('Failed to fetch application stats:', error);
      throw error;
    }
  },
  
  getRecentJobs: async function(limit = 5) {
    try {
      const { data } = await apiClient.get('/auth/dashboard/jobseeker/recent-jobs/', {
        params: { limit }
      });
      return data.results || [];
    } catch (error) {
      console.error('Failed to fetch recent jobs:', error);
      return [];
    }
  }
};

// Add the missing exports that are being used in JobseekerDashboard and JobseekerSavedJobs
export const getJobseekerDashboardStats = async function() {
  try {
    const { data } = await apiClient.get('/auth/dashboard/jobseeker/stats/');
    return {
      savedJobsCount: data.saved_jobs_count || 0,
      appliedJobsCount: data.applied_jobs_count || 'Coming Soon',
      interviewsCount: data.interviews_count || 'Coming Soon',
      upcomingCount: data.upcoming_count || 'Coming Soon'
    };
  } catch (error) {
    console.error('Failed to fetch jobseeker dashboard stats:', error);
    return {
      savedJobsCount: 0,
      appliedJobsCount: 'Coming Soon',
      interviewsCount: 'Coming Soon',
      upcomingCount: 'Coming Soon'
    };
  }
};

export const getJobseekerSavedJobs = async function() {
  try {
    const { data } = await apiClient.get('/auth/dashboard/jobseeker/saved-jobs/');
    return {
      results: data.results || [],
      count: data.count || 0
    };
  } catch (error) {
    console.error('Failed to fetch saved jobs:', error);
    // Try to use the savedJobService as a fallback
    try {
      const savedJobs = await getSavedJobs();
      return {
        results: savedJobs || [],
        count: savedJobs?.length || 0
      };
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
      return {
        results: [],
        count: 0
      };
    }
  }
};

// Recruiter Dashboard Service
export const recruiterDashboardService = {
  getStats: async function() {
    try {
      const { data } = await apiClient.get('/auth/dashboard/recruiter/stats/');
      return data;
    } catch (error) {
      console.error('Failed to fetch recruiter stats:', error);
      throw error;
    }
  },
  
  getJobStats: async function() {
    try {
      const { data } = await apiClient.get('/auth/dashboard/recruiter/job-stats/');
      return data;
    } catch (error) {
      console.error('Failed to fetch job stats:', error);
      throw error;
    }
  },
  
  getRecentApplications: async function(limit = 5) {
    try {
      const { data } = await apiClient.get('/auth/dashboard/recruiter/recent-applications/', {
        params: { limit }
      });
      return data.results || [];
    } catch (error) {
      console.error('Failed to fetch recent applications:', error);
      return [];
    }
  }
};

export default {
  adminDashboardService,
  jobseekerDashboardService,
  recruiterDashboardService,
  getJobseekerDashboardStats,
  getJobseekerSavedJobs
};