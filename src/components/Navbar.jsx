import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, 
  FaTools, 
  FaProjectDiagram, 
  FaBriefcase, 
  FaCertificate, 
  FaGraduationCap, 
  FaEnvelope,
  FaTimes
} from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ currentPage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'Home', label: 'Home', icon: FaHome },
    { id: 'Skills', label: 'Skills', icon: FaTools },
    { id: 'Projects', label: 'Projects', icon: FaProjectDiagram },
    { id: 'Experience', label: 'Experience', icon: FaBriefcase },
    { id: 'Certifications', label: 'Certifications', icon: FaCertificate },
    { id: 'Education', label: 'Education', icon: FaGraduationCap },
    { id: 'Contact', label: 'Contact', icon: FaEnvelope },
  ];

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('.navbar')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__container">
          {/* Logo / Brand */}
          <motion.div
            className="navbar__brand"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => handleNavClick('Home')}
          >
            <span className="navbar__brand-code">{'<'}</span>
            <span className="navbar__brand-text">M.ELANIBRI</span>
            <span className="navbar__brand-code">{'/>'}</span>
          </motion.div>

          {/* Desktop Navigation */}
          <ul className="navbar__menu">
            {navItems.map((item, index) => {
              const isActive = currentPage === item.id;
              const Icon = item.icon;
              
              return (
                <motion.li 
                  key={item.id}
                  className="navbar__item"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <button
                    className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="navbar__link-icon" />
                    <span className="navbar__link-text">{item.label}</span>
                    
                    {/* Animated underline indicator */}
                    {isActive && (
                      <motion.div
                        className="navbar__indicator"
                        layoutId="navbarIndicator"
                        transition={{ 
                          type: 'spring', 
                          stiffness: 500, 
                          damping: 30 
                        }}
                      />
                    )}
                  </button>
                </motion.li>
              );
            })}
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            className="navbar__toggle"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="navbar__toggle-dot"></span>
            <span className="navbar__toggle-dot"></span>
            <span className="navbar__toggle-dot"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="navbar__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              className="navbar__mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 30 
              }}
            >
              <div className="navbar__mobile-header">
                <span className="navbar__mobile-title">Menu</span>
              </div>

              <ul className="navbar__mobile-list">
                {navItems.map((item, index) => {
                  const isActive = currentPage === item.id;
                  const Icon = item.icon;
                  
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <button
                        className={`navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`}
                        onClick={() => handleNavClick(item.id)}
                      >
                        <span className="navbar__mobile-icon-wrapper">
                          <Icon className="navbar__mobile-icon" />
                        </span>
                        <span className="navbar__mobile-text">{item.label}</span>
                        {isActive && (
                          <motion.div
                            className="navbar__mobile-active-dot"
                            layoutId="mobileActiveIndicator"
                          />
                        )}
                      </button>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Mobile Menu Footer */}
              <div className="navbar__mobile-footer">
                <div className="navbar__mobile-status">
                  <span className="navbar__status-dot" />
                  <span className="navbar__status-text">Available for hire</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
