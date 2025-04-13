import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JobDetails from '../../components/JobDetails/JobDetails';
import { getJobById } from '../../services/jobService';
import { isJobBookmarked } from '../../services/savedJobService';
import { isLoggedIn } from '../../services/authService';

const Job = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [job, setJob] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const jobData = await getJobById(id);
        setJob(jobData);
        
        if (isLoggedIn()) {
          const bookmarked = await isJobBookmarked(id);
          setIsSaved(bookmarked);
        }
      } catch (err) {
        console.error('Error fetching job:', err);
        setError('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchJob();
    }
  }, [id]);
  
  return (
      <JobDetails 
        jobId={id}
        job={job}
        loading={loading}
        error={error}
        isSaved={isSaved}
        setIsSaved={setIsSaved}
        makeScrollable={true}
      />
  );
};

export default Job;