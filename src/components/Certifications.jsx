import React, { useState } from 'react';
import './Certifications.css';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

// sample data structure; update with real links and image paths
const certificationsData = [
  {
    title: 'Fortinet FortiGate 7.4 Administrator',
    organization: 'Fortinet',
    issueDate: 'June 2023',
    // placeholder badge; replace with real URL or local path
    badge: '/src/assets/certs/fortinet-fortigate-7-4-administrator.jpg',
    alt: 'Fortinet FortiGate 7.4 Administrator badge',
    verificationLink: 'https://verify.fortinet.com/your-cert',
    description:
      'Configured and managed FortiGate firewalls including policy creation, VPNs, and high availability. Learned advanced security features and troubleshooting.',
    credentialId: 'FG-7.4-12345',
    status: 'Active',
    tags: ['Security', 'Network', 'Firewall'],
  },
  {
    title: 'AWS Cloud Foundations',
    organization: 'Amazon Web Services',
    issueDate: 'April 2024',
    badge: 'https://via.placeholder.com/300x180?text=AWS+Badge',
    alt: 'AWS Cloud Foundations badge',
    verificationLink: 'https://www.yourverificationlink.com/aws',
    description:
      'Introduced to core AWS services, cloud concepts and best practices for architecting solutions on AWS. Covered compute, storage, networking, and security fundamentals.',
    credentialId: 'AWS-1234567890',
    status: 'Completed',
    tags: ['AWS', 'Cloud', 'Security'],
  },
  // add more certificates as needed
];

const Certifications = () => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (idx) => {
    setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <section className="certifications" id="certifications">
      <h2>Certifications</h2>
      <div className="cert-grid">
        {certificationsData.map((cert, idx) => (
          <motion.div
            className="cert-card"
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <div className="badge-container">
              <img src={cert.badge} alt={cert.alt} className="cert-badge" />
            </div>
            <div className="cert-info">
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-org">{cert.organization}</p>
              <p className="cert-date">{cert.issueDate}</p>
              {cert.credentialId && (
                <p className="cert-id">
                  Credential ID: {cert.credentialId}
                </p>
              )}
              <div className="status-tags">
                <span className={`status ${cert.status.toLowerCase()}`}>
                  {cert.status}
                </span>
                <div className="tags">
                  {cert.tags.map((t, i) => (
                    <span key={i} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <p
                className={`cert-description ${
                  expanded[idx] ? 'expanded' : ''
                }`}
              >
                {cert.description}
                {cert.description.length > 120 && (
                  <button
                    className="read-more"
                    onClick={() => toggleExpand(idx)}
                    aria-label={
                      expanded[idx] ? 'Collapse description' : 'Read more'
                    }
                  >
                    {expanded[idx] ? 'Show Less' : 'Read More'}
                  </button>
                )}
              </p>
            </div>
            <a
              href={cert.verificationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="verify-button"
            >
              <FaExternalLinkAlt className="verify-icon" />
              Verify
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;