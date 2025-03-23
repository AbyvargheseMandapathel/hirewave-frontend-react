import React, { useState } from 'react';
import { FaCheck, FaMoon, FaSun, FaDesktop, FaFont, FaPalette } from 'react-icons/fa';

const AppearanceSettings = () => {
  const [appearance, setAppearance] = useState({
    theme: 'dark',
    fontSize: 'medium',
    colorScheme: 'indigo',
    reducedMotion: false,
    sidebarCollapsed: false
  });

  const handleChange = (field, value) => {
    setAppearance(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Appearance settings saved:', appearance);
    // Save appearance settings
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Appearance Settings</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-white mb-4">Theme</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleChange('theme', 'light')}
            className={`p-4 rounded-lg border ${
              appearance.theme === 'light'
                ? 'border-[#818cf8] bg-[#0f172a]'
                : 'border-[#334155] bg-[#1e293b]'
            } flex flex-col items-center`}
          >
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-2">
              <FaSun className="text-yellow-500 text-xl" />
            </div>
            <span className="text-white font-medium">Light</span>
            <span className="text-[#94a3b8] text-xs mt-1">Light mode interface</span>
          </button>
          
          <button
            onClick={() => handleChange('theme', 'dark')}
            className={`p-4 rounded-lg border ${
              appearance.theme === 'dark'
                ? 'border-[#818cf8] bg-[#0f172a]'
                : 'border-[#334155] bg-[#1e293b]'
            } flex flex-col items-center`}
          >
            <div className="w-12 h-12 rounded-full bg-[#0f172a] flex items-center justify-center mb-2">
              <FaMoon className="text-[#818cf8] text-xl" />
            </div>
            <span className="text-white font-medium">Dark</span>
            <span className="text-[#94a3b8] text-xs mt-1">Dark mode interface</span>
          </button>
          
          <button
            onClick={() => handleChange('theme', 'system')}
            className={`p-4 rounded-lg border ${
              appearance.theme === 'system'
                ? 'border-[#818cf8] bg-[#0f172a]'
                : 'border-[#334155] bg-[#1e293b]'
            } flex flex-col items-center`}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-white to-[#0f172a] flex items-center justify-center mb-2">
              <FaDesktop className="text-[#818cf8] text-xl" />
            </div>
            <span className="text-white font-medium">System</span>
            <span className="text-[#94a3b8] text-xs mt-1">Follow system preference</span>
          </button>
        </div>
      </div>
      
      <div className="mb-8 border-t border-[#334155] pt-8">
        <h3 className="text-lg font-medium text-white mb-4">Font Size</h3>
        <div className="bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
          <div className="flex items-center mb-4">
            <FaFont className="text-[#818cf8] mr-2" />
            <span className="text-white font-medium">Text Size</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleChange('fontSize', 'small')}
              className={`px-4 py-2 rounded-lg ${
                appearance.fontSize === 'small'
                  ? 'bg-[#334155] text-white'
                  : 'text-[#94a3b8] hover:bg-[#1e293b]'
              }`}
            >
              <span className="text-sm">Small</span>
            </button>
            
            <button
              onClick={() => handleChange('fontSize', 'medium')}
              className={`px-4 py-2 rounded-lg ${
                appearance.fontSize === 'medium'
                  ? 'bg-[#334155] text-white'
                  : 'text-[#94a3b8] hover:bg-[#1e293b]'
              }`}
            >
              <span className="text-base">Medium</span>
            </button>
            
            <button
              onClick={() => handleChange('fontSize', 'large')}
              className={`px-4 py-2 rounded-lg ${
                appearance.fontSize === 'large'
                  ? 'bg-[#334155] text-white'
                  : 'text-[#94a3b8] hover:bg-[#1e293b]'
              }`}
            >
              <span className="text-lg">Large</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-8 border-t border-[#334155] pt-8">
        <h3 className="text-lg font-medium text-white mb-4">Color Scheme</h3>
        <div className="bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
          <div className="flex items-center mb-4">
            <FaPalette className="text-[#818cf8] mr-2" />
            <span className="text-white font-medium">Accent Color</span>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <button
              onClick={() => handleChange('colorScheme', 'indigo')}
              className={`p-2 rounded-lg border ${
                appearance.colorScheme === 'indigo'
                  ? 'border-white'
                  : 'border-transparent'
              }`}
            >
              <div className="w-full h-8 bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] rounded-md"></div>
              <span className="text-[#94a3b8] text-xs mt-1 block text-center">Indigo</span>
            </button>
            
            <button
              onClick={() => handleChange('colorScheme', 'blue')}
              className={`p-2 rounded-lg border ${
                appearance.colorScheme === 'blue'
                  ? 'border-white'
                  : 'border-transparent'
              }`}
            >
              <div className="w-full h-8 bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] rounded-md"></div>
              <span className="text-[#94a3b8] text-xs mt-1 block text-center">Blue</span>
            </button>
            
            <button
              onClick={() => handleChange('colorScheme', 'purple')}
              className={`p-2 rounded-lg border ${
                appearance.colorScheme === 'purple'
                  ? 'border-white'
                  : 'border-transparent'
              }`}
            >
              <div className="w-full h-8 bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] rounded-md"></div>
              <span className="text-[#94a3b8] text-xs mt-1 block text-center">Purple</span>
            </button>
            
            <button
              onClick={() => handleChange('colorScheme', 'teal')}
              className={`p-2 rounded-lg border ${
                appearance.colorScheme === 'teal'
                  ? 'border-white'
                  : 'border-transparent'
              }`}
            >
              <div className="w-full h-8 bg-gradient-to-r from-[#14b8a6] to-[#2dd4bf] rounded-md"></div>
              <span className="text-[#94a3b8] text-xs mt-1 block text-center">Teal</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-8 border-t border-[#334155] pt-8">
        <h3 className="text-lg font-medium text-white mb-4">Accessibility</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
            <div>
              <h4 className="text-white font-medium">Reduced Motion</h4>
              <p className="text-[#94a3b8] text-sm mt-1">
                Minimize animations throughout the interface
              </p>
            </div>
            <button
              onClick={() => handleChange('reducedMotion', !appearance.reducedMotion)}
              className="text-2xl text-[#818cf8] focus:outline-none"
            >
              {appearance.reducedMotion ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
          
          <div className="flex items-center justify-between bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
            <div>
              <h4 className="text-white font-medium">Collapsed Sidebar</h4>
              <p className="text-[#94a3b8] text-sm mt-1">
                Start with sidebar collapsed by default
              </p>
            </div>
            <button
              onClick={() => handleChange('sidebarCollapsed', !appearance.sidebarCollapsed)}
              className="text-2xl text-[#818cf8] focus:outline-none"
            >
              {appearance.sidebarCollapsed ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] text-white py-2 px-6 rounded-lg hover:from-[#a5b4fc] hover:to-[#818cf8] transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#818cf8] focus:ring-offset-[#1e293b]"
        >
          <FaCheck className="mr-2" /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default AppearanceSettings;