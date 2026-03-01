import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGraduationCap,
  FaUniversity,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
  FaBook,
  FaAward,
  FaStar,
  FaShieldAlt,
  FaCloud,
  FaServer,
  FaNetworkWired,
  FaLock
} from 'react-icons/fa';
import './EducationCard.css';

/**
 * EducationCard Component
 *
 * A reusable, professional card component for displaying education entries.
 * Features expandable details, skill tags, coursework, achievements, and smooth animations.
 *
 * @param {Object} education - The education data object
 * @param {number} index - The index for staggered animation
 * @param {string} layout - Layout style: 'card' | 'timeline'
 */
const EducationCard = ({ education, index = 0, layout = 'timeline' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    degree,
    fieldOfStudy,
    institution,
    institutionLogo,
    location,
    startDate,
    endDate,
    summary,
    coursework = [],
    projects = [],
    achievements = [],
    gpa,
    specialization,
    skillTags = []
  } = education;

  // Toggle expand/collapse
  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Get icon based on specialization or field
  const getSpecializationIcon = () => {
    if (specialization?.toLowerCase().includes('cybersecurity')) return <FaShieldAlt />;
    if (specialization?.toLowerCase().includes('cloud')) return <FaCloud />;
    if (specialization?.toLowerCase().includes('network')) return <FaNetworkWired />;
    if (specialization?.toLowerCase().includes('server')) return <FaServer />;
    if (specialization?.toLowerCase().includes('security')) return <FaLock />;
    return <FaGraduationCap />;
  };

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
        delay: index * 0.2,
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

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    })
  };

  // Timeline dot animation
  const timelineDotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: index * 0.2 + 0.3,
        duration: 0.4,
        type: 'spring',
        stiffness: 200
      }
    }
  };

  return (
    <motion.div
      className={`education-wrapper ${layout}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Timeline dot and line for timeline layout */}
      {layout === 'timeline' && (
        <div className="timeline-marker">
          <motion.div
            className="timeline-dot"
            variants={timelineDotVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {getSpecializationIcon()}
          </motion.div>
          <div className="timeline-line"></div>
        </div>
      )}

      {/* Main Card */}
      <div className={`education-card ${layout}`}>
        {/* Specialization Badge */}
        {specialization && (
          <div className="specialization-badge">
            <span className="badge-icon">{getSpecializationIcon()}</span>
            <span className="badge-text">{specialization}</span>
          </div>
        )}

        {/* Header Section */}
        <div className="education-header">
          <div className="education-title-section">
            <h3 className="education-degree">
              <FaGraduationCap className="title-icon" />
              {degree}
            </h3>
            {fieldOfStudy && (
              <p className="education-field">{fieldOfStudy}</p>
            )}
          </div>

          {/* GPA Badge */}
          {gpa && (
            <div className="gpa-badge">
              <FaStar className="gpa-icon" />
              <span className="gpa-value">GPA: {gpa}</span>
            </div>
          )}
        </div>

        {/* Institution Info */}
        <div className="education-institution">
          {institutionLogo && (
            <img
              src={institutionLogo}
              alt={`${institution} logo`}
              className="institution-logo"
            />
          )}
          <div className="institution-details">
            <div className="institution-name">
              <FaUniversity className="info-icon" />
              <span>{institution}</span>
            </div>
            <div className="institution-location">
              <FaMapMarkerAlt className="info-icon" />
              <span>{location}</span>
            </div>
          </div>
        </div>

        {/* Date Range */}
        <div className="education-date">
          <FaCalendarAlt className="date-icon" />
          <span>{startDate} — {endDate}</span>
        </div>

        {/* Summary */}
        {summary && (
          <p className="education-summary">{summary}</p>
        )}

        {/* Skill Tags */}
        {skillTags.length > 0 && (
          <div className="skill-tags">
            {skillTags.map((tag, i) => (
              <motion.span
                key={i}
                className="skill-tag"
                custom={i}
                variants={tagVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        )}

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="expandable-content"
              variants={contentVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
            >
              {/* Coursework Section */}
              {coursework.length > 0 && (
                <div className="content-section">
                  <h4 className="section-title">
                    <FaBook className="section-icon" />
                    Relevant Coursework
                  </h4>
                  <ul className="coursework-list">
                    {coursework.map((course, i) => (
                      <li key={i} className="coursework-item">
                        <span className="bullet">▸</span>
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Projects Section */}
              {projects.length > 0 && (
                <div className="content-section">
                  <h4 className="section-title">
                    <FaAward className="section-icon" />
                    Key Projects
                  </h4>
                  <ul className="projects-list">
                    {projects.map((project, i) => (
                      <li key={i} className="project-item">
                        <span className="bullet">▸</span>
                        <div className="project-content">
                          <strong className="project-name">{project.name}</strong>
                          {project.description && (
                            <p className="project-description">{project.description}</p>
                          )}
                          {project.technologies && (
                            <div className="project-tech">
                              {project.technologies.map((tech, j) => (
                                <span key={j} className="tech-tag">{tech}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Achievements Section */}
              {achievements.length > 0 && (
                <div className="content-section">
                  <h4 className="section-title">
                    <FaStar className="section-icon" />
                    Honors & Achievements
                  </h4>
                  <ul className="achievements-list">
                    {achievements.map((achievement, i) => (
                      <li key={i} className="achievement-item">
                        <span className="achievement-icon">🏆</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand/Collapse Button */}
        {(coursework.length > 0 || projects.length > 0 || achievements.length > 0) && (
          <button
            className={`expand-button ${isExpanded ? 'expanded' : ''}`}
            onClick={toggleExpand}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Show less details' : 'Show more details'}
          >
            <span className="expand-text">
              {isExpanded ? 'Show Less' : 'View Details'}
            </span>
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default EducationCard;
