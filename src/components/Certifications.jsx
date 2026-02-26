import React from 'react';
import './Certifications.css';

const Certifications = () => {
  const certs = [
    'Fortinet FortiGate 7.4 Administrator',
    'AWS Cloud Foundations',
    'Huawei Cloud Basics',
    'CISCO Network Technician Career Path'
  ];

  return (
    <div className="certifications">
      <h2>Certifications</h2>
      <ul>
        {certs.map((cert, index) => (
          <li key={index}>{cert}</li>
        ))}
      </ul>
    </div>
  );
};

export default Certifications;