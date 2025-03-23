import React from 'react';

const InputField = ({
  id,
  type,
  value,
  onChange,
  placeholder,
  icon,
  maxLength,
  onKeyDown,
  onPaste,
  className,
}) => {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`bg-[#0f172a] text-white w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-3 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent ${className}`}
      />
    </div>
  );
};

export default InputField;