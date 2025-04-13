import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer/Footer';
import JobsGrid from '../../components/JobsGrid/JobsGrid';
import { getSavedJobs } from '../../services/savedJobService';
import { isLoggedIn } from '../../services/authService';
import { FaSpinner } from 'react-icons/fa';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        setLoading(true);
        const data = await getSavedJobs();
        // Extract job details from saved jobs
        const jobs = data.map(savedJob => savedJob.job_details);
        setSavedJobs(jobs);
      } catch (err) {
        console.error('Error fetching saved jobs:', err);
        setError('Failed to load saved jobs');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSavedJobs();
  }, []);
  
  // Redirect to login if not logged in
  if (!isLoggedIn()) {
    return <Navigate to="/login?returnUrl=/saved-jobs" />;
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a]">
      <Navbar />
      <main className="flex-grow pt-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Saved Jobs</h1>
        
        {loading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <FaSpinner className="animate-spin text-[#818cf8] text-4xl" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center my-8">
            <p>{error}</p>
          </div>
        ) : savedJobs.length === 0 ? (
          <div className="text-center text-[#94a3b8] my-16">
            <p className="text-xl mb-4">You haven't saved any jobs yet</p>
            <p>When you find a job you like, click the bookmark icon to save it for later.</p>
          </div>
        ) : (
          <JobsGrid jobs={savedJobs} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SavedJobs;