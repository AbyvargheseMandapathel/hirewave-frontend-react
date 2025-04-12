import React, { useState, useEffect } from 'react';
import featureFlags from '../../config/featureFlags';

const FeatureFlagsPanel = () => {
  const [flags, setFlags] = useState({...featureFlags});
  const [isDev, setIsDev] = useState(false);
  
  useEffect(() => {
    // Check if we're in development environment
    setIsDev(import.meta.env.MODE === 'development');
    
    // Load any saved flags from localStorage in development
    if (import.meta.env.MODE === 'development') {
      const savedFlags = localStorage.getItem('devFeatureFlags');
      if (savedFlags) {
        setFlags(JSON.parse(savedFlags));
      }
    }
  }, []);
  
  const handleToggle = (flag) => {
    const newFlags = { ...flags, [flag]: !flags[flag] };
    setFlags(newFlags);
    
    // Save to localStorage in development
    if (import.meta.env.MODE === 'development') {
      localStorage.setItem('devFeatureFlags', JSON.stringify(newFlags));
      // Force reload to apply changes
      window.location.reload();
    }
  };
  
  // Only show in development environment
  if (!isDev) {
    return <div className="p-6 text-center">Feature flags panel is only available in development mode.</div>;
  }
  
  return (
    <div className="p-6 bg-[#1e293b] rounded-xl shadow-lg border border-[#334155]">
      <h2 className="text-xl font-bold text-white mb-4">Feature Flags Panel (Development Only)</h2>
      <p className="text-[#94a3b8] mb-4">Toggle features on/off for development testing. Changes will apply after page reload.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(flags).map((flag) => (
          <div key={flag} className="flex items-center justify-between p-3 bg-[#0f172a] rounded-lg">
            <div>
              <span className="text-white">{flag}</span>
              <p className="text-xs text-[#94a3b8]">
                {flags[flag] ? 'Enabled' : 'Disabled'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={flags[flag]}
                onChange={() => handleToggle(flag)}
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#818cf8]"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureFlagsPanel;