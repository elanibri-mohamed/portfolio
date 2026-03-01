import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaChevronDown, FaAward } from 'react-icons/fa';
import SectionTitle from './ui/SectionTitle';
import fortinetBadge from '../assets/certs/fortinet-fortigate-7-4-administrator.jpg';
import awsBadge from '../assets/certs/aws-cloudFoundations.png';
import './Certifications.css';

/**
 * Certifications data
 * Unique certifications only - no duplicates
 */
const CERTIFICATIONS_DATA = [
  {
    id: 'fortinet-fortigate-2025',
    title: 'Fortinet FortiGate 7.4 Administrator',
    organization: 'Fortinet',
    issueDate: 'September 2025',
    expiryDate: 'September 2027',
    badge: fortinetBadge,
    alt: 'Fortinet FortiGate 7.4 Administrator certification badge',
    verificationLink: 'https://www.credly.com/badges/7bd95ad0-3213-418b-85a8-fd71e3dd6da3/public_url',
    description: 'Professional certification validating expertise in configuring and managing FortiGate firewalls, including security policies, VPNs, high availability, and advanced security features.',
    credentialId: 'NSE4-FGT74',
    status: 'Active',
    skills: ['Firewall Management', 'VPN Configuration', 'Network Security', 'UTM'],
  },
  {
    id: 'aws-cloud-foundations-2026',
    title: 'AWS Cloud Foundations',
    organization: 'Amazon Web Services',
    issueDate: 'January 2026',
    badge: awsBadge,
    alt: 'AWS Cloud Foundations certification badge',
    verificationLink: 'https://www.credly.com/badges/b2a62a0b-48d7-40dd-9332-1b035da3ba83/public_url',
    description: 'Foundational certification covering core AWS services, cloud concepts, security best practices, and architectural principles for building on AWS.',
    credentialId: 'AWS-CF-2026',
    status: 'Active',
    skills: ['AWS Core Services', 'Cloud Architecture', 'Security Best Practices', 'Cost Management'],
  },
];

/**
 * Certification Card Component
 * Memoized for performance
 */
const CertificationCard = React.memo(({ cert, isExpanded, onToggle, index }) => {
  return (
    <motion.article
      className="certification-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="certification-card__header">
        <div className="certification-card__badge-wrapper">
          <img
            src={cert.badge}
            alt={cert.alt}
            className="certification-card__badge"
            loading="lazy"
          />
          <span 
            className={`certification-card__status certification-card__status--${cert.status.toLowerCase()}`}
            aria-label={`Status: ${cert.status}`}
          >
            {cert.status}
          </span>
        </div>

        <div className="certification-card__info">
          <h3 className="certification-card__title">{cert.title}</h3>
          <p className="certification-card__org">{cert.organization}</p>
          <p className="certification-card__date">
            Issued: {cert.issueDate}
            {cert.expiryDate && ` · Expires: ${cert.expiryDate}`}
          </p>
          {cert.credentialId && (
            <p className="certification-card__credential">
              Credential ID: {cert.credentialId}
            </p>
          )}
        </div>

        <a
          href={cert.verificationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="certification-card__verify"
          aria-label={`Verify ${cert.title} credential`}
        >
          <FaExternalLinkAlt />
          <span>Verify</span>
        </a>
      </div>

      <div className="certification-card__content">
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              className="certification-card__details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="certification-card__description">{cert.description}</p>
              
              {cert.skills && cert.skills.length > 0 && (
                <div className="certification-card__skills">
                  <span className="certification-card__skills-label">Key Skills:</span>
                  <div className="certification-card__skills-list">
                    {cert.skills.map((skill) => (
                      <span key={skill} className="certification-card__skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          className="certification-card__toggle"
          onClick={() => onToggle(cert.id)}
          aria-expanded={isExpanded}
          aria-controls={`cert-details-${cert.id}`}
        >
          <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FaChevronDown />
          </motion.span>
        </button>
      </div>
    </motion.article>
  );
});

CertificationCard.displayName = 'CertificationCard';

/**
 * Main Certifications Component
 */
const Certifications = () => {
  const [expandedIds, setExpandedIds] = useState(new Set());

  const toggleExpand = useCallback((id) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  return (
    <section className="certifications" id="certifications" aria-labelledby="certifications-heading">
      <div className="certifications__container">
        <SectionTitle
          icon={<FaAward />}
          title="Certifications"
          subtitle="Professional certifications validating expertise in cybersecurity and cloud technologies"
        />

        <div className="certifications__list" role="list">
          {CERTIFICATIONS_DATA.map((cert, index) => (
            <CertificationCard
              key={cert.id}
              cert={cert}
              isExpanded={expandedIds.has(cert.id)}
              onToggle={toggleExpand}
              index={index}
            />
          ))}
        </div>

        <motion.p 
          className="certifications__note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Continuously pursuing new certifications to stay current with industry standards.
        </motion.p>
      </div>
    </section>
  );
};

export default React.memo(Certifications);
