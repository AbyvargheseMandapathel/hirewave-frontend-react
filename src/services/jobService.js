import axios from 'axios';

const API_URL = 'http://localhost:8000/api/jobs/';

// Get jobs with pagination for infinite scrolling
const getJobs = async (page = 1, limit = 6, filters = {}) => {
  try {
    // Build query parameters
    const params = new URLSearchParams({
      page,
      limit,
      ...filters
    });
    
    const response = await axios.get(`${API_URL}?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

// Get a single job by ID
const getJobById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching job with ID ${id}:`, error);
    throw error;
  }
};

export { getJobs, getJobById };