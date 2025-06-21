import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaBuilding, 
  FaMapMarkerAlt, 
  FaMoneyBillWave, 
  FaBriefcase, 
  FaClock, 
  FaExternalLinkAlt, 
  FaBookmark, 
  FaShare, 
  FaSpinner 
} from 'react-icons/fa';
import SimilarJobs from '../SimilarJobs/SimilarJobs';
import ProtectedApplyButton from '../common/ProtectedApplyButton';
import Button from '../common/Button';
import { isLoggedIn } from '../../services/authService';
import { getJobs } from '../../services/jobService';
import { toggleBookmark } from '../../services/savedJobService';
import ReferralBanner from '../ReferralBanner';


const formatDate = (dateString) => {
  if (!dateString) return 'recently';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  } catch {
    return 'recently';
  }
};

const sanitizeHtml = (html) => {
  try {
    return html?.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') || '';
  } catch {
    return '';
  }
};

const JobDetails = ({ 
  jobId, 
  job,
  loading,
  error,
  isSaved,
  setIsSaved,
  makeScrollable 
}) => {
  const [similarJobs, setSimilarJobs] = useState([]);
  const [mainHeight, setMainHeight] = useState(0);
  const navigate = useNavigate();
  const mainContentRef = useRef(null);
  
  useEffect(() => {
    const updateHeight = () => {
      if (mainContentRef.current) {
        setMainHeight(mainContentRef.current.offsetHeight);
      }
    };
    
    updateHeight();
    
    const timer = setTimeout(updateHeight, 100);
    window.addEventListener('resize', updateHeight);
    
    return () => {
      window.removeEventListener('resize', updateHeight);
      clearTimeout(timer);
    };
  }, [job]);
  
  useEffect(() => {
    const fetchSimilarJobs = async () => {
      try {
        if (job) {
          const filters = { type: job.type };
          const response = await getJobs(1, 3, filters);
          const filteredJobs = response.results.filter(j => j.id !== jobId);
          setSimilarJobs(filteredJobs);
        }
      } catch (err) {
        console.error('Error fetching similar jobs:', err);
      }
    };
    
    if (job) fetchSimilarJobs();
  }, [job, jobId]);

  const handleExternalApply = () => {
    if (isLoggedIn()) {
      if (job?.external_link) {
        window.open(job.external_link, '_blank', 'noopener,noreferrer');
      }
    } else {
      navigate(`/login?returnUrl=/job/${jobId}`);
    }
  };
  
  const handleSaveJob = async () => {
    if (!isLoggedIn()) {
      navigate(`/login?returnUrl=/job/${jobId}`);
      return;
    }
    
    try {
      const result = await toggleBookmark(jobId);
      setIsSaved(result.is_saved);
    } catch (err) {
      console.error('Error toggling bookmark:', err);
    }
  };

  const handleShareJob = () => {
    if (navigator.share) {
      navigator.share({
        title: job?.title,
        text: `Check out this job: ${job?.title} at ${job?.company}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <FaSpinner className="animate-spin text-[#818cf8] text-4xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center my-8 min-h-[60vh] flex items-center justify-center">
        <div>
          <p className="text-xl">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-[#94a3b8] text-center my-8 min-h-[60vh] flex items-center justify-center">
        <div>
          <p className="text-xl">Job not found</p>
          <Link to="/" className="text-[#818cf8] hover:underline mt-4 inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const getRequirementsList = () => {
    if (typeof job.requirements === 'string') {
      return job.requirements.split('\n').filter(req => req.trim());
    }
    if (Array.isArray(job.requirements)) {
      return job.requirements;
    }
    return [];
  };
  
  const requirementsList = getRequirementsList();

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10">
      <ReferralBanner />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div 
            ref={mainContentRef}
            className="bg-[#1e293b] rounded-xl p-8 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-8">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
                <div className="flex items-center text-[#94a3b8]">
                  <FaBuilding className="mr-2" />
                  <span className="text-lg">{job.company}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm bg-[#334155] text-[#94a3b8] px-4 py-2 rounded-full h-fit">
                  {job.type}
                </span>
                <button 
                  onClick={handleSaveJob}
                  className={`p-2 rounded-full ${isSaved ? 'bg-[#818cf8] text-white' : 'bg-[#334155] text-[#94a3b8]'} hover:bg-[#818cf8] hover:text-white transition-colors`}
                  title={isSaved ? "Unsave Job" : "Save Job"}
                  aria-label={isSaved ? "Unsave Job" : "Save Job"}
                >
                  <FaBookmark />
                </button>
                <button 
                  onClick={handleShareJob}
                  className="p-2 rounded-full bg-[#334155] text-[#94a3b8] hover:bg-[#818cf8] hover:text-white transition-colors"
                  title="Share Job"
                  aria-label="Share Job"
                >
                  <FaShare />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <DetailItem 
                icon={<FaMapMarkerAlt className="text-[#818cf8] text-xl" />}
                label="Location"
                value={job.location || 'Remote'}
              />
              <DetailItem 
                icon={<FaMoneyBillWave className="text-[#818cf8] text-xl" />}
                label="Salary"
                value={job.salary || 'Competitive'}
              />
              <DetailItem 
                icon={<FaBriefcase className="text-[#818cf8] text-xl" />}
                label="Job Type"
                value={job.type}
              />
              <DetailItem 
                icon={<FaClock className="text-[#818cf8] text-xl" />}
                label="Posted"
                value={formatDate(job.posted_date || job.created_at)}
              />
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Job Description</h2>
              <div 
                className="text-[#ffffff] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(job.description) }}
              />
            </div>

            {requirementsList.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Requirements</h2>
                <div className="text-[#ffffff] space-y-2">
                {requirementsList.map((req) => {
              const key = `req-${btoa(encodeURIComponent(req)).slice(0, 10)}`;
                return (
                  <div key={key} className="flex items-start">
                    <span className="mr-2">•</span>
                    <div dangerouslySetInnerHTML={{ __html: req }} />
                  </div>
                );
              })}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              {job.external_link ? (
                <Button
                  onClick={handleExternalApply}
                  className="bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] text-white px-8 py-3 rounded-lg hover:from-[#a5b4fc] hover:to-[#818cf8] transition-all duration-300 w-full"
                  variant="primary"
                  size="lg"
                >
                  <div className="flex items-center justify-center">
                    <span>Apply on Company Website</span>
                    <FaExternalLinkAlt className="ml-2" />
                  </div>
                </Button>
              ) : (
                <ProtectedApplyButton
                  jobId={job.id}
                  className="bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] text-white px-8 py-3 rounded-lg hover:from-[#a5b4fc] hover:to-[#818cf8] transition-all duration-300 w-full"
                  variant="primary"
                  size="lg"
                >
                  Apply Now
                </ProtectedApplyButton>
              )}
              
              <Button 
                onClick={handleSaveJob}
                className="bg-[#334155] text-[#94a3b8] px-8 py-3 rounded-lg hover:bg-[#475569] transition-all duration-300 w-full"
                variant="secondary"
                size="lg"
              >
                <div className="flex items-center justify-center">
                  <span>{isSaved ? 'Unsave Job' : 'Save Job'}</span>
                  <FaBookmark className="ml-2" />
                </div>
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div 
            className="space-y-6 bg-[#1e293b] rounded-xl p-6 shadow-2xl overflow-y-auto no-scrollbar" 
            style={{ 
              height: makeScrollable && mainHeight > 0 ? `${mainHeight}px` : 'auto',
              position: 'sticky',
              top: '1.5rem'
            }}
          >
            {similarJobs.length > 0 && <SimilarJobs jobs={similarJobs} />}
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center p-4 bg-[#0f172a] rounded-lg">
    <span className="mr-3">{icon}</span>
    <div>
      <p className="text-[#94a3b8] text-sm">{label}</p>
      <p className="text-white">{value}</p>
    </div>
  </div>
);

JobDetails.propTypes = {
  jobId: PropTypes.string,
  job: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    company: PropTypes.string,
    location: PropTypes.string,
    salary: PropTypes.string,
    type: PropTypes.string,
    posted_date: PropTypes.string,
    created_at: PropTypes.string,
    description: PropTypes.string,
    requirements: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    external_link: PropTypes.string
  }),
  loading: PropTypes.bool,
  error: PropTypes.string,
  isSaved: PropTypes.bool,
  setIsSaved: PropTypes.func,
  makeScrollable: PropTypes.bool
};

JobDetails.defaultProps = {
  jobId: '',
  job: null,
  loading: false,
  error: null,
  isSaved: false,
  setIsSaved: () => {},
  makeScrollable: true
};

DetailItem.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default JobDetails;