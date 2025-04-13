import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
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
import ProtectedRoute from './components/common/ProtectedRoute';
import DashboardRouter from './components/DashboardRouter';
import JobseekerDashboard from './pages/Dashboard/JobseekerDashboard';
import JobseekerSavedJobs from './pages/Dashboard/JobseekerSavedJobs';
import ComingSoon from './pages/ComingSoon'; // Import the ComingSoon page
import JobFormErrorBoundary from './components/ErrorBoundary/JobFormErrorBoundary';

// Layout component to conditionally render Navbar and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.includes('/dashboard') || location.pathname.includes('/settings');
  
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
const FeatureRoute = ({ flag, element, fallbackPath = "/coming-soon" }) => { // Updated fallback to coming-soon
  return featureFlags[flag] ? element : <Navigate to={fallbackPath} replace />;
};

// Import the AdminRoute component
import AdminRoute from './components/common/AdminRoute';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#0f172a]">
        <Router>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/signup" element={<Layout><Signup /></Layout>} />
            <Route path="/recruiter-signup" element={<Layout><RecruiterSignup /></Layout>} />
            <Route path="/refer-and-win" element={<Layout><ReferAndWin /></Layout>} />
            <Route path="/feedback" element={<Layout><Feedback /></Layout>} />
            <Route path="/contact-us" element={<Layout><ContactUs /></Layout>} />
            <Route path="/about-us" element={<Layout><AboutUs /></Layout>} />
            <Route path="/job/:id" element={<Layout><Job /></Layout>} />
            {/* Wrap the AddJobUpdate component with the error boundary */}
                    <Route 
            path="/add-job" 
            element={
              <AdminRoute>
                <AddJobUpdate />
              </AdminRoute>
            } 
          />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            <Route path="/blog" element={<Layout><JobseekerBlog /></Layout>} />
            
            {/* Coming Soon Page */}
            <Route path="/coming-soon" element={<ComingSoon />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardRouter />} />
            
            {/* Admin Dashboard Routes */}
            <Route 
              path="/dashboard/admin" 
              element={
                <ProtectedRoute allowedUserTypes={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/admin/financial" 
              element={
                <ProtectedRoute allowedUserTypes={['admin']}>
                  <FinancialDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/admin/jobs" 
              element={
                <ProtectedRoute allowedUserTypes={['admin']}>
                  <JobsAdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/admin/jobs/:id" 
              element={
                <ProtectedRoute allowedUserTypes={['admin']}>
                  <JobDetailPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/admin/users" 
              element={
                <ProtectedRoute allowedUserTypes={['admin']}>
                  <UsersDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/admin/blog" 
              element={
                <ProtectedRoute allowedUserTypes={['admin']}>
                  <BlogAdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/admin/blog/create" 
              element={
                <ProtectedRoute allowedUserTypes={['admin']}>
                  <BlogPostCreate />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/admin/blog/edit/:id" 
              element={
                <ProtectedRoute allowedUserTypes={['admin']}>
                  <BlogPostEdit />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/admin/blog/view/:id" 
              element={
                <ProtectedRoute allowedUserTypes={['admin']}>
                  <BlogPostView />
                </ProtectedRoute>
              } 
            />
            
            {/* Recruiter Dashboard Routes */}
            <Route 
              path="/dashboard/recruiter" 
              element={
                <ProtectedRoute allowedUserTypes={['recruiter']}>
                  <RecruiterDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/recruiter/jobs" 
              element={
                <ProtectedRoute allowedUserTypes={['recruiter']}>
                  <RecruiterJobs />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/recruiter/jobs/create" 
              element={
                <ProtectedRoute allowedUserTypes={['recruiter']}>
                  <CreateJobMultiStep />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/recruiter/application-form/create" 
              element={
                <ProtectedRoute allowedUserTypes={['recruiter']}>
                  <CreateApplicationForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/recruiter/candidates" 
              element={
                <ProtectedRoute allowedUserTypes={['recruiter']}>
                  <RecruiterCandidates />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/recruiter/interviews" 
              element={
                <ProtectedRoute allowedUserTypes={['recruiter']}>
                  <RecruiterInterviews />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/recruiter/applications" 
              element={
                <ProtectedRoute allowedUserTypes={['recruiter']}>
                  <RecruiterApplications />
                </ProtectedRoute>
              } 
            />
            
            {/* Jobseeker Dashboard Routes */}
            <Route 
              path="/dashboard/jobseeker" 
              element={
                <ProtectedRoute allowedUserTypes={['jobseeker']}>
                  <JobseekerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/jobseeker/saved-jobs" 
              element={
                <ProtectedRoute allowedUserTypes={['jobseeker']}>
                  <JobseekerSavedJobs />
                </ProtectedRoute>
              } 
            />
            
            {/* Blog Routes */}
            <Route 
              path="/dashboard/blog" 
              element={
                <ProtectedRoute allowedUserTypes={['admin', 'recruiter']}>
                  <BlogDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all route - redirect to Coming Soon */}
            <Route path="*" element={<ComingSoon />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;