import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaGift, FaFolderOpen, FaEnvelope, FaInfoCircle, FaSignOutAlt, FaTachometerAlt, FaUserCircle, FaChevronDown } from 'react-icons/fa';
import { isLoggedIn, getCurrentUser, logout } from '../services/authService';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in and get user data
    if (isLoggedIn()) {
      setUser(getCurrentUser());
    }
  }, []);

  const handleSignOut = () => {
    logout();
    setUser(null);
    setIsUserDropdownOpen(false);
    navigate('/');
  };

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
            
            {/* Conditional rendering based on login status */}
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 hover:text-white transition-colors duration-200 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-[#818cf8] flex items-center justify-center text-white">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                    ) : (
                      <FaUserCircle className="h-6 w-6" />
                    )}
                  </div>
                  <FaChevronDown className={`h-3 w-3 transition-transform duration-200 ${isUserDropdownOpen ? 'transform rotate-180' : ''}`} />
                </button>
                
                {/* User dropdown menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#0f172a] rounded-md shadow-lg py-1 z-50 border border-[#334155]">
                    <div className="px-4 py-2 border-b border-[#334155]">
                      <p className="text-white font-medium truncate">{user.name || user.email}</p>
                      <p className="text-xs text-[#64748b] truncate">{user.email}</p>
                    </div>
                    <Link
                      to={user.role === 'recruiter' ? '/dashboard/recruiter' : '/dashboard'}
                      className="block px-4 py-2 text-sm text-[#94a3b8] hover:bg-[#1e293b] hover:text-white"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <div className="flex items-center">
                        <FaTachometerAlt className="mr-2" />
                        Dashboard
                      </div>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-[#94a3b8] hover:bg-[#1e293b] hover:text-white"
                    >
                      <div className="flex items-center">
                        <FaSignOutAlt className="mr-2" />
                        Sign Out
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hover:text-white transition-colors duration-200"
              >
                <FaUser className="h-6 w-6" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#94a3b8] hover:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/refer-and-win"
              className="block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-[#334155]"
            >
              Refer & Win
            </Link>
            
            {user ? (
              <>
                <Link
                  to={user.role === 'recruiter' ? '/dashboard/recruiter' : '/dashboard'}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-[#334155]"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-[#334155]"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-[#334155]"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;