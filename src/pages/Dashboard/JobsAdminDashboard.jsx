import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import DashboardStats from '../../components/Dashboard/DashboardStats';
import JobsTable from '../../components/Dashboard/JobsTable';
import JobsStatusChart from '../../components/Dashboard/JobsStatusChart';
import JobsActivityLog from '../../components/Dashboard/JobsActivityLog';
import { FaFilter, FaDownload, FaUserTie, FaBuilding, FaEye, FaThumbsUp } from 'react-icons/fa';

const JobsAdminDashboard = () => {
  const [jobsData, setJobsData] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'admin', 'recruiter'
  
  // Generate jobs data
  useEffect(() => {
    const generateJobsData = () => {
      // Sample jobs data with additional fields for tracking
      const data = [
        { 
          id: 1, 
          title: 'Senior React Developer', 
          company: 'Tech Corp', 
          status: 'External', 
          date: 'Mar 15, 2023', 
          views: 342,
          interested: 48,
          postedBy: 'admin',
          externalLink: 'https://example.com/job/1'
        },
        { 
          id: 2, 
          title: 'UX Designer', 
          company: 'Digital Agency', 
          status: 'External', 
          date: 'Mar 12, 2023', 
          views: 287,
          interested: 32,
          postedBy: 'admin',
          externalLink: 'https://example.com/job/2'
        },
        // ... existing code ...
        { 
          id: 3, 
          title: 'DevOps Engineer', 
          company: 'Cloud Solutions', 
          applicants: 9, 
          status: 'Closed', 
          date: 'Mar 10, 2023', 
          views: 198,
          interested: 15,
          applications: 9,
          postedBy: 'recruiter',
          recruiterName: 'John Smith'
        },
        
        { 
          id: 6, 
          title: 'Mobile Developer', 
          company: 'App Masters', 
          status: 'External', 
          date: 'Mar 03, 2023', 
          views: 321,
          interested: 38,
          postedBy: 'admin',
          externalLink: 'https://example.com/job/6'
        },
        { 
          id: 9, 
          title: 'Marketing Specialist', 
          company: 'Growth Hackers', 
          status: 'External', 
          date: 'Feb 25, 2023', 
          views: 302,
          interested: 35,
          postedBy: 'admin',
          externalLink: 'https://example.com/job/9'
        },
        {
            "id": 10,
            "title": "Software Engineer",
            "company": "Tech Innovators",
            "applicants": 25,
            "status": "Open",
            "date": "Mar 15, 2023",
            "views": 320,
            "interested": 45,
            "applications": 20,
            "postedBy": "recruiter",
            "recruiterName": "Alice Johnson"
          },
          {
            "id": 11,
            "title": "Frontend Developer",
            "company": "Web Solutions",
            "applicants": 15,
            "status": "Open",
            "date": "Mar 18, 2023",
            "views": 290,
            "interested": 30,
            "applications": 12,
            "postedBy": "recruiter",
            "recruiterName": "David Brown"
          },
          {
            "id": 12,
            "title": "Data Scientist",
            "company": "AI Labs",
            "applicants": 18,
            "status": "Closed",
            "date": "Mar 20, 2023",
            "views": 410,
            "interested": 35,
            "applications": 18,
            "postedBy": "recruiter",
            "recruiterName": "Sophia White"
          },
          {
            "id": 13,
            "title": "Backend Developer",
            "company": "Cloud Tech",
            "applicants": 22,
            "status": "Open",
            "date": "Mar 22, 2023",
            "views": 275,
            "interested": 40,
            "applications": 22,
            "postedBy": "recruiter",
            "recruiterName": "Michael Lee"
          },
          {
            "id": 14,
            "title": "Cybersecurity Analyst",
            "company": "SecureNet",
            "applicants": 10,
            "status": "Closed",
            "date": "Mar 25, 2023",
            "views": 150,
            "interested": 20,
            "applications": 10,
            "postedBy": "recruiter",
            "recruiterName": "Emma Davis"
          },
          {
            "id": 15,
            "title": "Cloud Engineer",
            "company": "Cloud Solutions",
            "applicants": 17,
            "status": "Paused",
            "date": "Mar 27, 2023",
            "views": 230,
            "interested": 28,
            "applications": 17,
            "postedBy": "recruiter",
            "recruiterName": "John Smith"
          }, 
      ];
      
      setJobsData(data);
    };
    
    generateJobsData();
  }, []);
  
  // Filter jobs based on active tab
  const filteredJobs = activeTab === 'all' 
    ? jobsData 
    : jobsData.filter(job => job.postedBy === activeTab);
  
  // Jobs stats data
  const statsData = [
    { 
      title: 'Total Jobs', 
      value: jobsData.length.toString(), 
      change: '+12%', 
      isPositive: true,
      icon: <FaBuilding className="text-[#818cf8] text-xl" />
    },
    { 
      title: 'Total Views', 
      value: jobsData.reduce((sum, job) => sum + job.views, 0).toLocaleString(), 
      change: '+18%', 
      isPositive: true,
      icon: <FaEye className="text-[#818cf8] text-xl" />
    },
    { 
      title: 'Interested Users', 
      value: jobsData.reduce((sum, job) => sum + job.interested, 0).toLocaleString(), 
      change: '+24%', 
      isPositive: true,
      icon: <FaThumbsUp className="text-[#818cf8] text-xl" />
    },
    { 
      title: 'Applications', 
      value: jobsData.reduce((sum, job) => job.postedBy === 'recruiter' ? sum + (job.applications || 0) : sum, 0).toLocaleString(), 
      change: '+15%', 
      isPositive: true,
      icon: <FaUserTie className="text-[#818cf8] text-xl" />
    },
  ];
  
  // Recent job activities
  const jobActivities = [
    { 
      id: 1, 
      type: 'job_posted', 
      title: 'Job Posted', 
      description: 'Senior React Developer', 
      time: '2 hours ago' 
    },
    { 
      id: 2, 
      type: 'job_updated', 
      title: 'Job Updated', 
      description: 'UX Designer', 
      time: '3 hours ago' 
    },
    { 
      id: 3, 
      type: 'job_closed', 
      title: 'Job Closed', 
      description: 'DevOps Engineer', 
      time: '1 day ago' 
    },
    { 
      id: 4, 
      type: 'job_paused', 
      title: 'Job Paused', 
      description: 'Data Scientist', 
      time: '2 days ago' 
    },
    { 
      id: 5, 
      type: 'job_reactivated', 
      title: 'Job Reactivated', 
      description: 'Marketing Specialist', 
      time: '3 days ago' 
    },
    { 
      id: 6, 
      type: 'job_posted', 
      title: 'Job Posted', 
      description: 'Frontend Developer', 
      time: '4 days ago' 
    },
  ];
  
  
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Jobs Dashboard</h1>
          <p className="text-[#94a3b8]">Manage and monitor all job postings across your platform</p>
        </div>
        
        {/* Jobs Stats */}
        <DashboardStats stats={statsData} />
        
        {/* Filter Tabs */}
        <div className="flex mb-6 bg-[#1e293b] rounded-lg p-1 w-fit">
          <button
            className={`px-4 py-2 rounded-md ${activeTab === 'all' ? 'bg-[#334155] text-white' : 'text-[#94a3b8]'}`}
            onClick={() => setActiveTab('all')}
          >
            All Jobs
          </button>
          <button
            className={`px-4 py-2 rounded-md flex items-center ${activeTab === 'admin' ? 'bg-[#334155] text-white' : 'text-[#94a3b8]'}`}
            onClick={() => setActiveTab('admin')}
          >
            <FaBuilding className="mr-2" /> Admin Posted
          </button>
          <button
            className={`px-4 py-2 rounded-md flex items-center ${activeTab === 'recruiter' ? 'bg-[#334155] text-white' : 'text-[#94a3b8]'}`}
            onClick={() => setActiveTab('recruiter')}
          >
            <FaUserTie className="mr-2" /> Recruiter Posted
          </button>
        </div>
        
        {/* Jobs Table and Activity Log */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <JobsTable 
              jobs={filteredJobs} 
              showPostedBy={true} 
              showApplicants={activeTab !== 'admin'} 
              showStatus={true} // Always show status column
            />
          </div>
          <div>
            <JobsActivityLog activities={jobActivities} showUser={true} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobsAdminDashboard;