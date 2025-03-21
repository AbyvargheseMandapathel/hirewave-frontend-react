import React, { useState } from 'react';
import { FaArrowLeft, FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaBriefcase, FaBold, FaItalic, FaListUl, FaListOl, FaLink } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/quill-custom.css';
import '../styles/editor.css';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary.jsx';
import SimpleRichTextEditor from '../components/SimpleRichTextEditor/SimpleRichTextEditor.jsx';
import Popup from '../components/Popup/Popup.jsx';

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

// Add this import at the top
import Toast from '../components/Toast/Toast';

const AddJobUpdate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        salary: '',
        type: 'Full-time',
        description: '',
        requirements: []
    });
    const [requirement, setRequirement] = useState('');
    const [errors, setErrors] = useState({});
    const [popup, setPopup] = useState({ isOpen: false, message: '', type: 'info' });

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

    const addRequirement = () => {
        if (requirement.trim()) {
            setFormData(prev => ({
                ...prev,
                requirements: [...prev.requirements, requirement.trim()]
            }));
            setRequirement('');
        }
    };

    const removeRequirement = (index) => {
        setFormData(prev => ({
            ...prev,
            requirements: prev.requirements.filter((_, i) => i !== index)
        }));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addRequirement();
        }
    };

    const showPopup = (message, type = 'info') => {
        setPopup({ isOpen: true, message, type });
    };

    const closePopup = () => {
        setPopup({ ...popup, isOpen: false });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) newErrors.title = 'Job title is required';
        if (!formData.company.trim()) newErrors.company = 'Company name is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        if (!formData.salary.trim()) newErrors.salary = 'Salary range is required';
        if (!formData.description.trim()) newErrors.description = 'Job description is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Add toast state
    const [toast, setToast] = useState({ isOpen: false, message: '', type: 'info' });

    const showToast = (message, type = 'info') => {
        setToast({ isOpen: true, message, type });
    };

    const closeToast = () => {
        setToast({ ...toast, isOpen: false });
    };

    // Update the handleSubmit function
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Here you would typically send the data to your backend
            console.log('Submitting job update:', formData);

            // Show success toast instead of popup
            showToast('Job update submitted successfully!', 'success');
            
            // Navigate after a short delay
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } else {
            // Show error toast for form validation errors
            showToast('Please fix the errors in the form', 'error');
        }
    };

    return (
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

                            {/* Other form fields remain the same... */}
                            
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
                        </div>
                    </div>
                    
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
                    
                    {/* Requirements Section */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">Requirements</h2>
                        <div className="flex mb-4">
                            <input
                                type="text"
                                value={requirement}
                                onChange={(e) => setRequirement(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="bg-[#0f172a] text-white flex-grow px-4 py-3 rounded-l-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
                                placeholder="Add a requirement and press Enter"
                            />
                            <button
                                type="button"
                                onClick={addRequirement}
                                className="bg-[#334155] text-white px-4 py-3 rounded-r-lg hover:bg-[#475569] transition-colors"
                            >
                                Add
                            </button>
                        </div>
                        
                        {formData.requirements.length > 0 ? (
                            <ul className="list-disc list-inside text-[#94a3b8] space-y-2">
                                {formData.requirements.map((req, index) => (
                                    <li key={index} className="flex items-center justify-between">
                                        <span>{req}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeRequirement(index)}
                                            className="text-red-400 hover:text-red-500"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-[#94a3b8]">No requirements added yet.</p>
                        )}
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
            
            {/* Popup component properly placed inside the return statement */}
            <Popup
                isOpen={popup.isOpen}
                message={popup.message}
                type={popup.type}
                onClose={closePopup}
            />
            {/* Add Toast for submission notifications */}
            <Toast
                isOpen={toast.isOpen}
                message={toast.message}
                type={toast.type}
                onClose={closeToast}
            />
        </div>
    );
};

export default AddJobUpdate;