import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBriefcase, 
  FaBuilding, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaChevronDown, 
  FaChevronUp,
  FaExternalLinkAlt,
  FaTrophy,
  FaTools,
  FaCheckCircle
} from 'react-icons/fa';
import './InternshipCard.css';

/**
 * InternshipCard Component
 * 
 * A reusable, professional card component for displaying internship experiences.
 * Features expandable details, skill tags, achievements, and smooth animations.
 * 
 * @param {Object} internship - The internship data object
 * @param {number} index - The index for staggered animation
 * @param {string} layout - Layout style: 'card' | 'timeline'
 */
const InternshipCard = ({ internship, index = 0, layout = 'card' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    title,
    company,
    companyLogo,
    companyUrl,
    location,
    duration,
    type = 'Internship',
    summary,
    responsibilities = [],
    technologies = [],
    achievements = [],
    teamSize,
    industry
  } = internship;

  // Toggle expand/collapse
  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const contentVariants = {
    collapsed: { 
      height: 0, 
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    expanded: { 
      height: 'auto', 
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    }
  };

  // Get type badge color
  const getTypeBadgeColor = (type) => {
    const colors = {
      'Full-Time Internship': { bg: 'rgba(34, 197, 94, 0.15)', text: '#22c55e', border: 'rgba(34, 197, 94, 0.3)' },
      'Summer Internship': { bg: 'rgba(249, 115, 22, 0.15)', text: '#f97316', border: 'rgba(249, 115, 22, 0.3)' },
      'Part-Time': { bg: 'rgba(168, 85, 247, 0.15)', text: '#a855f7', border: 'rgba(168, 85, 247, 0.3)' },
      'Apprenticeship': { bg: 'rgba(59, 130, 246, 0.15)', text: '#3b82f6', border: 'rgba(59, 130, 246, 0.3)' }
    };
    return colors[type] || colors['Full-Time Internship'];
  };

  const typeStyle = getTypeBadgeColor(type);

  // Timeline layout
  if (layout === 'timeline') {
    return (
      <motion.div
        className="internship-timeline-item"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="timeline-marker">
          <div className="timeline-dot"></div>
          <div className="timeline-line"></div>
        </div>
        
        <div className="timeline-content">
          <div className="timeline-date-badge">
            <FaCalendarAlt />
            <span>{duration}</span>
          </div>
          
          <div className="internship-card timeline-card">
            {/* Header */}
            <div className="internship-header">
              <div className="internship-title-section">
                <h3 className="internship-title">
                  <FaBriefcase className="title-icon" />
                  {title}
                </h3>
                
                <div className="internship-company">
                  {companyLogo && (
                    <img 
                      src={companyLogo} 
                      alt={`${company} logo`} 
                      className="company-logo"
                    />
                  )}
                  <div className="company-info">
                    <span className="company-name">
                      <FaBuilding className="info-icon" />
                      {company}
                      {companyUrl && (
                        <a 
                          href={companyUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="company-link"
                          aria-label={`Visit ${company} website`}
                        >
                          <FaExternalLinkAlt />
                        </a>
                      )}
                    </span>
                    <span className="company-location">
                      <FaMapMarkerAlt className="info-icon" />
                      {location}
                    </span>
                  </div>
                </div>
              </div>

              <span 
                className="internship-type-badge"
                style={{
                  background: typeStyle.bg,
                  color: typeStyle.text,
                  borderColor: typeStyle.border
                }}
              >
                {type}
              </span>
            </div>

            {/* Summary */}
            {summary && (
              <p className="internship-summary">{summary}</p>
            )}

            {/* Key Highlights */}
            <div className="internship-highlights">
              {industry && (
                <span className="highlight-tag">{industry}</span>
              )}
              {teamSize && (
                <span className="highlight-tag">Team: {teamSize}</span>
              )}
            </div>

            {/* Expandable Content */}
            <AnimatePresence>
              {(isExpanded || responsibilities.length <= 3) && (
                <motion.div
                  className="internship-details"
                  variants={contentVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                >
                  {/* Responsibilities */}
                  <div className="details-section">
                    <h4 className="details-title">Key Responsibilities</h4>
                    <ul className="responsibilities-list">
                      {responsibilities.map((task, i) => (
                        <li key={i} className="responsibility-item">
                          <FaCheckCircle className="bullet-icon" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Achievements */}
                  {achievements.length > 0 && (
                    <div className="details-section">
                      <h4 className="details-title achievements-title">
                        <FaTrophy className="section-icon" />
                        Key Achievements
                      </h4>
                      <ul className="achievements-list">
                        {achievements.map((achievement, i) => (
                          <li key={i} className="achievement-item">
                            <span className="achievement-badge">★</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  {technologies.length > 0 && (
                    <div className="details-section">
                      <h4 className="details-title">
                        <FaTools className="section-icon" />
                        Technologies & Skills
                      </h4>
                      <div className="technologies-container">
                        {technologies.map((tech, i) => (
                          <span key={i} className="technology-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expand/Collapse Button */}
            {responsibilities.length > 3 && (
              <button 
                className="expand-button"
                onClick={toggleExpand}
                aria-expanded={isExpanded}
                aria-label={isExpanded ? 'Show less details' : 'Show more details'}
              >
                <span>{isExpanded ? 'Show Less' : 'View Details'}</span>
                {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Card layout (default)
  return (
    <motion.div
      className="internship-card"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Header */}
      <div className="internship-header">
        <div className="internship-title-section">
          <h3 className="internship-title">
            <FaBriefcase className="title-icon" />
            {title}
          </h3>
          
          <div className="internship-company">
            {companyLogo && (
              <img 
                src={companyLogo} 
                alt={`${company} logo`} 
                className="company-logo"
              />
            )}
            <div className="company-info">
              <span className="company-name">
                <FaBuilding className="info-icon" />
                {company}
                {companyUrl && (
                  <a 
                    href={companyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="company-link"
                    aria-label={`Visit ${company} website`}
                  >
                    <FaExternalLinkAlt />
                  </a>
                )}
              </span>
              <span className="company-location">
                <FaMapMarkerAlt className="info-icon" />
                {location}
              </span>
            </div>
          </div>
        </div>

        <span 
          className="internship-type-badge"
          style={{
            background: typeStyle.bg,
            color: typeStyle.text,
            borderColor: typeStyle.border
          }}
        >
          {type}
        </span>
      </div>

      {/* Duration Badge */}
      <div className="duration-badge">
        <FaCalendarAlt />
        <span>{duration}</span>
      </div>

      {/* Summary */}
      {summary && (
        <p className="internship-summary">{summary}</p>
      )}

      {/* Key Highlights */}
      <div className="internship-highlights">
        {industry && (
          <span className="highlight-tag">{industry}</span>
        )}
        {teamSize && (
          <span className="highlight-tag">Team: {teamSize}</span>
        )}
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {(isExpanded || responsibilities.length <= 3) && (
          <motion.div
            className="internship-details"
            variants={contentVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
          >
            {/* Responsibilities */}
            <div className="details-section">
              <h4 className="details-title">Key Responsibilities</h4>
              <ul className="responsibilities-list">
                {responsibilities.map((task, i) => (
                  <li key={i} className="responsibility-item">
                    <FaCheckCircle className="bullet-icon" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Achievements */}
            {achievements.length > 0 && (
              <div className="details-section">
                <h4 className="details-title achievements-title">
                  <FaTrophy className="section-icon" />
                  Key Achievements
                </h4>
                <ul className="achievements-list">
                  {achievements.map((achievement, i) => (
                    <li key={i} className="achievement-item">
                      <span className="achievement-badge">★</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            {technologies.length > 0 && (
              <div className="details-section">
                <h4 className="details-title">
                  <FaTools className="section-icon" />
                  Technologies & Skills
                </h4>
                <div className="technologies-container">
                  {technologies.map((tech, i) => (
                    <span key={i} className="technology-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand/Collapse Button */}
      {responsibilities.length > 3 && (
        <button 
          className="expand-button"
          onClick={toggleExpand}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Show less details' : 'Show more details'}
        >
          <span>{isExpanded ? 'Show Less' : 'View Details'}</span>
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      )}
    </motion.div>
  );
};

export default InternshipCard;
