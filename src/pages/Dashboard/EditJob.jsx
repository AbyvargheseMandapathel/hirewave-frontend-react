import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchJobs, updateJob } from '../../services/jobApi';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import SimpleRichTextEditor from '../../components/SimpleRichTextEditor/SimpleRichTextEditor';

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    type: 'Full-time',
    description: '',
    requirements: '',
    external_link: '',
    company_website: '',
    status: 'Active'
  });

  useEffect(() => {
    const loadJob = async () => {
      try {
        const response = await fetchJobs();
        const jobData = response.results.find(j => j.id === parseInt(id));
        if (jobData) {
          setFormData({
            title: jobData.title || '',
            company: jobData.company || '',
            location: jobData.location || '',
            salary: jobData.salary || '',
            type: jobData.type || 'Full-time',
            description: jobData.description || '',
            requirements: jobData.requirements || '',
            external_link: jobData.external_link || '',
            company_website: jobData.company_website || '',
            status: jobData.status || 'Active'
          });
        } else {
          toast.error('Job not found');
          navigate('/dashboard/jobs');
        }
      } catch (err) {
        console.error('Error loading job:', err);
        toast.error('Failed to load job');
        navigate('/dashboard/jobs');
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateJob(id, formData);
      toast.success('Job updated successfully');
      navigate('/dashboard/jobs');
    } catch (err) {
      console.error('Error updating job:', err);
      toast.error('Failed to update job');
    } finally {
      setLoading(false);
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

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Edit Job</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-[#94a3b8] mb-2">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-[#1e293b] border border-[#334155] rounded-lg p-3 text-white focus:outline-none focus:border-[#818cf8]"
                required
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-[#94a3b8] mb-2">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-[#1e293b] border border-[#334155] rounded-lg p-3 text-white focus:outline-none focus:border-[#818cf8]"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-[#94a3b8] mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-[#1e293b] border border-[#334155] rounded-lg p-3 text-white focus:outline-none focus:border-[#818cf8]"
                required
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium text-[#94a3b8] mb-2">
                Job Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-[#1e293b] border border-[#334155] rounded-lg p-3 text-white focus:outline-none focus:border-[#818cf8]"
                required
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-[#94a3b8] mb-2">
                Salary
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full bg-[#1e293b] border border-[#334155] rounded-lg p-3 text-white focus:outline-none focus:border-[#818cf8]"
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-[#94a3b8] mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-[#1e293b] border border-[#334155] rounded-lg p-3 text-white focus:outline-none focus:border-[#818cf8]"
                required
              >
                <option value="Active">Active</option>
                <option value="Closed">Closed</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">
              Job Description
            </label>
            <SimpleRichTextEditor
              value={formData.description}
              onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
              placeholder="Enter job description..."
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">
              Requirements
            </label>
            <SimpleRichTextEditor
              value={formData.requirements}
              onChange={(value) => setFormData(prev => ({ ...prev, requirements: value }))}
              placeholder="Enter job requirements..."
            />
          </div>

          {/* External Link */}
          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">
              External Application Link (Optional)
            </label>
            <input
              type="url"
              name="external_link"
              value={formData.external_link}
              onChange={handleChange}
              className="w-full bg-[#1e293b] border border-[#334155] rounded-lg p-3 text-white focus:outline-none focus:border-[#818cf8]"
            />
          </div>

          {/* Company Website */}
          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">
              Company Website (Optional)
            </label>
            <input
              type="url"
              name="company_website"
              value={formData.company_website}
              onChange={handleChange}
              className="w-full bg-[#1e293b] border border-[#334155] rounded-lg p-3 text-white focus:outline-none focus:border-[#818cf8]"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard/jobs')}
              className="px-4 py-2 text-white bg-[#334155] rounded-lg hover:bg-[#475569]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-white bg-[#818cf8] rounded-lg hover:bg-[#6366f1] disabled:bg-[#475569] disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Job'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditJob;