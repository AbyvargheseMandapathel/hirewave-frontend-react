import React from 'react';
import Button from './Button';

const SocialLoginButtons = () => {
  return (
    <div className="mt-6 grid grid-cols-2 gap-3">
      <Button
        type="button"
        className="w-full inline-flex justify-center py-2 px-4 border border-[#334155] rounded-lg bg-[#0f172a] text-sm font-medium text-[#94a3b8] hover:bg-[#1e293b]"
      >
        Google
      </Button>
      <Button
        type="button"
        className="w-full inline-flex justify-center py-2 px-4 border border-[#334155] rounded-lg bg-[#0f172a] text-sm font-medium text-[#94a3b8] hover:bg-[#1e293b]"
      >
        GitHub
      </Button>
    </div>
  );
};

export default SocialLoginButtons;