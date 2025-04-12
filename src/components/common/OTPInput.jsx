import React from 'react';

const OTPInput = ({ otp, onChange, onKeyDown, onPaste }) => {
  // Add a safety check to ensure onChange is a function
  const handleChange = (index, value) => {
    if (typeof onChange === 'function') {
      onChange(index, value);
    } else {
      console.error('onChange prop is not a function');
    }
  };

  return (
    <div className="flex justify-between mb-6">
      {otp.map((digit, index) => (
        <input
          key={index}
          id={`otp-${index}`}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => typeof onKeyDown === 'function' ? onKeyDown(index, e) : null}
          onPaste={index === 0 && typeof onPaste === 'function' ? onPaste : undefined}
          className="w-12 h-12 text-center text-xl font-bold bg-[#1e293b] border border-[#334155] rounded-lg focus:border-[#818cf8] focus:ring-1 focus:ring-[#818cf8] text-white"
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
};

export default OTPInput;