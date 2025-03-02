import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#1e293b] text-[#94a3b8] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8">
          {/* About Section */}
          <div className="md:col-span-2 lg:col-span-1">
            <h2 className="text-xl font-bold bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] bg-clip-text text-transparent mb-4">
              HireWave
            </h2>
            <p className="text-sm">
              Connecting talent with opportunity. Your go-to platform for finding the best jobs and candidates.
            </p>
          </div>

          {/* Quick Links - Mobile optimized */}
          <div className="md:text-center">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Jobs', 'Employers', 'Candidates'].map((link) => (
                <li key={link}>
                  <a
                    href={`/${link.toLowerCase()}`}
                    className="hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information - Mobile optimized */}
          <div className="md:text-center">
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex md:justify-center items-start">
                <FaMapMarkerAlt className="mt-1 mr-2 min-w-[16px]" />
                <span className="text-sm">123 Job Street, Talent City</span>
              </li>
              <li className="flex md:justify-center items-center">
                <FaEnvelope className="mr-2 min-w-[16px]" />
                <a href="mailto:support@hirewave.com" className="text-sm hover:text-white">
                  support@hirewave.com
                </a>
              </li>
              <li className="flex md:justify-center items-center">
                <FaPhone className="mr-2 min-w-[16px]" />
                <a href="tel:+11234567890" className="text-sm hover:text-white">
                  +1 (123) 456-7890
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media - Mobile optimized */}
          <div className="md:text-center">
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex md:justify-center space-x-4">
              {[
                { icon: FaFacebook, link: 'https://facebook.com' },
                { icon: FaTwitter, link: 'https://twitter.com' },
                { icon: FaLinkedin, link: 'https://linkedin.com' },
                { icon: FaInstagram, link: 'https://instagram.com' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#94a3b8] hover:text-white transition-colors duration-200"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-[#334155] py-6">
          <p className="text-center text-xs md:text-sm">
            &copy; {new Date().getFullYear()} HireWave. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;