import React from 'react';
import './Internships.css';

const Internships = () => {
  const internships = [
    {
      title: 'IT Manager Assistant',
      company: 'Movenpick Hotel & Casino Malabata Tanger',
      period: 'Jul 2025 - Sep 2025',
      location: 'Tanger, Morocco',
      tasks: [
        'Managed network administration tasks and infrastructure troubleshooting.',
        'Configured and maintained RFID/magnetic card access control systems.',
        'Contributed to PCI DSS compliance initiatives and security improvements.',
        'Implemented automated database backup solutions.'
      ]
    },
    {
      title: 'IT Technician',
      company: 'Data Process',
      period: 'Aug 2024 - Sep 2024',
      location: 'Casablanca, Morocco',
      tasks: [
        'Performed troubleshooting and maintenance of IT devices and infrastructure.',
        'Implemented GLPI for centralized IT ticket management.',
        'Managed Microsoft Active Directory (AD) user accounts and permissions.'
      ]
    },
    {
      title: 'IT Support',
      company: 'Movenpick Hotel & Casino Malabata Tanger',
      period: 'Aug 2023 - Oct 2023',
      location: 'Tanger, Morocco',
      tasks: [
        'Provided Level 1 and Level 2 IT support to end users.',
        'Administered and maintained system and network infrastructure.'
      ]
    }
  ];

  return (
    <div className="internships">
      <h2>Internships</h2>
      <div className="internships-grid">
        {internships.map((internship, index) => (
          <div key={index} className="internship-card">
            <h3>{internship.title}</h3>
            <p><strong>Company:</strong> {internship.company}</p>
            <p><strong>Period:</strong> {internship.period}</p>
            <p><strong>Location:</strong> {internship.location}</p>
            <ul>
              {internship.tasks.map((task, i) => (
                <li key={i}>{task}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Internships;