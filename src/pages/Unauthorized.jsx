import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f172a] p-4">
      <div className="bg-[#1e293b] rounded-xl shadow-2xl p-8 max-w-md w-full border border-[#334155]">
        <div className="flex justify-center mb-6">
          <FaExclamationTriangle className="text-yellow-500 text-6xl" />
        </div>
        
        <h1 className="text-3xl font-bold text-white text-center mb-4">Access Denied</h1>
        
        <p className="text-[#94a3b8] text-center mb-8">
          You don't have permission to access this page. This area is restricted to administrators only.
        </p>
        
        <div className="flex justify-center">
          <Link 
            to="/" 
            className="flex items-center justify-center bg-[#334155] hover:bg-[#475569] text-white py-3 px-6 rounded-lg transition duration-300"
          >
            <FaHome className="mr-2" />
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;