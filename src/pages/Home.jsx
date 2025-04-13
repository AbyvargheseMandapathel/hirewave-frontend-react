import React, { useState, useEffect, useRef, useCallback } from 'react';
import HeroHeading from '../components/HeroHeading/HeroHeading';
import JobsGrid from '../components/JobsGrid/JobsGrid';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';
import { getJobs } from '../services/jobService';
import { FaSpinner } from 'react-icons/fa';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // Create a ref for the observer
  const observer = useRef();
  
  // Last job element ref callback
  const lastJobElementRef = useCallback(node => {
    if (loading) return;
    
    // Disconnect previous observer
    if (observer.current) observer.current.disconnect();
    
    // Create new observer
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    // Observe the last element
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);
  
  // Fetch jobs on initial load and when page changes
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Explicitly set limit to 6 jobs per page
        const data = await getJobs(page, 6);
        
        setJobs(prevJobs => {
          // If it's the first page, replace jobs
          // Otherwise, append new jobs
          return page === 1 ? data.results : [...prevJobs, ...data.results];
        });
        
        setHasMore(data.has_more);
      } catch (err) {
        setError('Failed to load jobs. Please try again later.');
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, [page]);
  
  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a]">
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4">
          <HeroHeading />
          
          {error && (
            <div className="text-red-500 text-center my-8">
              {error}
            </div>
          )}
          
          {jobs.length > 0 ? (
            <div className="my-12">
              <JobsGrid 
                jobs={jobs} 
                lastJobElementRef={lastJobElementRef}
              />
              
              {loading && (
                <div className="flex justify-center my-8">
                  <FaSpinner className="animate-spin text-[#818cf8] text-3xl" />
                </div>
              )}
              
              {!hasMore && jobs.length > 0 && (
                <p className="text-center text-[#94a3b8] my-8">
                  No more jobs to load
                </p>
              )}
            </div>
          ) : !loading ? (
            <div className="text-center text-[#94a3b8] my-12">
              No jobs found
            </div>
          ) : (
            <div className="flex justify-center my-12">
              <FaSpinner className="animate-spin text-[#818cf8] text-3xl" />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;