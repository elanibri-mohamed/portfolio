import React from 'react';
import './Education.css';

const Education = () => {
  const education = [
    {
      degree: "Engineer's Diploma in Cybersecurity & Cloud Computing",
      institution: 'ENSAM Casablanca',
      location: 'Casablanca, Morocco',
      year: '2027'
    },
    {
      degree: "Associate's Degree in Computer Science & Networking",
      institution: 'ALFARABI High School',
      location: 'Sale, Morocco',
      year: '2024'
    },
    {
      degree: 'High School Diploma in Science and Electrical Technologies',
      institution: 'PRINCE MOULAY ABDELLAH High School',
      location: 'Sidi Kacem, Morocco',
      year: '2022'
    }
  ];

  return (
    <div className="education">
      <h2>Education</h2>
      {education.map((edu, index) => (
        <div key={index} className="edu-item">
          <h3>{edu.degree}</h3>
          <p><strong>Institution:</strong> {edu.institution}</p>
          <p><strong>Location:</strong> {edu.location}</p>
          <p><strong>Year:</strong> {edu.year}</p>
        </div>
      ))}
    </div>
  );
};

export default Education;