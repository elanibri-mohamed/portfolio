import React from 'react';
import './Skills.css';

const Skills = () => {
  const professionalSkills = [
    'InfoSecurity: SD-WAN, ZTNA, Reverse Engineering, OT Security',
    'SIEM/Monitoring: Wazuh, Splunk, ML/Automation',
    'Designing Secure Cloud Architectures',
    'DevOps: Git, Terraform, Ansible'
  ];

  const softSkills = [
    'Teamwork',
    'Communication',
    'Problem Solving',
    'Adaptability'
  ];

  const languages = [
    'Arabic (Native)',
    'English (B2)',
    'French (B1)'
  ];

  return (
    <div className="skills">
      <h2>Skills</h2>
      <div className="skills-section">
        <h3>Professional Skills</h3>
        <ul>
          {professionalSkills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      <div className="skills-section">
        <h3>Soft Skills</h3>
        <ul>
          {softSkills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      <div className="skills-section">
        <h3>Languages</h3>
        <ul>
          {languages.map((lang, index) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Skills;