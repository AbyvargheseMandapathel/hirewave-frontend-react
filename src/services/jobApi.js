import axios from 'axios';

const API_URL = 'https://api.hirewave.online/api';

const getAuthConfig = () => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
};

export const fetchJobs = async (page = 1, limit = 6) => {
  try {
    console.log(`Fetching jobs for page ${page}`);
    const response = await axios.get(
      `${API_URL}/jobs/?page=${page}&limit=${limit}`, 
      getAuthConfig()
    );
    return {
      results: response.data.results,
      count: response.data.count,
      next: response.data.next,
      previous: response.data.previous,
      currentPage: page
    };
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const fetchDashboardJobs = async (page = 1, limit = 1000) => {
  try {
    console.log(`Fetching jobs for page ${page}`);
    const response = await axios.get(
      `${API_URL}/jobs/?page=${page}&limit=${limit}`, 
      getAuthConfig()
    );
    return {
      results: response.data.results,
      count: response.data.count,
      next: response.data.next,
      previous: response.data.previous,
      currentPage: page
    };
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const updateJob = async (jobId, jobData) => {
  try {
    const response = await axios.put(`${API_URL}/jobs/${jobId}/`, jobData, getAuthConfig());
    return response.data;
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
};

// Add deleteJob function
export const deleteJob = async (id) => {
  try {
    await axios.delete(`${API_URL}/jobs/${id}/`, getAuthConfig());
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
};