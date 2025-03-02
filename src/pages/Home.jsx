import React from 'react';
import HeroHeading from '../components/HeroHeading/HeroHeading';
import JobsGrid from '../components/JobsGrid/JobsGrid';

const Home = () => {
  const jobs = [
    {
      id:'1',
      title: "Senior React Developer",
      company: "Tech Corp",
      location: "Remote",
      salary: "$120k - $150k",
      type: "Full-time"
    },
    {
      id:'2',
      title: "UX Designer",
      company: "Digital Agency",
      location: "New York",
      salary: "$80k - $100k",
      type: "Contract"
    },
    {
      id:'3',
      title: "DevOps Engineer",
      company: "Cloud Solutions",
      location: "London",
      salary: "£70k - £90k",
      type: "Full-time"
    },
    {
      id:'4',
      title: "Product Manager",
      company: "StartUp Hub",
      location: "San Francisco",
      salary: "$130k - $160k",
      type: "Full-time"
    },
    {
      id:'5',
      title: "Data Scientist",
      company: "AI Innovations",
      location: "Berlin",
      salary: "€65k - €85k",
      type: "Part-time"
    },
    {
      id:'6',
      title: "Mobile Developer",
      company: "App Masters",
      location: "Toronto",
      salary: "$95k - $115k",
      type: "Contract"
    }
  ];

  return (
    <div className="p-6 md:p-10">
      <HeroHeading />
      <JobsGrid jobs={jobs} />
    </div>
  );
};

export default Home;