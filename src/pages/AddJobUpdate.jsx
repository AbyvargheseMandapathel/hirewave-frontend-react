import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaBriefcase, FaBold, FaItalic, FaListUl, FaListOl, FaLink, FaGlobe } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/quill-custom.css';
import '../styles/editor.css';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary.jsx';
import SimpleRichTextEditor from '../components/SimpleRichTextEditor/SimpleRichTextEditor.jsx';
import Popup from '../components/Popup/Popup.jsx';
import Toast from '../components/Toast/Toast';
import { createJob } from '../services/jobService';
import { useAuth } from '../contexts/AuthContext'; // Import auth context
import axios from 'axios'; // Add axios import
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

// Simple rich text editor component
const SimpleEditor = ({ value, onChange, placeholder, error }) => {
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isList, setIsList] = useState(false);
    
    const handleBold = () => {
        document.execCommand('bold');
        setIsBold(!isBold);
    };
    
    const handleItalic = () => {
        document.execCommand('italic');
        setIsItalic(!isItalic);
    };
    
    const handleList = () => {
        document.execCommand('insertUnorderedList');
        setIsList(!isList);
    };
    
    const handleOrderedList = () => {
        document.execCommand('insertOrderedList');
    };
    
    const handleLink = () => {
        const url = prompt('Enter URL:');
        if (url) {
            document.execCommand('createLink', false, url);
        }
    };
    
    const handleChange = (e) => {
        const content = e.target.innerHTML;
        onChange(content);
    };
    
    return (
        <div className="bg-[#0f172a] rounded-lg border border-[#334155] overflow-hidden">
            <div className="bg-[#1e293b] p-2 border-b border-[#334155] flex flex-wrap gap-2">
                <button 
                    type="button"
                    onClick={handleBold}
                    className={`p-2 rounded hover:bg-[#475569] ${isBold ? 'bg-[#475569]' : ''}`}
                >
                    <FaBold className="text-[#94a3b8]" />
                </button>
                <button 
                    type="button"
                    onClick={handleItalic}
                    className={`p-2 rounded hover:bg-[#475569] ${isItalic ? 'bg-[#475569]' : ''}`}
                >
                    <FaItalic className="text-[#94a3b8]" />
                </button>
                <button 
                    type="button"
                    onClick={handleList}
                    className={`p-2 rounded hover:bg-[#475569] ${isList ? 'bg-[#475569]' : ''}`}
                >
                    <FaListUl className="text-[#94a3b8]" />
                </button>
                <button 
                    type="button"
                    onClick={handleOrderedList}
                    className="p-2 rounded hover:bg-[#475569]"
                >
                    <FaListOl className="text-[#94a3b8]" />
                </button>
                <button 
                    type="button"
                    onClick={handleLink}
                    className="p-2 rounded hover:bg-[#475569]"
                >
                    <FaLink className="text-[#94a3b8]" />
                </button>
            </div>
            <div
                contentEditable
                onInput={handleChange}
                className="w-full bg-[#0f172a] text-white p-4 min-h-[200px] focus:outline-none"
                dangerouslySetInnerHTML={{ __html: value }}
                placeholder={placeholder}
            />
        </div>
    );
};

// Simple fallback editor component
const FallbackEditor = ({ value, onChange, placeholder, error }) => {
    return (
        <div className="bg-[#0f172a] rounded-lg border border-[#334155] overflow-hidden">
            <div className="bg-[#1e293b] p-2 border-b border-[#334155]">
                <span className="text-[#94a3b8]">Simple Text Editor</span>
            </div>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-[#0f172a] text-white p-4 min-h-[200px] focus:outline-none"
            />
        </div>
    );
};

// The main component with fixes
const AddJobUpdate = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user, loading } = useAuth();
    
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        salary: '',
        type: 'Full-time',
        description: '',
        requirements: '', // Changed from array to string for rich text editor
        external_link: '', // Added external link field
        company_website: '', // Added company website field
    });
    
    const [errors, setErrors] = useState({});
    const [popup, setPopup] = useState({ isOpen: false, message: '', type: 'info' });
    const [toast, setToast] = useState({ isOpen: false, message: '', type: 'info' });

    // Helper function to check authentication status
    const checkAuthStatus = async () => {
        try {
            // Get token from localStorage
            const token = localStorage.getItem('token');
            
            if (!token) {
                // Try sessionStorage as fallback
                const sessionToken = sessionStorage.getItem('token');
                if (sessionToken) {
                    localStorage.setItem('token', sessionToken);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${sessionToken}`;
                    return true;
                }
                return false;
            }
            
            // Set token in axios headers
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            // Optional: make a request to verify token is valid
            // const response = await axios.get('/api/auth/verify');
            // return response.status === 200;
            
            return true;
        } catch (error) {
            console.error("Error checking auth status:", error);
            return false;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleEditorChange = (content) => {
        setFormData(prev => ({
            ...prev,
            description: content
        }));

        // Clear error when user types
        if (errors.description) {
            setErrors(prev => ({
                ...prev,
                description: ''
            }));
        }
    };

    const handleRequirementsChange = (content) => {
        setFormData(prev => ({
            ...prev,
            requirements: content
        }));

        // Clear error when user types
        if (errors.requirements) {
            setErrors(prev => ({
                ...prev,
                requirements: ''
            }));
        }
    };

    const showPopup = (message, type = 'info') => {
        setPopup({ isOpen: true, message, type });
    };

    const closePopup = () => {
        setPopup({ ...popup, isOpen: false });
    };

    const showToast = (message, type = 'info') => {
        setToast({ isOpen: true, message, type });
    };

    const closeToast = () => {
        setToast({ ...toast, isOpen: false });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) newErrors.title = 'Job title is required';
        if (!formData.company.trim()) newErrors.company = 'Company name is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        if (!formData.salary.trim()) newErrors.salary = 'Salary range is required';
        if (!formData.description.trim()) newErrors.description = 'Job description is required';
        if (!formData.requirements.trim()) newErrors.requirements = 'Job requirements are required';
        
        // Validate URL format if external_link is provided
        if (formData.external_link && !isValidUrl(formData.external_link)) {
            newErrors.external_link = 'Please enter a valid URL';
        }
        
        // Validate URL format if company_website is provided
        if (formData.company_website && !isValidUrl(formData.company_website)) {
            newErrors.company_website = 'Please enter a valid URL';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    // Helper function to validate URLs
    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    };

    // Fixed single handleSubmit function
    // Update the handleSubmit function to better handle the API requirements and debug the response
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            try {
                // Show loading toast
                showToast('Submitting job...', 'info');
                
                // Prepare job data for API
                const jobData = {
                    title: formData.title,
                    company: formData.company,
                    location: formData.location,
                    salary: formData.salary,
                    type: formData.type,
                    description: formData.description,
                    requirements: formData.requirements,
                    // Only include these fields if they have values
                    ...(formData.external_link && { external_link: formData.external_link }),
                    ...(formData.company_website && { company_website: formData.company_website })
                };
                
                console.log('Submitting job data:', jobData);
                
                // Call the API to create the job
                const response = await createJob(jobData);
                
                // Show success toast
                showToast('Job posted successfully!', 'success');
                
                // Changed: Redirect to job detail page instead of dashboard
                setTimeout(() => {
                    navigate(`/job/${response.id}`);
                }, 1500);
                
            } catch (error) {
                console.error('Error creating job:', error);
                
                // Enhanced error handling to show more details
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error('Error response data:', error.response.data);
                    console.error('Error response status:', error.response.status);
                    
                    // Show more specific error message if available
                    if (error.response.data && error.response.data.detail) {
                        showToast(`Error: ${error.response.data.detail}`, 'error');
                    } else if (error.response.data) {
                        // Format validation errors from Django REST Framework
                        const errorMessages = [];
                        for (const [field, messages] of Object.entries(error.response.data)) {
                            if (Array.isArray(messages)) {
                                errorMessages.push(`${field}: ${messages.join(', ')}`);
                            } else {
                                errorMessages.push(`${field}: ${messages}`);
                            }
                        }
                        
                        if (errorMessages.length > 0) {
                            showToast(`Validation errors: ${errorMessages.join('; ')}`, 'error');
                        } else {
                            showToast('Server validation error. Please check your form.', 'error');
                        }
                    } else {
                        showToast(`Server error: ${error.response.status}`, 'error');
                    }
                    
                    // Check if the error is due to authentication
                    if (error.response.status === 401) {
                        setTimeout(() => {
                            navigate('/login', { state: { from: '/add-job' } });
                        }, 1500);
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('Error request:', error.request);
                    showToast('No response from server. Please try again later.', 'error');
                } else {
                    // Something happened in setting up the request that triggered an Error
                    showToast(error.message || 'Failed to create job. Please try again.', 'error');
                }
            }
        } else {
            // Show error toast for form validation errors
            showToast('Please fix the errors in the form', 'error');
        }
    };
    
    // Authentication check useEffect
    useEffect(() => {
        const verifyAuth = async () => {
            // If we're still loading, don't do anything yet
            if (loading) return;
            
            // If we're already authenticated according to context, we're good
            if (isAuthenticated) {
                console.log("User is authenticated via context, allowing access");
                return;
            }
            
            // If context says we're not authenticated, try one manual check
            try {
                const isAuth = await checkAuthStatus();
                if (isAuth) {
                    console.log("Manual auth check successful, allowing access");
                    return;
                }
                
                // If we get here, user is definitely not authenticated
                console.log("User is not authenticated after manual check");
                showToast('Please login to post a job', 'error');
                setTimeout(() => {
                    navigate('/login', { state: { from: '/add-job' } });
                }, 1500);
            } catch (error) {
                console.error("Error during auth verification:", error);
                showToast('Authentication error. Please login again.', 'error');
                setTimeout(() => {
                    navigate('/login', { state: { from: '/add-job' } });
                }, 1500);
            }
        };
        
        verifyAuth();
    }, [isAuthenticated, loading, navigate]);

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto p-6 md:p-10">
                <div className="mb-6 flex items-center">
                    <Link to="/" className="text-[#94a3b8] hover:text-white mr-4">
                        <FaArrowLeft />
                    </Link>
                    <h1 className="text-3xl font-bold text-white">Add New Job</h1>
                </div>

                <div className="bg-[#1e293b] rounded-xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit}>
                        {/* Basic Info Section */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-white mb-4">Basic Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Job Title */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
                                        Job Title*
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaBriefcase className="text-[#94a3b8]" />
                                        </div>
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className={`bg-[#0f172a] text-white w-full pl-10 pr-3 py-3 rounded-lg border ${errors.title ? 'border-red-500' : 'border-[#334155]'} focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent`}
                                            placeholder="e.g. Senior React Developer"
                                        />
                                    </div>
                                    {errors.title && <p className="mt-1 text-red-500 text-sm">{errors.title}</p>}
                                </div>
                                
                                {/* Company */}
                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                                        Company*
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaBuilding className="text-[#94a3b8]" />
                                        </div>
                                        <input
                                            id="company"
                                            name="company"
                                            type="text"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className={`bg-[#0f172a] text-white w-full pl-10 pr-3 py-3 rounded-lg border ${errors.company ? 'border-red-500' : 'border-[#334155]'} focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent`}
                                            placeholder="e.g. Tech Corp"
                                        />
                                    </div>
                                    {errors.company && <p className="mt-1 text-red-500 text-sm">{errors.company}</p>}
                                </div>

                                {/* Location */}
                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-white mb-2">
                                        Location*
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaMapMarkerAlt className="text-[#94a3b8]" />
                                        </div>
                                        <input
                                            id="location"
                                            name="location"
                                            type="text"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className={`bg-[#0f172a] text-white w-full pl-10 pr-3 py-3 rounded-lg border ${errors.location ? 'border-red-500' : 'border-[#334155]'} focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent`}
                                            placeholder="e.g. Remote, New York, etc."
                                        />
                                    </div>
                                    {errors.location && <p className="mt-1 text-red-500 text-sm">{errors.location}</p>}
                                </div>

                                {/* Salary */}
                                <div>
                                    <label htmlFor="salary" className="block text-sm font-medium text-white mb-2">
                                        Salary Range*
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaMoneyBillWave className="text-[#94a3b8]" />
                                        </div>
                                        <input
                                            id="salary"
                                            name="salary"
                                            type="text"
                                            value={formData.salary}
                                            onChange={handleChange}
                                            className={`bg-[#0f172a] text-white w-full pl-10 pr-3 py-3 rounded-lg border ${errors.salary ? 'border-red-500' : 'border-[#334155]'} focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent`}
                                            placeholder="e.g. $80k - $100k"
                                        />
                                    </div>
                                    {errors.salary && <p className="mt-1 text-red-500 text-sm">{errors.salary}</p>}
                                </div>

                                {/* Job Type */}
                                <div>
                                    <label htmlFor="type" className="block text-sm font-medium text-white mb-2">
                                        Job Type
                                    </label>
                                    <select
                                        id="type"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="bg-[#0f172a] text-white w-full px-3 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
                                    >
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Freelance">Freelance</option>
                                        <option value="Internship">Internship</option>
                                    </select>
                                </div>
                                
                                {/* External Link - New Field */}
                                <div>
                                    <label htmlFor="external_link" className="block text-sm font-medium text-white mb-2">
                                        External Application Link
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaLink className="text-[#94a3b8]" />
                                        </div>
                                        <input
                                            id="external_link"
                                            name="external_link"
                                            type="text"
                                            value={formData.external_link}
                                            onChange={handleChange}
                                            className={`bg-[#0f172a] text-white w-full pl-10 pr-3 py-3 rounded-lg border ${errors.external_link ? 'border-red-500' : 'border-[#334155]'} focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent`}
                                            placeholder="e.g. https://company.com/careers/job123"
                                        />
                                    </div>
                                    {errors.external_link && <p className="mt-1 text-red-500 text-sm">{errors.external_link}</p>}
                                </div>
                                
                                {/* Company Website - New Field */}
                                <div>
                                    <label htmlFor="company_website" className="block text-sm font-medium text-white mb-2">
                                        Company Website
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaGlobe className="text-[#94a3b8]" />
                                        </div>
                                        <input
                                            id="company_website"
                                            name="company_website"
                                            type="text"
                                            value={formData.company_website}
                                            onChange={handleChange}
                                            className={`bg-[#0f172a] text-white w-full pl-10 pr-3 py-3 rounded-lg border ${errors.company_website ? 'border-red-500' : 'border-[#334155]'} focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent`}
                                            placeholder="e.g. https://company.com"
                                        />
                                    </div>
                                    {errors.company_website && <p className="mt-1 text-red-500 text-sm">{errors.company_website}</p>}
                                </div>
                            </div>
                        </div>
                        
                        {/* Job Description Section */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-white mb-4">Job Description*</h2>
                            <div className={`rounded-lg overflow-hidden ${errors.description ? 'border border-red-500' : ''}`}>
                                <ErrorBoundary
                                    fallback={
                                        <FallbackEditor
                                            value={formData.description}
                                            onChange={handleEditorChange}
                                            placeholder="Describe the job role, responsibilities, and qualifications..."
                                            error={errors.description}
                                        />
                                    }
                                >
                                    <SimpleRichTextEditor
                                        value={formData.description}
                                        onChange={handleEditorChange}
                                        placeholder="Describe the job role, responsibilities, and qualifications..."
                                    />
                                </ErrorBoundary>
                            </div>
                            {errors.description && <p className="mt-1 text-red-500 text-sm">{errors.description}</p>}
                        </div>
                        
                        {/* Requirements Section with Rich Text Editor */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-white mb-4">Requirements*</h2>
                            <div className={`rounded-lg overflow-hidden ${errors.requirements ? 'border border-red-500' : ''}`}>
                                <ErrorBoundary
                                    fallback={
                                        <FallbackEditor
                                            value={formData.requirements}
                                            onChange={handleRequirementsChange}
                                            placeholder="List job requirements, qualifications, and skills needed..."
                                            error={errors.requirements}
                                        />
                                    }
                                >
                                    <SimpleRichTextEditor
                                        value={formData.requirements}
                                        onChange={handleRequirementsChange}
                                        placeholder="List job requirements, qualifications, and skills needed..."
                                    />
                                </ErrorBoundary>
                            </div>
                            {errors.requirements && <p className="mt-1 text-red-500 text-sm">{errors.requirements}</p>}
                        </div>
                        
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] text-white px-8 py-3 rounded-lg hover:from-[#a5b4fc] hover:to-[#818cf8] transition-all duration-300 w-full"
                        >
                            Post Job
                        </button>
                    </form>
                </div>
                
                {/* Popup component */}
                <Popup
                    isOpen={popup.isOpen}
                    message={popup.message}
                    type={popup.type}
                    onClose={closePopup}
                />
                
                {/* Toast for submission notifications */}
                <Toast
                    isOpen={toast.isOpen}
                    message={toast.message}
                    type={toast.type}
                    onClose={closeToast}
                />
            </div>
        </>
    );
};

export default AddJobUpdate;