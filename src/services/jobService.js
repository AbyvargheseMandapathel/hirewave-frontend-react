import axios from 'axios';

const API_URL = 'https://hirewavebackend-edxfrq215-q1lgmfjl.leapcell.dev/api/jobs/';
// const API_URL = 'http://localhost:8000/api/jobs/';

// Helper function to get token and set headers
const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    // Try session storage as fallback
    const sessionToken = sessionStorage.getItem('token');
    if (sessionToken) {
      localStorage.setItem('token', sessionToken);
      return {
        headers: {
          'Authorization': `Bearer ${sessionToken}`
        }
      };
    }
    throw new Error('Authentication required');
  }
  
  // Set default headers for all future requests
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
};

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

// Update an existing job
const updateJob = async (jobId, jobData) => {
  try {
    const config = getAuthConfig();
    const response = await axios.patch(`${API_URL}${jobId}/`, jobData, config);
    return response.data;
  } catch (error) {
    console.error('Error updating job:', error);
    if (error.response && error.response.data) {
        throw new Error(error.response.data.detail || 'Failed to update job');
    }
    throw error;
  }
};

// Create a new job
const createJob = async (jobData) => {
    try {
        // Ensure token is set in headers
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        
        // Format job type to match backend expectations
        if (jobData.type) {
            // Convert to lowercase and replace spaces with underscores
            // e.g. "Part time" becomes "part_time"
            jobData.type = jobData.type.toLowerCase().replace(/\s+/g, '_');
        }
        
        // Log the request for debugging
        console.log('Creating job with data:', jobData);
        
        // Make the API call
        const response = await axios.post(API_URL, jobData);
        console.log('Job creation response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in createJob:', error);
        
        // Log more details about the error
        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
        }
        
        throw error;
    }
};

export { getJobs, getJobById, createJob, updateJob };