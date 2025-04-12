import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser, isLoggedIn } from '../services/authService';

const DashboardRouter = () => {
  // Check if user is logged in
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  // Get current user
  const user = getCurrentUser();
  
  // Redirect based on user type
  if (user) {
    switch (user.user_type) {
      case 'admin':
        return <Navigate to="/dashboard/admin" replace />;
      case 'recruiter':
        return <Navigate to="/dashboard/recruiter" replace />;
      case 'jobseeker':
        return <Navigate to="/dashboard/jobseeker" replace />;
      default:
        // Default to home page if user type is unknown
        return <Navigate to="/" replace />;
    }
  }

  // Fallback to home page
  return <Navigate to="/" replace />;
};

export default DashboardRouter;