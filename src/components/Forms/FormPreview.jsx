import React from 'react';

const FormPreview = ({ formTitle, formDescription, jobDetails, formFields }) => {
  return (
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
        
        {/* Job Description Section */}
        {jobDetails.description && (
          <div className="mt-4">
            <h4 className="text-white font-medium mb-2">Job Description</h4>
            <div className="text-[#94a3b8] whitespace-pre-line">
              {jobDetails.description}
            </div>
          </div>
        )}
        
        {/* Job Requirements Section */}
        {jobDetails.requirements && (
          <div className="mt-4">
            <h4 className="text-white font-medium mb-2">Requirements</h4>
            <div className="text-[#94a3b8] whitespace-pre-line">
              {jobDetails.requirements}
            </div>
          </div>
        )}
        
        {/* Job Benefits Section */}
        {jobDetails.benefits && (
          <div className="mt-4">
            <h4 className="text-white font-medium mb-2">Benefits</h4>
            <div className="text-[#94a3b8] whitespace-pre-line">
              {jobDetails.benefits}
            </div>
          </div>
        )}
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
            
            {field.type === 'time' && (
              <input
                type="time"
                className="w-full bg-[#1e293b] text-white rounded-lg border border-[#334155] p-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                required={field.required}
              />
            )}
            
            {field.type === 'url' && (
              <input
                type="url"
                placeholder={field.placeholder}
                className="w-full bg-[#1e293b] text-white rounded-lg border border-[#334155] p-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                required={field.required}
              />
            )}
            
            {field.type === 'color' && (
              <input
                type="color"
                className="h-10 w-full bg-[#1e293b] rounded-lg border border-[#334155] p-1 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                required={field.required}
              />
            )}
            
            {field.type === 'range' && (
              <div>
                <input
                  type="range"
                  min={field.min || 0}
                  max={field.max || 100}
                  step={field.step || 1}
                  className="w-full bg-[#1e293b] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                  required={field.required}
                />
                <div className="flex justify-between text-xs text-[#94a3b8] mt-1">
                  <span>{field.min || 0}</span>
                  <span>{field.max || 100}</span>
                </div>
              </div>
            )}
            
            {field.type === 'password' && (
              <input
                type="password"
                placeholder={field.placeholder}
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
                      id={`preview-${field.id}-${i}`}
                      className="h-4 w-4 rounded border-[#334155] bg-[#1e293b] text-[#818cf8] focus:ring-[#818cf8]"
                    />
                    <label htmlFor={`preview-${field.id}-${i}`} className="ml-2 text-[#94a3b8]">
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
                      id={`preview-${field.id}-${i}`}
                      name={`preview-${field.id}`}
                      className="h-4 w-4 border-[#334155] bg-[#1e293b] text-[#818cf8] focus:ring-[#818cf8]"
                    />
                    <label htmlFor={`preview-${field.id}-${i}`} className="ml-2 text-[#94a3b8]">
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
            
            {field.type === 'datetime-local' && (
              <input
                type="datetime-local"
                className="w-full bg-[#1e293b] text-white rounded-lg border border-[#334155] p-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                required={field.required}
              />
            )}
            
            {field.type === 'month' && (
              <input
                type="month"
                className="w-full bg-[#1e293b] text-white rounded-lg border border-[#334155] p-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                required={field.required}
              />
            )}
            
            {field.type === 'week' && (
              <input
                type="week"
                className="w-full bg-[#1e293b] text-white rounded-lg border border-[#334155] p-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                required={field.required}
              />
            )}
            
            {field.type === 'hidden' && (
              <p className="text-xs text-[#64748b]">
                This field is hidden from applicants but will be included in form submissions.
              </p>
            )}
          </div>
        ))}
        
        <div className="flex justify-end">
          <button
            type="button" // Changed to button to prevent form submission in preview
            className="px-6 py-2 bg-[#818cf8] text-white rounded-lg hover:bg-[#6366f1]"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPreview;