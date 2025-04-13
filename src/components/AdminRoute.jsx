import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();
  
  // First check if we're still loading auth state
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  // Check if user is authenticated
  if (!isAuthenticated) {
    // Redirect to login with return URL
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  // Check if user is admin (first from context, then from localStorage as fallback)
  const isAdmin = user?.is_admin || localStorage.getItem('isAdmin') === 'true';
  
  if (!isAdmin) {
    // User is authenticated but not an admin
    return <Navigate to="/unauthorized" replace />;
  }
  
  // User is authenticated and is an admin
  return children;
};

export default AdminRoute;