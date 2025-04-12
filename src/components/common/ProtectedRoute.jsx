import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn, getCurrentUser } from '../../services/authService';

const ProtectedRoute = ({ 
  allowedUserTypes = null, 
  redirectPath = '/login',
  children 
}) => {
  const isAuthenticated = isLoggedIn();
  const currentUser = getCurrentUser();
  
  // Debug output to console
  console.log('Protected Route Check:', {
    isAuthenticated,
    currentUser,
    allowedUserTypes,
    isSuperuser: currentUser?.is_superuser
  });
  
  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  
  // If allowedUserTypes is specified, check if user has the required type
  if (allowedUserTypes && currentUser) {
    // Allow superusers to access any protected route
    if (currentUser.is_superuser === true) {
      console.log('Superuser access granted');
      // Superusers can access any route
      return children ? children : <Outlet />;
    }
    
    if (!allowedUserTypes.includes(currentUser.user_type)) {
      console.log('User type not allowed:', currentUser.user_type);
      // Redirect to appropriate dashboard based on user type
      if (currentUser.user_type === 'admin') {
        return <Navigate to="/dashboard/admin" replace />;
      } else if (currentUser.user_type === 'recruiter') {
        return <Navigate to="/dashboard/recruiter" replace />;
      } else {
        return <Navigate to="/" replace />;
      }
    }
  }
  
  // If there are children, render them, otherwise render the Outlet
  return children ? children : <Outlet />;
};

export default ProtectedRoute;