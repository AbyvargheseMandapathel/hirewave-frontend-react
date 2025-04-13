import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import { FaBookmark, FaExternalLinkAlt, FaSpinner, FaTrash } from 'react-icons/fa';
import { getJobseekerSavedJobs } from '../../services/dashboardService';
import { removeSavedJob } from '../../services/savedJobService';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

const JobseekerSavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const { results } = await getJobseekerSavedJobs();
        setSavedJobs(results || []);
      } catch (err) {
        console.error('Error fetching saved jobs:', err);
        setError('Failed to load saved jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  const handleRemoveSavedJob = async (savedJobId) => {
    try {
      setRemovingId(savedJobId);
      await removeSavedJob(savedJobId);
      setSavedJobs(prevJobs => prevJobs.filter(job => job.id !== savedJobId));
    } catch (err) {
      console.error('Error removing saved job:', err);
      setError('Failed to remove saved job. Please try again.');
    } finally {
      setRemovingId(null);
    }
  };

  const renderJobCard = (savedJob) => {
    const job = savedJob.job_details || savedJob.job || savedJob;
    
    // Simplified job ID extraction
    let jobId;
    if (typeof savedJob.job === 'number') {
      jobId = savedJob.job;
    } else if (job && job.id) {
      jobId = job.id;
    } else {
      jobId = savedJob.id;
    }
    
    // Log the extracted job ID for debugging
    console.log('Saved job:', savedJob);
    console.log('Extracted job ID:', jobId);
    
    return (
      <div key={savedJob.id} className="bg-[#1e293b] rounded-xl p-6 shadow-lg border border-[#334155] hover:border-[#475569] transition-colors duration-200">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-white mb-2 hover:text-[#a5b4fc] transition-colors">
              <Link to={`/job/${jobId}`}>{job.title}</Link>
            </h2>
            <p className="text-[#94a3b8] mb-2">{job.company}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-[#0f172a] text-[#94a3b8] px-3 py-1 rounded-full text-sm">
                {job.type || 'Full-time'}
              </span>
              <span className="bg-[#0f172a] text-[#94a3b8] px-3 py-1 rounded-full text-sm">
                {job.location || 'Remote'}
              </span>
              {job.salary && (
                <span className="bg-[#0f172a] text-[#94a3b8] px-3 py-1 rounded-full text-sm">
                  {job.salary}
                </span>
              )}
            </div>
          </div>
          <button 
            onClick={() => handleRemoveSavedJob(savedJob.id)}
            disabled={removingId === savedJob.id}
            className="text-[#94a3b8] hover:text-red-400 p-2 transition-colors disabled:opacity-50"
            title="Remove from saved jobs"
            aria-label="Remove job"
          >
            {removingId === savedJob.id ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaTrash />
            )}
          </button>
        </div>
        
        <div className="mt-4 flex flex-col sm:flex-row justify-end gap-3">
          {/* Replace Button component with direct Link component for more reliable navigation */}
          <Link 
            to={`/job/${jobId}`}
            className="bg-[#334155] text-[#94a3b8] px-4 py-2 rounded-lg hover:bg-[#475569] transition-all duration-300 flex items-center justify-center"
          >
            View Details <FaExternalLinkAlt className="ml-2" />
          </Link>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-[#818cf8] text-4xl" />
          <span className="sr-only">Loading...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-[#1e293b] rounded-xl p-8 text-center">
          <div className="text-red-400 mb-4">
            <FaBookmark className="text-4xl mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Error Loading Jobs</h2>
          <p className="text-[#94a3b8] mb-6">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="primary"
          >
            Try Again
          </Button>
        </div>
      );
    }

    if (savedJobs.length === 0) {
      return (
        <div className="bg-[#1e293b] rounded-xl p-8 text-center">
          <FaBookmark className="text-[#818cf8] text-4xl mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">No Saved Jobs</h2>
          <p className="text-[#94a3b8] mb-6">
            You haven't saved any jobs yet. Browse jobs and save the ones you're interested in.
          </p>
          <Button
            as={Link}
            to="/"
            variant="primary"
          >
            Browse Jobs
          </Button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-6">
        {savedJobs.map(renderJobCard)}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Saved Jobs</h1>
          <span className="text-[#94a3b8]">
            {!loading && !error && savedJobs.length > 0 && `${savedJobs.length} saved jobs`}
          </span>
        </div>

        {renderContent()}
      </div>
    </DashboardLayout>
  );
};

export default JobseekerSavedJobs;