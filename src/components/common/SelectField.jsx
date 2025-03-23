import React from 'react';

const SelectField = ({
  id,
  name,
  value,
  onChange,
  icon,
  label,
  required,
  options,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-white mb-2">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="bg-[#0f172a] text-white w-full pl-10 pr-3 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent appearance-none"
        >
          <option value="" disabled>Select {label}</option>
          {options.map((option) => (
            <option key={option.value || option} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectField;