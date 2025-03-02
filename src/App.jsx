import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ReferAndWin from './pages/ReferAndWin';
import Feedback from './pages/Feedback';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <BrowserRouter>
      <div className="dark bg-[#1e293b] min-h-screen flex flex-col text-[#94a3b8]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Your routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/refer-and-win" element={<ReferAndWin />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;