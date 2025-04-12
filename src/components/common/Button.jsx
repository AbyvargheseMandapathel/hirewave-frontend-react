import React from 'react';

const Button = ({ 
  children, 
  type = 'button', 
  className = '', 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  onClick,
  ...props 
}) => {
  const baseClasses = 'rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-[#818cf8] hover:bg-[#6366f1] text-white focus:ring-[#818cf8]',
    secondary: 'bg-[#334155] hover:bg-[#475569] text-white focus:ring-[#334155]',
    outline: 'bg-transparent border border-[#334155] text-[#94a3b8] hover:bg-[#1e293b] focus:ring-[#334155]',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
  };
  
  const sizeClasses = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2.5 px-4',
    lg: 'py-3 px-6 text-lg',
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;
  
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;