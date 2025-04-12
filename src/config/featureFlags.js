// Feature flags configuration
// Set to true to enable the feature in production, false to disable

const featureFlags = {
  // Admin features
  adminDashboard: true,
  financialDashboard: false,
  jobsAdminDashboard: true,
  usersManagement: true,
  blogAdmin: false,
  
  // Recruiter features
  recruiterDashboard: true,
  recruiterJobs: true,
  recruiterCandidates: true,
  recruiterInterviews: false,
  recruiterApplications: false,
  dynamicJobForm: false,
  multiStepJobCreation: true,
  applicationFormBuilder: false,
  
  // Jobseeker features
  jobseekerBlog: false,
  
  // General features
  referAndWin: false,
};

export default featureFlags;