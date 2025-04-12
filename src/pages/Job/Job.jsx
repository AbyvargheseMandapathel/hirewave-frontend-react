// src/pages/Job.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import JobDetails from '../../components/JobDetails/JobDetails';

// Temporary data - replace with API call
const jobs = [
  {
    id: '1',
    title: "Senior React Developer",
    company: "Tech Corp",
    location: "Remote",
    salary: "$120k - $150k",
    type: "Full-time",
    posted: "2d ago",
    description: "We're looking for a talented React developer to join our growing team...",
    requirements: [
      "5+ years of React experience",
      "Proficient with TypeScript",
      "Experience with Redux",
      "Strong understanding of REST APIs"
    ],
    externalLink: "https://techcorp.com/careers/senior-react-developer"
  },
  {
    id: '2',
    title: "UX Designer",
    company: "Digital Agency",
    location: "New York",
    salary: "$80k - $100k",
    type: "Contract",
    posted: "3d ago",
    description: "Join our creative team as a UX Designer and help shape the future of our products...",
    requirements: [
      "3+ years of UX/UI design experience",
      "Expert in Adobe XD or Sketch",
      "Understanding of user research methods",
      "Strong communication skills"
    ]
  },
  {
    id: '3',
    title: "DevOps Engineer",
    company: "Cloud Solutions",
    location: "London",
    salary: "£70k - £90k",
    type: "Full-time",
    posted: "1d ago",
    description: "As a DevOps Engineer, you will be responsible for automating and streamlining our development processes...",
    requirements: [
      "Experience with CI/CD pipelines",
      "Proficient in Docker and Kubernetes",
      "Experience with cloud platforms like AWS or Azure",
      "Understanding of security best practices"
    ]
  },
  {
    id: '4',
    title: "Product Manager",
    company: "StartUp Hub",
    location: "San Francisco",
    salary: "$130k - $160k",
    type: "Full-time",
    posted: "4d ago",
    description: "Lead our product development team and drive the vision for our next big product...",
    requirements: [
      "5+ years of product management experience",
      "Strong technical background",
      "Experience in agile methodologies",
      "Proven track record of successful product launches"
    ],
    externalLink: "https://techcorp.com/careers/senior-react-developer2"
  },
  {
    id: '5',
    title: "Data Scientist",
    company: "AI Innovations",
    location: "Berlin",
    salary: "€65k - €85k",
    type: "Part-time",
    posted: "5d ago",
    description: "Conduct data analysis and develop machine learning models to drive business insights...",
    requirements: [
      "PhD in Data Science or related field",
      "Experience with Python or R",
      "Knowledge of machine learning algorithms",
      "Ability to work independently"
    ],
    externalLink: "https://techcorp.com/careers/senior-react-developer1"
  },
  {
    id: '6',
    title: "Mobile Developer",
    company: "App Masters",
    location: "Toronto",
    salary: "$95k - $115k",
    type: "Contract",
    posted: "6d ago",
    description: "Develop high-quality mobile applications for our clients...",
    requirements: [
      "3+ years of mobile development experience",
      "Proficient in Swift or Kotlin",
      "Experience with mobile design patterns",
      "Understanding of mobile security"
    ],
    externalLink: "https://techcorp.com/careers/senior-react-developer"
  }
];

const Job = () => {
  const { id } = useParams();
  const job = jobs.find(job => job.id === id);
  
  return (
    <JobDetails 
      job={job}
      jobs={jobs} // Pass all jobs for filtering
    />
  );
};

export default Job;


// Find the Apply Now button in your Job.jsx file and replace it with:

// Import the ProtectedApplyButton at the top of the file
