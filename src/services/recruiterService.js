import axios from 'axios';
import { getAuthHeader } from './authService';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.hirewave.online/api';

// Recruiter Dashboard API Services
export const getRecruiterDashboardStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/recruiter/dashboard/stats`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recruiter dashboard stats:', error);
    throw error;
  }
};

export const getRecruiterJobs = async (page = 1, limit = 10, filters = {}) => {
  try {
    const response = await axios.get(`${API_URL}/recruiter/jobs`, {
      params: { page, limit, ...filters },
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recruiter jobs:', error);
    throw error;
  }
};

export const getRecruiterCandidates = async (page = 1, limit = 10, filters = {}) => {
  try {
    const response = await axios.get(`${API_URL}/recruiter/candidates`, {
      params: { page, limit, ...filters },
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recruiter candidates:', error);
    throw error;
  }
};

export const getRecruiterInterviews = async (page = 1, limit = 10, filters = {}) => {
  try {
    const response = await axios.get(`${API_URL}/recruiter/interviews`, {
      params: { page, limit, ...filters },
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recruiter interviews:', error);
    throw error;
  }
};

export const getRecruiterApplications = async (page = 1, limit = 10, filters = {}) => {
  try {
    const response = await axios.get(`${API_URL}/recruiter/applications`, {
      params: { page, limit, ...filters },
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recruiter applications:', error);
    throw error;
  }
};

export const updateApplicationStatus = async (applicationId, status) => {
  try {
    const response = await axios.patch(
      `${API_URL}/recruiter/applications/${applicationId}`,
      { status },
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
};

export const scheduleInterview = async (applicationId, interviewData) => {
  try {
    const response = await axios.post(
      `${API_URL}/recruiter/applications/${applicationId}/schedule-interview`,
      interviewData,
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    console.error('Error scheduling interview:', error);
    throw error;
  }
};