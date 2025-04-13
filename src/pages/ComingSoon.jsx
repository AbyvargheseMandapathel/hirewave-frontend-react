import React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaArrowLeft } from 'react-icons/fa';

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-[#1e293b] rounded-xl shadow-2xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-[#334155] p-4 rounded-full">
            <FaClock className="text-[#818cf8] text-4xl" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">Coming Soon</h1>
        
        <p className="text-[#94a3b8] mb-8">
          We're working hard to bring you this feature. Please check back later!
        </p>
        
        <div className="space-y-4">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] text-white px-6 py-3 rounded-lg hover:from-[#a5b4fc] hover:to-[#818cf8] transition-all duration-300 w-full"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
          
          <Link 
            to="/dashboard" 
            className="inline-flex items-center justify-center bg-[#334155] text-[#94a3b8] px-6 py-3 rounded-lg hover:bg-[#475569] transition-all duration-300 w-full"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;