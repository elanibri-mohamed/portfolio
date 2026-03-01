import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCalendarAlt, FaMapMarkerAlt, FaUser, FaUsers, FaStar, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './ProjectCard.css';

const ProjectCard = ({ project, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    title,
    tagline,
    image,
    techStack,
    description,
    achievements,
    duration,
    location,
    githubUrl,
    liveDemoUrl,
    featured,
    category,
    role,
    metrics
  } = project;

  return (
    <motion.div
      className={`project-card ${featured ? 'featured' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      {featured && (
        <div className="featured-badge">
          <FaStar className="featured-icon" />
          <span>Featured</span>
        </div>
      )}

      <div className="project-image-container">
        <img 
          src={image || '/project-placeholder.jpg'} 
          alt={`${title} screenshot`}
          className="project-image"
          loading="lazy"
        />
        <div className="project-image-overlay">
          <div className="project-category">{category}</div>
        </div>
      </div>

      <div className="project-content">
        <div className="project-header">
          <h3 className="project-title">{title}</h3>
          <p className="project-tagline">{tagline}</p>
        </div>

        <div className="project-meta">
          <div className="meta-item">
            <FaCalendarAlt className="meta-icon" />
            <span>{duration}</span>
          </div>
          {location && (
            <div className="meta-item">
              <FaMapMarkerAlt className="meta-icon" />
              <span>{location}</span>
            </div>
          )}
          <div className="meta-item">
            {role === 'Individual' ? <FaUser className="meta-icon" /> : <FaUsers className="meta-icon" />}
            <span>{role}</span>
          </div>
        </div>

        <div className="tech-stack">
          {techStack.map((tech, i) => (
            <span key={i} className="tech-tag">{tech}</span>
          ))}
        </div>

        <div className={`project-description ${isExpanded ? 'expanded' : ''}`}>
          <p className="description-text">{description}</p>
          
          {achievements && achievements.length > 0 && (
            <div className="achievements-section">
              <h4>Key Achievements</h4>
              <ul className="achievements-list">
                {achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </div>
          )}

          {metrics && metrics.length > 0 && (
            <div className="metrics-section">
              {metrics.map((metric, i) => (
                <div key={i} className="metric-item">
                  <span className="metric-value">{metric.value}</span>
                  <span className="metric-label">{metric.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {(achievements?.length > 0 || description.length > 150) && (
          <button 
            className="expand-button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'Show less details' : 'View more details'}
          >
            {isExpanded ? (
              <>
                <span>Show Less</span>
                <FaChevronUp className="expand-icon" />
              </>
            ) : (
              <>
                <span>View Details</span>
                <FaChevronDown className="expand-icon" />
              </>
            )}
          </button>
        )}

        <div className="project-links">
          {githubUrl && (
            <a 
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link github-link"
              aria-label={`View ${title} source code on GitHub`}
            >
              <FaGithub className="link-icon" />
              <span>Source Code</span>
            </a>
          )}
          {liveDemoUrl && (
            <a 
              href={liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link demo-link"
              aria-label={`View ${title} live demo`}
            >
              <FaExternalLinkAlt className="link-icon" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
