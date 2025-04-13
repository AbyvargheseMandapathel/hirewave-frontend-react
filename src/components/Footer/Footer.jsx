import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#1e293b] text-[#94a3b8] py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">HireWave</h3>
            <p className="mb-4">
              Connecting talented professionals with innovative companies. Find your dream job or the perfect candidate.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#818cf8] hover:text-white transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-[#818cf8] hover:text-white transition-colors">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-[#818cf8] hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Jobs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <p className="mb-2">Email: info@hirewave.com</p>
            <p className="mb-2">Phone: +1 (123) 456-7890</p>
            <p>Address: 123 Tech Street, San Francisco, CA 94107</p>
          </div>
        </div>
        
        <div className="border-t border-[#334155] mt-8 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} HireWave. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;