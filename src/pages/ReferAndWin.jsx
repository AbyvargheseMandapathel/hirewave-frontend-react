import React, { useState, useEffect } from 'react';
import { FaCopy, FaTwitter, FaFacebook, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { fetchUserProfile } from '../services/ProfileService';

const ReferAndWin = () => {
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setUser(data);
      } catch (err) {
        setError(err.message || 'Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading)
    return (
      <div className="text-center py-10 text-white">Loading your referral information...</div>
    );
  if (error)
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  const { referral_code, referral_count } = user;
  const referralLink = `https://hirewave.online/signup?ref=${referral_code}`;
  const shareMessage = `Join me on HireWave and get exclusive benefits! ${referralLink}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Hero Section */}
      <div className="bg-[#1e293b] rounded-xl shadow-lg p-6 md:p-8 border border-[#334155] mb-8 text-center"> 
        <h1 className="text-3xl font-bold text-white mb-4">Refer & Earn</h1>
        <p className="text-lg text-[#94a3b8] mb-6">
          Refer and win ₹1 for each successful referral.
        </p>

        {/* Referral Count Section */}
        <div className="bg-[#0f172a] rounded-lg p-6 border border-[#334155] mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">Your Referrals</h2>
          <p className="text-3xl font-bold text-[#818cf8]">{referral_count || 0}</p>
          <p className="text-sm text-[#94a3b8] mt-1">
            Successful referrals so far
          </p>
        </div>

        {/* Referral Link Section */}
        <div className="bg-[#0f172a] rounded-lg p-6 border border-[#334155]">
          <h2 className="text-xl font-semibold text-white mb-4">Your Referral Link</h2>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="bg-[#1e293b] text-white flex-grow px-4 py-3 rounded-lg border border-[#334155] focus:outline-none truncate"
            />
            <button
              onClick={copyToClipboard}
              className="bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] text-white px-4 py-3 rounded-lg hover:from-[#a5b4fc] hover:to-[#818cf8] transition-all duration-300"
              title="Copy to clipboard"
            >
              {copied ? 'Copied!' : <FaCopy />}
            </button>
          </div>

          {/* Sharing Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {/* Twitter */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-[#1DA1F2] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all" 
            >
              <FaTwitter className="mr-2" />
              <span className="hidden sm:inline">Share on Twitter</span>
            </a>

            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${encodeURIComponent(shareMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-[#4267B2] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all" 
            >
              <FaFacebook className="mr-2" />
              <span className="hidden sm:inline">Share on Facebook</span>
            </a>

            {/* LinkedIn */}
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(referralLink)}&title=${encodeURIComponent(shareMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-[#0077B5] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all" 
            >
              <FaLinkedin className="mr-2" />
              <span className="hidden sm:inline">Share on LinkedIn</span>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-[#25D366] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all" 
            >
              <FaWhatsapp className="mr-2" />
              <span className="hidden sm:inline">Share on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferAndWin;