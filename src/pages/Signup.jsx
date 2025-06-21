// Update the Signup component to include a recruiter signup link
import React, { useEffect } from 'react';
import SignupForm from '../components/Signup/SignupForm';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserTie } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { isLoggedIn, getCurrentUser } from '../services/authService';

const Signup = () => {
  const isSignupOptionsEnabled = import.meta.env.VITE_ENABLE_SIGNUP_OPTIONS === 'true';
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect to dashboard based on user type
    if (isLoggedIn()) {
      const user = getCurrentUser();
      if (user?.user_type === 'admin') {
        navigate('/dashboard/admin', { replace: true });
      } else if (user?.user_type === 'recruiter') {
        navigate('/dashboard/recruiter', { replace: true });
      } else if (user?.user_type === 'jobseeker') {
        navigate('/dashboard/jobseeker', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [navigate]);

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-200px)]">
        {/* Left Column - Signup Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <SignupForm />
            
            {/* Add recruiter signup link - conditionally rendered */}
            {isSignupOptionsEnabled && (
              <div className="mt-4 flex justify-center items-center bg-[#0f172a] p-3 rounded-lg border border-[#334155]">
                <FaUserTie className="text-[#818cf8] mr-2" />
                <span className="text-[#94a3b8]">Are you hiring? </span>
                <Link to="/recruiter-signup" className="text-[#818cf8] hover:text-[#a5b4fc] font-medium ml-2">
                  Sign up as a recruiter
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Image (visible only on desktop) */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#0f172a] items-center justify-center p-4">
          <div className="max-w-lg">
            <img 
              src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
              alt="Signup" 
              className="rounded-xl shadow-2xl object-cover"
            />
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Start Your Career Journey</h2>
              <p className="text-[#94a3b8]">
                Create an account to access personalized job recommendations and connect with top employers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;