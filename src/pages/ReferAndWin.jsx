import React, { useState } from 'react';
import { FaCopy, FaTwitter, FaFacebook, FaLinkedin, FaWhatsapp, FaTrophy, FaMedal, FaAward } from 'react-icons/fa';

const ReferAndWin = () => {
  const [copied, setCopied] = useState(false);
  
  // Mock data for the leaderboard
  const leaderboardData = [
    { id: 1, name: 'John Smith', referrals: 32, earnings: '$640' },
    { id: 2, name: 'Emily Johnson', referrals: 28, earnings: '$560' },
    { id: 3, name: 'Michael Brown', referrals: 25, earnings: '$500' },
    { id: 4, name: 'Sarah Davis', referrals: 21, earnings: '$420' },
    { id: 5, name: 'David Wilson', referrals: 19, earnings: '$380' },
    { id: 6, name: 'Jessica Taylor', referrals: 17, earnings: '$340' },
  ];
  
  // Mock data for current user
  const currentUser = {
    name: 'Your Name',
    referrals: 8,
    earnings: '$160',
    rank: 12
  };
  
  // Mock referral code
  const referralCode = 'HIRE' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const referralLink = `https://hirewave.com/signup?ref=${referralCode}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Hero Section */}
      <div className="bg-[#1e293b] rounded-xl shadow-2xl p-6 md:p-10 border border-[#334155] mb-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Refer & Earn</h1>
          <p className="text-xl text-[#94a3b8] mb-6">
            Invite your friends and earn <span className="text-[#818cf8] font-bold">20% lifetime commission</span> on every successful purchase they make!
          </p>
          
          <div className="max-w-3xl mx-auto bg-[#0f172a] rounded-lg p-6 border border-[#334155]">
            <h2 className="text-xl font-semibold text-white mb-4">Your Referral Link</h2>
            <div className="flex items-center mb-4">
              <input 
                type="text" 
                value={referralLink} 
                readOnly 
                className="bg-[#1e293b] text-white flex-grow px-4 py-3 rounded-l-lg border border-[#334155] focus:outline-none"
              />
              <button 
                onClick={copyToClipboard}
                className="bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] text-white px-4 py-3 rounded-r-lg hover:from-[#a5b4fc] hover:to-[#818cf8] transition-all duration-300 focus:outline-none"
              >
                {copied ? 'Copied!' : <FaCopy />}
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {/* Updated sharing buttons to show only icons on mobile */}
              <button className="flex items-center bg-[#1DA1F2] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-all">
                <FaTwitter className="mr-2 md:mr-2" /> 
                <span className="hidden md:inline">Share on Twitter</span>
              </button>
              <button className="flex items-center bg-[#4267B2] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-all">
                <FaFacebook className="mr-2 md:mr-2" /> 
                <span className="hidden md:inline">Share on Facebook</span>
              </button>
              <button className="flex items-center bg-[#0077B5] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-all">
                <FaLinkedin className="mr-2 md:mr-2" /> 
                <span className="hidden md:inline">Share on LinkedIn</span>
              </button>
              <button className="flex items-center bg-[#25D366] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-all">
                <FaWhatsapp className="mr-2 md:mr-2" /> 
                <span className="hidden md:inline">Share on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="bg-[#1e293b] rounded-xl shadow-2xl p-6 md:p-10 border border-[#334155] mb-8">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Top Referrers</h2>
        
        {/* Desktop Podium (hidden on mobile) */}
        <div className="hidden md:flex md:flex-row items-end justify-center gap-4 mb-12">
          {/* 2nd Place */}
          <div className="order-1 flex flex-col items-center">
            <div className="bg-[#C0C0C0] rounded-full p-2 mb-2">
              <FaMedal className="text-[#0f172a] text-3xl" />
            </div>
            <div className="w-24 h-32 bg-[#0f172a] rounded-t-lg flex flex-col items-center justify-end p-2 border-t-4 border-[#C0C0C0]">
              <p className="text-white font-bold text-center">{leaderboardData[1].name}</p>
              <p className="text-[#94a3b8] text-sm">{leaderboardData[1].referrals} Referrals</p>
              <p className="text-[#818cf8]">{leaderboardData[1].earnings}</p>
            </div>
            <div className="bg-[#0f172a] w-full text-center py-2 rounded-b-lg border-t border-[#334155]">
              <span className="text-[#C0C0C0] font-bold">2nd</span>
            </div>
          </div>
          
          {/* 1st Place */}
          <div className="order-2 flex flex-col items-center">
            <div className="bg-[#FFD700] rounded-full p-2 mb-2">
              <FaTrophy className="text-[#0f172a] text-4xl" />
            </div>
            <div className="w-24 h-40 bg-[#0f172a] rounded-t-lg flex flex-col items-center justify-end p-2 border-t-4 border-[#FFD700]">
              <p className="text-white font-bold text-center">{leaderboardData[0].name}</p>
              <p className="text-[#94a3b8] text-sm">{leaderboardData[0].referrals} Referrals</p>
              <p className="text-[#818cf8]">{leaderboardData[0].earnings}</p>
            </div>
            <div className="bg-[#0f172a] w-full text-center py-2 rounded-b-lg border-t border-[#334155]">
              <span className="text-[#FFD700] font-bold">1st</span>
            </div>
          </div>
          
          {/* 3rd Place */}
          <div className="order-3 flex flex-col items-center">
            <div className="bg-[#CD7F32] rounded-full p-2 mb-2">
              <FaAward className="text-[#0f172a] text-3xl" />
            </div>
            <div className="w-24 h-24 bg-[#0f172a] rounded-t-lg flex flex-col items-center justify-end p-2 border-t-4 border-[#CD7F32]">
              <p className="text-white font-bold text-center">{leaderboardData[2].name}</p>
              <p className="text-[#94a3b8] text-sm">{leaderboardData[2].referrals} Referrals</p>
              <p className="text-[#818cf8]">{leaderboardData[2].earnings}</p>
            </div>
            <div className="bg-[#0f172a] w-full text-center py-2 rounded-b-lg border-t border-[#334155]">
              <span className="text-[#CD7F32] font-bold">3rd</span>
            </div>
          </div>
        </div>
        
        {/* Mobile Podium (hidden on desktop) - Matching the image design */}
        <div className="md:hidden grid grid-cols-3 gap-2 mb-8">
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <div className="bg-[#C0C0C0] rounded-full p-2 mb-2 w-16 h-16 flex items-center justify-center">
              <FaMedal className="text-[#0f172a] text-3xl" />
            </div>
            <div className="bg-[#0f172a] rounded-lg w-full p-2 flex flex-col items-center">
              <p className="text-white font-bold text-center">{leaderboardData[1].name}</p>
              <p className="text-[#94a3b8] text-sm">{leaderboardData[1].referrals} Referrals</p>
              <p className="text-[#818cf8] font-bold">${leaderboardData[1].earnings.replace('$', '')}</p>
              <div className="mt-2 w-full text-center py-1 bg-[#1e293b] rounded-lg">
                <span className="text-[#C0C0C0] font-bold">2nd</span>
              </div>
            </div>
          </div>
          
          {/* 1st Place */}
          <div className="flex flex-col items-center">
            <div className="bg-[#FFD700] rounded-full p-2 mb-2 w-16 h-16 flex items-center justify-center">
              <FaTrophy className="text-[#0f172a] text-4xl" />
            </div>
            <div className="bg-[#0f172a] rounded-lg w-full p-2 flex flex-col items-center">
              <p className="text-white font-bold text-center">{leaderboardData[0].name}</p>
              <p className="text-[#94a3b8] text-sm">{leaderboardData[0].referrals} Referrals</p>
              <p className="text-[#818cf8] font-bold">${leaderboardData[0].earnings.replace('$', '')}</p>
              <div className="mt-2 w-full text-center py-1 bg-[#1e293b] rounded-lg">
                <span className="text-[#FFD700] font-bold">1st</span>
              </div>
            </div>
          </div>
          
          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <div className="bg-[#CD7F32] rounded-full p-2 mb-2 w-16 h-16 flex items-center justify-center">
              <FaAward className="text-[#0f172a] text-3xl" />
            </div>
            <div className="bg-[#0f172a] rounded-lg w-full p-2 flex flex-col items-center">
              <p className="text-white font-bold text-center">{leaderboardData[2].name}</p>
              <p className="text-[#94a3b8] text-sm">{leaderboardData[2].referrals} Referrals</p>
              <p className="text-[#818cf8] font-bold">${leaderboardData[2].earnings.replace('$', '')}</p>
              <div className="mt-2 w-full text-center py-1 bg-[#1e293b] rounded-lg">
                <span className="text-[#CD7F32] font-bold">3rd</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Top 6 Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#0f172a] text-white">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Rank</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Referrals</th>
                <th className="px-4 py-3 rounded-tr-lg">Earnings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {leaderboardData.map((user, index) => (
                <tr key={user.id} className="bg-[#0f172a] hover:bg-[#1e293b] transition-colors">
                  <td className="px-4 py-3 font-medium text-white">{index + 1}</td>
                  <td className="px-4 py-3 text-[#94a3b8]">{user.name}</td>
                  <td className="px-4 py-3 text-[#94a3b8]">{user.referrals}</td>
                  <td className="px-4 py-3 text-[#818cf8]">{user.earnings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Current User Rank */}
        <div className="mt-8 bg-[#0f172a] rounded-lg p-4 border border-[#334155]">
          <h3 className="text-xl font-semibold text-white mb-4">Your Ranking</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4">
                {currentUser.rank}
              </div>
              <div>
                <p className="text-white font-medium">{currentUser.name}</p>
                <p className="text-[#94a3b8] text-sm">{currentUser.referrals} Referrals</p>
              </div>
            </div>
            <div className="text-[#818cf8] font-bold">{currentUser.earnings}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferAndWin;