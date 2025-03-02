import React from 'react';
import { FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaBriefcase } from 'react-icons/fa';

const Home = () => {
  // Sample job data
  const jobs = [
    {
      title: "Senior React Developer",
      company: "Tech Corp",
      location: "Remote",
      salary: "$120k - $150k",
      type: "Full-time"
    },
    {
      title: "UX Designer",
      company: "Digital Agency",
      location: "New York",
      salary: "$80k - $100k",
      type: "Contract"
    },
    {
      title: "DevOps Engineer",
      company: "Cloud Solutions",
      location: "London",
      salary: "£70k - £90k",
      type: "Full-time"
    },
    {
      title: "Product Manager",
      company: "StartUp Hub",
      location: "San Francisco",
      salary: "$130k - $160k",
      type: "Full-time"
    },
    {
      title: "Data Scientist",
      company: "AI Innovations",
      location: "Berlin",
      salary: "€65k - €85k",
      type: "Part-time"
    },
    {
      title: "Mobile Developer",
      company: "App Masters",
      location: "Toronto",
      salary: "$95k - $115k",
      type: "Contract"
    }
  ];

  return (
    <div className="p-6 md:p-10">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
        Find Your{' '}
        <span className="bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] bg-clip-text text-transparent">
          Dream Job
        </span>
      </h1>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job, index) => (
          <div key={index} className="bg-[#1e293b] rounded-lg p-6 hover:transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <FaBuilding className="text-[#94a3b8] w-8 h-8" />
              <span className="text-sm bg-[#334155] text-[#94a3b8] px-3 py-1 rounded-full">
                {job.type}
              </span>
            </div>
            
            <h2 className="text-xl font-semibold text-white mb-2">{job.title}</h2>
            <p className="text-[#94a3b8] mb-4">{job.company}</p>
            
            <div className="space-y-2">
              <div className="flex items-center text-[#94a3b8]">
                <FaMapMarkerAlt className="mr-2" />
                {job.location}
              </div>
              <div className="flex items-center text-[#94a3b8]">
                <FaMoneyBillWave className="mr-2" />
                {job.salary}
              </div>
              <div className="flex items-center text-[#94a3b8]">
                <FaBriefcase className="mr-2" />
                {job.type}
              </div>
            </div>
            
            <button className="mt-4 w-full bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] text-white py-2 rounded-lg hover:from-[#a5b4fc] hover:to-[#818cf8] transition-all duration-300">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;