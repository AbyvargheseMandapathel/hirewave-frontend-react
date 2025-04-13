import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getToken, clearToken, hasToken } from '../utils/tokenUtils';

// Remove the duplicate storeToken export and keep it only in tokenUtils.js
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
          
          // Fetch user data
          const response = await axios.get('http://localhost:8000/api/users/me/');
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
      
      // Fetch user data
      const response = await axios.get('http://localhost:8000/api/users/me/');
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
      const response = await axios.post('http://localhost:8000/api/auth/login/', credentials);
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