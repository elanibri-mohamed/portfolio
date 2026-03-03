import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFolderOpen, FaFilter } from 'react-icons/fa';
import ProjectCard from './ProjectCard';
import './Projects.css';
import IDSproject from '../assets/projects/ids-ips-project.png';
import cloudAutomation from '../assets/projects/cloud-automation.jpg';
import networkSecurity from '../assets/projects/network-security.png';
import siemProject from '../assets/projects/siem-project.jpg';
/**
 * Projects Data
 * Using relative paths for GitHub Pages compatibility
 */
const PROJECTS_DATA = [
  {
    id: 'enterprise-ids-ips',
    title: 'Enterprise IDS/IPS Security System',
    tagline: 'Complete network security implementation with real-time threat detection',
    image: IDSproject,
    fallbackImage: '/background.jpeg',
    category: 'Security',
    techStack: ['Snort', 'Ubuntu Server', 'Cisco ASA', 'OSPF', 'VLAN', 'STP'],
    description: 'Designed and implemented a comprehensive Intrusion Detection and Prevention System for a simulated enterprise environment. Configured Snort on Ubuntu Server to monitor network traffic and detect potential threats in real-time.',
    achievements: [
      'Configured Snort with 50+ custom rules for threat detection',
      'Implemented VLAN segmentation across 5 network zones',
      'Deployed OSPF routing for dynamic network topology',
      'Established secure Inter-VLAN routing with ACL policies',
      'Reduced false positive alerts by 40% through rule optimization'
    ],
    duration: 'May 2024 - Jun 2024',
    location: 'Rabat, Morocco',
    role: 'Individual',
    featured: true,
    githubUrl: null, // Add when available
    liveDemoUrl: null,
    metrics: [
      { value: '99.8%', label: 'Uptime' },
      { value: '<50ms', label: 'Detection Latency' }
    ]
  },
  {
    id: 'cloud-infrastructure-automation',
    title: 'Cloud Infrastructure Automation',
    tagline: 'AWS-based infrastructure with Terraform automation and CI/CD pipeline',
    image: cloudAutomation,
    fallbackImage: '/background.jpeg',
    category: 'Cloud',
    techStack: ['AWS', 'Terraform', 'Docker', 'GitHub Actions', 'Python', 'Bash'],
    description: 'Built a scalable cloud infrastructure on AWS using Infrastructure as Code principles. Automated deployment processes with Terraform and established CI/CD pipelines for continuous integration and delivery.',
    achievements: [
      'Provisioned EC2, S3, RDS, and VPC resources using Terraform',
      'Created automated CI/CD pipeline with GitHub Actions',
      'Implemented Infrastructure as Code best practices',
      'Reduced deployment time by 70% through automation',
      'Established monitoring with CloudWatch and custom dashboards'
    ],
    duration: 'Jan 2024 - Mar 2024',
    location: 'Remote',
    role: 'Individual',
    featured: false,
    githubUrl: null,
    liveDemoUrl: null,
    metrics: [
      { value: '70%', label: 'Deployment Speed' },
      { value: '$500', label: 'Monthly Savings' }
    ]
  },
  {
    id: 'secure-network-architecture',
    title: 'Secure Network Architecture Design',
    tagline: 'Multi-layer network security with DMZ, firewall clustering, and VPN',
    image: networkSecurity,
    fallbackImage: '/background.jpeg',
    category: 'Networking',
    techStack: ['Cisco IOS', 'Palo Alto', 'WireGuard', 'BGP', 'HSRP', 'NAT'],
    description: 'Designed and implemented a secure enterprise network architecture featuring a DMZ for public-facing services, firewall clustering for high availability, and secure VPN access for remote employees.',
    achievements: [
      'Designed 3-tier architecture with secure DMZ implementation',
      'Configured HSRP for gateway redundancy and failover',
      'Implemented site-to-site VPN with WireGuard',
      'Established BGP peering for multi-homed connectivity',
      'Created comprehensive network documentation and diagrams'
    ],
    duration: 'Nov 2023 - Dec 2023',
    location: 'Casablanca, Morocco',
    role: 'Team',
    featured: false,
    githubUrl: null,
    liveDemoUrl: null,
    metrics: [
      { value: '99.9%', label: 'Availability' },
      { value: '3', label: 'Security Layers' }
    ]
  },
  {
    id: 'siem-implementation',
    title: 'SIEM Implementation & Log Analysis',
    tagline: 'Centralized security monitoring with ELK Stack and custom dashboards',
    image: siemProject,
    fallbackImage: '/background.jpeg',
    category: 'Security',
    techStack: ['ELK Stack', 'Syslog', 'Linux', 'Python', 'REST API', 'Grafana'],
    description: 'Deployed a Security Information and Event Management (SIEM) system using the ELK Stack. Configured centralized log collection from multiple sources and created custom dashboards for security monitoring.',
    achievements: [
      'Collected and normalized logs from 15+ sources',
      'Created 20+ custom Kibana dashboards for monitoring',
      'Developed Python scripts for automated log analysis',
      'Implemented real-time alerting for critical security events',
      'Reduced incident response time by 60%'
    ],
    duration: 'Sep 2023 - Oct 2023',
    location: 'Remote',
    role: 'Individual',
    featured: false,
    githubUrl: null,
    liveDemoUrl: null,
    metrics: [
      { value: '15+', label: 'Log Sources' },
      { value: '60%', label: 'Response Time' }
    ]
  }
];

const CATEGORIES = ['All', 'Security', 'Cloud', 'Networking'];

/**
 * Projects Component
 * Optimized with useMemo and useCallback for performance
 */
const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  // Memoize filtered projects to prevent unnecessary recalculations
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS_DATA;
    return PROJECTS_DATA.filter(project => project.category === activeFilter);
  }, [activeFilter]);

  // Memoize featured project
  const featuredProject = useMemo(() => 
    PROJECTS_DATA.find(p => p.featured),
    []
  );

  // Callback for filter changes
  const handleFilterChange = useCallback((category) => {
    setActiveFilter(category);
  }, []);

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section className="projects" id="projects" aria-labelledby="projects-heading">
      <div className="projects__container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="section-icon-wrapper">
            <FaFolderOpen className="section-icon" />
          </div>
          <h2 id="projects-heading" className="section-title">
            Projects
          </h2>
          <p className="section-subtitle">
            Hands-on projects demonstrating cybersecurity and cloud engineering expertise
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="projects__filters" role="tablist" aria-label="Filter projects by category">
          <FaFilter className="projects__filter-icon" aria-hidden="true" />
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={`projects__filter-btn ${activeFilter === category ? 'projects__filter-btn--active' : ''}`}
              onClick={() => handleFilterChange(category)}
              role="tab"
              aria-selected={activeFilter === category}
              aria-controls="projects-grid"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            id="projects-grid"
            className="projects__grid"
            role="tabpanel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                featured={project.id === featuredProject?.id}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <p className="projects__empty" role="status">
            No projects found in this category.
          </p>
        )}
      </div>
    </section>
  );
};

export default React.memo(Projects);
