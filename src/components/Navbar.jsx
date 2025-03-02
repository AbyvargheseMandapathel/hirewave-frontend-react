import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaGift, FaFolderOpen, FaEnvelope, FaInfoCircle } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#1e293b] text-[#94a3b8] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] bg-clip-text text-transparent">
                HireWave
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/refer-and-win"
              className="hover:text-white transition-colors duration-200"
            >
              <FaGift className="h-6 w-6" />
            </Link>
            <Link
              to="/login"
              className="hover:text-white transition-colors duration-200"
            >
              <FaUser className="h-6 w-6" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#94a3b8] hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Side Panel */}
        <div
          className={`${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} 
          fixed inset-y-0 right-0 w-64 bg-[#1e293b] shadow-2xl transition-transform duration-300 ease-in-out transform z-50`}
        >
          <div className="flex flex-col h-full p-4">
            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-[#94a3b8] hover:text-white focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 mt-6">
              <Link
                to="/refer-and-win"
                className="flex items-center px-4 py-3 text-sm text-[#94a3b8] hover:bg-[#334155] hover:text-white rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaGift className="mr-3" /> Refer and Win
              </Link>
              <Link
                to="/login"
                className="flex items-center px-4 py-3 text-sm text-[#94a3b8] hover:bg-[#334155] hover:text-white rounded-lg transition-colors duration-200 mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaUser className="mr-3" /> Account
              </Link>
              <Link
                to="/feedback"
                className="flex items-center px-4 py-3 text-sm text-[#94a3b8] hover:bg-[#334155] hover:text-white rounded-lg transition-colors duration-200 mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaFolderOpen className="mr-3" /> Feedback
              </Link>
              <Link
                to="/contact-us"
                className="flex items-center px-4 py-3 text-sm text-[#94a3b8] hover:bg-[#334155] hover:text-white rounded-lg transition-colors duration-200 mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaEnvelope className="mr-3" /> Contact Us
              </Link>
              <Link
                to="/about-us"
                className="flex items-center px-4 py-3 text-sm text-[#94a3b8] hover:bg-[#334155] hover:text-white rounded-lg transition-colors duration-200 mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaInfoCircle className="mr-3" /> About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;