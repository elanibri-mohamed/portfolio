import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaChevronDown,
  FaCloud,
  FaShieldAlt,
  FaNetworkWired,
  FaDownload,
  FaProjectDiagram,
  FaUser
} from 'react-icons/fa';
import Button from './Button';
import './Home.css';
import profileImg from '../assets/profile.jpg';

// Custom hook for typing animation
const useTypingEffect = (texts, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex];
    
    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        if (displayText.length === 1) {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        setDisplayText(currentText.substring(0, displayText.length + 1));
        if (displayText.length === currentText.length - 1) {
          setIsPaused(true);
        }
      }
    }, isPaused ? pauseTime : isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, isPaused, texts, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
};

const Home = ({ onNavigate }) => {
  const jobTitles = [
    'Cybersecurity Enthusiast',
    'Cloud Computing Student',
    'Network Security Specialist',
    'AWS Cloud Practitioner'
  ];
  
  const typedText = useTypingEffect(jobTitles, 80, 40, 2500);

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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/elanibri-mohamed', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/elanibri-mohamed', label: 'LinkedIn' },
    { icon: FaEnvelope, href: '#contact', label: 'Email', onClick: () => onNavigate && onNavigate('Contact') }
  ];

  const highlights = [
    { icon: FaShieldAlt, text: 'Security' },
    { icon: FaCloud, text: 'Cloud' },
    { icon: FaNetworkWired, text: 'Networking' }
  ];

  return (
    <section className="home" id="home">
      {/* Animated Background Particles */}
      <div className="home__particles">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="home__particle"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: '100%',
              opacity: 0 
            }}
            animate={{ 
              y: '-100%',
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear'
            }}
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
            }}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="home__overlay" />

      <div className="home__container">
        <motion.div 
          className="home__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Text Content */}
          <div className="home__text-content">
            <motion.div variants={itemVariants} className="home__greeting">
              <span className="home__greeting-text">Hello, I'm</span>
            </motion.div>

            <h1 className="home__name">
              ELANIBRI MOHAMED
            </h1>

            <motion.div variants={itemVariants} className="home__title-wrapper">
              <span className="home__title-prefix">{'>'}</span>
              <span className="home__title">{typedText}</span>
              <span className="home__cursor">|</span>
            </motion.div>

            <motion.div variants={itemVariants} className="home__highlights">
              {highlights.map((item, index) => (
                <span key={index} className="home__highlight">
                  <item.icon className="home__highlight-icon" />
                  {item.text}
                </span>
              ))}
            </motion.div>

            <motion.p variants={itemVariants} className="home__summary">
              Engineering student specializing in <strong>cybersecurity</strong> and 
              <strong> cloud infrastructure</strong>. I design secure network architectures, 
              implement threat detection systems, and deploy scalable cloud solutions. 
              Passionate about protecting digital assets and optimizing IT infrastructure.
            </motion.p>

            <motion.div variants={itemVariants} className="home__cta-group">
              <Button 
                variant="primary" 
                size="large"
                icon={FaProjectDiagram}
                onClick={() => onNavigate && onNavigate('Projects')}
              >
                View Projects
              </Button>
              <Button 
                variant="secondary" 
                size="large"
                icon={FaDownload}
                href="/ELANIBRI-Mohamed_Resume.pdf"
                download
              >
                Download CV
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="home__social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="home__social-link"
                  aria-label={social.label}
                  onClick={social.onClick}
                  target={social.onClick ? undefined : "_blank"}
                  rel={social.onClick ? undefined : "noopener noreferrer"}
                >
                  <social.icon />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Profile Image */}
          <motion.div 
            className="home__image-wrapper"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="home__image-container">
              <div className="home__image-glow" />
              <img 
                src={profileImg} 
                alt="ELANIBRI MOHAMED - Cybersecurity and Cloud Computing Engineering Student" 
                className="home__image"
              />
              <div className="home__image-ring" />
              <div className="home__image-dots">
                {[...Array(8)].map((_, i) => (
                  <span key={i} className={`home__image-dot home__image-dot--${i + 1}`} />
                ))}
              </div>
            </div>
            
            {/* Status Badge */}
            <motion.div 
              className="home__status-badge"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <span className="home__status-dot" />
              <span className="home__status-text">Available for Opportunities</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="home__scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <span className="home__scroll-text">Scroll to explore</span>
          <motion.div 
            className="home__scroll-icon"
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FaChevronDown />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
