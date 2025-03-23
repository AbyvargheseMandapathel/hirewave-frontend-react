import React from 'react';

const OtpInput = ({ otp, setOtp, length = 6 }) => {
  const handleChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (!/^\d+$/.test(pastedData)) return;
    const digits = pastedData.slice(0, length).split('');
    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      if (index < length) newOtp[index] = digit;
    });
    setOtp(newOtp);
    for (let i = digits.length; i < length; i++) {
      const nextInput = document.getElementById(`otp-${i}`);
      if (nextInput) {
        nextInput.focus();
        break;
      }
      if (i === length - 1) document.getElementById(`otp-${length - 1}`).focus();
    }
  };

  return (
    <div className="flex justify-between gap-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          id={`otp-${index}`}
          type="text"
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={index === 0 ? handlePaste : undefined}
          maxLength={1}
          className="w-12 h-12 text-center text-xl bg-[#0f172a] text-white rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
        />
      ))}
    </div>
  );
};

export default OtpInput;