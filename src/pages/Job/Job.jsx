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
    ]
  },
  // Add other jobs
];

const Job = () => {
  const { id } = useParams();
  const job = jobs.find(job => job.id === id);

  if (!job) return <div>Job not found</div>;

  return <JobDetails job={job} />;
};

export default Job;