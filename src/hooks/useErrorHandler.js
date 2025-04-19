import { useCallback } from 'react';

/**
 * Custom hook for handling API errors consistently across the application
 * @returns {Object} Error handling utilities
 */
export const useErrorHandler = () => {
  /**
   * Processes an error and returns a user-friendly message
   * @param {Error|Object} error - The error object from an API call
   * @returns {string} A user-friendly error message
   */
  const handleError = useCallback((error) => {
    console.error('Error caught by useErrorHandler:', error);
    
    // Handle axios error responses
    if (error.response) {
      const { status, data } = error.response;
      
      // Authentication errors
      if (status === 401) {
        return 'Your session has expired. Please log in again.';
      }
      
      // Permission errors
      if (status === 403) {
        return 'You do not have permission to access this resource.';
      }
      
      // Not found errors
      if (status === 404) {
        return 'The requested resource was not found.';
      }
      
      // Server validation errors
      if (status === 400 && data) {
        // Try to extract validation error messages
        if (typeof data === 'object' && data !== null) {
          const errorMessages = [];
          
          // Extract error messages from the response
          Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              errorMessages.push(`${key}: ${value.join(', ')}`);
            } else if (typeof value === 'string') {
              errorMessages.push(`${key}: ${value}`);
            }
          });
          
          if (errorMessages.length > 0) {
            return errorMessages.join('\n');
          }
          
          // If there's a general error message
          if (data.message || data.error || data.detail) {
            return data.message || data.error || data.detail;
          }
        }
        
        return 'Invalid data submitted. Please check your inputs.';
      }
      
      // Server errors
      if (status >= 500) {
        return 'The server encountered an error. Please try again later.';
      }
      
      // Other HTTP errors
      return `Error: ${status} - ${data.message || data.error || 'Something went wrong'}`;
    }
    
    // Network errors
    if (error.request) {
      return 'Network error. Please check your internet connection.';
    }
    
    // Other errors
    return error.message || 'An unexpected error occurred. Please try again.';
  }, []);
  
  return { handleError };
};

export default useErrorHandler;