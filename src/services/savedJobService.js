import axios from 'axios';
import { getAuthHeader } from './authService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

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
    // First check if the job is already saved
    const savedJobs = await getSavedJobs();
    const existingSavedJob = savedJobs.find(savedJob => 
      savedJob.job === jobId || 
      (savedJob.job_details && savedJob.job_details.id === jobId)
    );
    
    if (existingSavedJob) {
      // If job is already saved, remove it
      await removeSavedJob(existingSavedJob.id);
      return { saved: false, message: 'Job removed from saved jobs' };
    } else {
      // If job is not saved, save it
      const result = await saveJob(jobId);
      return { saved: true, message: 'Job saved successfully', data: result };
    }
  } catch (error) {
    console.error('Error toggling bookmark status:', error);
    throw error;
  }
};