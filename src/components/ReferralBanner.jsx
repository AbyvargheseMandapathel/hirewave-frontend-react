import React from 'react';
import { Link } from 'react-router-dom';

const ReferralBanner = () => (
  <div className="mb-6">
    <Link
      to="/refer-and-win"
      className="block bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] text-white text-center py-3 px-6 rounded-xl shadow-lg font-semibold text-lg hover:from-[#a5b4fc] hover:to-[#818cf8] transition-all duration-300"
    >
      🎁 Refer friends & earn rewards! Click here to Refer & Win ₹1 for each successful referral →
    </Link>
  </div>
);

export default ReferralBanner;