import React from 'react';
import InputField from './InputField';

const OTPInput = ({ otp, handleOtpChange, handleKeyDown, handlePaste }) => {
  return (
    <div className="flex justify-between gap-2">
      {otp.map((digit, index) => (
        <InputField
          key={index}
          id={`otp-${index}`}
          type="text"
          value={digit}
          onChange={(e) => handleOtpChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={index === 0 ? handlePaste : undefined}
          maxLength={1}
          className="w-12 h-12 text-center text-xl"
        />
      ))}
    </div>
  );
};

export default OTPInput;