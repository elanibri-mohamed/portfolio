import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaUniversity } from 'react-icons/fa';
import EducationCard from './EducationCard';
import './Education.css';
import ensamLogo from '../assets/ensam.svg';

/**
 * Education Component
 *
 * Displays academic background in a professional timeline layout.
 * Features cybersecurity and cloud computing focused education entries
 * with detailed coursework, projects, and achievements.
 */
const Education = () => {
  // Education data array - structured and scalable
  const educationData = [
    {
      id: 1,
      degree: "Engineer's Diploma",
      fieldOfStudy: 'Cybersecurity & Cloud Computing',
      institution: 'ENSAM Casablanca',
      institutionLogo: ensamLogo,
      location: 'Casablanca, Morocco',
      startDate: '2024',
      endDate: '2027',
      summary: 'Currently pursuing an advanced engineering degree with focus on cybersecurity, cloud infrastructure, and network security. Gaining hands-on experience with enterprise security tools, cloud platforms, and modern DevSecOps practices.',
      gpa: '',
      specialization: 'Cybersecurity Focus',
      skillTags: [
        'Network Security',
        'Cloud Architecture',
        'Penetration Testing',
        'Linux Administration',
        'Cryptography',
        'DevSecOps',
        'SIEM',
        'AWS/Azure'
      ],
      coursework: [
        'Advanced Network Security & Protocols',
        'Cloud Computing Architecture (AWS & Azure)',
        'Ethical Hacking & Penetration Testing',
        'Cryptography & Secure Communications',
        'Cybersecurity Risk Management',
        'Secure Software Development',
        'Linux System Administration',
        'Database Security & Management',
        'Incident Response & Forensics',
        'DevOps & CI/CD Security'
      ],
      projects: [
        {
          name: 'Enterprise SIEM Implementation',
          description: 'Designed and deployed a Security Information and Event Management system using ELK Stack for real-time threat detection and log analysis.',
          technologies: ['Elasticsearch', 'Logstash', 'Kibana', 'Linux', 'Python']
        },
        {
          name: 'Cloud Security Automation',
          description: 'Developed Infrastructure as Code templates with automated security compliance checks for AWS environments.',
          technologies: ['Terraform', 'AWS', 'Python', 'Boto3', 'CloudFormation']
        },
        {
          name: 'Network Penetration Testing Lab',
          description: 'Built a virtualized lab environment for practicing ethical hacking techniques and vulnerability assessment.',
          technologies: ['Kali Linux', 'Metasploit', 'Wireshark', 'Nmap', 'VirtualBox']
        }
      ]
    },
    {
      id: 2,
      degree: "Associate's Degree (BTS)",
      fieldOfStudy: 'Computer Science & Networking',
      institution: 'ALFARABI High School',
      institutionLogo: null,
      location: 'Sale, Morocco',
      startDate: '2022',
      endDate: '2024',
      summary: 'Completed a comprehensive technical program covering computer systems, networking fundamentals, and programming. Developed strong foundational skills in IT infrastructure and system administration.',
      gpa: '3.7/4.0',
      specialization: 'Networking Focus',
      skillTags: [
        'TCP/IP',
        'Network Configuration',
        'Windows Server',
        'Cisco Networking',
        'Programming',
        'Database Management',
        'System Administration'
      ],
      coursework: [
        'Computer Networks & TCP/IP Protocols',
        'Network Administration & Configuration',
        'Cisco CCNA Routing & Switching',
        'Windows Server Administration',
        'Linux Fundamentals',
        'Database Management Systems (SQL)',
        'Object-Oriented Programming (Java/C++)',
        'Web Development (HTML/CSS/JavaScript)',
        'System Analysis & Design',
        'IT Project Management'
      ],
      projects: [
        {
          name: 'Campus Network Design',
          description: 'Designed and simulated a complete network infrastructure for a multi-building campus using Cisco Packet Tracer.',
          technologies: ['Cisco Packet Tracer', 'VLANs', 'Subnetting', 'OSPF']
        },
        {
          name: 'Student Management System',
          description: 'Developed a full-stack web application for student record management with secure authentication.',
          technologies: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'Bootstrap']
        }
      ],
      achievements: [
        'Graduated with Honors (Mention Très Bien)',
        'Top 5% of graduating class'
      ]
    },
    {
      id: 3,
      degree: 'High School Diploma (Baccalaureate)',
      fieldOfStudy: 'Science and Electrical Technologies',
      institution: 'PRINCE MOULAY ABDELLAH High School',
      institutionLogo: null,
      location: 'Sidi Kacem, Morocco',
      startDate: '2019',
      endDate: '2022',
      summary: 'Completed secondary education with a focus on science and electrical engineering fundamentals. Built strong analytical and problem-solving skills through mathematics and physics coursework.',
      gpa: null,
      specialization: 'Science Track',
      skillTags: [
        'Mathematics',
        'Physics',
        'Electrical Engineering',
        'Problem Solving',
        'Technical Drawing'
      ],
      coursework: [
        'Advanced Mathematics & Calculus',
        'Physics & Electricity',
        'Electrical Circuit Analysis',
        'Technical Drawing & Design',
        'Computer Science Fundamentals',
        'Engineering Mechanics'
      ],
      projects: [
        {
          name: 'Automated Lighting System',
          description: 'Designed and built an Arduino-based automated lighting system with motion detection.',
          technologies: ['Arduino', 'C++', 'Electronics', 'Sensors']
        }
      ],
      achievements: [
        'Graduated with Honors'
      ]
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

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
    <section className="education-section" aria-labelledby="education-heading">
      <div className="education-container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="section-icon-wrapper">
            <FaGraduationCap className="section-icon" />
          </div>
          <h2 id="education-heading" className="section-title">
            Education
          </h2>
          <p className="section-subtitle">
            Academic journey in Cybersecurity & Cloud Computing
          </p>
        </motion.div>

        {/* Education Timeline */}
        <motion.div
          className="education-timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          role="list"
          aria-label="Education timeline"
        >
          {educationData.map((edu, index) => (
            <EducationCard
              key={edu.id}
              education={edu}
              index={index}
              layout="timeline"
            />
          ))}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          className="education-stats"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="stat-card">
            <FaUniversity className="stat-icon" />
            <div className="stat-content">
              <span className="stat-number">3</span>
              <span className="stat-label">Institutions</span>
            </div>
          </div>
          <div className="stat-card">
            <FaGraduationCap className="stat-icon" />
            <div className="stat-content">
              <span className="stat-number">8+</span>
              <span className="stat-label">Years of Study</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
