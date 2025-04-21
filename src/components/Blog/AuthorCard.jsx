import React from 'react';
import { FaUser, FaEnvelope, FaLinkedin, FaTwitter } from 'react-icons/fa';

const AuthorCard = ({ author }) => {
  if (!author) {
    return null;
  }

  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
      <h3 className="text-xl font-medium text-white mb-4">About the Author</h3>
      
      <div className="flex items-center mb-4">
        {author.profile_image ? (
          <img 
            src={author.profile_image} 
            alt={author.name || author.email} 
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-[#334155] flex items-center justify-center mr-4">
            <FaUser className="text-[#94a3b8] text-xl" />
          </div>
        )}
        
        <div>
          <h4 className="text-white font-medium">
            {author.get_full_name || author.name || author.email}
          </h4>
          <p className="text-[#94a3b8] text-sm">
            {author.job_title || 'Content Creator'}
          </p>
        </div>
      </div>
      
      {author.bio && (
        <p className="text-[#94a3b8] text-sm mb-4">
          {author.bio}
        </p>
      )}
      
      <div className="flex space-x-3">
        {author.email && (
          <a 
            href={`mailto:${author.email}`}
            className="text-[#94a3b8] hover:text-[#818cf8] transition-colors"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        )}
        {author.linkedin && (
          <a 
            href={author.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#94a3b8] hover:text-[#818cf8] transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        )}
        {author.twitter && (
          <a 
            href={author.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#94a3b8] hover:text-[#818cf8] transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
        )}
      </div>
    </div>
  );
};

export default AuthorCard;