import React from 'react';
import SkillBadge from './SkillBadge';
import './SkillCategory.css';

/**
 * SkillCategory Component
 * Displays a category of skills in a styled card
 * 
 * @param {Object} props
 * @param {string} props.title - Category title
 * @param {string} props.icon - Category icon (emoji or icon class)
 * @param {string} props.color - Accent color for the category
 * @param {Array} props.skills - Array of skill objects
 * @param {number} props.delay - Animation delay in ms
 */
const SkillCategory = ({ 
  title, 
  icon, 
  color = '#007bff', 
  skills = [],
  delay = 0
}) => {
  return (
    <div 
      className="skill-category"
      style={{ 
        '--category-color': color,
        animationDelay: `${delay}ms`
      }}
    >
      <div className="category-header">
        <span className="category-icon" role="img" aria-label={`${title} icon`}>
          {icon}
        </span>
        <h3 className="category-title">{title}</h3>
        <span className="skill-count">{skills.length}</span>
      </div>
      
      <div className="category-divider" />
      
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <SkillBadge
            key={`${skill.name}-${index}`}
            name={skill.name}
            level={skill.level}
            icon={skill.icon}
            description={skill.description}
            certified={skill.certified}
            certificationName={skill.certificationName}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillCategory;
