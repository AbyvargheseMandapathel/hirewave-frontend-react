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
    
    const response = await axios.post(API_URL + 'verify-otp/', { 
      email, 
      otp: otpString 
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log('Login response:', response.data);
    
    // Store tokens consistently in localStorage with both naming conventions
    if (response.data.access) {
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('token', response.data.access); // Add both keys for compatibility
      localStorage.setItem('refreshToken', response.data.refresh);
    } else if (response.data.token) {
      localStorage.setItem('accessToken', response.data.token);
      localStorage.setItem('token', response.data.token);
      if (response.data.refresh) {
        localStorage.setItem('refreshToken', response.data.refresh);
      }
    }
    
    // Set token in axios default headers
    const authToken = response.data.access || response.data.token;
    if (authToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    }
    
    // Make sure user data is complete
    const userData = response.data.user;
    console.log('User data to store:', userData);
    
    // Store the complete user object
    localStorage.setItem('user', JSON.stringify(userData));
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    if (error.response && error.response.data) {
      throw error.response.data;
    } else if (error.error) {
      throw error;
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
    // Try both token formats
    const authToken = localStorage.getItem('accessToken') || localStorage.getItem('token');
    
    const response = await axios.get(API_URL + 'profile/', {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Network error' };
  }
};

// Logout
export const logout = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    // Try both token formats
    const authToken = localStorage.getItem('accessToken') || localStorage.getItem('token');
    
    if (!refreshToken && !authToken) {
      // If no tokens, just clear local storage
      clearAuthStorage();
      return;
    }
    
    // Call the logout API
    const response = await axios.post(`${API_URL}logout/`, 
      { refresh: refreshToken },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      }
    );
    
    // Clear local storage regardless of API response
    clearAuthStorage();
    
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    // Still clear local storage even if API call fails
    clearAuthStorage();
    return false;
  }
};

// Helper function to clear all auth storage
const clearAuthStorage = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  // Also clear from sessionStorage if used
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('accessToken');
  // Remove default auth header
  delete axios.defaults.headers.common['Authorization'];
};

// Check if user is logged in
export const isLoggedIn = () => {
  // Try both token formats
  const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
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
  return localStorage.getItem('accessToken') || localStorage.getItem('token');
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

// Make sure your login function properly stores the token
export const login = async (credentials) => {
    try {
        const response = await axios.post(API_URL + 'login/', credentials);
        
        // Store token in localStorage with both naming conventions
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('accessToken', response.data.token);
            console.log("Token saved:", response.data.token);
            
            // Set the token in axios headers for future requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }
        
        // Store user data if available
        if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        
        return { success: true, user: response.data.user };
    } catch (error) {
        console.error('Login error:', error);
        return { 
            success: false, 
            message: error.response?.data?.detail || 'Login failed. Please try again.' 
        };
    }
};