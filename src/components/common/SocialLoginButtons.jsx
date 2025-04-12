import React from 'react';
import { FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa';

const SocialLoginButtons = () => {
  // Check if social login is enabled via environment variable
  const isSocialLoginEnabled = import.meta.env.VITE_ENABLE_SOCIAL_LOGIN === 'true';
  
  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic here
  };

  // If social login is disabled, don't render the component
  if (!isSocialLoginEnabled) {
    return null;
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => handleSocialLogin('Google')}
        className="w-full flex items-center justify-center py-2.5 px-4 bg-transparent border border-[#334155] rounded-lg hover:bg-[#1e293b] transition-colors text-white"
      >
        <FaGoogle className="text-red-500 mr-3" />
        Continue with Google
      </button>
      
      <button
        type="button"
        onClick={() => handleSocialLogin('GitHub')}
        className="w-full flex items-center justify-center py-2.5 px-4 bg-transparent border border-[#334155] rounded-lg hover:bg-[#1e293b] transition-colors text-white"
      >
        <FaGithub className="text-white mr-3" />
        Continue with GitHub
      </button>
      
      <button
        type="button"
        onClick={() => handleSocialLogin('LinkedIn')}
        className="w-full flex items-center justify-center py-2.5 px-4 bg-transparent border border-[#334155] rounded-lg hover:bg-[#1e293b] transition-colors text-white"
      >
        <FaLinkedin className="text-blue-500 mr-3" />
        Continue with LinkedIn
      </button>
    </div>
  );
};

export default SocialLoginButtons;