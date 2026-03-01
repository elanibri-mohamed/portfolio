import React, { useState } from 'react';
import './SkillBadge.css';

/**
 * SkillBadge Component
 * Displays individual skill with icon, proficiency level, and optional certification badge
 * 
 * @param {Object} props
 * @param {string} props.name - Skill name
 * @param {string} props.level - Proficiency level ('basic' | 'intermediate' | 'advanced' | 'expert')
 * @param {string} props.icon - Font Awesome icon class or emoji
 * @param {string} props.description - Short description for tooltip
 * @param {boolean} props.certified - Whether the skill has a certification
 * @param {string} props.certificationName - Name of the certification
 */
const SkillBadge = ({ 
  name, 
  level = 'intermediate', 
  icon = null, 
  description = '', 
  certified = false,
  certificationName = ''
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getLevelColor = (lvl) => {
    switch (lvl.toLowerCase()) {
      case 'basic':
        return '#6c757d';
      case 'intermediate':
        return '#17a2b8';
      case 'advanced':
        return '#007bff';
      case 'expert':
        return '#28a745';
      default:
        return '#6c757d';
    }
  };

  const getLevelWidth = (lvl) => {
    switch (lvl.toLowerCase()) {
      case 'basic':
        return '25%';
      case 'intermediate':
        return '50%';
      case 'advanced':
        return '75%';
      case 'expert':
        return '100%';
      default:
        return '50%';
    }
  };

  return (
    <div 
      className="skill-badge"
      onMouseEnter={() => description && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="skill-badge-content">
        {icon && (
          <span className="skill-icon" role="img" aria-label={`${name} icon`}>
            {icon}
          </span>
        )}
        <span className="skill-name">{name}</span>
        {certified && (
          <span 
            className="certification-badge" 
            title={certificationName || 'Certified'}
            aria-label="Certified skill"
          >
            🏆
          </span>
        )}
      </div>
      
      <div className="skill-level-indicator">
        <div 
          className="skill-level-bar"
          style={{ 
            width: getLevelWidth(level),
            backgroundColor: getLevelColor(level)
          }}
          aria-label={`Proficiency: ${level}`}
        />
      </div>

      {description && showTooltip && (
        <div className="skill-tooltip" role="tooltip">
          <p className="tooltip-description">{description}</p>
          <span className="tooltip-level">Level: {level}</span>
        </div>
      )}
    </div>
  );
};

export default SkillBadge;
