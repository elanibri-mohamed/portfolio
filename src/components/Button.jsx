import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  href, 
  download = false,
  icon: Icon,
  className = ''
}) => {
  const baseClasses = `btn btn--${variant} btn--${size} ${className}`;
  
  const content = (
    <>
      {Icon && <Icon className="btn__icon" />}
      <span className="btn__text">{children}</span>
    </>
  );

  if (href) {
    return (
      <a 
        href={href} 
        className={baseClasses}
        download={download}
        target={download ? undefined : "_blank"}
        rel={download ? undefined : "noopener noreferrer"}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={baseClasses} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
