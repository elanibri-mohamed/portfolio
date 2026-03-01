import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaBriefcase, 
  FaFilter, 
  FaList, 
  FaStream,
  FaBuilding,
  FaGraduationCap,
  FaServer
} from 'react-icons/fa';
import InternshipCard from './InternshipCard';
import './Internships.css';

/**
 * Internships Component
 * 
 * A professional, modern section showcasing work experience with:
 * - Card or Timeline layout options
 * - Data-driven architecture
 * - Smooth animations
 * - Filter capabilities (scalable for future expansion)
 */
const Internships = () => {
  const [layoutMode, setLayoutMode] = useState('card'); // 'card' | 'timeline'
  const [filterType, setFilterType] = useState('All');

  // Enhanced internship data structure
  // This can be easily extended for future experiences
  const internshipsData = [
    {
      id: 1,
      title: 'IT Manager Assistant',
      company: 'Movenpick Hotel & Casino Malabata Tanger',
      companyLogo: null, // Add path to logo if available
      companyUrl: 'https://www.movenpick.com',
      location: 'Tanger, Morocco',
      duration: 'Jul 2025 – Sep 2025',
      type: 'Summer Internship',
      summary: 'Supported IT operations in a hospitality and gaming environment, focusing on network administration, security compliance, and infrastructure automation.',
      industry: 'Hospitality & Gaming',
      teamSize: '5 IT Staff',
      responsibilities: [
        'Managed network administration tasks and infrastructure troubleshooting for 200+ endpoints across hotel and casino operations',
        'Configured and maintained RFID/magnetic card access control systems, ensuring secure physical access management',
        'Contributed to PCI DSS compliance initiatives by implementing security controls and documentation for payment card environments',
        'Implemented automated database backup solutions using SQL Server Maintenance Plans, reducing manual intervention by 80%',
        'Assisted in cybersecurity audits and vulnerability assessments to maintain regulatory compliance',
        'Documented IT procedures and created knowledge base articles for internal team reference'
      ],
      technologies: [
        'Active Directory',
        'Cisco Networking',
        'PCI DSS',
        'SQL Server',
        'RFID Systems',
        'Windows Server',
        'VMware',
        'Network Security'
      ],
      achievements: [
        'Successfully automated critical database backup processes, improving data protection reliability',
        'Contributed to maintaining 99.9% uptime for critical hospitality systems during peak season'
      ]
    },
    {
      id: 2,
      title: 'IT Technician',
      company: 'Data Process',
      companyLogo: null,
      companyUrl: null,
      location: 'Casablanca, Morocco',
      duration: 'Aug 2024 – Sep 2024',
      type: 'Summer Internship',
      summary: 'Provided comprehensive IT support and infrastructure management, implementing ITSM solutions and managing enterprise directory services.',
      industry: 'IT Services',
      teamSize: '8 IT Staff',
      responsibilities: [
        'Performed troubleshooting and maintenance of IT devices, hardware, and network infrastructure for 150+ users',
        'Implemented GLPI (ITSM tool) for centralized IT ticket management, improving response time tracking and SLA compliance',
        'Managed Microsoft Active Directory user accounts, groups, and Group Policy Objects (GPOs)',
        'Configured and deployed desktop systems, printers, and peripheral devices across multiple departments',
        'Assisted in network monitoring and basic firewall configuration for office infrastructure',
        'Created technical documentation and end-user training materials'
      ],
      technologies: [
        'Microsoft Active Directory',
        'GLPI',
        'Windows 10/11',
        'Office 365',
        'TCP/IP',
        'DHCP/DNS',
        'Hardware Troubleshooting',
        'ITSM'
      ],
      achievements: [
        'Successfully deployed GLPI ticketing system, reducing ticket resolution time by 30%',
        'Streamlined user onboarding process through improved AD automation and documentation'
      ]
    },
    {
      id: 3,
      title: 'IT Support',
      company: 'Movenpick Hotel & Casino Malabata Tanger',
      companyLogo: null,
      companyUrl: 'https://www.movenpick.com',
      location: 'Tanger, Morocco',
      duration: 'Aug 2023 – Oct 2023',
      type: 'Summer Internship',
      summary: 'Delivered Level 1 and Level 2 technical support in a fast-paced hospitality environment, managing diverse technology systems.',
      industry: 'Hospitality',
      teamSize: '4 IT Staff',
      responsibilities: [
        'Provided Level 1 and Level 2 IT support to 150+ hotel staff and management personnel',
        'Administered and maintained system and network infrastructure including switches, access points, and servers',
        'Managed user accounts and access permissions across various hotel management systems',
        'Troubleshot hospitality-specific software including PMS (Property Management System) and POS systems',
        'Performed routine maintenance on IT equipment and coordinated with vendors for repairs',
        'Responded to technical incidents and documented resolutions for knowledge sharing'
      ],
      technologies: [
        'Help Desk Support',
        'PMS Systems',
        'POS Systems',
        'Network Troubleshooting',
        'Windows Server',
        'Printer Management',
        'Remote Support Tools'
      ],
      achievements: [
        'Maintained 95%+ customer satisfaction rating for technical support requests',
        'Reduced recurring technical issues by 40% through proactive documentation and training'
      ]
    }
  ];

  // Filter internships based on selected type
  const filteredInternships = filterType === 'All' 
    ? internshipsData 
    : internshipsData.filter(internship => internship.type === filterType);

  // Get unique internship types for filter
  const internshipTypes = ['All', ...new Set(internshipsData.map(i => i.type))];

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  // Calculate total experience stats
  const totalInternships = internshipsData.length;
  const totalTechnologies = new Set(internshipsData.flatMap(i => i.technologies)).size;
  const companiesWorked = new Set(internshipsData.map(i => i.company)).size;

  return (
    <section className="internships-section" id="internships">
      <div className="internships-container">
        {/* Section Header */}
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-icon-wrapper">
            <FaBriefcase className="section-icon" />
          </div>
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle">
            Hands-on experience in cybersecurity, cloud infrastructure, and IT operations 
            across hospitality and enterprise environments
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          className="experience-stats"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="stat-card">
            <FaBriefcase className="stat-icon" />
            <span className="stat-value">{totalInternships}</span>
            <span className="stat-label">Internships</span>
          </div>
          <div className="stat-card">
            <FaBuilding className="stat-icon" />
            <span className="stat-value">{companiesWorked}</span>
            <span className="stat-label">Companies</span>
          </div>
          <div className="stat-card">
            <FaServer className="stat-icon" />
            <span className="stat-value">{totalTechnologies}+</span>
            <span className="stat-label">Technologies</span>
          </div>
          <div className="stat-card">
            <FaGraduationCap className="stat-icon" />
            <span className="stat-value">6+</span>
            <span className="stat-label">Months Experience</span>
          </div>
        </motion.div>

        {/* Controls Bar */}
        <motion.div 
          className="internships-controls"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Filter Dropdown */}
          <div className="filter-group">
            <label className="filter-label">
              <FaFilter className="filter-icon" />
              Filter by Type:
            </label>
            <select 
              className="filter-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              aria-label="Filter internships by type"
            >
              {internshipTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'All' ? 'All Internships' : type}
                </option>
              ))}
            </select>
          </div>

          {/* Layout Toggle */}
          <div className="layout-toggle">
            <span className="layout-label">Layout:</span>
            <div className="layout-buttons">
              <button
                className={`layout-button ${layoutMode === 'card' ? 'active' : ''}`}
                onClick={() => setLayoutMode('card')}
                aria-label="Card layout"
                aria-pressed={layoutMode === 'card'}
              >
                <FaList />
                <span>Cards</span>
              </button>
              <button
                className={`layout-button ${layoutMode === 'timeline' ? 'active' : ''}`}
                onClick={() => setLayoutMode('timeline')}
                aria-label="Timeline layout"
                aria-pressed={layoutMode === 'timeline'}
              >
                <FaStream />
                <span>Timeline</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Internships Display */}
        <motion.div
          className={layoutMode === 'card' ? 'internships-grid' : 'internships-timeline'}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {filteredInternships.map((internship, index) => (
            <InternshipCard
              key={internship.id}
              internship={internship}
              index={index}
              layout={layoutMode}
            />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredInternships.length === 0 && (
          <motion.div 
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>No internships found for the selected filter.</p>
          </motion.div>
        )}

        {/* Professional Tips Section */}
        <motion.div 
          className="professional-tips"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="tips-title">Continuous Growth</h3>
          <p className="tips-text">
            Each internship has strengthened my expertise in cybersecurity best practices, 
            cloud infrastructure management, and enterprise IT operations. I'm eager to 
            contribute to innovative security and cloud projects while continuing to expand 
            my technical capabilities.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Internships;
