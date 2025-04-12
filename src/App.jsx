import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ReferAndWin from './pages/ReferAndWin';
import Feedback from './pages/Feedback';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Job from './pages/Job/Job';
import AddJobUpdate from './pages/AddJobUpdate';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import FinancialDashboard from './pages/Dashboard/FinancialDashboard';
import JobsAdminDashboard from './pages/Dashboard/JobsAdminDashboard';
import JobDetailPage from './components/Dashboard/JobDetailsCard';
import UsersDashboard from './pages/Dashboard/UsersDashboard';
import Settings from './pages/Settings/Settings';
import RecruiterSignup from './pages/RecruiterSignup';
import BlogAdminDashboard from './pages/Dashboard/BlogAdminDashboard';
import BlogPostCreate from './pages/Dashboard/BlogPostCreate';
import BlogPostEdit from './pages/Dashboard/BlogPostEdit';
import BlogPostView from './pages/Dashboard/BlogPostView';
import BlogDashboard from './pages/Dashboard/BlogDashboard';
import JobseekerBlog from './pages/Jobseeker/JobseekerBlog';
import RecruiterDashboard from './pages/Dashboard/RecruiterDashboard';
import DynamicJobForm from './pages/Dashboard/DynamicJobForm';
import RecruiterJobs from './pages/Dashboard/RecruiterJobs';
import CreateJobMultiStep from './pages/Dashboard/CreateJobMultiStep';
import CreateApplicationForm from './pages/Dashboard/CreateApplicationForm';
import RecruiterCandidates from './pages/Dashboard/RecruiterCandidates';
import RecruiterInterviews from './pages/Dashboard/RecruiterInterviews';
import RecruiterApplications from './pages/Dashboard/RecruiterApplications';
import { useLocation } from "react-router-dom";
import featureFlags from './config/featureFlags';

// Layout component to conditionally render Navbar and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.includes('/admin-dashboard');
  
  return (
    <div className="dark bg-[#1e293b] min-h-screen flex flex-col text-[#94a3b8]">
      {!isDashboardRoute && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isDashboardRoute && <Footer />}
    </div>
  );
};

// Feature-flagged route component
const FeatureRoute = ({ flag, element, fallbackPath = "/" }) => {
  return featureFlags[flag] ? element : <Navigate to={fallbackPath} replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Core routes - always available */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/signup" element={<Layout><Signup /></Layout>} />
        <Route path="/contact-us" element={<Layout><ContactUs /></Layout>} />
        <Route path="/about-us" element={<Layout><AboutUs /></Layout>} />
        <Route path="/job/:id" element={<Layout><Job /></Layout>} />
        <Route path="/add-job" element={<Layout><AddJobUpdate /></Layout>} />
        <Route path="/recruiter-signup" element={<Layout><RecruiterSignup /></Layout>} />
        
        {/* Feature-flagged routes */}
        {/* Refer and Win feature */}
        <Route 
          path="/refer-and-win" 
          element={featureFlags.referAndWin ? <Layout><ReferAndWin /></Layout> : <Navigate to="/" replace />} 
        />
        
        {/* Feedback feature - always enabled */}
        <Route path="/feedback" element={<Layout><Feedback /></Layout>} />
        
        {/* Admin Dashboard routes */}
        <Route 
          path="/dashboard/admin" 
          element={featureFlags.adminDashboard ? <AdminDashboard /> : <Navigate to="/" replace />} 
        />
        
        <Route 
          path="/dashboard/admin/financial" 
          element={featureFlags.financialDashboard ? <FinancialDashboard /> : <Navigate to="/dashboard/admin" replace />} 
        />
        
        <Route 
          path="/dashboard/admin/jobs" 
          element={featureFlags.jobsAdminDashboard ? <JobsAdminDashboard /> : <Navigate to="/dashboard/admin" replace />} 
        />
        
        <Route 
          path="/dashboard/admin/jobs/:jobId" 
          element={featureFlags.jobsAdminDashboard ? <JobDetailPage /> : <Navigate to="/dashboard/admin" replace />} 
        />
        
        <Route 
          path="/dashboard/users" 
          element={featureFlags.usersManagement ? <UsersDashboard /> : <Navigate to="/dashboard/admin" replace />} 
        />
        
        <Route path="/dashboard/settings" element={<Settings />} />
        
        {/* Blog Admin routes */}
        <Route 
          path="/dashboard/admin/blog" 
          element={featureFlags.blogAdmin ? <BlogAdminDashboard /> : <Navigate to="/dashboard/admin" replace />} 
        />
        
        <Route 
          path="/dashboard/blog/create" 
          element={featureFlags.blogAdmin ? <BlogPostCreate /> : <Navigate to="/dashboard/admin" replace />} 
        />
        
        <Route 
          path="/dashboard/blog/edit/:postId" 
          element={featureFlags.blogAdmin ? <BlogPostEdit /> : <Navigate to="/dashboard/admin" replace />} 
        />
        
        <Route 
          path="/dashboard/blog/view/:postId" 
          element={featureFlags.blogAdmin ? <BlogPostView /> : <Navigate to="/dashboard/admin" replace />} 
        />
        
        {/* Jobseeker Blog routes */}
        <Route 
          path="/jobseeker/blog" 
          element={featureFlags.jobseekerBlog ? <JobseekerBlog /> : <Navigate to="/" replace />} 
        />
        
        <Route 
          path="/jobseeker/blog/:postId" 
          element={featureFlags.jobseekerBlog ? <BlogPostView /> : <Navigate to="/" replace />} 
        />
        
        {/* Recruiter Dashboard routes */}
        <Route 
          path="/dashboard/recruiter" 
          element={featureFlags.recruiterDashboard ? <RecruiterDashboard /> : <Navigate to="/" replace />} 
        />
        
        <Route 
          path="/dashboard/recruiter/create-job-form" 
          element={featureFlags.dynamicJobForm ? <DynamicJobForm /> : <Navigate to="/dashboard/recruiter" replace />} 
        />
        
        <Route 
          path="/dashboard/recruiter/jobs" 
          element={featureFlags.recruiterJobs ? <RecruiterJobs /> : <Navigate to="/dashboard/recruiter" replace />} 
        />
        
        <Route 
          path="/dashboard/recruiter/jobs/create" 
          element={featureFlags.multiStepJobCreation ? <CreateJobMultiStep /> : <Navigate to="/dashboard/recruiter/jobs" replace />} 
        />
        
        <Route 
          path="/dashboard/recruiter/candidates" 
          element={featureFlags.recruiterCandidates ? <RecruiterCandidates /> : <Navigate to="/dashboard/recruiter" replace />} 
        />
        
        <Route 
          path="/dashboard/recruiter/interviews" 
          element={featureFlags.recruiterInterviews ? <RecruiterInterviews /> : <Navigate to="/dashboard/recruiter" replace />} 
        />
        
        <Route 
          path="/dashboard/recruiter/applications" 
          element={featureFlags.recruiterApplications ? <RecruiterApplications /> : <Navigate to="/dashboard/recruiter" replace />} 
        />
        
        {/* Catch-all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;