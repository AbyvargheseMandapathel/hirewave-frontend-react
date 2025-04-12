import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { isLoggedIn } from '../../services/authService';

const ProtectedApplyButton = ({ jobId, className, children, ...props }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLoggedIn()) {
      // User is logged in, proceed to application
      navigate(`/apply/${jobId}`);
    } else {
      // User is not logged in, redirect to login with return URL
      navigate(`/login?returnUrl=/apply/${jobId}`);
    }
  };

  return (
    <Button 
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children || "Apply Now"}
    </Button>
  );
};

export default ProtectedApplyButton;