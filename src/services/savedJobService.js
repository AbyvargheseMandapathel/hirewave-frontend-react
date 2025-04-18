import axios from 'axios';
import { getAuthHeader } from './authService';

const API_URL = import.meta.env.VITE_API_URL || 'https://hirewavebackend-edxfrq215-q1lgmfjl.leapcell.dev/api';

// Get all saved jobs for the current user
export const getSavedJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}/saved-jobs/`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching saved jobs:', error);
    throw error;
  }
};

// Save a job
export const saveJob = async (jobId) => {
  try {
    const response = await axios.post(`${API_URL}/saved-jobs/`, {
      job: jobId
    }, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error saving job:', error);
    throw error;
  }
};

// Remove a saved job
export const removeSavedJob = async (savedJobId) => {
  try {
    const response = await axios.delete(`${API_URL}/saved-jobs/${savedJobId}/`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error removing saved job:', error);
    throw error;
  }
};

// Check if a job is saved
export const isJobSaved = async (jobId) => {
  try {
    const savedJobs = await getSavedJobs();
    return savedJobs.some(savedJob => savedJob.job === jobId);
  } catch (error) {
    console.error('Error checking if job is saved:', error);
    return false;
  }
};

// Check if a job is bookmarked (alias for isJobSaved for compatibility)
export const isJobBookmarked = async (jobId) => {
  return isJobSaved(jobId);
};

// Toggle bookmark status (save/unsave a job)
export const toggleBookmark = async (jobId) => {
  try {
    const response = await axios.post(
      `${API_URL}/jobs/${jobId}/bookmark/`,
      {},
      { headers: getAuthHeader() }
    );
    return {
      is_saved: response.data.status === "added",
      message: response.data.message
    };
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    throw error;
  }
};

export const checkBookmarkStatus = async (jobId) => {
  try {
    const response = await axios.get(
      `${API_URL}/saved-jobs/${jobId}/status/`,
      { headers: getAuthHeader() }
    );
    return response.data.is_saved;
  } catch (error) {
    console.error('Error checking bookmark status:', error);
    return false;
  }
};