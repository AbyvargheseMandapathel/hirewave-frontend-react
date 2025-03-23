import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaArrowLeft,
  FaArrowRight,
  FaSave,
  FaPlus,
  FaArrowUp,
  FaArrowDown,
  FaTrash,
} from 'react-icons/fa';
import RecruiterDashboardLayout from '../../components/Dashboard/RecruiterDashboardLayout';
import SimpleRichTextEditor from '../../components/SimpleRichTextEditor/SimpleRichTextEditor';
import FormFieldEditor from '../../components/Forms/FormFieldEditor';
import FormPreview from '../../components/Forms/FormPreview';

const CreateJobMultiStep = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formTitle, setFormTitle] = useState('Job Application Form');
  const [formDescription, setFormDescription] = useState(
    'Please fill out the following form to apply for this position.'
  );

  // Job details (Step 1)
  const [jobDetails, setJobDetails] = useState({
    title: '',
    company: 'TechCorp', // Default company for the recruiter
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
    requirements: '',
    benefits: '',
  });

  // Application form fields (Step 2)
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
      id: 'resume',
      type: 'file',
      label: 'Resume/CV',
      placeholder: 'Upload your resume',
      required: true,
      options: [],
    },
    {
      id: 'experience',
      type: 'textarea',
      label: 'Relevant Experience',
      placeholder: 'Describe your relevant experience',
      required: false,
      options: [],
    },
  ]);

  // Handle job details input change
  const handleJobDetailsChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle rich text editor changes
  const handleRichTextChange = (name, value) => {
    setJobDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update a form field
  const updateFormField = (id, updatedField) => {
    setFormFields((fields) =>
      fields.map((field) => (field.id === id ? { ...field, ...updatedField } : field))
    );
  };

  // Delete a form field
  const deleteFormField = (id) => {
    if (formFields.length <= 1) return; // Don't delete if there's only one field left
    setFormFields((fields) => fields.filter((field) => field.id !== id));
  };

  // Add a new form field
  const addFormField = (fieldType = 'text') => {
    const newField = {
      id: `field_${Date.now()}`,
      type: fieldType,
      label: `New ${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)} Field`,
      placeholder: 'Enter value',
      required: false,
      options: ['Option 1', 'Option 2'], // Default options for select, checkbox, radio
    };
    setFormFields([...formFields, newField]);
  };

  // Move a field up in the order
  const moveFieldUp = (index) => {
    if (index === 0) return;
    const newFields = [...formFields];
    [newFields[index], newFields[index - 1]] = [newFields[index - 1], newFields[index]];
    setFormFields(newFields);
  };

  // Move a field down in the order
  const moveFieldDown = (index) => {
    if (index === formFields.length - 1) return;
    const newFields = [...formFields];
    [newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]];
    setFormFields(newFields);
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log('Job Details:', jobDetails);
    console.log('Form Fields:', formFields);
    navigate('/dashboard/recruiter/jobs');
  };

  // Go to next step
  const goToNextStep = () => {
    setCurrentStep((step) => step + 1);
  };

  // Go to previous step
  const goToPrevStep = () => {
    setCurrentStep((step) => step - 1);
  };

  return (
    <RecruiterDashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Create New Job</h1>
        <p className="text-[#94a3b8]">Post a new job and create a custom application form</p>
      </div>

      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep === step ? 'bg-[#818cf8] text-white' : 'bg-[#1e293b] text-[#94a3b8]'
                }`}
              >
                {step}
              </div>
              {step < 3 && <div className="flex-1 h-1 mx-2 bg-[#1e293b]"></div>}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[#94a3b8]">
          <span>Job Details</span>
          <span>Application Form</span>
          <span>Preview & Publish</span>
        </div>
      </div>

      {/* Step 1: Job Details */}
      {currentStep === 1 && (
        <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
          <h2 className="text-xl font-medium text-white mb-6">Job Details</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#94a3b8] mb-2">Job Title*</label>
                <input
                  type="text"
                  name="title"
                  value={jobDetails.title}
                  onChange={handleJobDetailsChange}
                  className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                  placeholder="e.g. Senior React Developer"
                  required
                />
              </div>
              <div>
                <label className="block text-[#94a3b8] mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  value={jobDetails.company}
                  onChange={handleJobDetailsChange}
                  className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                  placeholder="Your company name"
                  disabled
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[#94a3b8] mb-2">Location*</label>
                <input
                  type="text"
                  name="location"
                  value={jobDetails.location}
                  onChange={handleJobDetailsChange}
                  className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                  placeholder="e.g. Remote, New York, etc."
                  required
                />
              </div>
              <div>
                <label className="block text-[#94a3b8] mb-2">Job Type*</label>
                <select
                  name="type"
                  value={jobDetails.type}
                  onChange={handleJobDetailsChange}
                  className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                  required
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-[#94a3b8] mb-2">Salary Range</label>
                <input
                  type="text"
                  name="salary"
                  value={jobDetails.salary}
                  onChange={handleJobDetailsChange}
                  className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                  placeholder="e.g. $80k - $100k"
                />
              </div>
            </div>
            <div>
              <label className="block text-[#94a3b8] mb-2">Job Description*</label>
              <SimpleRichTextEditor
                value={jobDetails.description}
                onChange={(value) => handleRichTextChange('description', value)}
                placeholder="Enter job description..."
              />
            </div>
            <div>
              <label className="block text-[#94a3b8] mb-2">Requirements</label>
              <SimpleRichTextEditor
                value={jobDetails.requirements}
                onChange={(value) => handleRichTextChange('requirements', value)}
                placeholder="Enter job requirements..."
              />
            </div>
            <div>
              <label className="block text-[#94a3b8] mb-2">Benefits</label>
              <SimpleRichTextEditor
                value={jobDetails.benefits}
                onChange={(value) => handleRichTextChange('benefits', value)}
                placeholder="Enter job benefits..."
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button
              onClick={goToNextStep}
              className="flex items-center px-6 py-2 bg-[#818cf8] text-white rounded-lg hover:bg-[#6366f1] transition-colors"
            >
              Next: Create Application Form <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Application Form Builder */}
      {currentStep === 2 && (
        <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
          <h2 className="text-xl font-medium text-white mb-6">Application Form Builder</h2>
          <div className="mb-6">
            <label className="block text-[#94a3b8] mb-2">Form Title</label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
              placeholder="Enter form title"
            />
          </div>
          <div className="mb-6">
            <label className="block text-[#94a3b8] mb-2">Form Description</label>
            <textarea
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
              placeholder="Enter form description"
              rows="3"
            ></textarea>
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Form Fields</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => addFormField('text')}
                  className="flex items-center px-3 py-2 bg-[#0f172a] text-white border border-[#334155] rounded-lg hover:bg-[#1e293b] transition-colors"
                >
                  <FaPlus className="mr-1" /> Text
                </button>
                <button
                  onClick={() => addFormField('textarea')}
                  className="flex items-center px-3 py-2 bg-[#0f172a] text-white border border-[#334155] rounded-lg hover:bg-[#1e293b] transition-colors"
                >
                  <FaPlus className="mr-1" /> Textarea
                </button>
                <button
                  onClick={() => addFormField('select')}
                  className="flex items-center px-3 py-2 bg-[#0f172a] text-white border border-[#334155] rounded-lg hover:bg-[#1e293b] transition-colors"
                >
                  <FaPlus className="mr-1" /> Dropdown
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {formFields.map((field, index) => (
                <div key={field.id} className="bg-[#0f172a] rounded-lg border border-[#334155] p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-white font-medium">{field.label}</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => moveFieldUp(index)}
                        disabled={index === 0}
                        className={`p-1 rounded ${index === 0 ? 'text-[#475569]' : 'text-[#94a3b8] hover:text-white'}`}
                      >
                        <FaArrowUp />
                      </button>
                      <button
                        onClick={() => moveFieldDown(index)}
                        disabled={index === formFields.length - 1}
                        className={`p-1 rounded ${index === formFields.length - 1 ? 'text-[#475569]' : 'text-[#94a3b8] hover:text-white'}`}
                      >
                        <FaArrowDown />
                      </button>
                      <button
                        onClick={() => deleteFormField(field.id)}
                        className="p-1 text-red-400 hover:text-red-500 rounded"
                        disabled={formFields.length <= 1}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[#94a3b8] mb-1">Field Label</label>
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => updateFormField(field.id, { label: e.target.value })}
                        className="w-full bg-[#1e293b] text-white rounded-lg border border-[#334155] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#94a3b8] mb-1">Field Type</label>
                      <select
                        value={field.type}
                        onChange={(e) => updateFormField(field.id, { type: e.target.value })}
                        className="w-full bg-[#1e293b] text-white rounded-lg border border-[#334155] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                      >
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="tel">Phone</option>
                        <option value="textarea">Textarea</option>
                        <option value="select">Dropdown</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="radio">Radio</option>
                        <option value="file">File Upload</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#94a3b8] mb-1">Placeholder</label>
                      <input
                        type="text"
                        value={field.placeholder}
                        onChange={(e) => updateFormField(field.id, { placeholder: e.target.value })}
                        className="w-full bg-[#1e293b] text-white rounded-lg border border-[#334155] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                      />
                    </div>
                    {(field.type === 'select' || field.type === 'checkbox' || field.type === 'radio') && (
                      <div>
                        <label className="block text-[#94a3b8] mb-1">Options (one per line)</label>
                        <textarea
                          value={field.options.join('\n')}
                          onChange={(e) =>
                            updateFormField(field.id, { options: e.target.value.split('\n').filter((opt) => opt.trim() !== '') })
                          }
                          className="w-full bg-[#1e293b] text-white rounded-lg border border-[#334155] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                          rows="3"
                        ></textarea>
                      </div>
                    )}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`required-${field.id}`}
                        checked={field.required}
                        onChange={(e) => updateFormField(field.id, { required: e.target.checked })}
                        className="w-4 h-4 text-[#818cf8] bg-[#1e293b] border-[#334155] rounded focus:ring-[#818cf8]"
                      />
                      <label htmlFor={`required-${field.id}`} className="ml-2 text-[#94a3b8]">
                        Required field
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex justify-between">
            <button
              onClick={goToPrevStep}
              className="flex items-center px-6 py-2 bg-[#1e293b] text-white border border-[#334155] rounded-lg hover:bg-[#0f172a] transition-colors"
            >
              <FaArrowLeft className="mr-2" /> Back to Job Details
            </button>
            <button
              onClick={goToNextStep}
              className="flex items-center px-6 py-2 bg-[#818cf8] text-white rounded-lg hover:bg-[#6366f1] transition-colors"
            >
              Next: Preview & Publish <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Preview & Publish */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
            <h2 className="text-xl font-medium text-white mb-6">Job Listing Preview</h2>
            <div className="bg-[#0f172a] rounded-lg border border-[#334155] p-6">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white">{jobDetails.title || 'Job Title'}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#1e293b] text-[#94a3b8]">
                    {jobDetails.company}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#1e293b] text-[#94a3b8]">
                    {jobDetails.location || 'Location'}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#1e293b] text-[#94a3b8]">
                    {jobDetails.type}
                  </span>
                  {jobDetails.salary && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#1e293b] text-[#94a3b8]">
                      {jobDetails.salary}
                    </span>
                  )}
                </div>
              </div>
              <div className="border-t border-[#334155] pt-4 mt-4">
                <h4 className="text-lg font-medium text-white mb-2">Job Description</h4>
                <div className="text-[#94a3b8] prose prose-invert max-w-none">
                  {jobDetails.description ? (
                    <div dangerouslySetInnerHTML={{ __html: jobDetails.description }} />
                  ) : (
                    <p className="italic">No description provided</p>
                  )}
                </div>
              </div>
              {jobDetails.requirements && (
                <div className="border-t border-[#334155] pt-4 mt-4">
                  <h4 className="text-lg font-medium text-white mb-2">Requirements</h4>
                  <div className="text-[#94a3b8] prose prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: jobDetails.requirements }} />
                  </div>
                </div>
              )}
              {jobDetails.benefits && (
                <div className="border-t border-[#334155] pt-4 mt-4">
                  <h4 className="text-lg font-medium text-white mb-2">Benefits</h4>
                  <div className="text-[#94a3b8] prose prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: jobDetails.benefits }} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
            <h2 className="text-xl font-medium text-white mb-6">Application Form Preview</h2>
            <FormPreview
              formTitle={formTitle}
              formDescription={formDescription}
              jobDetails={jobDetails}
              formFields={formFields}
            />
          </div>
          <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
            <h2 className="text-xl font-medium text-white mb-6">Publish Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#0f172a] rounded-lg border border-[#334155]">
                <div>
                  <h4 className="text-white font-medium">Job Status</h4>
                  <p className="text-[#94a3b8] text-sm mt-1">
                    Choose whether to publish immediately or save as draft
                  </p>
                </div>
                <select className="bg-[#1e293b] text-white rounded-lg border border-[#334155] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]">
                  <option value="active">Publish Now (Active)</option>
                  <option value="draft">Save as Draft</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#0f172a] rounded-lg border border-[#334155]">
                <div>
                  <h4 className="text-white font-medium">Application Deadline</h4>
                  <p className="text-[#94a3b8] text-sm mt-1">
                    Set an optional deadline for applications
                  </p>
                </div>
                <input
                  type="date"
                  className="bg-[#1e293b] text-white rounded-lg border border-[#334155] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-[#0f172a] rounded-lg border border-[#334155]">
                <div>
                  <h4 className="text-white font-medium">Email Notifications</h4>
                  <p className="text-[#94a3b8] text-sm mt-1">
                    Receive email notifications for new applications
                  </p>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="relative w-11 h-6 bg-[#1e293b] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#818cf8] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#818cf8]"></div>
                </label>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-between">
            <button
              onClick={goToPrevStep}
              className="flex items-center px-6 py-2 bg-[#1e293b] text-white border border-[#334155] rounded-lg hover:bg-[#0f172a] transition-colors"
            >
              <FaArrowLeft className="mr-2" /> Back to Form Builder
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FaSave className="mr-2" /> Publish Job
            </button>
          </div>
        </div>
      )}
    </RecruiterDashboardLayout>
  );
};

export default CreateJobMultiStep;