import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getToken, clearToken, hasToken, storeToken } from '../utils/tokenUtils';

// Get API URL from environment variables with fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
// https://hirewavebackend-edxfrq215-q1lgmfjl.leapcell.dev/api
const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:8000/api/auth/';
// https://hirewavebackend-edxfrq215-q1lgmfjl.leapcell.dev/api/auth/

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get token from any available storage
        const token = getToken();
        
        if (token) {
          // Set axios default header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Fetch user data using environment variable
          const response = await axios.get(`${API_URL}/users/me/`);
          setUser(response.data);
          setIsAuthenticated(true);
          console.log("User authenticated:", response.data);
        } else {
          // No token found
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        // Clear invalid tokens
        clearToken();
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Function to manually check auth status - useful for components that need to verify auth
  const checkAuthStatus = async () => {
    try {
      const token = getToken();
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        return false;
      }
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Fetch user data using environment variable
      const response = await axios.get(`${API_URL}/users/me/`);
      setUser(response.data);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Manual auth check failed:", error);
      clearToken();
      setUser(null);
      setIsAuthenticated(false);
      return false;
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      // Use environment variable for auth API URL
      const response = await axios.post(`${AUTH_API_URL}login/`, credentials);
      const { token, user } = response.data;
      
      // Use the imported storeToken from tokenUtils
      storeToken(token);
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return { 
        success: false, 
        message: error.response?.data?.detail || 'Login failed' 
      };
    }
  };

  // Logout function
  const logout = () => {
    clearToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    hasToken: hasToken,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;