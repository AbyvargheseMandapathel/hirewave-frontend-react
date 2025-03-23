import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
    <BrowserRouter>
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
        <Route path="/dashboard/financial" element={<FinancialDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;