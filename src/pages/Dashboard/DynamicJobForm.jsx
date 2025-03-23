import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown, FaEdit, FaSave } from 'react-icons/fa';
import RecruiterDashboardLayout from '../../components/Dashboard/RecruiterDashboardLayout';
import FormFieldEditor from '../../components/Forms/FormFieldEditor';
import FormPreview from '../../components/Forms/FormPreview';

const DynamicJobForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('editor'); // 'editor' or 'preview'
  const [formTitle, setFormTitle] = useState('New Job Application Form');
  const [formDescription, setFormDescription] = useState('Please fill out the following form to apply for this position.');
  
  // Basic job details
  const [jobDetails, setJobDetails] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
    requirements: '',
    benefits: '',
  });

  // Form fields
  const [formFields, setFormFields] = useState([
    {
      id: 'name',
      type: 'text',
      label: 'Full Name',
      placeholder: 'Enter your full name',
      required: true,
      options: [],
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'Enter your email address',
      required: true,
      options: [],
    },
    {
      id: 'phone',
      type: 'tel',
      label: 'Phone Number',
      placeholder: 'Enter your phone number',
      required: true,
      options: [],
    },
    {
      id: 'resume',
      type: 'file',
      label: 'Resume/CV',
      placeholder: 'Upload your resume',
      required: true,
      options: [],
      fileTypes: '.pdf,.doc,.docx',
    },
  ]);

  // Add a new field
  const addField = (fieldType) => {
    const newField = {
      id: `field_${Date.now()}`,
      type: fieldType,
      label: `New ${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)} Field`,
      placeholder: `Enter ${fieldType}`,
      required: false,
      options: fieldType === 'select' || fieldType === 'checkbox' || fieldType === 'radio' ? ['Option 1', 'Option 2'] : [],
    };
    
    setFormFields([...formFields, newField]);
  };

  // Remove a field
  const removeField = (fieldId) => {
    setFormFields(formFields.filter(field => field.id !== fieldId));
  };

  // Update a field
  const updateField = (fieldId, updatedField) => {
    setFormFields(formFields.map(field => 
      field.id === fieldId ? { ...field, ...updatedField } : field
    ));
  };

  // Move field up
  const moveFieldUp = (index) => {
    if (index === 0) return;
    const newFields = [...formFields];
    [newFields[index], newFields[index - 1]] = [newFields[index - 1], newFields[index]];
    setFormFields(newFields);
  };

  // Move field down
  const moveFieldDown = (index) => {
    if (index === formFields.length - 1) return;
    const newFields = [...formFields];
    [newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]];
    setFormFields(newFields);
  };

  // Handle job details change
  const handleJobDetailsChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({
      ...jobDetails,
      [name]: value
    });
  };

  // Save the form
  const saveForm = () => {
    // Here you would typically save to your backend
    const formData = {
      jobDetails,
      formTitle,
      formDescription,
      formFields,
    };
    
    console.log('Form data to save:', formData);
    // API call would go here
    
    alert('Job form saved successfully!');
    navigate('/dashboard/recruiter');
  };

  return (
    <RecruiterDashboardLayout >
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Create Custom Job Application Form</h1>
          <div className="flex space-x-3">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'editor' 
                  ? 'bg-[#818cf8] text-white' 
                  : 'bg-[#0f172a] text-[#94a3b8] border border-[#334155] hover:bg-[#1e293b]'
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'preview' 
                  ? 'bg-[#818cf8] text-white' 
                  : 'bg-[#0f172a] text-[#94a3b8] border border-[#334155] hover:bg-[#1e293b]'
              }`}
            >
              Preview
            </button>
            <button
              onClick={saveForm}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
            >
              <FaSave className="mr-2" /> Save Form
            </button>
          </div>
        </div>

        {activeTab === 'editor' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Job Details Section */}
            <div className="lg:col-span-1">
              <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
                <h2 className="text-lg font-medium text-white mb-4">Job Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#94a3b8] mb-1">Job Title</label>
                    <input
                      type="text"
                      name="title"
                      value={jobDetails.title}
                      onChange={handleJobDetailsChange}
                      className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] p-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                      placeholder="e.g. Senior React Developer"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#94a3b8] mb-1">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={jobDetails.company}
                      onChange={handleJobDetailsChange}
                      className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] p-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                      placeholder="Your company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#94a3b8] mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={jobDetails.location}
                      onChange={handleJobDetailsChange}
                      className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] p-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                      placeholder="e.g. Remote, New York, NY"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#94a3b8] mb-1">Job Type</label>
                    <select
                      name="type"
                      value={jobDetails.type}
                      onChange={handleJobDetailsChange}
                      className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] p-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-[#94a3b8] mb-1">Salary Range</label>
                    <input
                      type="text"
                      name="salary"
                      value={jobDetails.salary}
                      onChange={handleJobDetailsChange}
                      className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] p-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                      placeholder="e.g. $80,000 - $100,000"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6 mt-6">
                <h2 className="text-lg font-medium text-white mb-4">Add Form Fields</h2>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => addField('text')}
                    className="p-2 bg-[#0f172a] text-[#94a3b8] rounded-lg border border-[#334155] hover:bg-[#1e293b] flex items-center justify-center"
                  >
                    <FaPlus className="mr-2" /> Text
                  </button>
                  <button 
                    onClick={() => addField('textarea')}
                    className="p-2 bg-[#0f172a] text-[#94a3b8] rounded-lg border border-[#334155] hover:bg-[#1e293b] flex items-center justify-center"
                  >
                    <FaPlus className="mr-2" /> Textarea
                  </button>
                  <button 
                    onClick={() => addField('select')}
                    className="p-2 bg-[#0f172a] text-[#94a3b8] rounded-lg border border-[#334155] hover:bg-[#1e293b] flex items-center justify-center"
                  >
                    <FaPlus className="mr-2" /> Dropdown
                  </button>
                  <button 
                    onClick={() => addField('checkbox')}
                    className="p-2 bg-[#0f172a] text-[#94a3b8] rounded-lg border border-[#334155] hover:bg-[#1e293b] flex items-center justify-center"
                  >
                    <FaPlus className="mr-2" /> Checkbox
                  </button>
                  <button 
                    onClick={() => addField('radio')}
                    className="p-2 bg-[#0f172a] text-[#94a3b8] rounded-lg border border-[#334155] hover:bg-[#1e293b] flex items-center justify-center"
                  >
                    <FaPlus className="mr-2" /> Radio
                  </button>
                  <button 
                    onClick={() => addField('file')}
                    className="p-2 bg-[#0f172a] text-[#94a3b8] rounded-lg border border-[#334155] hover:bg-[#1e293b] flex items-center justify-center"
                  >
                    <FaPlus className="mr-2" /> File Upload
                  </button>
                  <button 
                    onClick={() => addField('date')}
                    className="p-2 bg-[#0f172a] text-[#94a3b8] rounded-lg border border-[#334155] hover:bg-[#1e293b] flex items-center justify-center"
                  >
                    <FaPlus className="mr-2" /> Date
                  </button>
                  <button 
                    onClick={() => addField('number')}
                    className="p-2 bg-[#0f172a] text-[#94a3b8] rounded-lg border border-[#334155] hover:bg-[#1e293b] flex items-center justify-center"
                  >
                    <FaPlus className="mr-2" /> Number
                  </button>
                </div>
              </div>
            </div>
            
            {/* Form Builder Section */}
            <div className="lg:col-span-2">
              <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
                <div className="mb-6">
                  <label className="block text-[#94a3b8] mb-1">Form Title</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] p-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-[#94a3b8] mb-1">Form Description</label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] p-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8] min-h-[80px]"
                  ></textarea>
                </div>
                
                <div className="space-y-6">
                  {formFields.map((field, index) => (
                    <div key={field.id} className="bg-[#0f172a] rounded-lg border border-[#334155] p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-white font-medium">{field.label}</h3>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => moveFieldUp(index)}
                            className="p-1 text-[#94a3b8] hover:text-white"
                            disabled={index === 0}
                          >
                            <FaArrowUp />
                          </button>
                          <button 
                            onClick={() => moveFieldDown(index)}
                            className="p-1 text-[#94a3b8] hover:text-white"
                            disabled={index === formFields.length - 1}
                          >
                            <FaArrowDown />
                          </button>
                          <button 
                            onClick={() => removeField(field.id)}
                            className="p-1 text-red-400 hover:text-red-300"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                      
                      {/* Field Editor */}
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[#94a3b8] text-sm mb-1">Field Label</label>
                          <input
                            type="text"
                            value={field.label}
                            onChange={(e) => updateField(field.id, { label: e.target.value })}
                            className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] p-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-[#94a3b8] text-sm mb-1">Placeholder</label>
                          <input
                            type="text"
                            value={field.placeholder}
                            onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                            className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] p-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                          />
                        </div>
                        
                        {(field.type === 'select' || field.type === 'checkbox' || field.type === 'radio') && (
                          <div>
                            <label className="block text-[#94a3b8] text-sm mb-1">Options</label>
                            <div className="space-y-2">
                              {field.options.map((option, optIndex) => (
                                <div key={optIndex} className="flex items-center space-x-2">
                                  <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => {
                                      const newOptions = [...field.options];
                                      newOptions[optIndex] = e.target.value;
                                      updateField(field.id, { options: newOptions });
                                    }}
                                    className="flex-1 bg-[#0f172a] text-white rounded-lg border border-[#334155] p-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                                  />
                                  <button
                                    onClick={() => {
                                      const newOptions = field.options.filter((_, i) => i !== optIndex);
                                      updateField(field.id, { options: newOptions });
                                    }}
                                    className="p-2 text-red-400 hover:text-red-300"
                                  >
                                    <FaTrash />
                                  </button>
                                </div>
                              ))}
                              <button
                                onClick={() => {
                                  const newOptions = [...field.options, `Option ${field.options.length + 1}`];
                                  updateField(field.id, { options: newOptions });
                                }}
                                className="px-3 py-1 bg-[#1e293b] text-[#94a3b8] rounded-lg border border-[#334155] hover:bg-[#2d3748] text-sm flex items-center"
                              >
                                <FaPlus className="mr-1" /> Add Option
                              </button>
                            </div>
                          </div>
                        )}
                        
                        {field.type === 'file' && (
                          <div>
                            <label className="block text-[#94a3b8] text-sm mb-1">Allowed File Types</label>
                            <input
                              type="text"
                              value={field.fileTypes || '.pdf,.doc,.docx'}
                              onChange={(e) => updateField(field.id, { fileTypes: e.target.value })}
                              className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] p-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                              placeholder=".pdf,.doc,.docx"
                            />
                            <p className="text-xs text-[#64748b] mt-1">Separate file extensions with commas</p>
                          </div>
                        )}
                        
                        <div className="flex items-center mt-2">
                          <input
                            type="checkbox"
                            id={`required-${field.id}`}
                            checked={field.required}
                            onChange={(e) => updateField(field.id, { required: e.target.checked })}
                            className="mr-2 h-4 w-4 rounded border-[#334155] bg-[#0f172a] text-[#818cf8] focus:ring-[#818cf8]"
                          />
                          <label htmlFor={`required-${field.id}`} className="text-[#94a3b8] text-sm">
                            Required field
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
            <h2 className="text-xl font-medium text-white mb-6">{formTitle}</h2>
            <p className="text-[#94a3b8] mb-8">{formDescription}</p>
            
            {/* Job Details Preview */}
            <div className="mb-8 bg-[#0f172a] rounded-lg border border-[#334155] p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{jobDetails.title || 'Job Title'}</h3>
                  <p className="text-[#94a3b8]">{jobDetails.company || 'Company Name'}</p>
                </div>
                <div className="mt-2 md:mt-0 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[#1e293b] text-[#94a3b8] rounded-full text-sm">
                    {jobDetails.location || 'Location'}
                  </span>
                  <span className="px-3 py-1 bg-[#1e293b] text-[#94a3b8] rounded-full text-sm">
                    {jobDetails.type}
                  </span>
                  {jobDetails.salary && (
                    <span className="px-3 py-1 bg-[#1e293b] text-[#94a3b8] rounded-full text-sm">
                      {jobDetails.salary}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Form Fields Preview */}
            <form className="space-y-6">
              {formFields.map((field) => (
                <div key={field.id} className="bg-[#0f172a] rounded-lg border border-[#334155] p-4">
                  <label className="block text-white font-medium mb-2">
                    {field.label} {field.required && <span className="text-red-400">*</span>}
                  </label>
                  
                  {field.type === 'text' && (
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      className="w-full bg-[#1e293b] text-white rounded-lg border border-[#334155] p-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                      required={field.required}
                    />
                  )}
                  
                  {field.type === 'email' && (
                    <input
                      type="email"
                      placeholder={field.placeholder}
                      className="w-full bg-[#1e293b] text-white rounded-lg border border-[#334155] p-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                      required={field.required}
                    />
                  )}
                  
                  {field.type === 'tel' && (
                    <input
                      type="tel"
                      placeholder={field.placeholder}
                      className="w-full bg-[#1e293b] text-white rounded-lg border border-[#334155] p-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                      required={field.required}
                    />
                  )}
                  
                  {field.type === 'number' && (
                    <input
                      type="number"
                      placeholder={field.placeholder}
                      className="w-full bg-[#1e293b] text-white rounded-lg border border-[#334155] p-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                      required={field.required}
                    />
                  )}
                  
                  {field.type === 'date' && (
                    <input
                      type="date"
                      className="w-full bg-[#1e293b] text-white rounded-lg border border-[#334155] p-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                      required={field.required}
                    />
                  )}
                  
                  {field.type === 'textarea' && (
                    <textarea
                      placeholder={field.placeholder}
                      className="w-full bg-[#1e293b] text-white rounded-lg border border-[#334155] p-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8] min-h-[100px]"
                      required={field.required}
                    ></textarea>
                  )}
                  
                  {field.type === 'select' && (
                    <select
                      className="w-full bg-[#1e293b] text-white rounded-lg border border-[#334155] p-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                      required={field.required}
                    >
                      <option value="">{field.placeholder}</option>
                      {field.options.map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                  
                  {field.type === 'checkbox' && (
                    <div className="space-y-2">
                      {field.options.map((option, i) => (
                        <div key={i} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`${field.id}-${i}`}
                            className="h-4 w-4 rounded border-[#334155] bg-[#1e293b] text-[#818cf8] focus:ring-[#818cf8]"
                          />
                          <label htmlFor={`${field.id}-${i}`} className="ml-2 text-[#94a3b8]">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {field.type === 'radio' && (
                    <div className="space-y-2">
                      {field.options.map((option, i) => (
                        <div key={i} className="flex items-center">
                          <input
                            type="radio"
                            id={`${field.id}-${i}`}
                            name={field.id}
                            className="h-4 w-4 border-[#334155] bg-[#1e293b] text-[#818cf8] focus:ring-[#818cf8]"
                          />
                          <label htmlFor={`${field.id}-${i}`} className="ml-2 text-[#94a3b8]">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {field.type === 'file' && (
                    <div>
                      <input
                        type="file"
                        accept={field.fileTypes}
                        className="w-full bg-[#1e293b] text-white rounded-lg border border-[#334155] p-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#0f172a] file:text-[#94a3b8] hover:file:bg-[#1e293b]"
                        required={field.required}
                      />
                      <p className="text-xs text-[#64748b] mt-1">
                        Accepted file types: {field.fileTypes || '.pdf,.doc,.docx'}
                      </p>
                    </div>
                  )}
                </div>
              ))}
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#818cf8] text-white rounded-lg hover:bg-[#6366f1]"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </RecruiterDashboardLayout>
  );
};

export default DynamicJobForm;