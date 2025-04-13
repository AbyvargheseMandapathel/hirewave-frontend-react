import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:8000/api/';

// Get all saved jobs for the current user
const getSavedJobs = async () => {
  try {
    const token = getToken();
    const headers = { Authorization: `Bearer ${token}` };
    
    const response = await axios.get(`${API_URL}saved-jobs/`, {
      headers
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching saved jobs:', error);
    throw error;
  }
};

// Toggle bookmark status (save/unsave a job)
const toggleBookmark = async (jobId) => {
  try {
    const token = getToken();
    const headers = { Authorization: `Bearer ${token}` };
    
    const response = await axios.post(`${API_URL}jobs/${jobId}/bookmark/`, {}, {
      headers
    });
    return response.data;
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    throw error;
  }
};

// Check if a job is bookmarked
const isJobBookmarked = async (jobId) => {
  try {
    const savedJobs = await getSavedJobs();
    return savedJobs.some(savedJob => savedJob.job === parseInt(jobId));
  } catch (error) {
    console.error('Error checking if job is bookmarked:', error);
    return false;
  }
};

export { getSavedJobs, toggleBookmark, isJobBookmarked };