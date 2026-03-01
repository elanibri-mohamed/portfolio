import React from 'react';
import { motion } from 'framer-motion';
import './SectionTitle.css';

/**
 * Reusable Section Title Component
 * 
 * @param {string} title - Main title text
 * @param {string} subtitle - Optional subtitle/description
 * @param {string} icon - Optional icon (emoji or component)
 * @param {boolean} centered - Whether to center align
 * @param {string} className - Additional CSS classes
 */
const SectionTitle = ({ 
  title, 
  subtitle, 
  icon, 
  centered = true,
  className = '' 
}) => {
  return (
    <motion.div 
      className={`section-title ${centered ? 'section-title--centered' : ''} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {icon && (
        <span className="section-title__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <h2 className="section-title__heading">{title}</h2>
      {subtitle && (
        <p className="section-title__subtitle">{subtitle}</p>
      )}
      <div className="section-title__underline" aria-hidden="true" />
    </motion.div>
  );
};

export default React.memo(SectionTitle);
