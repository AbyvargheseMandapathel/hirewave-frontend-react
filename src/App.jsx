import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/login" element={
          <Layout>
            <Login />
          </Layout>
        } />
        <Route path="/signup" element={
          <Layout>
            <Signup />
          </Layout>
        } />
        <Route path="/refer-and-win" element={
          <Layout>
            <ReferAndWin />
          </Layout>
        } />
        <Route path="/feedback" element={
          <Layout>
            <Feedback />
          </Layout>
        } />
        <Route path="/contact-us" element={
          <Layout>
            <ContactUs />
          </Layout>
        } />
        <Route path="/about-us" element={
          <Layout>
            <AboutUs />
          </Layout>
        } />
        <Route path="/job/:id" element={
          <Layout>
            <Job />
          </Layout>
        } />
        <Route path="/add-job" element={
          <Layout>
            <AddJobUpdate />
          </Layout>
        } />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/admin/financial" element={<FinancialDashboard />} />
        <Route path="/dashboard/admin/jobs" element={<JobsAdminDashboard />} />
        <Route path="/dashboard/admin/jobs/:jobId" element={<JobDetailPage />} />
        <Route path="/dashboard/users" element={<UsersDashboard />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/admin/blog" element={<BlogAdminDashboard />} />
        {/* <Route path="/dashboard/blog" element={<BlogDashboard />} /> */}
        <Route path="/dashboard/blog/create" element={<BlogPostCreate />} />
        <Route path="/dashboard/blog/edit/:postId" element={<BlogPostEdit />} />
        <Route path="/dashboard/blog/view/:postId" element={<BlogPostView />} />
        <Route path="/recruiter-signup" element={
          <Layout>
            <RecruiterSignup />
          </Layout>
        } />
        
        {/* Add these new routes for jobseeker blog */}
        <Route path="/jobseeker/blog" element={<JobseekerBlog />} />
        <Route path="/jobseeker/blog/:postId" element={<BlogPostView />} />
        
        {/* Add JobMetricsOverview route */}
        <Route path="/dashboard/recruiter" element={<RecruiterDashboard />} />
        
        {/* Dynamic Job Form route */}
        <Route path="/dashboard/recruiter/create-job-form" element={<DynamicJobForm />} />
        <Route path="/dashboard/recruiter/jobs" element={<RecruiterJobs />} />
        <Route path="/dashboard/recruiter/jobs/create" element={<CreateJobMultiStep />} />
        <Route path="/dashboard/recruiter/candidates" element={<RecruiterCandidates />} />
        <Route path="/dashboard/recruiter/interviews" element={<RecruiterInterviews />} />
        <Route path="/dashboard/recruiter/applications" element={<RecruiterApplications />} />
        {/* <Route path="/dashboard/recruiter/create-application-form" element={<CreateApplicationForm />} /> */}
      </Routes>
    </Router>
  );
}

export default App;