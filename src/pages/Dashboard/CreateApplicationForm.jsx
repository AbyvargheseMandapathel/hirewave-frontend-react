import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown, FaSave } from 'react-icons/fa';
import RecruiterDashboardLayout from '../../components/Dashboard/RecruiterDashboardLayout';
import FormFieldEditor from '../../components/Forms/FormFieldEditor';
import FormPreview from '../../components/Forms/FormPreview';

const CreateApplicationForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('editor'); // 'editor' or 'preview'
  const [formTitle, setFormTitle] = useState('Application Form Template');
  const [formDescription, setFormDescription] = useState('This is a reusable application form template that can be attached to any job posting.');
  
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
    {
      id: 'cover_letter',
      type: 'textarea',
      label: 'Cover Letter',
      placeholder: 'Write your cover letter here',
      required: false,
      options: [],
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

  // Save the form template
  const saveForm = () => {
    // Here you would typically save to your backend
    const formData = {
      formTitle,
      formDescription,
      formFields,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    console.log('Form template to save:', formData);
    // API call would go here
    
    alert('Application form template saved successfully!');
    navigate('/dashboard/recruiter/application-forms');
  };

  return (
    <RecruiterDashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Create Application Form Template</h1>
          <p className="text-[#94a3b8]">Design reusable application forms for your job postings</p>
        </div>
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
        </div>
      </div>

      {activeTab === 'editor' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Settings */}
          <div className="lg:col-span-1">
            <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
              <h2 className="text-lg font-medium text-white mb-4">Form Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[#94a3b8] mb-1">Form Title</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] p-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                    placeholder="Enter form title"
                  />
                </div>
                
                <div>
                  <label className="block text-[#94a3b8] mb-1">Form Description</label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full bg-[#0f172a] text-white rounded-lg border border-[#334155] p-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                    placeholder="Enter form description"
                    rows="3"
                  ></textarea>
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
              </div>
            </div>
            
            <div className="mt-6">
              <button
                onClick={saveForm}
                className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center"
              >
                <FaSave className="mr-2" /> Save Form Template
              </button>
            </div>
          </div>
          
          {/* Form Builder */}
          <div className="lg:col-span-2">
            <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
              <h2 className="text-lg font-medium text-white mb-4">Form Builder</h2>
              
              {formFields.length === 0 ? (
                <div className="text-center py-8 text-[#94a3b8]">
                  <p>No fields added yet. Use the buttons on the left to add form fields.</p>
                </div>
              ) : (
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
                            onClick={() => removeField(field.id)}
                            className="p-1 text-red-400 hover:text-red-500 rounded"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                      
                      <FormFieldEditor 
                        field={field}
                        onUpdate={(updatedField) => updateField(field.id, updatedField)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
          <h2 className="text-lg font-medium text-white mb-4">Form Preview</h2>
          <FormPreview 
            formTitle={formTitle}
            formDescription={formDescription}
            formFields={formFields}
          />
        </div>
      )}
    </RecruiterDashboardLayout>
  );
};

export default CreateApplicationForm;