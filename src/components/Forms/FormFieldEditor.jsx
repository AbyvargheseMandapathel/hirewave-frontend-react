import React from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';

const FormFieldEditor = ({ field, updateField, removeField }) => {
  return (
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
      
      <div className="pt-2 flex justify-end">
        <button
          onClick={() => removeField(field.id)}
          className="px-3 py-1 bg-red-900 text-red-300 rounded-lg hover:bg-red-800 text-sm flex items-center"
        >
          <FaTrash className="mr-1" /> Remove Field
        </button>
      </div>
    </div>
  );
};

export default FormFieldEditor;