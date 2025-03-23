import React from 'react';

const InputField = ({
  id,
  name,
  type,
  value,
  onChange,
  placeholder,
  icon,
  label,
  required,
  className = "", // Add default empty className prop
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-white mb-2">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`bg-[#0f172a] text-white w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent`}
        />
      </div>
    </div>
  );
};

export default InputField;