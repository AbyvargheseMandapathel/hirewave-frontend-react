import React, { useState, useEffect } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import './Popup.css'; 

const InputPopup = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title = 'Enter value', 
  placeholder = '',
  initialValue = '',
  type = 'text'
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (isOpen) {
      setValue(initialValue);
    }
  }, [isOpen, initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container bg-[#1e293b] border border-[#334155]">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white text-lg font-medium">{title}</h3>
            <button 
              onClick={onClose}
              className="text-[#94a3b8] hover:text-white"
            >
              <FaTimesCircle />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <input
              type={type}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-[#0f172a] text-white px-4 py-2 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent mb-4"
              placeholder={placeholder}
              autoFocus
            />
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-[#334155] text-white hover:bg-[#475569]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] text-white hover:from-[#a5b4fc] hover:to-[#818cf8]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputPopup;