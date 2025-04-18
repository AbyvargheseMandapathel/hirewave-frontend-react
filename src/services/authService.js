import axios from 'axios';

// Use environment variable for API URL with fallback
const API_URL = import.meta.env.VITE_AUTH_API_URL || 'https://hirewavebackend-edxfrq215-q1lgmfjl.leapcell.dev/api/auth/';

/**
 * Helper function to clear all auth storage
 */
const clearAuthStorage = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('accessToken');
  delete axios.defaults.headers.common['Authorization'];
};

/**
 * Store authentication data consistently
 * @param {Object} data - Response data containing tokens and user info
 */
const storeAuthData = (data) => {
  try {
    // Store tokens
    if (data.access) {
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('token', data.access); // For compatibility
      localStorage.setItem('refreshToken', data.refresh);
    } else if (data.token) {
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('token', data.token);
      if (data.refresh) {
        localStorage.setItem('refreshToken', data.refresh);
      }
    }
    
    // Set token in axios default headers
    const authToken = data.access || data.token;
    if (authToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    }
    
    // Store user data
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }
  } catch (error) {
    console.error('Error storing auth data:', error);
    // Clear any partial data that might have been stored
    clearAuthStorage();
    throw new Error('Failed to store authentication data');
  }
};

/**
 * Create a configured axios instance for auth requests
 */
const authApi = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add response interceptor for consistent error handling
authApi.interceptors.response.use(
  response => response,
  error => {
    console.error('Auth API Error:', error);
    
    // Format error response consistently
    const errorResponse = {
      status: error.response?.status || 500,
      message: error.response?.data?.detail || error.response?.data?.error || error.message || 'Unknown error occurred',
      errors: error.response?.data?.errors || {}
    };
    
    return Promise.reject(errorResponse);
  }
);

/**
 * Request OTP for login
 * @param {string} email - User's email
 * @returns {Promise} - Response from the API
 */
export const requestOTP = async (email) => {
  try {
    const response = await authApi.post('request-otp/', { email });
    return response.data;
  } catch (error) {
    console.error('Request OTP error:', error);
    throw error.message ? error : { error: 'Failed to request OTP. Please try again.' };
  }
};

/**
 * Verify OTP and get tokens
 * @param {string} email - User's email
 * @param {string|Array} otp - OTP code (array or string)
 * @param {string} referralCode - Optional referral code
 * @returns {Promise} - Response from the API with tokens and user data
 */
export const verifyOTP = async (email, otp, referralCode = null) => {
  try {
    // Make sure otp is a string
    const otpString = Array.isArray(otp) ? otp.join('') : otp;
    
    const requestData = { 
      email, 
      otp: otpString 
    };
    
    // Add referral code if provided
    if (referralCode) {
      requestData.referralCode = referralCode;
    }
    
    const response = await authApi.post('verify-otp/', requestData);
    
    // Store auth data
    storeAuthData(response.data);
    
    return response.data;
  } catch (error) {
    console.error('Verify OTP error:', error);
    throw error.message ? error : { error: 'Invalid OTP or verification failed. Please try again.' };
  }
};

/**
 * Resend OTP
 * @param {string} email - User's email
 * @returns {Promise} - Response from the API
 */
export const resendOTP = async (email) => {
  try {
    const response = await authApi.post('resend-otp/', { email });
    return response.data;
  } catch (error) {
    console.error('Resend OTP error:', error);
    throw error.message ? error : { error: 'Failed to resend OTP. Please try again.' };
  }
};

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise} - Response from the API
 */
export const registerUser = async (userData) => {
  try {
    // Ensure referral code is 'NEW' if empty
    if (!userData.referralCode || userData.referralCode.trim() === '') {
      userData.referralCode = 'NEW';
    }
    
    const response = await authApi.post('register/', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error.message ? error : { error: 'Registration failed. Please try again.' };
  }
};

/**
 * Verify email after registration
 * @param {Object} data - Contains email and OTP code
 * @param {string} referralCode - Optional referral code
 * @returns {Promise} - Response from the API with tokens and user data
 */
export const verifyRegistration = async (data, referralCode = null) => {
  try {
    // Add referral code if provided
    if (referralCode) {
      data.referralCode = referralCode;
    }
    
    const response = await authApi.post('verify-otp/', data);
    
    // Store auth data
    storeAuthData(response.data);
    
    return response.data;
  } catch (error) {
    console.error('Verification error:', error);
    throw error.message ? error : { error: 'Verification failed. Please try again.' };
  }
};

/**
 * Login with credentials - Using OTP flow since direct login endpoint doesn't exist
 * @param {Object} credentials - User credentials
 * @returns {Promise} - Response with success status and user data
 */
export const login = async (credentials) => {
  try {
    // Use the OTP flow instead of direct login
    await requestOTP(credentials.email);
    
    return { 
      success: true, 
      message: 'OTP sent successfully. Please check your email for verification code.',
      email: credentials.email,
      requiresOTP: true
    };
  } catch (error) {
    console.error('Login error:', error);
    return { 
      success: false, 
      message: error.message || 'Login failed. Please try again.' 
    };
  }
};

/**
 * Get user profile
 * @returns {Promise} - Response with user profile data
 */
export const getUserProfile = async () => {
  try {
    const authToken = getToken();
    
    if (!authToken) {
      throw { error: 'Not authenticated' };
    }
    
    const response = await authApi.get('profile/', {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Get profile error:', error);
    throw error.message ? error : { error: 'Failed to fetch user profile.' };
  }
};

/**
 * Logout user
 * @returns {Promise<boolean>} - Success status
 */
export const logout = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const authToken = getToken();
    
    if (!refreshToken && !authToken) {
      clearAuthStorage();
      return true;
    }
    
    // Call the logout API
    await authApi.post('logout/', 
      { refresh: refreshToken },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      }
    );
    
    clearAuthStorage();
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    // Even if the API call fails, clear local storage
    clearAuthStorage();
    return false;
  }
};

/**
 * Check if user is logged in
 * @returns {boolean} - Login status
 */
export const isLoggedIn = () => {
  const token = getToken();
  const user = localStorage.getItem('user');
  
  if (!token || !user) {
    return false;
  }
  
  // Check if token is expired
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = payload.exp < Date.now() / 1000;
    
    if (isExpired) {
      clearAuthStorage();
      return false;
    }
  } catch (e) {
    console.error('Error parsing token:', e);
    clearAuthStorage();
    return false;
  }
  
  return true;
};

/**
 * Get current user
 * @returns {Object|null} - User data or null
 */
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (e) {
    console.error('Error getting current user:', e);
    return null;
  }
};

/**
 * Get access token for API requests
 * @returns {string|null} - Access token or null
 */
export const getToken = () => {
  return localStorage.getItem('accessToken') || localStorage.getItem('token');
};

/**
 * Get authorization header for API requests
 * @returns {Object} - Header object with Authorization
 */
export const getAuthHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Get user's referral code
 * @returns {string|null} - User's referral code or null
 */
export const getUserReferralCode = () => {
  try {
    const user = getCurrentUser();
    return user?.referral_code || null;
  } catch (e) {
    console.error('Error getting referral code:', e);
    return null;
  }
};

/**
 * Refresh the access token using the refresh token
 * @returns {Promise<boolean>} - Success status
 */
export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      return false;
    }
    
    const response = await authApi.post('token/refresh/', { refresh: refreshToken });
    
    if (response.data.access) {
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('token', response.data.access);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Token refresh error:', error);
    clearAuthStorage();
    return false;
  }
};