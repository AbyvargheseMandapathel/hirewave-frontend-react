import axios from 'axios';
import { getAuthHeader } from './authService';
import { getSavedJobs } from './savedJobService';

// Configuration
const API_URL = import.meta.env.VITE_AUTH_API_URL || 'https://api.hirewave.online/api/auth/';
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

// Admin Dashboard Service
export const adminDashboardService = {
  getStats: async function() {
    try {
      console.log('Calling admin stats endpoint...');
      const { data } = await apiClient.get('dashboard/admin/stats/');
      console.log('Admin stats response:', data);
      return {
        total_jobs: data.total_jobs || 0,
        total_users: data.total_users || 0,
        unique_visitors: data.unique_visitors || 0,
        last_updated: data.last_updated || new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to fetch admin stats:', error);
      throw error;
    }
  },

  getJobsStats: async function() {
    try {
      const { data } = await apiClient.get('dashboard/admin/stats/');
      return data;
    } catch (error) {
      console.error('Failed to fetch job stats:', error);
      throw error;
    }
  },

  getActivityLog: async function(page = 1, limit = 10) {
    try {
      const { data } = await apiClient.get('dashboard/admin/activity-log/', {
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
      const { data } = await apiClient.get('dashboard/jobseeker/stats/');
      return data;
    } catch (error) {
      console.error('Failed to fetch jobseeker stats:', error);
      throw error;
    }
  },
  
  getApplicationStats: async function() {
    try {
      const { data } = await apiClient.get('dashboard/jobseeker/application-stats/');
      return data;
    } catch (error) {
      console.error('Failed to fetch application stats:', error);
      throw error;
    }
  },
  
  getRecentJobs: async function(limit = 5) {
    try {
      const { data } = await apiClient.get('dashboard/jobseeker/recent-jobs/', {
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
    const { data } = await apiClient.get('dashboard/jobseeker/stats/');
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
    const { data } = await apiClient.get('dashboard/jobseeker/saved-jobs/');
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
      const { data } = await apiClient.get('dashboard/recruiter/stats/');
      return data;
    } catch (error) {
      console.error('Failed to fetch recruiter stats:', error);
      throw error;
    }
  },
  
  getJobStats: async function() {
    try {
      const { data } = await apiClient.get('dashboard/recruiter/job-stats/');
      return data;
    } catch (error) {
      console.error('Failed to fetch job stats:', error);
      throw error;
    }
  },
  
  getRecentApplications: async function(limit = 5) {
    try {
      const { data } = await apiClient.get('dashboard/recruiter/recent-applications/', {
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