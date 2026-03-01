import React, { useState, useMemo } from 'react';
import SkillCategory from './SkillCategory';
import './Skills.css';

/**
 * Skills Component
 * Professional skills section with categorized skills, filtering, and core competencies
 * Designed for cybersecurity and cloud computing professionals
 */

// Skills data structure - organized by categories
const skillsData = [
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    icon: '🔐',
    color: '#dc2626',
    skills: [
      {
        name: 'SD-WAN',
        level: 'advanced',
        icon: '🌐',
        description: 'Software-Defined Wide Area Network architecture and security',
        certified: true,
        certificationName: 'Fortinet NSE Certified'
      },
      {
        name: 'ZTNA',
        level: 'intermediate',
        icon: '🔒',
        description: 'Zero Trust Network Access implementation and policies'
      },
      {
        name: 'Reverse Engineering',
        level: 'intermediate',
        icon: '🔄',
        description: 'Malware analysis and binary reverse engineering techniques'
      },
      {
        name: 'OT Security',
        level: 'intermediate',
        icon: '🏭',
        description: 'Operational Technology and ICS/SCADA security'
      },
      {
        name: 'Wazuh SIEM',
        level: 'advanced',
        icon: '📊',
        description: 'Open-source security monitoring and threat detection'
      },
      {
        name: 'Splunk',
        level: 'intermediate',
        icon: '🔍',
        description: 'Data analytics and security information management'
      },
      {
        name: 'Threat Hunting',
        level: 'intermediate',
        icon: '🎯',
        description: 'Proactive threat detection and incident response'
      },
      {
        name: 'Vulnerability Assessment',
        level: 'advanced',
        icon: '🔎',
        description: 'Security scanning and penetration testing fundamentals'
      }
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: '☁️',
    color: '#0ea5e9',
    skills: [
      {
        name: 'AWS',
        level: 'intermediate',
        icon: '🅰️',
        description: 'Amazon Web Services cloud architecture and services',
        certified: true,
        certificationName: 'AWS Cloud Foundations'
      },
      {
        name: 'Terraform',
        level: 'intermediate',
        icon: '📦',
        description: 'Infrastructure as Code for cloud provisioning'
      },
      {
        name: 'Ansible',
        level: 'intermediate',
        icon: '📋',
        description: 'Configuration management and automation'
      },
      {
        name: 'Docker',
        level: 'intermediate',
        icon: '🐳',
        description: 'Containerization and microservices deployment'
      },
      {
        name: 'CI/CD',
        level: 'basic',
        icon: '🔄',
        description: 'Continuous Integration and Deployment pipelines'
      },
      {
        name: 'Git',
        level: 'advanced',
        icon: '📚',
        description: 'Version control and collaborative development'
      },
      {
        name: 'Cloud Architecture',
        level: 'intermediate',
        icon: '🏗️',
        description: 'Designing secure and scalable cloud solutions'
      }
    ]
  },
  {
    id: 'networking',
    title: 'Networking',
    icon: '🌐',
    color: '#22c55e',
    skills: [
      {
        name: 'TCP/IP',
        level: 'advanced',
        icon: '📡',
        description: 'Network protocols and communication fundamentals'
      },
      {
        name: 'Firewalls',
        level: 'advanced',
        icon: '🧱',
        description: 'Network security and traffic filtering',
        certified: true,
        certificationName: 'Fortinet FortiGate Administrator'
      },
      {
        name: 'VPN',
        level: 'intermediate',
        icon: '🔐',
        description: 'Virtual Private Networks and secure remote access'
      },
      {
        name: 'Network Monitoring',
        level: 'intermediate',
        icon: '📈',
        description: 'Network performance analysis and troubleshooting'
      },
      {
        name: 'VLANs',
        level: 'intermediate',
        icon: '📶',
        description: 'Virtual LAN configuration and management'
      },
      {
        name: 'Routing & Switching',
        level: 'intermediate',
        icon: '🔄',
        description: 'Network infrastructure configuration'
      }
    ]
  },
  {
    id: 'programming',
    title: 'Programming',
    icon: '💻',
    color: '#a855f7',
    skills: [
      {
        name: 'Python',
        level: 'advanced',
        icon: '🐍',
        description: 'Scripting, automation, and security tools development'
      },
      {
        name: 'Bash/Shell',
        level: 'intermediate',
        icon: '🐚',
        description: 'Linux/Unix shell scripting and automation'
      },
      {
        name: 'SQL',
        level: 'intermediate',
        icon: '🗄️',
        description: 'Database querying and management'
      },
      {
        name: 'JavaScript',
        level: 'intermediate',
        icon: '📜',
        description: 'Web development and modern frameworks'
      },
      {
        name: 'C/C++',
        level: 'basic',
        icon: '⚡',
        description: 'Systems programming and low-level development'
      },
      {
        name: 'PowerShell',
        level: 'intermediate',
        icon: '💠',
        description: 'Windows automation and administration'
      }
    ]
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    icon: '🛠️',
    color: '#f59e0b',
    skills: [
      {
        name: 'Wireshark',
        level: 'advanced',
        icon: '🦈',
        description: 'Network protocol analysis and packet inspection'
      },
      {
        name: 'Nmap',
        level: 'advanced',
        icon: '🔍',
        description: 'Network discovery and security auditing'
      },
      {
        name: 'Metasploit',
        level: 'intermediate',
        icon: '🎯',
        description: 'Penetration testing framework'
      },
      {
        name: 'Burp Suite',
        level: 'intermediate',
        icon: '🕸️',
        description: 'Web application security testing'
      },
      {
        name: 'ELK Stack',
        level: 'intermediate',
        icon: '📚',
        description: 'Log aggregation and analysis platform'
      },
      {
        name: 'ServiceNow',
        level: 'basic',
        icon: '☁️',
        description: 'IT service management platform'
      }
    ]
  },
  {
    id: 'os',
    title: 'Operating Systems',
    icon: '🖥️',
    color: '#6366f1',
    skills: [
      {
        name: 'Linux',
        level: 'advanced',
        icon: '🐧',
        description: 'System administration and hardening (Ubuntu, CentOS, Kali)'
      },
      {
        name: 'Windows Server',
        level: 'intermediate',
        icon: '🪟',
        description: 'Windows Server administration and Active Directory'
      },
      {
        name: 'macOS',
        level: 'intermediate',
        icon: '🍎',
        description: 'Mac system administration and security'
      }
    ]
  }
];

// Core competencies - top skills to highlight
const coreCompetencies = [
  {
    title: 'Cybersecurity',
    description: 'Network security, threat detection, and vulnerability management',
    icon: '🛡️'
  },
  {
    title: 'Cloud Security',
    description: 'AWS cloud architecture and secure infrastructure design',
    icon: '☁️'
  },
  {
    title: 'Network Engineering',
    description: 'Enterprise networking, SD-WAN, and security appliances',
    icon: '🌐'
  },
  {
    title: 'Automation',
    description: 'Python scripting, Infrastructure as Code, and CI/CD',
    icon: '⚙️'
  }
];

// Language proficiencies
const languages = [
  { name: 'Arabic', level: 'Native', proficiency: 100 },
  { name: 'English', level: 'B2 - Upper Intermediate', proficiency: 75 },
  { name: 'French', level: 'B1 - Intermediate', proficiency: 50 }
];

// Filter categories
const filterOptions = [
  { id: 'all', label: 'All Skills', icon: '📋' },
  { id: 'cybersecurity', label: 'Cybersecurity', icon: '🔐' },
  { id: 'cloud', label: 'Cloud & DevOps', icon: '☁️' },
  { id: 'networking', label: 'Networking', icon: '🌐' },
  { id: 'programming', label: 'Programming', icon: '💻' },
  { id: 'tools', label: 'Tools', icon: '🛠️' },
  { id: 'os', label: 'Operating Systems', icon: '🖥️' }
];

const Skills = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter skills based on active filter and search term
  const filteredCategories = useMemo(() => {
    let categories = skillsData;

    if (activeFilter !== 'all') {
      categories = categories.filter(cat => cat.id === activeFilter);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      categories = categories.map(cat => ({
        ...cat,
        skills: cat.skills.filter(skill => 
          skill.name.toLowerCase().includes(term) ||
          skill.description.toLowerCase().includes(term)
        )
      })).filter(cat => cat.skills.length > 0);
    }

    return categories;
  }, [activeFilter, searchTerm]);

  // Calculate total skills count
  const totalSkills = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
  }, [filteredCategories]);

  return (
    <div className="skills-container">
      {/* Header Section */}
      <header className="skills-header">
        <h1 className="skills-title">Technical Skills</h1>
        <p className="skills-subtitle">
          Specialized in cybersecurity, cloud computing, and network infrastructure
        </p>
      </header>

      {/* Core Competencies */}
      <section className="core-competencies" aria-labelledby="competencies-heading">
        <h2 id="competencies-heading" className="section-title">
          Core Competencies
        </h2>
        <div className="competencies-grid">
          {coreCompetencies.map((comp, index) => (
            <div 
              key={comp.title} 
              className="competency-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="competency-icon" role="img" aria-label="">
                {comp.icon}
              </span>
              <h3 className="competency-title">{comp.title}</h3>
              <p className="competency-description">{comp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Filter & Search Controls */}
      <section className="skills-controls" aria-label="Skills filters">
        <div className="filter-tabs">
          {filterOptions.map(option => (
            <button
              key={option.id}
              className={`filter-tab ${activeFilter === option.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(option.id)}
              aria-pressed={activeFilter === option.id}
            >
              <span className="filter-icon" role="img" aria-label="">
                {option.icon}
              </span>
              <span className="filter-label">{option.label}</span>
            </button>
          ))}
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label="Search skills"
          />
          <span className="search-icon" role="img" aria-label="Search">🔍</span>
        </div>
      </section>

      {/* Results Count */}
      <div className="results-count" aria-live="polite">
        Showing {totalSkills} skill{totalSkills !== 1 ? 's' : ''}
        {activeFilter !== 'all' && ` in ${filterOptions.find(f => f.id === activeFilter)?.label}`}
        {searchTerm && ` matching "${searchTerm}"`}
      </div>

      {/* Skills Categories Grid */}
      <section className="skills-categories" aria-label="Skills by category">
        {filteredCategories.length > 0 ? (
          <div className="categories-grid">
            {filteredCategories.map((category, index) => (
              <SkillCategory
                key={category.id}
                title={category.title}
                icon={category.icon}
                color={category.color}
                skills={category.skills}
                delay={index * 100}
              />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <span className="no-results-icon" role="img" aria-label="">🔍</span>
            <p>No skills found matching your criteria</p>
            <button 
              className="clear-filters-btn"
              onClick={() => { setActiveFilter('all'); setSearchTerm(''); }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* Languages Section */}
      <section className="languages-section" aria-labelledby="languages-heading">
        <h2 id="languages-heading" className="section-title">
          Languages
        </h2>
        <div className="languages-grid">
          {languages.map((lang, index) => (
            <div 
              key={lang.name} 
              className="language-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="language-info">
                <span className="language-name">{lang.name}</span>
                <span className="language-level">{lang.level}</span>
              </div>
              <div className="language-progress">
                <div 
                  className="language-progress-bar"
                  style={{ width: `${lang.proficiency}%` }}
                  aria-label={`${lang.name} proficiency: ${lang.proficiency}%`}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Soft Skills */}
      <section className="soft-skills-section" aria-labelledby="soft-skills-heading">
        <h2 id="soft-skills-heading" className="section-title">
          Professional Skills
        </h2>
        <div className="soft-skills-grid">
          {['Problem Solving', 'Team Collaboration', 'Communication', 'Adaptability', 'Critical Thinking', 'Attention to Detail'].map((skill, index) => (
            <div 
              key={skill} 
              className="soft-skill-tag"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {skill}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Skills;
