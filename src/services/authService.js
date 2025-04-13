import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth/';

// Request OTP for login
export const requestOTP = async (email) => {
  try {
    const response = await axios.post(API_URL + 'request-otp/', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Network error' };
  }
};

// Verify OTP and get tokens
export const verifyOTP = async (email, otp) => {
  try {
    // Make sure otp is an array before joining
    const otpString = Array.isArray(otp) ? otp.join('') : otp;
    
    console.log('Sending OTP to backend:', { email, otp: otpString });
    
    // The API endpoint might be expecting a different format or additional headers
    const response = await axios.post(API_URL + 'verify-otp/', { 
      email, 
      otp: otpString 
    }, {
      headers: {
        'Content-Type': 'application/json',
        // Add any other required headers here
      }
    });
    
    console.log('Login response:', response.data); // Debug the response
    
    // Store tokens in localStorage
    localStorage.setItem('accessToken', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    
    // Make sure user data is complete
    const userData = response.data.user;
    console.log('User data to store:', userData); // Debug the user data
    
    // Store the complete user object
    localStorage.setItem('user', JSON.stringify(userData));
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    if (error.response && error.response.data) {
      throw error.response.data;
    } else if (error.error) {
      throw error; // Client-side validation error
    } else {
      throw { error: 'Network error or server not responding' };
    }
  }
};

// Resend OTP
export const resendOTP = async (email) => {
  try {
    const response = await axios.post(API_URL + 'resend-otp/', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Network error' };
  }
};

// Get user profile
export const getUserProfile = async () => {
  try {
    const response = await axios.get(API_URL + 'profile/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Network error' };
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

// Check if user is logged in
export const isLoggedIn = () => {
  const token = localStorage.getItem('accessToken');
  const user = localStorage.getItem('user');
  
  console.log('isLoggedIn check:', { hasToken: !!token, hasUser: !!user });
  
  if (!token || !user) {
    return false;
  }
  
  // Optional: Check if token is expired
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = payload.exp < Date.now() / 1000;
    console.log('Token expiration check:', { exp: payload.exp, now: Date.now() / 1000, isExpired });
    
    if (isExpired) {
      // Token is expired
      return false;
    }
  } catch (e) {
    console.error('Error parsing token:', e);
    return false;
  }
  
  return true;
};

// Get current user
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;
    console.log('getCurrentUser:', parsedUser);
    return parsedUser;
  } catch (e) {
    console.error('Error getting current user:', e);
    return null;
  }
};

// Get access token for API requests
export const getToken = () => {
  return localStorage.getItem('accessToken');
};

// Add this function to get the authorization header
export const getAuthHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Register new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'register/', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Network error' };
  }
};