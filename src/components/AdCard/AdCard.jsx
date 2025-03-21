import React from 'react';

const AdCard = () => {
  return (
    <div className="bg-gradient-to-br from-[#818cf8] to-[#a5b4fc] p-6 rounded-xl shadow-lg text-white">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold mb-2">Hiring Fast?</h3>
        <p className="text-sm opacity-90">Post your job to 1M+ qualified candidates</p>
      </div>
      <div className="bg-white/10 p-4 rounded-lg mb-4">
        <div className="aspect-video bg-white/20 rounded-lg animate-pulse" />
      </div>
      <button className="w-full bg-white text-[#818cf8] py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 font-semibold">
        Post a Job
      </button>
    </div>
  );
};

export default AdCard;