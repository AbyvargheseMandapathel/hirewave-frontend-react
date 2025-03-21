import React, { useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';
import './Toast.css';

const Toast = ({ type = 'info', message, isOpen, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, duration]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-green-400 text-xl" />;
      case 'error':
        return <FaTimesCircle className="text-red-400 text-xl" />;
      case 'warning':
        return <FaExclamationCircle className="text-yellow-400 text-xl" />;
      case 'info':
      default:
        return <FaInfoCircle className="text-blue-400 text-xl" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success': return 'bg-green-900/50';
      case 'error': return 'bg-red-900/50';
      case 'warning': return 'bg-yellow-900/50';
      case 'info':
      default: return 'bg-blue-900/50';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success': return 'border-green-500';
      case 'error': return 'border-red-500';
      case 'warning': return 'border-yellow-500';
      case 'info':
      default: return 'border-blue-500';
    }
  };

  return (
    <div className="toast-container">
      <div className={`toast ${getBackgroundColor()} ${getBorderColor()}`}>
        <div className="toast-content">
          <div className="toast-icon">
            {getIcon()}
          </div>
          <div className="toast-message">
            {message}
          </div>
          <button 
            onClick={onClose}
            className="toast-close-btn"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;