import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isLoggedIn, getCurrentUser } from '../../services/authService';

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = isLoggedIn();
  const currentUser = getCurrentUser();
  
  // Debug output to console
  console.log('Admin Route Check:', {
    isAuthenticated,
    currentUser,
    isSuperuser: currentUser?.is_superuser,
    userType: currentUser?.user_type
  });
  
  // Check if user is authenticated
  if (!isAuthenticated) {
    // Redirect to login with return URL
    return <Navigate to={`/login?returnUrl=${location.pathname}`} replace />;
  }
  
  // Check if user is admin or superuser
  const isAdmin = currentUser?.is_superuser === true || currentUser?.user_type === 'admin';
  
  if (!isAdmin) {
    // User is authenticated but not an admin
    return <Navigate to="/unauthorized" replace />;
  }
  
  // User is authenticated and is an admin
  return children;
};

export default AdminRoute;