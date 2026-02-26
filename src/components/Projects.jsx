import React from 'react';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'IDS/IPS System Implementation',
      description: 'Implemented an IDS/IPS system using Snort on Ubuntu Server. Configured Cisco routing and switching technologies including VLAN, DTP, STP, Inter-VLAN routing, and OSPF. Deployed and configured ASA firewall security policies. Installed and configured Apache web server on Ubuntu Server for testing and validation purposes.',
      period: 'May 2024 - Jun 2024',
      location: 'Rabat, Morocco'
    }
  ];

  return (
    <div className="projects">
      <h2>Projects</h2>
      {projects.map((project, index) => (
        <div key={index} className="project">
          <h3>{project.title}</h3>
          <p><strong>Period:</strong> {project.period}</p>
          <p><strong>Location:</strong> {project.location}</p>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Projects;