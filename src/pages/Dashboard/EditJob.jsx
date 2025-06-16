import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchJobs, updateJob } from '../../services/jobApi';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    type: '',
    description: '',
    requirements: '',
    external_link: '',
    company_website: ''
  });

  useEffect(() => {
    const loadJob = async () => {
      try {
        const response = await fetchJobs();
        const jobData = response.results.find(j => j.id === parseInt(id));
        if (jobData) {
          setJob(jobData);
          setFormData(jobData);
        } else {
          toast.error('Job not found');
          navigate('/dashboard/jobs');
        }
      } catch (err) {
        toast.error('Failed to load job');
        navigate('/dashboard/jobs');
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateJob(id, formData);
      toast.success('Job updated successfully');
      navigate('/dashboard/jobs');
    } catch (err) {
      toast.error('Failed to update job');
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#818cf8]"></div>
        </div>
      </DashboardLayout>
    );
  }

  // Use the same form structure as AddJobUpdate.jsx
  // Just change the submit button text to "Update Job"
  return (
    <DashboardLayout>
      {/* Copy the form JSX from AddJobUpdate.jsx and modify as needed */}
    </DashboardLayout>
  );
};

export default EditJob;