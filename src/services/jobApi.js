import axios from 'axios';

const API_URL = 'https://hirewavebackend-edxfrq215-q1lgmfjl.leapcell.dev/api';

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
    const response = await axios.get(`${API_URL}/jobs/?page=${page}&limit=${limit}`, getAuthConfig());
    return response.data;
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